import { NextResponse } from "next/server";
import Stripe from "stripe";
import { Resend } from "resend";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const resend = new Resend(
  process.env.RESEND_API_KEY!
);

export async function POST(req: Request) {

  const body = await req.text();

  const signature =
    req.headers.get("stripe-signature");

  if (!signature) {

    return NextResponse.json(
      { error: "No signature" },
      { status: 400 }
    );

  }

  let event: Stripe.Event;

  try {

    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_VACATION_WEBHOOK_SECRET!
    );

  } catch (err) {

    console.error(err);

    return NextResponse.json(
      { error: "Invalid signature" },
      { status: 400 }
    );

  }

  if (event.type === "checkout.session.completed") {

    const session =
      event.data.object as Stripe.Checkout.Session;

    const metadata = session.metadata;

    const customerEmail =
      session.customer_details?.email;

    if (!customerEmail) {
      return NextResponse.json({
        received: true,
      });
    }

    const reservationCode =
      session.id.slice(-8).toUpperCase();

    // CLIENT EMAIL
    const clientHtml = `
      <div style="
        background:#000;
        color:#fff;
        padding:40px;
        font-family:Arial;
      ">

        <h1 style="font-size:32px;">
          Vacation Confirmed ✨
        </h1>

        <p>
          Hello ${metadata?.firstName}
          ${metadata?.lastName},
        </p>

        <p>
          Your vacation package has been confirmed.
        </p>

        <div style="
          background:#111;
          padding:25px;
          border-radius:16px;
          margin-top:30px;
        ">

          <p><strong>Reservation:</strong> ${reservationCode}</p>

          <p><strong>Package:</strong> ${metadata?.packageName}</p>

          <p><strong>Location:</strong> ${metadata?.location}</p>

          <p><strong>Resort:</strong> ${metadata?.resort}</p>

          <p><strong>Guests:</strong> ${metadata?.guests}</p>

          <p><strong>Check-in:</strong> ${metadata?.checkIn}</p>

          <p><strong>Check-out:</strong> ${metadata?.checkOut}</p>

          <p><strong>Total:</strong> $${(session.amount_total || 0) / 100} USD</p>

        </div>

        <br/>

        <p>
          TerraNova Global Adventures
        </p>

      </div>
    `;

    // ADMIN EMAIL
    const adminHtml = `
      <div style="
        background:#000;
        color:#fff;
        padding:40px;
        font-family:Arial;
      ">

        <h1>
          New Vacation Reservation
        </h1>

        <div style="
          background:#111;
          padding:25px;
          border-radius:16px;
        ">

          <p><strong>Name:</strong>
          ${metadata?.firstName}
          ${metadata?.lastName}</p>

          <p><strong>Email:</strong>
          ${customerEmail}</p>

          <p><strong>Phone:</strong>
          ${metadata?.phone}</p>

          <p><strong>Package:</strong>
          ${metadata?.packageName}</p>

          <p><strong>Location:</strong>
          ${metadata?.location}</p>

          <p><strong>Guests:</strong>
          ${metadata?.guests}</p>

          <p><strong>Check-in:</strong>
          ${metadata?.checkIn}</p>

          <p><strong>Check-out:</strong>
          ${metadata?.checkOut}</p>

          <p><strong>Transportation:</strong>
          ${metadata?.transportation}</p>

          <p><strong>Requests:</strong>
          ${metadata?.specialRequests}</p>

        </div>

      </div>
    `;

    try {

      // CLIENT
      await resend.emails.send({
        from:
          "TerraNova <reservations@terranovaglobaladventures.com>",

        to: customerEmail,

        subject:
          "Your Vacation Reservation ✨",

        html: clientHtml,
      });

      // ADMIN
      await resend.emails.send({
        from:
          "TerraNova <reservations@terranovaglobaladventures.com>",

        to:
          "abrahamvenegaz60@gmail.com",

        subject:
          "New Vacation Reservation",

        html: adminHtml,
      });

      console.log(
        "✅ Vacation emails sent"
      );

    } catch (err) {

      console.error(err);

    }
  }

  return NextResponse.json({
    received: true,
  });
}