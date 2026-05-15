import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  req: Request,
  { params }: { params: Promise<{ slug: string }> } // 1. El tipo ahora es una Promise
) {
  try {
    const { slug } = await params; // 2. Es necesario usar 'await'
    const tour = await prisma.tour.findUnique({ where: { slug } });

    if (!tour) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json(tour);
  } catch (error) {
    console.error("Error fetching tour:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}