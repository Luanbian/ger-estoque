import { useEffect } from "react";
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

  return <WhatsappPage data={{ whatsapp: data }} />;
};
