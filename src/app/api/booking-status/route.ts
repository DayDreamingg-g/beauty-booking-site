import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

const ALLOWED_STATUSES = ["new", "confirmed", "cancelled"];

type BookingStatusBody = {
  id?: string;
  status?: string;
};

function getString(value: unknown) {
  return String(value || "").trim();
}

export async function PATCH(request: Request) {
  try {
    const body = (await request.json()) as BookingStatusBody;

    const id = getString(body.id);
    const status = getString(body.status);

    if (!id || !ALLOWED_STATUSES.includes(status)) {
      return NextResponse.json(
        {
          success: false,
          message: "Некоректні дані.",
        },
        { status: 400 }
      );
    }

    const booking = await prisma.bookingRequest.update({
      where: {
        id,
      },
      data: {
        status,
      },
    });

    return NextResponse.json({
      success: true,
      booking,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Не вдалося оновити статус.",
      },
      { status: 500 }
    );
  }
}