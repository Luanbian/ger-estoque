import { Box, Slider, Stack, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useEffect, useRef, useState } from "react";
import { convertFromCents } from "../../../utils/convertTocents";

interface Props {
  data: {
    min: number;
    max: number;
  };
  actions: {
    afterChange: (min: number, max: number) => void;
  };
}

export const SliderComponent = ({ data, actions }: Props) => {
  const { min, max } = data;
  const { afterChange } = actions;

  const theme = useTheme();
  const [value, setValue] = useState<number[]>([0, 100]);

  const onChange = (_event: Event | null, newValue: number | number[]) => {
    if (!Array.isArray(newValue)) return;
    setValue(newValue);
  };

  // debounce
  const timeoutRef = useRef<number | null>(null);
  const DEBOUNCE_MS = 500;

  const afterChangeRef = useRef(afterChange);
  useEffect(() => {
    afterChangeRef.current = afterChange;
  }, [afterChange]);

  useEffect(() => {
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = window.setTimeout(() => {
      afterChangeRef.current(value[0], value[1]);
    }, DEBOUNCE_MS);

    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, [value]);

  return (
    <Box>
      <Slider
        value={value}
        onChange={onChange}
        valueLabelDisplay="auto"
        min={min}
        max={max}
        sx={{
          color: theme.palette.primary.main,
          "& .MuiSlider-valueLabel": {
            backgroundColor: theme.palette.secondary.main,
            color: theme.palette.common.white,
          },
        }}
      />
      <Stack direction="row" justifyContent="space-between" p={0}>
        <Typography fontSize={11}>{convertFromCents(min)}</Typography>
        <Typography fontSize={11}>{convertFromCents(max)}</Typography>
      </Stack>
    </Box>
  );
};
