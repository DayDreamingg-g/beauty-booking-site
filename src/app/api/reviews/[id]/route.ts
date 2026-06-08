import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

type RouteParams = {
  params: Promise<{
    id: string;
  }>;
};

export async function DELETE(_request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message: "ID не передано.",
        },
        { status: 400 }
      );
    }

    await prisma.review.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Не вдалося видалити відгук.",
      },
      { status: 500 }
    );
  }
}