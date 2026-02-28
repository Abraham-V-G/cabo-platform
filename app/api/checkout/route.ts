import { NextResponse } from "next/server";
import Stripe from "stripe";
import { tours } from "@/lib/tours";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // 🔒 Buscar el tour real en backend
    const tour = tours.find((t) => t.name === body.tourName);

    if (!tour) {
      return NextResponse.json(
        { error: "Tour not found" },
        { status: 400 }
      );
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",

      // 🔥 IMPORTANTE
      customer_email: body.email,

      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: tour.name,
            },
            unit_amount: tour.price * 100, // 🔒 precio real backend
          },
          quantity: body.people,
        },
      ],

      metadata: {
        firstName: body.firstName,
        lastName: body.lastName,
        phone: body.phone,
        date: body.date,
        time: body.time,
        people: body.people.toString(),
        tour: tour.name,
      },

      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancel`,
    });

    return NextResponse.json({ url: session.url });

  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}