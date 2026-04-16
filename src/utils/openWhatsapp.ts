import { WebviewWindow } from "@tauri-apps/api/webviewWindow";
import { ENV } from "../constants/env";

export const openWhatsapp = async (
  phone: string,
  name: string,
  message?: string,
) => {
  const resolvedMessage = message?.includes("{nome}")
    ? message.replace("{nome}", name)
    : message;
  const text = encodeURIComponent(resolvedMessage || "");
  if (ENV === "dev") {
    window.open(`https://wa.me/55${phone}?text=${text}`, "_blank");
    return;
  }

  const existing = await WebviewWindow.getByLabel("whatsapp");
  if (existing) {
    await existing.setFocus();
    return;
  }

  new WebviewWindow("whatsapp", {
    url: "https://web.whatsapp.com",
    title: "WhatsApp",
    width: 1000,
    height: 800,
    resizable: true,
  });
};
