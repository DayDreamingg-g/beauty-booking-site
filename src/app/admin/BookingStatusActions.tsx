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
    label: "Новая",
  },
  {
    status: "confirmed",
    label: "Подтвердить",
  },
  {
    status: "cancelled",
    label: "Отменить",
  },
];

export default function BookingStatusActions({
  bookingId,
  currentStatus,
}: BookingStatusActionsProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

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
      alert("Не удалось изменить статус заявки.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
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
    </div>
  );
}