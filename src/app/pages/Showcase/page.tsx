import { useEffect, useRef, useState } from "react";
import {
  Box,
  CircularProgress,
  Grid,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import {
  CreateShowcasePayload,
  Showcase,
} from "../../../features/showcase/types";
import { useForm } from "react-hook-form";
import { RenderImage } from "../../components/showcase/renderImages";
import { BodyBoxes } from "../../components/showcase/bodyBoxes";

interface Props {
  data: {
    showcase: Showcase | null;
    loading: boolean;
  };
  actions: {
    createShowcase: (data: CreateShowcasePayload) => void;
    updateBanner: (banner: File) => void;
    updateBody: (body: File) => void;
  };
}

const banner = "";
const bodyImg = "";
const bodyBoxesQuantity = [0, 1, 2, 3, 4, 5];

export const ShowcaseComponent = ({ data, actions }: Props) => {
  const { showcase, loading } = data;
  const { createShowcase, updateBanner, updateBody } = actions;

  const [boxesQuantity, setBoxesQuantity] = useState<number[]>([0]);
  const bannerfileInputRef = useRef<HTMLInputElement>(null);
  const bodyfileInputRef = useRef<HTMLInputElement>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateShowcasePayload>();

  const handleBoxesQuantityClick = (clickedValue: number) => {
    setBoxesQuantity(Array.from({ length: clickedValue + 1 }, (_, i) => i));
  };

  useEffect(() => {
    console.log({ boxesQuantity });
  }, [boxesQuantity]);

  const onSubmit = (data: CreateShowcasePayload) => {
    console.log(data);
  };

  const handleBannerClick = () => {
    if (bannerfileInputRef.current) {
      bannerfileInputRef.current.click();
    }
  };

  const handleBannerFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      updateBanner(file);
    }
  };

  const handleBodyClick = () => {
    if (bodyfileInputRef.current) {
      bodyfileInputRef.current.click();
    }
  };

  const handleBodyFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      updateBody(file);
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Box>
      <Box m={2}>
        <Typography
          variant="h4"
          gutterBottom
          fontWeight={600}
          textAlign="center"
        >
          Configurações da Vitrine
        </Typography>
        <Box display={"flex"} alignItems={"center"}>
          <TextField
            {...register("name", { required: "O nome do site é obrigatório" })}
            label="Nome do seu site"
            required
            margin="normal"
            error={!!errors.name}
            helperText={errors.name?.message}
          />
          <Typography>.anexu.com.br</Typography>
        </Box>
        <Box display={"flex"} gap={1} alignItems={"center"}>
          <Typography variant="h6" gutterBottom fontWeight={600} width="50%">
            Quantidade de caixas de informação
          </Typography>
          <ToggleButtonGroup value={boxesQuantity} exclusive={false}>
            {bodyBoxesQuantity.map((value, key) => (
              <ToggleButton
                key={key}
                value={key}
                onClick={() => handleBoxesQuantityClick(value)}
              >
                {value}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </Box>
      </Box>

      <Box>
        <Typography
          variant="h5"
          gutterBottom
          fontWeight={600}
          textAlign="center"
        >
          Visualização
        </Typography>
        <Box
          width={"80%"}
          mx="auto"
          component="form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <RenderImage
            data={{ src: banner, ref: bannerfileInputRef, alt: "Banner" }}
            actions={{
              onClick: handleBannerClick,
              onChange: handleBannerFileChange,
            }}
          />
          <Grid container spacing={2} mt={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                {...register("title", { required: "O título é obrigatório" })}
                label="Título da Vitrine"
                required
                fullWidth
                margin="normal"
                error={!!errors.title}
                helperText={errors.title?.message}
              />
              <BodyBoxes data={{ quantity: boxesQuantity.length - 1 }} />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <RenderImage
                data={{ src: bodyImg, ref: bodyfileInputRef, alt: "Body" }}
                actions={{
                  onClick: handleBodyClick,
                  onChange: handleBodyFileChange,
                }}
              />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};
