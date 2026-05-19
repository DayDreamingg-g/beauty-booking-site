import { prisma } from "@/lib/prisma";
import BookingStatusActions from "./BookingStatusActions";

export const dynamic = "force-dynamic";

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

type AdminPageProps = {
  searchParams?: Promise<{
    status?: string;
    q?: string;
  }>;
};

export default async function AdminPage({ searchParams }: AdminPageProps) {
  const params = await searchParams;

  const statusFilter = params?.status || "all";
  const searchQuery = (params?.q || "").trim().toLowerCase();

  const bookings = await prisma.bookingRequest.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

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

  const filters = [
    {
      value: "all",
      label: "Усі",
    },
    {
      value: "new",
      label: "Нові",
    },
    {
      value: "confirmed",
      label: "Підтверджені",
    },
    {
      value: "cancelled",
      label: "Скасовані",
    },
  ];

  return (
    <main className="min-h-screen bg-black px-4 py-8 text-white sm:px-5 md:px-6 md:py-10">
      <div className="mx-auto w-full max-w-7xl">
        <div className="mb-8 flex flex-col gap-6 md:mb-10 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-3 text-xs uppercase tracking-[0.28em] text-gray-500">
              Admin Panel
            </p>

            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Заявки
            </h1>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-gray-400 md:text-base">
              Тут відображаються заявки, які користувачі надсилають через форму
              запису на сайті.
            </p>
          </div>

          <a
            href="/"
            className="inline-flex w-full items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-medium text-white transition hover:border-white/20 hover:bg-white/[0.10] sm:w-auto"
          >
            На сайт
          </a>
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
                }`}
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

          <form action="/admin" className="flex w-full gap-2 md:max-w-md">
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
                      <h2 className="text-2xl font-semibold tracking-tight">
                        {booking.name}
                      </h2>

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
      </div>
    </main>
  );
}