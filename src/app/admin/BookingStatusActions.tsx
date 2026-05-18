"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type BookingStatusActionsProps = {
  bookingId: string;
  currentStatus: string;
};

const actions = [
  {
    status: "new",
    label: "Нова",
  },
  {
    status: "confirmed",
    label: "Підтвердити",
  },
  {
    status: "cancelled",
    label: "Скасувати",
  },
];

export default function BookingStatusActions({
  bookingId,
  currentStatus,
}: BookingStatusActionsProps) {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const updateStatus = async (status: string) => {
    if (status === currentStatus || isLoading) return;

    setIsLoading(true);

    try {
      const response = await fetch("/api/booking-status", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: bookingId,
          status,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update status");
      }

      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Не вдалося змінити статус заявки.");
    } finally {
      setIsLoading(false);
    }
  };

  const deleteBooking = async () => {
    if (isLoading) return;

    setIsLoading(true);

    try {
      const response = await fetch("/api/booking-delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: bookingId,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete booking");
      }

      setIsDeleteModalOpen(false);

      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Не вдалося видалити заявку.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-wrap gap-2">
        {actions.map((action) => {
          const isActive = currentStatus === action.status;

          return (
            <button
              key={action.status}
              type="button"
              disabled={isActive || isLoading}
              onClick={() => updateStatus(action.status)}
              className={`rounded-full border px-3 py-2 text-xs transition ${
                isActive
                  ? "cursor-default border-white/10 bg-white/[0.10] text-white"
                  : "border-white/10 bg-white/[0.04] text-gray-400 hover:border-white/20 hover:bg-white/[0.08] hover:text-white"
              } ${isLoading ? "opacity-60" : ""}`}
            >
              {action.label}
            </button>
          );
        })}

        <button
          type="button"
          disabled={isLoading}
          onClick={() => setIsDeleteModalOpen(true)}
          className={`rounded-full border border-red-400/20 bg-red-400/10 px-3 py-2 text-xs text-red-200 transition hover:border-red-400/30 hover:bg-red-400/15 ${
            isLoading ? "opacity-60" : ""
          }`}
        >
          Видалити
        </button>
      </div>

      {isDeleteModalOpen ? (
        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/70 px-4 backdrop-blur-xl">
          <div className="w-full max-w-md rounded-[2rem] border border-white/10 bg-[#0b0b0b]/95 p-6 text-white shadow-[0_0_80px_rgba(0,0,0,0.45)]">
            <div className="mb-6">
              <p className="mb-3 text-xs uppercase tracking-[0.22em] text-red-300">
                Delete
              </p>

              <h3 className="text-2xl font-bold">
                Видалити заявку?
              </h3>

              <p className="mt-4 text-sm leading-7 text-gray-400">
                Цю дію неможливо скасувати. Заявка буде повністю видалена.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                disabled={isLoading}
                onClick={() => setIsDeleteModalOpen(false)}
                className="rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-3 text-sm text-white transition hover:border-white/20 hover:bg-white/[0.08]"
              >
                Скасувати
              </button>

              <button
                type="button"
                disabled={isLoading}
                onClick={deleteBooking}
                className={`rounded-2xl bg-red-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-400 ${
                  isLoading ? "opacity-60" : ""
                }`}
              >
                {isLoading ? "Видалення..." : "Видалити"}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}