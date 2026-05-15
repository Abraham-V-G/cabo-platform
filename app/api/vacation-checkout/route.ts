import { NextResponse } from "next/server";
import Stripe from "stripe";
import { PrismaClient } from "@prisma/client";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const prisma = new PrismaClient();

// Función para generar un código de reserva único
function generateReservationCode(): string {
  const prefix = "VAC";
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${prefix}-${timestamp}-${random}`;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Validar que el paquete existe en la base de datos
    const pkg = await prisma.vacationPackage.findUnique({
      where: { slug: body.packageSlug },
    });

    if (!pkg) {
      return NextResponse.json(
        { error: "Package not found" },
        { status: 400 }
      );
    }

    // Crear sesión de Stripe Checkout
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      customer_email: body.email,
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: pkg.name,
              description: `${pkg.location} • ${pkg.resort}`,
            },
            unit_amount: pkg.price * 100,
          },
          quantity: 1,
        },
      ],
      metadata: {
        bookingType: "VACATION",
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        phone: body.phoneCode + " " + body.phone,
        packageName: pkg.name,
        packageSlug: pkg.slug,
        resort: pkg.resort,
        location: pkg.location,
        category: pkg.category,
        checkIn: body.checkIn,
        checkOut: body.checkOut,
        days: pkg.days.toString(),
        vacation: pkg.name,
        transportation: body.transportation,
        specialRequests: body.specialRequests || "",
        guests: body.guests.toString(),
      },
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancel`,
    });

    // Guardar la reserva en la base de datos con estado PENDING
    const reservationCode = generateReservationCode();
    await prisma.booking.create({
      data: {
        reservationCode,
        type: "VACATION",
        status: "PENDING",
        customerName: `${body.firstName} ${body.lastName}`,
        customerEmail: body.email,
        customerPhone: `${body.phoneCode} ${body.phone}`,
        guests: body.guests,
        amount: pkg.price,
        stripeSessionId: session.id,
        transportation: body.transportation === "yes",
        specialRequests: body.specialRequests || null,
        checkIn: new Date(body.checkIn),
        checkOut: new Date(body.checkOut),
        vacationId: pkg.id,
      },
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