import { prisma } from "@/lib/prisma";
import BookingStatusActions from "./BookingStatusActions";

export const dynamic = "force-dynamic";

function formatCreatedAt(date: Date) {
  return new Intl.DateTimeFormat("ru-RU", {
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

  return new Intl.DateTimeFormat("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(parsedDate);
}

function getStatusLabel(status: string) {
  if (status === "confirmed") return "Подтверждена";
  if (status === "cancelled") return "Отменена";
  return "Новая";
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

export default async function AdminPage() {
  const bookings = await prisma.bookingRequest.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  const newCount = bookings.filter((booking) => booking.status === "new").length;
  const confirmedCount = bookings.filter(
    (booking) => booking.status === "confirmed"
  ).length;
  const cancelledCount = bookings.filter(
    (booking) => booking.status === "cancelled"
  ).length;

  return (
    <main className="min-h-screen bg-black px-5 py-10 text-white md:px-6">
      <div className="mx-auto w-full max-w-7xl">
        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-3 text-xs uppercase tracking-[0.28em] text-gray-500">
              Admin Panel
            </p>

            <h1 className="text-5xl font-bold tracking-tight md:text-6xl">
              Заявки
            </h1>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-gray-400 md:text-base">
              Здесь отображаются заявки, которые пользователи отправляют через
              форму записи на сайте.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4">
              <p className="text-xs uppercase tracking-[0.18em] text-gray-500">
                Всего
              </p>
              <p className="mt-2 text-2xl font-semibold">{bookings.length}</p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4">
              <p className="text-xs uppercase tracking-[0.18em] text-gray-500">
                Новые
              </p>
              <p className="mt-2 text-2xl font-semibold">{newCount}</p>
            </div>

            <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-5 py-4">
              <p className="text-xs uppercase tracking-[0.18em] text-emerald-200/70">
                Ок
              </p>
              <p className="mt-2 text-2xl font-semibold text-emerald-100">
                {confirmedCount}
              </p>
            </div>

            <div className="rounded-2xl border border-red-400/20 bg-red-400/10 px-5 py-4">
              <p className="text-xs uppercase tracking-[0.18em] text-red-200/70">
                Отмена
              </p>
              <p className="mt-2 text-2xl font-semibold text-red-100">
                {cancelledCount}
              </p>
            </div>
          </div>
        </div>

        {bookings.length === 0 ? (
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-10 text-center">
            <p className="text-lg font-semibold">Заявок пока нет</p>
            <p className="mt-3 text-sm text-gray-500">
              Когда пользователь отправит форму, заявка появится здесь.
            </p>
          </div>
        ) : (
          <div className="grid gap-5">
            {bookings.map((booking) => (
              <article
                key={booking.id}
                className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] transition hover:border-white/20 hover:bg-white/[0.055]"
              >
                <div className="flex flex-col gap-5 border-b border-white/10 p-6 md:flex-row md:items-start md:justify-between">
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

                <div className="grid gap-4 p-6 sm:grid-cols-2 lg:grid-cols-4">
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
                      Услуга
                    </p>
                    <p className="text-sm font-medium text-white">
                      {booking.service}
                    </p>
                  </div>

                  <div className="rounded-[1.5rem] border border-white/10 bg-black/25 p-4">
                    <p className="mb-2 text-xs uppercase tracking-[0.18em] text-gray-500">
                      Мастер
                    </p>
                    <p className="text-sm font-medium text-white">
                      {booking.master}
                    </p>
                  </div>

                  <div className="rounded-[1.5rem] border border-white/10 bg-black/25 p-4">
                    <p className="mb-2 text-xs uppercase tracking-[0.18em] text-gray-500">
                      Дата записи
                    </p>
                    <p className="text-sm font-medium text-white">
                      {formatBookingDate(booking.date)}
                    </p>
                  </div>
                </div>

                <div className="grid gap-5 border-t border-white/10 p-6 lg:grid-cols-[1fr_auto] lg:items-end">
                  <div>
                    <p className="mb-3 text-xs uppercase tracking-[0.18em] text-gray-500">
                      Комментарий
                    </p>

                    <div className="rounded-[1.5rem] border border-white/10 bg-black/25 p-4">
                      <p className="min-h-6 text-sm leading-7 text-gray-300">
                        {booking.comment || "Комментария нет"}
                      </p>
                    </div>
                  </div>

                  <div>
                    <p className="mb-3 text-xs uppercase tracking-[0.18em] text-gray-500">
                      Действия
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