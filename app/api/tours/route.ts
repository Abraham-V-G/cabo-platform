import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {

  try {

    const tours = await prisma.tour.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(tours);

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      { error: "Failed to fetch tours" },
      { status: 500 }
    );

  }
}