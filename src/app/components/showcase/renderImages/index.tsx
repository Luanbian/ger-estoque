import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { ASSETS_BASE_URL } from "../../../../constants/assets";
import { IconLibraryPhoto } from "@tabler/icons-react";

interface Props {
  data: {
    src: string;
    ref: React.RefObject<HTMLInputElement | null>;
    alt?: string;
  };
  actions: {
    onClick?: () => void;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  };
}

export const RenderImage = ({ data, actions }: Props) => {
  const { src, ref, alt } = data;
  const { onClick, onChange } = actions;
  const theme = useTheme();

  return (
    <Box onClick={onClick} sx={{ cursor: "pointer" }}>
      <input
        type="file"
        accept="image/*"
        ref={ref}
        style={{ display: "none" }}
        onChange={onChange}
      />
      {src ? (
        <img src={`${ASSETS_BASE_URL}${src}`} alt={alt || "Image rendered"} />
      ) : (
        <Box
          border={`2px dashed ${theme.palette.primary.main}`}
          p={16}
          textAlign="center"
        >
          <IconLibraryPhoto color={theme.palette.primary.main} />
        </Box>
      )}
    </Box>
  );
};
