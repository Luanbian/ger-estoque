import { Box, Button, CircularProgress, Typography } from "@mui/material";
import {
  CreateShowcasePayload,
  Showcase,
} from "../../../features/showcase/types";

interface Props {
  data: {
    showcase: Showcase;
    loading: boolean;
  };
  actions: {
    createShowcase: (data: CreateShowcasePayload) => void;
  };
}

export const ShowcaseComponent = ({ data, actions }: Props) => {
  const { showcase, loading } = data;
  const { createShowcase } = actions;

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Página de Vitrine
      </Typography>
      <Typography color="text.secondary">
        Esta é a página de vitrine do sistema.
      </Typography>
      <Typography variant="h5" component="h2" gutterBottom>
        Detalhes da Vitrine
      </Typography>
      <Typography color="text.secondary">
        Nome: {showcase.name}
        <br />
        Descrição: {showcase.hash}
      </Typography>

      <Button
        variant="contained"
        color="primary"
        onClick={() => createShowcase({ name: "Nova Vitrine" })}
      >
        Criar Nova Vitrine
      </Button>
    </Box>
  );
};
