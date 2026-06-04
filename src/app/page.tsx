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
  duration: string;
  description: string;
};

function splitIncludes(value: string) {
  return value
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
}

const fallbackServices: ServiceItem[] = [];

const fallbackMasters: MasterItem[] = [];

const fallbackPortfolio: PortfolioItem[] = [];

export default async function Page() {
  const [dbServices, dbMasters, dbPortfolioItems] = await Promise.all([
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
  ]);

  const services: ServiceItem[] =
    dbServices.length > 0
      ? dbServices.map((service) => ({
          id: service.id,
          title: service.title,
          price: service.price,
          time: service.duration,
          description: service.description,
          includes: splitIncludes(service.includes),
          image: service.image,
        }))
      : fallbackServices;

  const masters: MasterItem[] =
    dbMasters.length > 0
      ? dbMasters.map((master) => ({
          id: master.id,
          name: master.name,
          role: master.role,
          image: master.image,
          description: master.description,
        }))
      : fallbackMasters;

  const portfolioItems: PortfolioItem[] =
    dbPortfolioItems.length > 0
      ? dbPortfolioItems.map((item) => ({
          id: item.id,
          image: item.image,
          procedure: item.service.title,
          master: item.master.name,
          duration: item.duration,
          description: item.description,
        }))
      : fallbackPortfolio;

  return (
    <HomeClient
      services={services}
      masters={masters}
      portfolioItems={portfolioItems}
    />
  );
}