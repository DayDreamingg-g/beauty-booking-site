import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

const BASE_TIME_OPTIONS = [
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
];

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get("date")?.trim();

    if (!date) {
      return NextResponse.json({
        availableTimes: BASE_TIME_OPTIONS,
      });
    }

    const bookedRequests = await prisma.bookingRequest.findMany({
      where: {
        date,
        status: {
          in: ["new", "confirmed"],
        },
      },
      select: {
        time: true,
      },
    });

    const bookedTimes = new Set(
      bookedRequests
        .map((request) => request.time)
        .filter((time): time is string => Boolean(time))
    );

    const availableTimes = BASE_TIME_OPTIONS.filter(
      (time) => !bookedTimes.has(time)
    );

    return NextResponse.json({
      availableTimes,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        availableTimes: [],
        message: "Не вдалося завантажити доступний час.",
      },
      { status: 500 }
    );
  }
}