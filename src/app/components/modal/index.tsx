import { Box, Modal, IconButton, Paper } from "@mui/material";
import { IconX } from "@tabler/icons-react";
import { JSX } from "react";

interface Props {
  title?: string;
  content: JSX.Element;
  isOpen: boolean;
  onClose: () => void;
  maxWidth?: number;
}

export const ModalComponent = ({
  content,
  isOpen,
  onClose,
  maxWidth = 600,
}: Props) => {
  return (
    <Modal
      open={isOpen}
      onClose={onClose}
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
          maxHeight: "90vh",
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
