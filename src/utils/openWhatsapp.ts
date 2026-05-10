export const openWhatsapp = async (
  phone: string,
  name: string,
  message?: string,
) => {
  const resolvedMessage = message?.includes("{nome}")
    ? message.replace("{nome}", name)
    : message;
  const text = encodeURIComponent(resolvedMessage || "");
  const url = `https://wa.me/55${phone}?text=${text}`;

  const { openUrl } = await import("@tauri-apps/plugin-opener");
  await openUrl(url);
};
