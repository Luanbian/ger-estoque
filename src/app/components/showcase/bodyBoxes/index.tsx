import { Box, TextareaAutosize } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";

interface Props {
  data: {
    quantity: number;
  };
}

const MAX_LINES = 10;
const MAX_CHARS = 300;

export const BodyBoxes = ({ data }: Props) => {
  const { quantity } = data;
  const theme = useTheme();
  const [value, setValue] = useState("");

  if (quantity === 0) return;

  if (quantity === 1) {
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      let text = e.target.value;

      // Limita o número de linhas
      let lines = text.split("\n");
      if (lines.length > MAX_LINES) {
        lines = lines.slice(0, MAX_LINES);
        text = lines.join("\n");
      }

      // Limita o número de caracteres
      if (text.length > MAX_CHARS) {
        text = text.slice(0, MAX_CHARS);
      }

      setValue(text);
    };

    return (
      <Box display="flex" position="relative" width="100%">
        <TextareaAutosize
          minRows={MAX_LINES}
          maxRows={MAX_LINES}
          value={value}
          onChange={handleChange}
          maxLength={MAX_CHARS}
          style={{
            backgroundColor: theme.palette.background.default,
            border: `2px solid ${theme.palette.primary.main}`,
            resize: "none",
            width: "100%",
            overflow: "hidden",
            paddingBottom: "24px",
            boxSizing: "border-box",
          }}
        />
        <Box
          position="absolute"
          bottom={4}
          right={8}
          fontSize="0.85rem"
          color={theme.palette.text.secondary}
          zIndex={1}
        >
          {value.length}/{MAX_CHARS}
        </Box>
      </Box>
    );
  }
};
