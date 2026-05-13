import { useState } from "react";
import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { IconLibraryPhoto } from "@tabler/icons-react";
import { ASSETS_BASE_URL } from "../../../../constants/api";

interface Props {
  data: {
    src: string;
    ref: React.RefObject<HTMLInputElement | null>;
    alt?: string;
    width?: number | string;
    height?: number | string;
    mini?: boolean;
  };
  actions: {
    onClick?: () => void;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  };
}

export const RenderImage = ({ data, actions }: Props) => {
  const { src, ref, alt, width = "100%", height = "100%", mini } = data;
  const { onClick, onChange } = actions;
  const theme = useTheme();

  const [imageValid, setImageValid] = useState(true);

  const imageUrl = src.includes("blob") ? src : `${ASSETS_BASE_URL}${src}`;

  return (
    <Box onClick={onClick} sx={{ cursor: "pointer" }}>
      <input
        type="file"
        accept="image/*"
        ref={ref}
        style={{ display: "none" }}
        onChange={onChange}
      />
      {src && imageValid ? (
        <img
          src={imageUrl}
          alt={alt || "Image rendered"}
          width={width}
          height={height}
          onError={() => setImageValid(false)}
        />
      ) : (
        <Box
          border={`2px dashed ${theme.palette.primary.main}`}
          p={mini ? 4 : 16}
          textAlign="center"
        >
          <IconLibraryPhoto color={theme.palette.primary.main} />
        </Box>
      )}
    </Box>
  );
};
