import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

type DeleteBookingBody = {
  id?: string;
};

export async function DELETE(request: Request) {
  try {
    const body = (await request.json()) as DeleteBookingBody;
    const id = body.id?.trim();

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing booking id",
        },
        { status: 400 }
      );
    }

    await prisma.bookingRequest.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Booking request deleted",
    });
  } catch (error) {
    console.error("Booking delete API error:", error);

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