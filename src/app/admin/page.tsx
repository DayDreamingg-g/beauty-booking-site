import type { ReactNode } from "react";
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import BookingStatusActions from "./BookingStatusActions";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

type AdminPageProps = {
  searchParams?: Promise<{
    status?: string;
    q?: string;
    reviewMaster?: string;
  }>;
};

function getString(formData: FormData, key: string) {
  return String(formData.get(key) || "").trim();
}

function getSelectedIds(formData: FormData) {
  return formData
    .getAll("ids")
    .map((id) => String(id).trim())
    .filter(Boolean);
}

function formatPrice(value: string) {
  const cleaned = value.replace(/[^\d.,]/g, "").replace(",", ".");

  if (!cleaned) {
    return "";
  }

  return `${cleaned}₴`;
}

function getPriceValue(value: string) {
  return value.replace(/[^\d.,]/g, "").replace(",", ".");
}

function normalizeMinutes(value: string) {
  const cleaned = value.replace(/\D/g, "");

  if (!cleaned) {
    return "";
  }

  const numberValue = Number(cleaned);

  if (Number.isNaN(numberValue)) {
    return "";
  }

  if (numberValue < 0) {
    return "0";
  }

  if (numberValue > 59) {
    return "59";
  }

  return String(numberValue);
}

function formatDuration(hours: string, minutes: string) {
  const cleanHours = hours.replace(/\D/g, "");
  const cleanMinutes = normalizeMinutes(minutes);

  const parts: string[] = [];

  if (cleanHours) {
    parts.push(`${cleanHours} год`);
  }

  if (cleanMinutes) {
    parts.push(`${cleanMinutes} хв`);
  }

  return parts.join(" ");
}

function getDurationHours(value: string) {
  const hourMatch = value.match(/(\d+)\s*(год|г|h|hour)/i);

  if (hourMatch) {
    return hourMatch[1];
  }

  if (value.includes(".")) {
    const [hours] = value.split(".");
    return hours.replace(/\D/g, "");
  }

  return "";
}

function getDurationMinutes(value: string) {
  const minuteMatch = value.match(/(\d+)\s*(хв|мин|m|min)/i);

  if (minuteMatch) {
    return normalizeMinutes(minuteMatch[1]);
  }

  if (value.includes(".")) {
    const [, decimalPart] = value.split(".");
    const decimal = Number(`0.${decimalPart.replace(/\D/g, "")}`);

    if (!Number.isNaN(decimal)) {
      return normalizeMinutes(String(Math.round(decimal * 60)));
    }
  }

  return "";
}

async function saveUploadedFile(
  formData: FormData,
  fieldName: string,
  fallbackValue: string
) {
  const file = formData.get(fieldName);

  if (!(file instanceof File) || file.size === 0) {
    return fallbackValue;
  }

  const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/jpg"];

  if (!allowedTypes.includes(file.type)) {
    return fallbackValue;
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const uploadDir = path.join(process.cwd(), "public", "uploads");
  await mkdir(uploadDir, { recursive: true });

  const extension = file.name.split(".").pop()?.toLowerCase() || "jpg";
  const fileName = `${Date.now()}-${Math.random()
    .toString(36)
    .slice(2)}.${extension}`;

  const filePath = path.join(uploadDir, fileName);

  await writeFile(filePath, buffer);

  return `/uploads/${fileName}`;
}

function formatCreatedAt(date: Date) {
  return new Intl.DateTimeFormat("uk-UA", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

function formatBookingDate(date: string) {
  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return date;
  }

  return new Intl.DateTimeFormat("uk-UA", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(parsedDate);
}

function getStatusLabel(status: string) {
  if (status === "confirmed") return "Підтверджена";
  if (status === "cancelled") return "Скасована";
  return "Нова";
}

function getStatusClass(status: string) {
  if (status === "confirmed") {
    return "border-emerald-400/20 bg-emerald-400/10 text-emerald-200";
  }

  if (status === "cancelled") {
    return "border-red-400/20 bg-red-400/10 text-red-200";
  }

  return "border-white/10 bg-white/[0.06] text-gray-300";
}

function getIncludesList(includes: string) {
  return includes
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
}

function SelectArrow() {
  return (
    <div className="pointer-events-none absolute right-4 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center">
      <span className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_6px_rgba(255,255,255,0.95),0_0_14px_rgba(255,255,255,0.45)]" />

      <span className="absolute left-1/2 top-1/2 flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 origin-center items-center justify-center transition-transform duration-300 group-focus-within:rotate-180">
        <span className="translate-y-[5px] text-[10px] leading-none text-white/80">
          ⌄
        </span>
      </span>
    </div>
  );
}

function AdminSelect({
  name,
  defaultValue,
  placeholder,
  children,
}: {
  name: string;
  defaultValue?: string;
  placeholder?: string;
  children: ReactNode;
}) {
  return (
    <div className="group relative">
      <select
        name={name}
        defaultValue={defaultValue}
        className="w-full appearance-none rounded-2xl border border-white/10 bg-black/40 px-4 py-3 pr-14 text-sm text-white outline-none transition hover:border-white/20 hover:bg-white/[0.03] focus:border-white/30 focus:bg-white/[0.06]"
      >
        {placeholder ? (
          <option value="" className="bg-[#0d0d0d] text-gray-400">
            {placeholder}
          </option>
        ) : null}

        {children}
      </select>

      <SelectArrow />
    </div>
  );
}

function TextInput({
  name,
  placeholder,
  defaultValue,
  type = "text",
}: {
  name: string;
  placeholder?: string;
  defaultValue?: string;
  type?: string;
}) {
  return (
    <input
      name={name}
      type={type}
      defaultValue={defaultValue}
      placeholder={placeholder}
      className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-500 focus:border-white/30 focus:bg-black/60"
    />
  );
}

function PriceInput({ defaultValue }: { defaultValue?: string }) {
  return (
    <div className="relative">
      <input
        name="price"
        type="number"
        min="0"
        step="1"
        defaultValue={defaultValue}
        placeholder="700"
        className="w-full appearance-none rounded-2xl border border-white/10 bg-black/40 px-4 py-3 pr-12 text-sm text-white outline-none transition placeholder:text-gray-500 focus:border-white/30 focus:bg-black/60 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
      />

      <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-500">
        ₴
      </span>
    </div>
  );
}

function DurationInputs({
  defaultHours,
  defaultMinutes,
}: {
  defaultHours?: string;
  defaultMinutes?: string;
}) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="relative">
        <input
          name="durationHours"
          type="number"
          min="0"
          step="1"
          defaultValue={defaultHours}
          placeholder="1"
          className="w-full appearance-none rounded-2xl border border-white/10 bg-black/40 px-4 py-3 pr-16 text-sm text-white outline-none transition placeholder:text-gray-500 focus:border-white/30 focus:bg-black/60 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        />

        <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs text-gray-500">
          год
        </span>
      </div>

      <div className="relative">
        <input
          name="durationMinutes"
          type="number"
          min="0"
          max="59"
          step="1"
          defaultValue={defaultMinutes}
          placeholder="0"
          className="w-full appearance-none rounded-2xl border border-white/10 bg-black/40 px-4 py-3 pr-16 text-sm text-white outline-none transition placeholder:text-gray-500 focus:border-white/30 focus:bg-black/60 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        />

        <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs text-gray-500">
          хв
        </span>
      </div>
    </div>
  );
}

function TextArea({
  name,
  placeholder,
  defaultValue,
  minHeight = "min-h-28",
}: {
  name: string;
  placeholder?: string;
  defaultValue?: string;
  minHeight?: string;
}) {
  return (
    <textarea
      name={name}
      defaultValue={defaultValue}
      placeholder={placeholder}
      className={`${minHeight} resize-none rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-500 focus:border-white/30 focus:bg-black/60`}
    />
  );
}

function FileInput() {
  return (
    <input
      name="imageFile"
      type="file"
      accept="image/png,image/jpeg,image/jpg,image/webp"
      className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-gray-300 file:mr-4 file:rounded-full file:border-0 file:bg-white file:px-4 file:py-2 file:text-sm file:font-semibold file:text-black"
    />
  );
}

function BulkCheckbox({
  form,
  value,
}: {
  form: string;
  value: string;
}) {
  return (
    <div className="mb-4 flex items-center gap-3">
      <input
        form={form}
        type="checkbox"
        name="ids"
        value={value}
        className="h-4 w-4 rounded border-white/20 bg-black accent-white"
      />

      <span className="text-xs uppercase tracking-[0.18em] text-gray-500">
        Вибрати
      </span>
    </div>
  );
}

function BulkDeleteBar({
  id,
  action,
  text,
  buttonText,
}: {
  id: string;
  action: (formData: FormData) => Promise<void>;
  text: string;
  buttonText: string;
}) {
  return (
    <form
      id={id}
      action={action}
      className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-4"
    >
      <p className="text-sm text-gray-400">{text}</p>

      <button
        type="submit"
        className="rounded-full border border-red-400/20 bg-red-400/10 px-4 py-2 text-xs text-red-200 transition hover:bg-red-400/15"
      >
        {buttonText}
      </button>
    </form>
  );
}

async function createService(formData: FormData) {
  "use server";

  const title = getString(formData, "title");
  const priceValue = getString(formData, "price");
  const durationHours = getString(formData, "durationHours");
  const durationMinutes = getString(formData, "durationMinutes");
  const description = getString(formData, "description");
  const includes = getString(formData, "includes");

  const price = formatPrice(priceValue);
  const duration = formatDuration(durationHours, durationMinutes);

  if (!title || !price || !duration || !description || !includes) {
    return;
  }

  await prisma.service.create({
    data: {
      title,
      price,
      duration,
      description,
      includes,
      image: "/images/service-default.jpg",
      isActive: true,
    },
  });

  revalidatePath("/admin");
  revalidatePath("/");
}

async function updateService(formData: FormData) {
  "use server";

  const id = getString(formData, "id");
  const title = getString(formData, "title");
  const priceValue = getString(formData, "price");
  const durationHours = getString(formData, "durationHours");
  const durationMinutes = getString(formData, "durationMinutes");
  const description = getString(formData, "description");
  const includes = getString(formData, "includes");

  const price = formatPrice(priceValue);
  const duration = formatDuration(durationHours, durationMinutes);

  if (!id || !title || !price || !duration || !description || !includes) {
    return;
  }

  await prisma.service.update({
    where: {
      id,
    },
    data: {
      title,
      price,
      duration,
      description,
      includes,
    },
  });

  revalidatePath("/admin");
  revalidatePath("/");
}

async function toggleService(formData: FormData) {
  "use server";

  const id = getString(formData, "id");
  const isActive = getString(formData, "isActive") === "true";

  if (!id) return;

  await prisma.service.update({
    where: {
      id,
    },
    data: {
      isActive: !isActive,
    },
  });

  revalidatePath("/admin");
  revalidatePath("/");
}

async function deleteService(formData: FormData) {
  "use server";

  const id = getString(formData, "id");

  if (!id) return;

  await prisma.service.delete({
    where: {
      id,
    },
  });

  revalidatePath("/admin");
  revalidatePath("/");
}

async function deleteSelectedServices(formData: FormData) {
  "use server";

  const ids = getSelectedIds(formData);

  if (ids.length === 0) return;

  await prisma.service.deleteMany({
    where: {
      id: {
        in: ids,
      },
    },
  });

  revalidatePath("/admin");
  revalidatePath("/");
}

async function createMaster(formData: FormData) {
  "use server";

  const name = getString(formData, "name");
  const role = getString(formData, "role");
  const description = getString(formData, "description");

  if (!name || !role || !description) {
    return;
  }

  const image = await saveUploadedFile(
    formData,
    "imageFile",
    "/images/master1.jpg"
  );

  await prisma.master.create({
    data: {
      name,
      role,
      image,
      description,
      isActive: true,
    },
  });

  revalidatePath("/admin");
  revalidatePath("/");
}

async function updateMaster(formData: FormData) {
  "use server";

  const id = getString(formData, "id");
  const name = getString(formData, "name");
  const role = getString(formData, "role");
  const currentImage = getString(formData, "currentImage");
  const description = getString(formData, "description");

  if (!id || !name || !role || !description) {
    return;
  }

  const image = await saveUploadedFile(
    formData,
    "imageFile",
    currentImage || "/images/master1.jpg"
  );

  await prisma.master.update({
    where: {
      id,
    },
    data: {
      name,
      role,
      image,
      description,
    },
  });

  revalidatePath("/admin");
  revalidatePath("/");
}

async function toggleMaster(formData: FormData) {
  "use server";

  const id = getString(formData, "id");
  const isActive = getString(formData, "isActive") === "true";

  if (!id) return;

  await prisma.master.update({
    where: {
      id,
    },
    data: {
      isActive: !isActive,
    },
  });

  revalidatePath("/admin");
  revalidatePath("/");
}

async function deleteMaster(formData: FormData) {
  "use server";

  const id = getString(formData, "id");

  if (!id) return;

  await prisma.master.delete({
    where: {
      id,
    },
  });

  revalidatePath("/admin");
  revalidatePath("/");
}

async function deleteSelectedMasters(formData: FormData) {
  "use server";

  const ids = getSelectedIds(formData);

  if (ids.length === 0) return;

  await prisma.master.deleteMany({
    where: {
      id: {
        in: ids,
      },
    },
  });

  revalidatePath("/admin");
  revalidatePath("/");
}

async function createPortfolioItem(formData: FormData) {
  "use server";

  const serviceId = getString(formData, "serviceId");
  const masterId = getString(formData, "masterId");
  const durationHours = getString(formData, "durationHours");
  const durationMinutes = getString(formData, "durationMinutes");
  const description = getString(formData, "description");

  const duration = formatDuration(durationHours, durationMinutes);

  if (!serviceId || !masterId || !duration || !description) {
    return;
  }

  const image = await saveUploadedFile(
    formData,
    "imageFile",
    "/images/work1.jpg"
  );

  await prisma.portfolioItem.create({
    data: {
      image,
      serviceId,
      masterId,
      duration,
      description,
      isActive: true,
    },
  });

  revalidatePath("/admin");
  revalidatePath("/");
}

async function updatePortfolioItem(formData: FormData) {
  "use server";

  const id = getString(formData, "id");
  const currentImage = getString(formData, "currentImage");
  const serviceId = getString(formData, "serviceId");
  const masterId = getString(formData, "masterId");
  const durationHours = getString(formData, "durationHours");
  const durationMinutes = getString(formData, "durationMinutes");
  const description = getString(formData, "description");

  const duration = formatDuration(durationHours, durationMinutes);

  if (!id || !serviceId || !masterId || !duration || !description) {
    return;
  }

  const image = await saveUploadedFile(
    formData,
    "imageFile",
    currentImage || "/images/work1.jpg"
  );

  await prisma.portfolioItem.update({
    where: {
      id,
    },
    data: {
      image,
      serviceId,
      masterId,
      duration,
      description,
    },
  });

  revalidatePath("/admin");
  revalidatePath("/");
}

async function togglePortfolioItem(formData: FormData) {
  "use server";

  const id = getString(formData, "id");
  const isActive = getString(formData, "isActive") === "true";

  if (!id) return;

  await prisma.portfolioItem.update({
    where: {
      id,
    },
    data: {
      isActive: !isActive,
    },
  });

  revalidatePath("/admin");
  revalidatePath("/");
}

async function deletePortfolioItem(formData: FormData) {
  "use server";

  const id = getString(formData, "id");

  if (!id) return;

  await prisma.portfolioItem.delete({
    where: {
      id,
    },
  });

  revalidatePath("/admin");
  revalidatePath("/");
}

async function deleteSelectedPortfolioItems(formData: FormData) {
  "use server";

  const ids = getSelectedIds(formData);

  if (ids.length === 0) return;

  await prisma.portfolioItem.deleteMany({
    where: {
      id: {
        in: ids,
      },
    },
  });

  revalidatePath("/admin");
  revalidatePath("/");
}

async function deleteReview(formData: FormData) {
  "use server";

  const id = getString(formData, "id");

  if (!id) return;

  await prisma.review.delete({
    where: {
      id,
    },
  });

  revalidatePath("/admin");
  revalidatePath("/");
}

async function deleteSelectedReviews(formData: FormData) {
  "use server";

  const ids = getSelectedIds(formData);

  if (ids.length === 0) return;

  await prisma.review.deleteMany({
    where: {
      id: {
        in: ids,
      },
    },
  });

  revalidatePath("/admin");
  revalidatePath("/");
}

export default async function AdminPage({ searchParams }: AdminPageProps) {
  const params = await searchParams;

  const statusFilter = params?.status || "all";
  const searchQuery = (params?.q || "").trim().toLowerCase();
  const reviewMasterFilter = params?.reviewMaster || "all";

  const [bookings, services, masters, portfolioItems, reviews] =
    await Promise.all([
      prisma.bookingRequest.findMany({
        orderBy: {
          createdAt: "desc",
        },
      }),

      prisma.service.findMany({
        orderBy: {
          createdAt: "desc",
        },
      }),

      prisma.master.findMany({
        orderBy: {
          createdAt: "desc",
        },
      }),

      prisma.portfolioItem.findMany({
        orderBy: {
          createdAt: "desc",
        },
        include: {
          service: true,
          master: true,
        },
      }),

      prisma.review.findMany({
        orderBy: {
          createdAt: "desc",
        },
        include: {
          master: true,
        },
      }),
    ]);

  const filteredBookings = bookings.filter((booking) => {
    const matchesStatus =
      statusFilter === "all" || booking.status === statusFilter;

    const matchesSearch =
      !searchQuery ||
      booking.name.toLowerCase().includes(searchQuery) ||
      booking.phone.toLowerCase().includes(searchQuery) ||
      booking.service.toLowerCase().includes(searchQuery) ||
      booking.master.toLowerCase().includes(searchQuery);

    return matchesStatus && matchesSearch;
  });

  const newCount = bookings.filter((booking) => booking.status === "new").length;

  const confirmedCount = bookings.filter(
    (booking) => booking.status === "confirmed"
  ).length;

  const cancelledCount = bookings.filter(
    (booking) => booking.status === "cancelled"
  ).length;

  const filteredReviews = reviews.filter((review) => {
    if (reviewMasterFilter === "all") {
      return true;
    }

    return review.masterId === reviewMasterFilter;
  });

  const filters = [
    { value: "all", label: "Усі" },
    { value: "new", label: "Нові" },
    { value: "confirmed", label: "Підтверджені" },
    { value: "cancelled", label: "Скасовані" },
  ];

  return (
    <main className="min-h-screen bg-black px-4 py-8 text-white sm:px-5 md:px-6 md:py-10">
      <div className="mx-auto w-full max-w-7xl">
        <div className="mb-6">
          <p className="mb-3 text-xs uppercase tracking-[0.28em] text-gray-500">
            Admin Panel
          </p>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Керування сайтом
          </h1>

          <p className="mt-5 max-w-2xl text-sm leading-7 text-gray-400 md:text-base">
            Заявки, послуги, прайс, майстри, портфоліо, відгуки та зображення в
            одному місці.
          </p>
        </div>

        <div className="sticky top-0 z-40 mb-8 overflow-x-auto border-y border-white/10 bg-black/85 py-3 backdrop-blur-xl">
          <div className="flex min-w-max gap-2">
            <a
              href="/"
              className="rounded-full border border-white/20 bg-white px-4 py-2 text-sm font-semibold text-black transition hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(255,255,255,0.16)]"
            >
              ← На сайт
            </a>

            <a
              href="#quick-add"
              className="rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-sm text-gray-300 transition hover:border-white/20 hover:bg-white/[0.10] hover:text-white"
            >
              + Додати
            </a>

            <a
              href="#bookings"
              className="rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-sm text-gray-300 transition hover:border-white/20 hover:bg-white/[0.10] hover:text-white"
            >
              Заявки
            </a>

            <a
              href="#services-list"
              className="rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-sm text-gray-300 transition hover:border-white/20 hover:bg-white/[0.10] hover:text-white"
            >
              Послуги
            </a>

            <a
              href="#masters-list"
              className="rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-sm text-gray-300 transition hover:border-white/20 hover:bg-white/[0.10] hover:text-white"
            >
              Майстри
            </a>

            <a
              href="#portfolio-list"
              className="rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-sm text-gray-300 transition hover:border-white/20 hover:bg-white/[0.10] hover:text-white"
            >
              Портфоліо
            </a>

            <a
              href="#reviews-list"
              className="rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-sm text-gray-300 transition hover:border-white/20 hover:bg-white/[0.10] hover:text-white"
            >
              Відгуки
            </a>
          </div>
        </div>

        <section id="quick-add" className="mb-12 scroll-mt-24">
          <div className="mb-5">
            <p className="mb-2 text-xs uppercase tracking-[0.24em] text-gray-500">
              Quick Add
            </p>

            <h2 className="text-3xl font-semibold">Швидке додавання</h2>

            <p className="mt-3 max-w-2xl text-sm leading-7 text-gray-500">
              Тут можна одразу додати послугу, майстра або роботу без прокрутки
              в кінець адмінки.
            </p>
          </div>

          <div className="grid gap-5 xl:grid-cols-3">
            <form
              action={createService}
              className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 md:p-6"
            >
              <div className="mb-5 flex items-center justify-between gap-4">
                <div>
                  <p className="mb-2 text-xs uppercase tracking-[0.22em] text-gray-500">
                    Services
                  </p>

                  <h3 className="text-xl font-semibold">Нова послуга</h3>
                </div>

                <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-xs text-gray-400">
                  + service
                </span>
              </div>

              <div className="grid gap-4">
                <TextInput name="title" placeholder="Назва послуги" />

                <div className="grid gap-4 sm:grid-cols-[1fr_1.2fr]">
                  <PriceInput />
                  <DurationInputs />
                </div>

                <TextArea name="description" placeholder="Опис послуги" />

                <TextArea
                  name="includes"
                  placeholder={
                    "Що входить\nОбробка кутикули\nФорма нігтів\nПокриття"
                  }
                  minHeight="min-h-32"
                />

                <button
                  type="submit"
                  className="rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-black transition hover:scale-[1.02]"
                >
                  Додати послугу
                </button>
              </div>
            </form>

            <form
              action={createMaster}
              className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 md:p-6"
            >
              <div className="mb-5 flex items-center justify-between gap-4">
                <div>
                  <p className="mb-2 text-xs uppercase tracking-[0.22em] text-gray-500">
                    Masters
                  </p>

                  <h3 className="text-xl font-semibold">Новий майстер</h3>
                </div>

                <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-xs text-gray-400">
                  + master
                </span>
              </div>

              <div className="grid gap-4">
                <TextInput name="name" placeholder="Ім’я" />
                <TextInput name="role" placeholder="Роль / спеціалізація" />
                <FileInput />
                <TextArea name="description" placeholder="Опис майстра" />

                <button
                  type="submit"
                  className="rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-black transition hover:scale-[1.02]"
                >
                  Додати майстра
                </button>
              </div>
            </form>

            <form
              action={createPortfolioItem}
              className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 md:p-6"
            >
              <div className="mb-5 flex items-center justify-between gap-4">
                <div>
                  <p className="mb-2 text-xs uppercase tracking-[0.22em] text-gray-500">
                    Portfolio
                  </p>

                  <h3 className="text-xl font-semibold">Нова робота</h3>
                </div>

                <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-xs text-gray-400">
                  + work
                </span>
              </div>

              <div className="grid gap-4">
                <FileInput />

                <AdminSelect name="serviceId" placeholder="Оберіть послугу">
                  {services.map((service) => (
                    <option
                      key={service.id}
                      value={service.id}
                      className="bg-[#0d0d0d] text-white"
                    >
                      {service.title}
                    </option>
                  ))}
                </AdminSelect>

                <AdminSelect name="masterId" placeholder="Оберіть майстра">
                  {masters.map((master) => (
                    <option
                      key={master.id}
                      value={master.id}
                      className="bg-[#0d0d0d] text-white"
                    >
                      {master.name}
                    </option>
                  ))}
                </AdminSelect>

                <DurationInputs />

                <TextArea name="description" placeholder="Опис роботи" />

                <button
                  type="submit"
                  className="rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-black transition hover:scale-[1.02]"
                >
                  Додати роботу
                </button>
              </div>
            </form>
          </div>
        </section>

        <section id="bookings" className="mb-12 scroll-mt-24">
          <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-2 text-xs uppercase tracking-[0.24em] text-gray-500">
                Bookings
              </p>

              <h2 className="text-3xl font-semibold">Заявки</h2>
            </div>
          </div>

          <div className="mb-8 grid grid-cols-2 gap-3 md:grid-cols-4">
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4">
              <p className="text-xs uppercase tracking-[0.18em] text-gray-500">
                Усього
              </p>

              <p className="mt-2 text-2xl font-semibold">{bookings.length}</p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4">
              <p className="text-xs uppercase tracking-[0.18em] text-gray-500">
                Нові
              </p>

              <p className="mt-2 text-2xl font-semibold">{newCount}</p>
            </div>

            <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-5 py-4">
              <p className="text-xs uppercase tracking-[0.18em] text-emerald-200/70">
                ОК
              </p>

              <p className="mt-2 text-2xl font-semibold text-emerald-100">
                {confirmedCount}
              </p>
            </div>

            <div className="rounded-2xl border border-red-400/20 bg-red-400/10 px-5 py-4">
              <p className="text-xs uppercase tracking-[0.18em] text-red-200/70">
                Скасовано
              </p>

              <p className="mt-2 text-2xl font-semibold text-red-100">
                {cancelledCount}
              </p>
            </div>
          </div>

          <div className="mb-8 flex flex-col gap-4 rounded-[2rem] border border-white/10 bg-white/[0.04] p-4 md:flex-row md:items-center md:justify-between md:p-5">
            <div className="flex flex-wrap gap-2">
              {filters.map((filter) => (
                <a
                  key={filter.value}
                  href={`/admin?status=${filter.value}${
                    searchQuery ? `&q=${encodeURIComponent(searchQuery)}` : ""
                  }#bookings`}
                  className={`rounded-full border px-4 py-2 text-sm transition ${
                    statusFilter === filter.value
                      ? "border-white/30 bg-white text-black"
                      : "border-white/10 bg-white/[0.04] text-gray-300 hover:border-white/20 hover:bg-white/[0.08] hover:text-white"
                  }`}
                >
                  {filter.label}
                </a>
              ))}
            </div>

            <form
              action="/admin#bookings"
              className="flex w-full gap-2 md:max-w-md"
            >
              <input type="hidden" name="status" value={statusFilter} />

              <input
                name="q"
                defaultValue={searchQuery}
                placeholder="Пошук за ім’ям, телефоном, послугою"
                className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-500 focus:border-white/30 focus:bg-black/60"
              />

              <button
                type="submit"
                className="rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-black transition hover:scale-[1.02]"
              >
                Знайти
              </button>
            </form>
          </div>

          {filteredBookings.length === 0 ? (
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-10 text-center">
              <p className="text-lg font-semibold">Заявок не знайдено</p>

              <p className="mt-3 text-sm text-gray-500">
                Спробуйте змінити фільтр або очистити пошук.
              </p>
            </div>
          ) : (
            <div className="grid gap-5">
              {filteredBookings.map((booking) => (
                <article
                  key={booking.id}
                  className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] transition hover:border-white/20 hover:bg-white/[0.055]"
                >
                  <div className="flex flex-col gap-5 border-b border-white/10 p-5 md:flex-row md:items-start md:justify-between md:p-6">
                    <div>
                      <div className="mb-3 flex flex-wrap items-center gap-3">
                        <h3 className="text-2xl font-semibold tracking-tight">
                          {booking.name}
                        </h3>

                        <span
                          className={`rounded-full border px-3 py-1 text-xs uppercase tracking-[0.16em] ${getStatusClass(
                            booking.status
                          )}`}
                        >
                          {getStatusLabel(booking.status)}
                        </span>
                      </div>

                      <p className="text-sm text-gray-500">
                        ID: {booking.id.slice(0, 8)}
                      </p>
                    </div>

                    <div className="text-left md:text-right">
                      <p className="text-xs uppercase tracking-[0.18em] text-gray-500">
                        Дата заявки
                      </p>

                      <p className="mt-2 text-sm text-gray-300">
                        {formatCreatedAt(booking.createdAt)}
                      </p>
                    </div>
                  </div>

                  <div className="grid gap-4 p-5 sm:grid-cols-2 lg:grid-cols-5 md:p-6">
                    <div className="rounded-[1.5rem] border border-white/10 bg-black/25 p-4">
                      <p className="mb-2 text-xs uppercase tracking-[0.18em] text-gray-500">
                        Телефон
                      </p>

                      <a
                        href={`tel:${booking.phone}`}
                        className="text-sm font-medium text-white transition hover:text-gray-300"
                      >
                        {booking.phone}
                      </a>
                    </div>

                    <div className="rounded-[1.5rem] border border-white/10 bg-black/25 p-4">
                      <p className="mb-2 text-xs uppercase tracking-[0.18em] text-gray-500">
                        Послуга
                      </p>

                      <p className="text-sm font-medium text-white">
                        {booking.service}
                      </p>
                    </div>

                    <div className="rounded-[1.5rem] border border-white/10 bg-black/25 p-4">
                      <p className="mb-2 text-xs uppercase tracking-[0.18em] text-gray-500">
                        Майстер
                      </p>

                      <p className="text-sm font-medium text-white">
                        {booking.master}
                      </p>
                    </div>

                    <div className="rounded-[1.5rem] border border-white/10 bg-black/25 p-4">
                      <p className="mb-2 text-xs uppercase tracking-[0.18em] text-gray-500">
                        Дата запису
                      </p>

                      <p className="text-sm font-medium text-white">
                        {formatBookingDate(booking.date)}
                      </p>
                    </div>

                    <div className="rounded-[1.5rem] border border-white/10 bg-black/25 p-4">
                      <p className="mb-2 text-xs uppercase tracking-[0.18em] text-gray-500">
                        Час
                      </p>

                      <p className="text-sm font-medium text-white">
                        {booking.time || "09:00"}
                      </p>
                    </div>
                  </div>

                  <div className="grid gap-5 border-t border-white/10 p-5 lg:grid-cols-[1fr_auto] lg:items-end md:p-6">
                    <div>
                      <p className="mb-3 text-xs uppercase tracking-[0.18em] text-gray-500">
                        Коментар
                      </p>

                      <div className="rounded-[1.5rem] border border-white/10 bg-black/25 p-4">
                        <p className="min-h-6 text-sm leading-7 text-gray-300">
                          {booking.comment || "Коментар відсутній"}
                        </p>
                      </div>
                    </div>

                    <div>
                      <p className="mb-3 text-xs uppercase tracking-[0.18em] text-gray-500">
                        Дії
                      </p>

                      <BookingStatusActions
                        bookingId={booking.id}
                        currentStatus={booking.status}
                      />
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        <section id="services-list" className="mb-12 scroll-mt-24">
          <div className="mb-5">
            <p className="mb-2 text-xs uppercase tracking-[0.24em] text-gray-500">
              Services
            </p>

            <h2 className="text-3xl font-semibold">Редагування послуг</h2>
          </div>

          <BulkDeleteBar
            id="bulk-delete-services"
            action={deleteSelectedServices}
            text="Виберіть послуги для масового видалення"
            buttonText="Видалити вибрані послуги"
          />

          <div className="grid gap-4">
            {services.length === 0 ? (
              <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 text-center text-sm text-gray-400">
                Послуг поки немає.
              </div>
            ) : (
              services.map((service) => (
                <article
                  key={service.id}
                  className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 md:p-6"
                >
                  <BulkCheckbox
                    form="bulk-delete-services"
                    value={service.id}
                  />

                  <form action={updateService} className="grid gap-4">
                    <input type="hidden" name="id" value={service.id} />

                    <input
                      type="hidden"
                      name="isActive"
                      value={String(service.isActive)}
                    />

                    <div className="grid gap-4 lg:grid-cols-[1fr_220px_260px]">
                      <TextInput name="title" defaultValue={service.title} />

                      <PriceInput defaultValue={getPriceValue(service.price)} />

                      <DurationInputs
                        defaultHours={getDurationHours(service.duration)}
                        defaultMinutes={getDurationMinutes(service.duration)}
                      />
                    </div>

                    <TextArea
                      name="description"
                      defaultValue={service.description}
                      minHeight="min-h-24"
                    />

                    <TextArea
                      name="includes"
                      defaultValue={service.includes}
                      minHeight="min-h-24"
                    />

                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex flex-wrap gap-2">
                        {getIncludesList(service.includes).map((item) => (
                          <span
                            key={item}
                            className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-gray-300"
                          >
                            {item}
                          </span>
                        ))}
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <button
                          type="submit"
                          className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs text-white transition hover:bg-white/[0.08]"
                        >
                          Зберегти
                        </button>

                        <button
                          type="submit"
                          formAction={toggleService}
                          className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs text-white transition hover:bg-white/[0.08]"
                        >
                          {service.isActive ? "Сховати" : "Показати"}
                        </button>

                        <button
                          type="submit"
                          formAction={deleteService}
                          className="rounded-full border border-red-400/20 bg-red-400/10 px-4 py-2 text-xs text-red-200 transition hover:bg-red-400/15"
                        >
                          Видалити
                        </button>
                      </div>
                    </div>
                  </form>
                </article>
              ))
            )}
          </div>
        </section>

        <section id="masters-list" className="mb-12 scroll-mt-24">
          <div className="mb-5">
            <p className="mb-2 text-xs uppercase tracking-[0.24em] text-gray-500">
              Masters
            </p>

            <h2 className="text-3xl font-semibold">Редагування майстрів</h2>
          </div>

          <BulkDeleteBar
            id="bulk-delete-masters"
            action={deleteSelectedMasters}
            text="Виберіть майстрів для масового видалення"
            buttonText="Видалити вибраних майстрів"
          />

          <div className="grid gap-4">
            {masters.length === 0 ? (
              <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 text-center text-sm text-gray-400">
                Майстрів поки немає.
              </div>
            ) : (
              masters.map((master) => (
                <article
                  key={master.id}
                  className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 md:p-6"
                >
                  <BulkCheckbox form="bulk-delete-masters" value={master.id} />

                  <form action={updateMaster} className="grid gap-4">
                    <input type="hidden" name="id" value={master.id} />

                    <input
                      type="hidden"
                      name="isActive"
                      value={String(master.isActive)}
                    />

                    <input
                      type="hidden"
                      name="currentImage"
                      value={master.image}
                    />

                    <div className="flex flex-col gap-4 sm:flex-row">
                      <div className="h-24 w-24 shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-black/40">
                        <img
                          src={master.image}
                          alt={master.name}
                          className="h-full w-full object-cover"
                        />
                      </div>

                      <div className="grid flex-1 gap-4">
                        <div className="grid gap-4 lg:grid-cols-[1fr_1fr]">
                          <TextInput name="name" defaultValue={master.name} />
                          <TextInput name="role" defaultValue={master.role} />
                        </div>

                        <FileInput />
                      </div>
                    </div>

                    <TextArea
                      name="description"
                      defaultValue={master.description}
                      minHeight="min-h-24"
                    />

                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <span
                        className={`w-fit rounded-full border px-3 py-1 text-xs ${
                          master.isActive
                            ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-200"
                            : "border-red-400/20 bg-red-400/10 text-red-200"
                        }`}
                      >
                        {master.isActive ? "Активний" : "Прихований"}
                      </span>

                      <div className="flex flex-wrap gap-2">
                        <button
                          type="submit"
                          className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs text-white transition hover:bg-white/[0.08]"
                        >
                          Зберегти
                        </button>

                        <button
                          type="submit"
                          formAction={toggleMaster}
                          className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs text-white transition hover:bg-white/[0.08]"
                        >
                          {master.isActive ? "Сховати" : "Показати"}
                        </button>

                        <button
                          type="submit"
                          formAction={deleteMaster}
                          className="rounded-full border border-red-400/20 bg-red-400/10 px-4 py-2 text-xs text-red-200 transition hover:bg-red-400/15"
                        >
                          Видалити
                        </button>
                      </div>
                    </div>
                  </form>
                </article>
              ))
            )}
          </div>
        </section>

        <section id="portfolio-list" className="mb-12 scroll-mt-24">
          <div className="mb-5">
            <p className="mb-2 text-xs uppercase tracking-[0.24em] text-gray-500">
              Portfolio
            </p>

            <h2 className="text-3xl font-semibold">Редагування портфоліо</h2>
          </div>

          <BulkDeleteBar
            id="bulk-delete-portfolio"
            action={deleteSelectedPortfolioItems}
            text="Виберіть роботи для масового видалення"
            buttonText="Видалити вибрані роботи"
          />

          <div className="grid gap-4">
            {portfolioItems.length === 0 ? (
              <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 text-center text-sm text-gray-400">
                Робіт поки немає.
              </div>
            ) : (
              portfolioItems.map((item) => (
                <article
                  key={item.id}
                  className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 md:p-6"
                >
                  <BulkCheckbox
                    form="bulk-delete-portfolio"
                    value={item.id}
                  />

                  <form action={updatePortfolioItem} className="grid gap-4">
                    <input type="hidden" name="id" value={item.id} />

                    <input
                      type="hidden"
                      name="isActive"
                      value={String(item.isActive)}
                    />

                    <input
                      type="hidden"
                      name="currentImage"
                      value={item.image}
                    />

                    <div className="flex flex-col gap-4 sm:flex-row">
                      <div className="h-24 w-24 shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-black/40">
                        <img
                          src={item.image}
                          alt={item.service.title}
                          className="h-full w-full object-cover"
                        />
                      </div>

                      <div className="grid flex-1 gap-4">
                        <FileInput />

                        <div className="grid gap-4 lg:grid-cols-3">
                          <AdminSelect
                            name="serviceId"
                            defaultValue={item.serviceId}
                          >
                            {services.map((service) => (
                              <option
                                key={service.id}
                                value={service.id}
                                className="bg-[#0d0d0d] text-white"
                              >
                                {service.title}
                              </option>
                            ))}
                          </AdminSelect>

                          <AdminSelect
                            name="masterId"
                            defaultValue={item.masterId}
                          >
                            {masters.map((master) => (
                              <option
                                key={master.id}
                                value={master.id}
                                className="bg-[#0d0d0d] text-white"
                              >
                                {master.name}
                              </option>
                            ))}
                          </AdminSelect>

                          <DurationInputs
                            defaultHours={getDurationHours(item.duration)}
                            defaultMinutes={getDurationMinutes(item.duration)}
                          />
                        </div>
                      </div>
                    </div>

                    <TextArea
                      name="description"
                      defaultValue={item.description}
                      minHeight="min-h-24"
                    />

                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="text-sm text-white">
                          {item.service.title} · {item.master.name}
                        </p>

                        <p className="mt-1 text-xs text-gray-500">
                          {item.isActive ? "Активна" : "Прихована"}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <button
                          type="submit"
                          className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs text-white transition hover:bg-white/[0.08]"
                        >
                          Зберегти
                        </button>

                        <button
                          type="submit"
                          formAction={togglePortfolioItem}
                          className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs text-white transition hover:bg-white/[0.08]"
                        >
                          {item.isActive ? "Сховати" : "Показати"}
                        </button>

                        <button
                          type="submit"
                          formAction={deletePortfolioItem}
                          className="rounded-full border border-red-400/20 bg-red-400/10 px-4 py-2 text-xs text-red-200 transition hover:bg-red-400/15"
                        >
                          Видалити
                        </button>
                      </div>
                    </div>
                  </form>
                </article>
              ))
            )}
          </div>
        </section>

        <section id="reviews-list" className="scroll-mt-24">
          <div className="mb-5">
            <p className="mb-2 text-xs uppercase tracking-[0.24em] text-gray-500">
              Reviews
            </p>

            <h2 className="text-3xl font-semibold">Відгуки</h2>

            <p className="mt-3 max-w-2xl text-sm leading-7 text-gray-500">
              Тут можна переглядати всі відгуки, фільтрувати їх за майстрами та
              видаляти непотрібні.
            </p>
          </div>

          <div className="mb-6 rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 md:p-6">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-gray-500">
              Фільтр за майстром
            </p>

            <div className="flex flex-wrap gap-2">
              <a
                href="/admin?reviewMaster=all#reviews-list"
                className={`rounded-full border px-4 py-2 text-sm transition ${
                  reviewMasterFilter === "all"
                    ? "border-white/30 bg-white text-black"
                    : "border-white/10 bg-white/[0.04] text-gray-300 hover:border-white/20 hover:bg-white/[0.08] hover:text-white"
                }`}
              >
                Усі відгуки
              </a>

              {masters.map((master) => (
                <a
                  key={master.id}
                  href={`/admin?reviewMaster=${master.id}#reviews-list`}
                  className={`rounded-full border px-4 py-2 text-sm transition ${
                    reviewMasterFilter === master.id
                      ? "border-white/30 bg-white text-black"
                      : "border-white/10 bg-white/[0.04] text-gray-300 hover:border-white/20 hover:bg-white/[0.08] hover:text-white"
                  }`}
                >
                  {master.name}
                </a>
              ))}
            </div>
          </div>

          <BulkDeleteBar
            id="bulk-delete-reviews"
            action={deleteSelectedReviews}
            text="Виберіть відгуки для масового видалення"
            buttonText="Видалити вибрані відгуки"
          />

          <div className="grid gap-4">
            {filteredReviews.length === 0 ? (
              <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 text-center text-sm text-gray-400">
                Відгуків по цьому фільтру поки немає.
              </div>
            ) : (
              filteredReviews.map((review) => (
                <article
                  key={review.id}
                  className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 md:p-6"
                >
                  <BulkCheckbox form="bulk-delete-reviews" value={review.id} />

                  <div className="grid gap-5 md:grid-cols-[160px_1fr_auto] md:items-start">
                    {review.image ? (
                      <div className="h-40 overflow-hidden rounded-2xl border border-white/10 bg-black/40">
                        <img
                          src={review.image}
                          alt={review.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="flex h-40 items-center justify-center rounded-2xl border border-white/10 bg-black/40 text-xs text-gray-500">
                        Без фото
                      </div>
                    )}

                    <div>
                      <div className="mb-3 flex flex-wrap items-center gap-3">
                        <h3 className="text-xl font-semibold">{review.name}</h3>

                        <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-gray-300">
                          {review.master.name}
                        </span>

                        <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-gray-300">
                          {review.rating}/5 ★
                        </span>

                        <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-gray-400">
                          {formatCreatedAt(review.createdAt)}
                        </span>
                      </div>

                      <p className="text-sm leading-7 text-gray-300">
                        {review.text}
                      </p>
                    </div>

                    <form action={deleteReview}>
                      <input type="hidden" name="id" value={review.id} />

                      <button
                        type="submit"
                        className="rounded-full border border-red-400/20 bg-red-400/10 px-4 py-2 text-xs text-red-200 transition hover:bg-red-400/15"
                      >
                        Видалити
                      </button>
                    </form>
                  </div>
                </article>
              ))
            )}
          </div>
        </section>
      </div>
    </main>
  );
}