import { CreateOrUpdateWhatsappSetup } from "../../components/whatsapp/createOrUpdate/whatsappSetup";
import { Whatsapp } from "../../../features/whatsapp/types";

interface Props {
  data: {
    whatsapp: Whatsapp | null;
  };
}

export const WhatsappPage = ({ data }: Props) => {
  const { whatsapp } = data;

  return <CreateOrUpdateWhatsappSetup data={{ whatsapp }} />;
};
