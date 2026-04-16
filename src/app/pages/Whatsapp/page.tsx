import { IconButton } from "@mui/material";
import { ModalComponent } from "../../components/modal";
import { CreateOrUpdateWhatsappSetup } from "../../components/whatsapp/createOrUpdate/whatsappSetup";
import { useState } from "react";
import { IconSettings } from "@tabler/icons-react";

export const WhatsappPage = () => {
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

      {/* TODO: EMBED */}

      <ModalComponent
        content={
          <CreateOrUpdateWhatsappSetup
            actions={{ onClose: handleCloseModal }}
          />
        }
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
};
