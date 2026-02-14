import { Box } from "@mui/material";
import { Showcase } from "../../../../features/showcase/types";
import { BodyBox } from "../bodyBoxes";

interface Props {
  data: {
    registerNames: string[];
    register: any;
    control: any;
    showcase: Showcase | null;
  };
}

export const TestimonialsComponent = ({ data }: Props) => {
  const { registerNames, control, register, showcase } = data;

  return (
    <Box display={"flex"} gap={2} mt={2}>
      <BodyBox
        data={{
          registerNames: registerNames.slice(0, 2),
          control,
          register,
          showcase,
        }}
      />
      <BodyBox
        data={{
          registerNames: registerNames.slice(2, 4),
          control,
          register,
          showcase,
        }}
      />
      <BodyBox
        data={{
          registerNames: registerNames.slice(4, 6),
          control,
          register,
          showcase,
        }}
      />
    </Box>
  );
};
