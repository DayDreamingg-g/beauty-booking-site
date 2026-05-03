import { NextResponse } from "next/server";

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
        },
        { status: 400 }
      );
    }

    const booking = {
      name,
      phone,
      service,
      master,
      date,
      comment,
      createdAt: new Date().toISOString(),
    };

    console.log("New booking request:", booking);

    return NextResponse.json(
      {
        success: true,
        message: "Booking request received",
        booking,
      },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "Invalid request",
      },
      { status: 500 }
    );
  }
}