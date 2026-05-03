import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

type BookingStatusBody = {
  id?: string;
  status?: string;
};

const allowedStatuses = ["new", "confirmed", "cancelled"];

export async function PATCH(request: Request) {
  try {
    const body = (await request.json()) as BookingStatusBody;

    const id = body.id?.trim();
    const status = body.status?.trim();

    if (!id || !status) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing id or status",
        },
        { status: 400 }
      );
    }

    if (!allowedStatuses.includes(status)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid status",
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
      message: "Booking status updated",
      booking,
    });
  } catch (error) {
    console.error("Booking status API error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}