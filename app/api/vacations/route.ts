import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {

  try {

    const vacations =
      await prisma.vacationPackage.findMany({
        orderBy: {
          createdAt: "desc",
        },
      });

    return NextResponse.json(vacations);

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      { error: "Failed to fetch vacations" },
      { status: 500 }
    );

  }
}