import { prisma } from "@/lib/prisma";
import BookingStatusActions from "./BookingStatusActions";

export const dynamic = "force-dynamic";

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
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

  return (
    <main className="min-h-screen bg-black px-6 py-10 text-white">
      <div className="mx-auto w-full max-w-7xl">
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-3 text-xs uppercase tracking-[0.28em] text-gray-500">
              Admin Panel
            </p>

            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
              Заявки
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-gray-400">
              Здесь отображаются заявки, которые пользователи отправляют через
              форму записи на сайте.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4">
            <p className="text-xs uppercase tracking-[0.18em] text-gray-500">
              Всего заявок
            </p>
            <p className="mt-1 text-2xl font-semibold">{bookings.length}</p>
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
          <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04]">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1200px] border-collapse text-left">
                <thead>
                  <tr className="border-b border-white/10 bg-white/[0.03] text-xs uppercase tracking-[0.18em] text-gray-500">
                    <th className="px-5 py-4 font-medium">Дата заявки</th>
                    <th className="px-5 py-4 font-medium">Клиент</th>
                    <th className="px-5 py-4 font-medium">Телефон</th>
                    <th className="px-5 py-4 font-medium">Услуга</th>
                    <th className="px-5 py-4 font-medium">Мастер</th>
                    <th className="px-5 py-4 font-medium">Дата записи</th>
                    <th className="px-5 py-4 font-medium">Комментарий</th>
                    <th className="px-5 py-4 font-medium">Статус</th>
                    <th className="px-5 py-4 font-medium">Действия</th>
                  </tr>
                </thead>

                <tbody>
                  {bookings.map((booking) => (
                    <tr
                      key={booking.id}
                      className="border-b border-white/10 transition hover:bg-white/[0.03]"
                    >
                      <td className="px-5 py-5 text-sm text-gray-400">
                        {formatDate(booking.createdAt)}
                      </td>

                      <td className="px-5 py-5">
                        <p className="font-medium text-white">
                          {booking.name}
                        </p>
                        <p className="mt-1 text-xs text-gray-500">
                          ID: {booking.id.slice(0, 8)}
                        </p>
                      </td>

                      <td className="px-5 py-5 text-sm text-gray-300">
                        {booking.phone}
                      </td>

                      <td className="px-5 py-5 text-sm text-gray-300">
                        {booking.service}
                      </td>

                      <td className="px-5 py-5 text-sm text-gray-300">
                        {booking.master}
                      </td>

                      <td className="px-5 py-5 text-sm text-gray-300">
                        {booking.date}
                      </td>

                      <td className="max-w-[260px] px-5 py-5 text-sm leading-6 text-gray-400">
                        {booking.comment || "—"}
                      </td>

                      <td className="px-5 py-5">
                        <span
                          className={`rounded-full border px-3 py-1 text-xs uppercase tracking-[0.16em] ${getStatusClass(
                            booking.status
                          )}`}
                        >
                          {getStatusLabel(booking.status)}
                        </span>
                      </td>

                      <td className="px-5 py-5">
                        <BookingStatusActions
                          bookingId={booking.id}
                          currentStatus={booking.status}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}