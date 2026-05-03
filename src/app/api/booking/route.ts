import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

type BookingRequestBody = {
  name?: string;
  phone?: string;
  service?: string;
  master?: string;
  date?: string;
  comment?: string;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as BookingRequestBody;

    const name = body.name?.trim();
    const phone = body.phone?.trim();
    const service = body.service?.trim();
    const master = body.master?.trim();
    const date = body.date?.trim();
    const comment = body.comment?.trim() || "";

    if (!name || !phone || !service || !master || !date) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing required fields",
          received: { name, phone, service, master, date, comment },
        },
        { status: 400 }
      );
    }

    const booking = await prisma.bookingRequest.create({
      data: {
        name,
        phone,
        service,
        master,
        date,
        comment,
      },
    });

    console.log("Saved booking request:", booking);

    return NextResponse.json(
      {
        success: true,
        message: "Booking request saved",
        booking,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Booking API error:", error);

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