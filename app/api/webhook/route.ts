import { NextResponse } from "next/server";
import Stripe from "stripe";
import { Resend } from "resend";

console.log("⚡ Webhook route loaded");

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(req: Request) {
  console.log("📨 Webhook POST received");

  const body = await req.text();
  const signature = req.headers.get("stripe-signature");

  console.log("Signature present:", !!signature);

  if (!signature) {
    console.error("❌ No stripe-signature header");
    return NextResponse.json({ error: "No signature" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
    console.log("✅ Event constructed:", event.type);
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    console.error("❌ Signature verification failed:", errorMessage);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const metadata = session.metadata;
    const customerEmail = session.customer_details?.email;

    console.log("💰 Checkout completed for:", customerEmail);
    console.log("📦 Metadata:", metadata);

    if (!customerEmail) {
      console.error("❌ No customer email");
      return NextResponse.json({ received: true });
    }

    const reservationCode = session.id.slice(-8).toUpperCase();

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; background:#000; color:#fff; padding:40px;">
        <h1>Reservation Confirmed 🎉</h1>
        <p>Hello ${metadata?.firstName || ''} ${metadata?.lastName || ''},</p>
        <p>Your booking has been confirmed.</p>
        <div style="background:#111; padding:20px; border-radius:8px;">
          <p><strong>Code:</strong> ${reservationCode}</p>
          <p><strong>Tour:</strong> ${metadata?.tour}</p>
          <p><strong>Date:</strong> ${metadata?.date} at ${metadata?.time}</p>
          <p><strong>People:</strong> ${metadata?.people}</p>
          <p><strong>Total:</strong> $${(session.amount_total || 0) / 100}</p>
          <p><strong>Phone:</strong> ${metadata?.phone}</p>
          <p><strong>Email:</strong> ${customerEmail}</p>
        </div>
        <p>— TerraNova Global Adventures</p>
      </div>
    `;

    // CAMBIA ESTO POR TU CORREO REAL
    const adminEmail = "tucorreo@gmail.com";

    try {
      console.log("📧 Sending email to:", customerEmail, "and admin:", adminEmail);
      const { data, error } = await resend.emails.send({
        from: "TerraNova <reservations@terranovaglobaladventures.com>",
        to: [customerEmail, adminEmail],
        subject: `Your TerraNova Reservation - ${reservationCode}`,
        html: htmlContent,
      });

      if (error) {
        console.error("❌ Resend error:", error);
      } else {
        console.log("✅ Email sent:", data?.id);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      console.error("❌ Email exception:", errorMessage);
    }
  }

  return NextResponse.json({ received: true });
}

// Opcional: manejar GET para probar que la ruta existe
export async function GET() {
  console.log("👋 GET request to webhook");
  return NextResponse.json({ message: "Webhook endpoint ready" });
}