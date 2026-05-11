type TelegramBookingMessage = {
  name: string;
  phone: string;
  service: string;
  master: string;
  date: string;
  comment?: string;
};

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

export async function sendBookingTelegramMessage(
  booking: TelegramBookingMessage
) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.warn("Telegram env variables are missing");
    return;
  }

  const text = `
<b>Новая заявка</b>

<b>Имя:</b> ${escapeHtml(booking.name)}
<b>Телефон:</b> ${escapeHtml(booking.phone)}
<b>Услуга:</b> ${escapeHtml(booking.service)}
<b>Мастер:</b> ${escapeHtml(booking.master)}
<b>Дата:</b> ${escapeHtml(booking.date)}
<b>Комментарий:</b> ${escapeHtml(booking.comment || "—")}
`.trim();

  const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: "HTML",
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Telegram send error:", errorText);
  }
}