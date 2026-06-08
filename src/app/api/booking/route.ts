import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendBookingTelegramMessage } from "@/lib/telegram";

export const runtime = "nodejs";

type BookingBody = {
  name?: string;
  phone?: string;
  service?: string;
  master?: string;
  date?: string;
  time?: string;
  comment?: string;
};

function getString(value: unknown) {
  return String(value || "").trim();
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as BookingBody;

    const name = getString(body.name);
    const phone = getString(body.phone);
    const service = getString(body.service);
    const master = getString(body.master);
    const date = getString(body.date);
    const time = getString(body.time);
    const comment = getString(body.comment);

    if (!name || !phone || !service || !master || !date || !time) {
      return NextResponse.json(
        {
          success: false,
          message: "Заповніть усі обов’язкові поля.",
        },
        { status: 400 }
      );
    }

    const existingBooking = await prisma.bookingRequest.findFirst({
      where: {
        date,
        time,
        status: {
          in: ["new", "confirmed"],
        },
      },
      select: {
        id: true,
      },
    });

    if (existingBooking) {
      return NextResponse.json(
        {
          success: false,
          message: "TIME_ALREADY_BOOKED",
        },
        { status: 409 }
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
        status: "new",
      },
    });

    await sendBookingTelegramMessage({
      name,
      phone,
      service,
      master,
      date,
      time,
      comment,
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
        message: "Не вдалося створити заявку.",
      },
      { status: 500 }
    );
  }
}