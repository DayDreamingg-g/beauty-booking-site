import { prisma } from "@/lib/prisma";
import HomeClient from "./HomeClient";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export type ServiceItem = {
  id: string;
  title: string;
  price: string;
  time: string;
  description: string;
  includes: string[];
  image: string;
};

export type MasterItem = {
  id: string;
  name: string;
  role: string;
  image: string;
  description: string;
};

export type PortfolioItem = {
  id: string;
  image: string;
  procedure: string;
  master: string;
  masterId: string;
  duration: string;
  description: string;
};

export type ReviewItem = {
  id: string;
  name: string;
  text: string;
  rating: number;
  image: string | null;
  master: string;
  masterId: string;
  createdAt: string;
};

function splitIncludes(value: string) {
  return value
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
}

export default async function Page() {
  const [dbServices, dbMasters, dbPortfolioItems, dbReviews] =
    await Promise.all([
      prisma.service.findMany({
        where: {
          isActive: true,
        },
        orderBy: {
          createdAt: "asc",
        },
      }),

      prisma.master.findMany({
        where: {
          isActive: true,
        },
        orderBy: {
          createdAt: "asc",
        },
      }),

      prisma.portfolioItem.findMany({
        where: {
          isActive: true,
        },
        include: {
          service: true,
          master: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      }),

      prisma.review.findMany({
        where: {
          isActive: true,
        },
        include: {
          master: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      }),
    ]);

  const services: ServiceItem[] = dbServices.map((service) => ({
    id: service.id,
    title: service.title,
    price: service.price,
    time: service.duration,
    description: service.description,
    includes: splitIncludes(service.includes),
    image: service.image,
  }));

  const masters: MasterItem[] = dbMasters.map((master) => ({
    id: master.id,
    name: master.name,
    role: master.role,
    image: master.image,
    description: master.description,
  }));

  const portfolioItems: PortfolioItem[] = dbPortfolioItems.map((item) => ({
    id: item.id,
    image: item.image,
    procedure: item.service.title,
    master: item.master.name,
    masterId: item.masterId,
    duration: item.duration,
    description: item.description,
  }));

  const reviews: ReviewItem[] = dbReviews.map((review) => ({
    id: review.id,
    name: review.name,
    text: review.text,
    rating: review.rating,
    image: review.image,
    master: review.master.name,
    masterId: review.masterId,
    createdAt: review.createdAt.toISOString(),
  }));

  return (
    <HomeClient
      services={services}
      masters={masters}
      portfolioItems={portfolioItems}
      reviews={reviews}
    />
  );
}