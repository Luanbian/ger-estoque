import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import { IconX, IconAlertTriangle } from "@tabler/icons-react";

interface Props {
  title: string;
  message?: string;
  confirm: () => void;
  cancel?: () => void;
  isOpen: boolean;
  onClose: () => void;
  confirmText?: string;
  cancelText?: string;
  confirmColor?: "error" | "primary" | "secondary" | "success" | "warning";
}

export const DialogComponent = ({
  title,
  message = "Esta ação não poderá ser desfeita. Deseja continuar?",
  isOpen,
  onClose,
  confirm,
  cancel = onClose,
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  confirmColor = "error",
}: Props) => {
  const theme = useTheme();

  const handleConfirm = () => {
    confirm();
    onClose();
  };

  const handleCancel = () => {
    cancel();
    onClose();
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        elevation: 24,
        sx: {
          borderRadius: 2,
          position: "relative",
        },
      }}
    >
      <IconButton
        onClick={handleCancel}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          zIndex: 1,
          color: theme.palette.grey[500],
          "&:hover": {
            backgroundColor: theme.palette.action.hover,
          },
        }}
      >
        <IconX size={20} />
      </IconButton>

      <DialogTitle
        sx={{
          pt: 3,
          pb: 2,
          pr: 6,
          display: "flex",
          alignItems: "center",
          gap: 1.5,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 40,
            height: 40,
            borderRadius: "50%",
            backgroundColor: `${theme.palette[confirmColor].main}15`,
            color: theme.palette[confirmColor].main,
          }}
        >
          <IconAlertTriangle size={24} />
        </Box>
        <Typography variant="h6" component="span" fontWeight={600}>
          {title}
        </Typography>
      </DialogTitle>

      <DialogContent sx={{ pb: 2 }}>
        <Typography variant="body2" color="text.secondary">
          {message}
        </Typography>
      </DialogContent>

      <DialogActions
        sx={{
          px: 3,
          pb: 3,
          gap: 1,
        }}
      >
        <Button
          onClick={handleCancel}
          variant="outlined"
          color="inherit"
          sx={{
            minWidth: 100,
            textTransform: "none",
            fontWeight: 500,
          }}
        >
          {cancelText}
        </Button>
        <Button
          onClick={handleConfirm}
          variant="contained"
          color={confirmColor}
          sx={{
            minWidth: 100,
            textTransform: "none",
            fontWeight: 500,
            boxShadow: 2,
            "&:hover": {
              boxShadow: 4,
            },
          }}
        >
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
