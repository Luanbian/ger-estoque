import { Button, IconButton } from "@mui/material";
import { ModalComponent } from "../../components/modal";
import { CreateOrUpdateWhatsappSetup } from "../../components/whatsapp/createOrUpdate/whatsappSetup";
import { useState } from "react";
import { IconSettings } from "@tabler/icons-react";
import { Whatsapp } from "../../../features/whatsapp/types";

interface Props {
  data: {
    whatsapp: Whatsapp | null;
  };
  actions: {
    openWhatsapp: () => void;
  };
}

export const WhatsappPage = ({ actions, data }: Props) => {
  const { whatsapp } = data;
  const { openWhatsapp } = actions;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <IconButton onClick={handleOpenModal}>
        <IconSettings />
      </IconButton>

      <Button onClick={openWhatsapp}>Abrir Whatsapp</Button>

      <ModalComponent
        content={
          <CreateOrUpdateWhatsappSetup
            actions={{ onClose: handleCloseModal }}
            data={{ whatsapp }}
          />
        }
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
};
