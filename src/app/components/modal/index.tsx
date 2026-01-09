import { Box, Modal, IconButton, Paper } from "@mui/material";
import { IconX } from "@tabler/icons-react";
import { JSX } from "react";

interface Props {
  content: JSX.Element;
  isOpen: boolean;
  onClose: () => void;
  maxWidth?: number;
  maxHeight?: number;
  disablePortal?: boolean;
}

export const ModalComponent = ({
  content,
  isOpen,
  onClose,
  maxWidth = 600,
  maxHeight = 800,
  disablePortal = false,
}: Props) => {
  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      disablePortal={disablePortal}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper
        elevation={24}
        sx={{
          position: "relative",
          width: "90%",
          maxWidth: maxWidth,
          maxHeight: maxHeight,
          overflow: "auto",
          borderRadius: 2,
          outline: "none",
        }}
      >
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            zIndex: 1,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <IconX size={20} />
        </IconButton>
        <Box>{content}</Box>
      </Paper>
    </Modal>
  );
};
