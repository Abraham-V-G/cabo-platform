import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// La clave está aquí ⬇️
export async function GET(
  req: Request,
  { params }: { params: Promise<{ slug: string }> } // 1. El tipo ahora es una Promise
) {
  try {
    const { slug } = await params; // 2. Es necesario usar 'await'
    const vacation = await prisma.vacationPackage.findUnique({ where: { slug } });

    if (!vacation) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json(vacation);
  } catch (error) {
    console.error("Error fetching vacation package:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}