import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendBookingTelegramMessage } from "@/lib/telegram";

export const runtime = "nodejs";

type BookingRequestBody = {
  name?: string;
  phone?: string;
  service?: string;
  master?: string;
  date?: string;
  time?: string;
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
    const time = body.time?.trim();
    const comment = body.comment?.trim() || "";

    if (!name || !phone || !service || !master || !date || !time) {
      return NextResponse.json(
        {
          success: false,
          message: "Відсутні обов’язкові поля",
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
        time,
        comment,
      },
    });

    await sendBookingTelegramMessage({
      name: booking.name,
      phone: booking.phone,
      service: booking.service,
      master: booking.master,
      date: booking.date,
      time: booking.time,
      comment: booking.comment || "",
    });

    console.log("Saved booking request:", booking);

    return NextResponse.json(
      {
        success: true,
        message: "Заявку успішно збережено",
        booking,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Booking API error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Внутрішня помилка сервера",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}