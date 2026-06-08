import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

type ReviewBody = {
  name?: string;
  text?: string;
  rating?: number;
  image?: string;
  masterId?: string;
};

function getString(value: unknown) {
  return String(value || "").trim();
}

export async function GET() {
  try {
    const reviews = await prisma.review.findMany({
      where: {
        isActive: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        master: true,
      },
    });

    return NextResponse.json({
      success: true,
      reviews: reviews.map((review) => ({
        id: review.id,
        name: review.name,
        text: review.text,
        rating: review.rating,
        image: review.image,
        masterId: review.masterId,
        master: review.master.name,
        createdAt: review.createdAt,
      })),
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Не вдалося завантажити відгуки.",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ReviewBody;

    const name = getString(body.name);
    const text = getString(body.text);
    const image = getString(body.image);
    const masterId = getString(body.masterId);
    const rating = Number(body.rating);

    if (!name || !text || !masterId || !rating) {
      return NextResponse.json(
        {
          success: false,
          message: "Заповніть усі обов’язкові поля.",
        },
        { status: 400 }
      );
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        {
          success: false,
          message: "Оцінка має бути від 1 до 5.",
        },
        { status: 400 }
      );
    }

    const master = await prisma.master.findFirst({
      where: {
        id: masterId,
        isActive: true,
      },
      select: {
        id: true,
      },
    });

    if (!master) {
      return NextResponse.json(
        {
          success: false,
          message: "Майстра не знайдено.",
        },
        { status: 404 }
      );
    }

    const review = await prisma.review.create({
      data: {
        name,
        text,
        rating,
        image: image || null,
        masterId,
        isActive: true,
      },
      include: {
        master: true,
      },
    });

    return NextResponse.json({
      success: true,
      review: {
        id: review.id,
        name: review.name,
        text: review.text,
        rating: review.rating,
        image: review.image,
        masterId: review.masterId,
        master: review.master.name,
        createdAt: review.createdAt,
      },
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Не вдалося створити відгук.",
      },
      { status: 500 }
    );
  }
}