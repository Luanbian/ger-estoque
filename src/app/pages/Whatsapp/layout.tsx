import { useEffect } from "react";
import { WebviewWindow } from "@tauri-apps/api/webviewWindow";
import { ENV } from "../../../constants/env";
import { WhatsappPage } from "./page";
import { useDispatch, useSelector } from "../../../store/hooks";
import { actions as wpActions } from "../../../features/whatsapp";

export const Whatsapp = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.whatsapp);

  useEffect(() => {
    if (data == null) {
      dispatch(wpActions.whatsappRequest());
    }
  }, [data]);

  const openWhatsapp = async () => {
    const message = encodeURIComponent(data?.acceptedMessage || "");
    const phone = "5515981806866";
    if (ENV === "dev") {
      window.open(`https://wa.me/${phone}?text=${message}`, "_blank");
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

  return <WhatsappPage data={{ whatsapp: data }} actions={{ openWhatsapp }} />;
};
