import { NextResponse } from "next/server";
import Stripe from "stripe";
import { PrismaClient } from "@prisma/client";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const prisma = new PrismaClient();

// Función para generar un código de reserva único para TOURS
function generateReservationCode(): string {
  const prefix = "TR";
  
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${prefix}-${timestamp}-${random}`;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // 🔒 Buscar el tour real en la base de datos por nombre (o slug)
    // Se usa `name` porque el formulario envía `tourName`
    const tour = await prisma.tour.findFirst({
      where: { name: body.tourName },
    });

    if (!tour) {
      return NextResponse.json(
        { error: "Tour not found" },
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
              name: tour.name,
            },
            unit_amount: tour.price * 100,
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
        transportation: body.transportation,
        specialRequests: body.specialRequests || "",
      },
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancel`,
    });

    // Guardar la reserva en la base de datos con estado PENDING
    const reservationCode = generateReservationCode();

    // Convertir fecha y hora (body.date viene como string "YYYY-MM-DD", body.time como "9:00 AM")
    // Combinar para crear un objeto Date si es necesario, o guardar por separado
    const bookingDate = body.date ? new Date(body.date) : null;
    // Para la hora, se guarda como string directamente en el campo `time`
    const bookingTime = body.time || null;

    await prisma.booking.create({
      data: {
        reservationCode,
        type: "TOUR",
        status: "PENDING",
        customerName: `${body.firstName} ${body.lastName}`,
        customerEmail: body.email,
        customerPhone: body.phone,
        guests: body.people,
        amount: tour.price * body.people,
        stripeSessionId: session.id,
        transportation: body.transportation === "yes",
        specialRequests: body.specialRequests || null,
        date: bookingDate,
        time: bookingTime,
        tourId: tour.id,
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