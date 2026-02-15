import { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Grid,
  Stack,
  Switch,
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
import { StoriesComponent } from "../../components/showcase/stories";
import { TestimonialsComponent } from "../../components/showcase/testimonials";

interface Props {
  data: {
    showcase: Showcase | null;
    loading: boolean;
  };
  actions: {
    createShowcase: (data: CreateShowcasePayload) => void;
  };
}

export const ShowcaseComponent = ({ data, actions }: Props) => {
  const { showcase, loading } = data;
  const { createShowcase } = actions;

  const [boxesQuantity, setBoxesQuantity] = useState<number[]>([0]);
  const logofileInputRef = useRef<HTMLInputElement>(null);
  const [logoPreview, setLogoPreview] = useState<string>("");
  const bannerfileInputRef = useRef<HTMLInputElement>(null);
  const [bannerPreview, setBannerPreview] = useState<string>("");
  const presentationfileInputRef = useRef<HTMLInputElement>(null);
  const [presentationPreview, setPresentationPreview] = useState<string>("");
  const bodyfileInputRef = useRef<HTMLInputElement>(null);
  const [bodyPreview, setBodyPreview] = useState<string>("");
  const [showName, setShowName] = useState<boolean>(false);
  const [showStories, setShowStories] = useState<boolean>(false);

  useEffect(() => {
    setLogoPreview(showcase?.logo || "");
    setBannerPreview(showcase?.banner || "");
    setPresentationPreview(showcase?.presentation?.image || "");
    setBodyPreview(showcase?.body?.image || "");
    setBoxesQuantity(
      showcase?.presentation?.sections
        ? Array.from(
            { length: showcase.presentation.sections.length + 1 },
            (_, i) => i,
          )
        : [0],
    );
    setShowName(showcase?.showName || false);
    setShowStories(showcase?.showStories || false);
  }, [
    showcase?.logo,
    showcase?.banner,
    showcase?.presentation?.image,
    showcase?.body?.image,
    showcase?.presentation?.sections,
    showcase?.showName,
    showcase?.showStories,
  ]);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<CreateShowcasePayload>();

  const buildRegisterNames = (quantity: number, prefix: string) => {
    const names = [];
    for (let i = 0; i <= quantity; i++) {
      names.push(`${prefix}.sections[${i}].title`);
      names.push(`${prefix}.sections[${i}].description`);
    }
    return names;
  };

  const handleBoxesQuantityClick = (clickedValue: number) => {
    setBoxesQuantity(Array.from({ length: clickedValue + 1 }, (_, i) => i));
  };

  const onSubmit = (data: CreateShowcasePayload) => {
    createShowcase(data);
  };

  const handleLogoClick = () => {
    if (logofileInputRef.current) {
      logofileInputRef.current.click();
    }
  };

  const handleLogoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("logo", file);
      setLogoPreview(URL.createObjectURL(file));
    }
  };

  const handleBannerClick = () => {
    if (bannerfileInputRef.current) {
      bannerfileInputRef.current.click();
    }
  };

  const handleBannerFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("banner", file);
      setBannerPreview(URL.createObjectURL(file));
    }
  };

  const handlePresentationClick = () => {
    if (presentationfileInputRef.current) {
      presentationfileInputRef.current.click();
    }
  };

  const handlePresentationFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("presentation.image", file);
      setPresentationPreview(URL.createObjectURL(file));
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
      setValue("body.image", file);
      setBodyPreview(URL.createObjectURL(file));
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Box>
      <Box m={2} width={"80%"} mx="auto">
        <Typography
          variant="h4"
          gutterBottom
          fontWeight={600}
          textAlign="center"
        >
          Configurações da Vitrine
        </Typography>
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Box display={"flex"} alignItems={"center"}>
            <TextField
              {...register("domain", {
                required: "O domínio é obrigatório",
              })}
              label="Domínio do seu site"
              required
              margin="normal"
              error={!!errors.domain}
              helperText={errors.domain?.message}
              defaultValue={showcase?.domain || ""}
            />
            <Typography>.anexu.com.br</Typography>
          </Box>
          <TextField
            {...register("name", {
              required: "O nome é obrigatório",
            })}
            label="Nome da Vitrine"
            required
            margin="normal"
            error={!!errors.name}
            helperText={errors.name?.message}
            defaultValue={showcase?.name || ""}
          />
        </Box>
        <Box display={"flex"} gap={2} alignItems={"center"}>
          <Typography variant="h6" gutterBottom fontWeight={600}>
            Mostrar nome da loja?
          </Typography>
          <Switch
            {...register("showName")}
            checked={showName}
            onChange={(e) => setShowName(e.target.checked)}
          />
        </Box>
        <Box display={"flex"} gap={2} alignItems={"center"}>
          <Typography variant="h6" gutterBottom fontWeight={600}>
            Logo
          </Typography>
          <RenderImage
            data={{
              src: logoPreview,
              ref: logofileInputRef,
              alt: "Logo",
              width: 90,
              height: 90,
              mini: true,
            }}
            actions={{
              onClick: handleLogoClick,
              onChange: handleLogoFileChange,
            }}
          />
          {showName && (
            <Typography variant="h6" gutterBottom fontWeight={600}>
              {showcase?.name || "Nome da loja"}
            </Typography>
          )}
        </Box>
        <Box display={"flex"} gap={2} alignItems={"center"}>
          <Typography variant="h6" gutterBottom fontWeight={600}>
            Quantidade de caixas de informação
          </Typography>
          <ToggleButtonGroup value={boxesQuantity} exclusive={false}>
            {[0, 1, 2, 3, 4, 5].map((value, key) => (
              <ToggleButton
                key={key}
                value={key}
                defaultValue={showcase?.presentation?.sections?.length || 0}
                onClick={() => handleBoxesQuantityClick(value)}
              >
                {value}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </Box>
        <Box display={"flex"} gap={2} alignItems={"center"}>
          <Typography variant="h6" gutterBottom fontWeight={600}>
            Mostrar stories?
          </Typography>
          <Switch
            {...register("showStories")}
            checked={showStories}
            onChange={(e) => setShowStories(e.target.checked)}
          />
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
            data={{
              src: bannerPreview,
              ref: bannerfileInputRef,
              alt: "Banner",
              width: "100%",
              height: "350px",
            }}
            actions={{
              onClick: handleBannerClick,
              onChange: handleBannerFileChange,
            }}
          />
          {showStories && (
            <StoriesComponent
              data={{ register, stories: showcase?.stories }}
              actions={{ setValue }}
            />
          )}
          <Stack width={"80%"} mx="auto">
            <Grid container spacing={2} mt={2}>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  {...register("presentation.title", {
                    required: "O título de apresentação é obrigatório",
                  })}
                  label="Título da Vitrine"
                  required
                  fullWidth
                  margin="normal"
                  error={!!errors.presentation?.title}
                  helperText={errors.presentation?.title?.message}
                  defaultValue={showcase?.presentation?.title || ""}
                />
                <BodyBoxes
                  data={{
                    quantity: boxesQuantity.length - 1,
                    registerNames: buildRegisterNames(
                      boxesQuantity.length - 1,
                      "presentation",
                    ),
                    register,
                    control,
                    showcase,
                  }}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <RenderImage
                  data={{
                    src: presentationPreview,
                    ref: presentationfileInputRef,
                    alt: "Body",
                  }}
                  actions={{
                    onClick: handlePresentationClick,
                    onChange: handlePresentationFileChange,
                  }}
                />
              </Grid>
            </Grid>
            <Box>
              <Grid container spacing={2} mt={2}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    {...register("body.title", {
                      required: "O título da seção é obrigatório",
                    })}
                    label="Título desta seção"
                    required
                    fullWidth
                    margin="normal"
                    error={!!errors.body?.title}
                    helperText={errors.body?.title?.message}
                    defaultValue={showcase?.body?.title || ""}
                  />
                  <BodyBoxes
                    data={{
                      quantity: 1,
                      registerNames: [
                        "body.section.title",
                        "body.section.description",
                      ],
                      register,
                      control,
                      showcase,
                    }}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <RenderImage
                    data={{
                      src: bodyPreview,
                      ref: bodyfileInputRef,
                      alt: "Body",
                    }}
                    actions={{
                      onClick: handleBodyClick,
                      onChange: handleBodyFileChange,
                    }}
                  />
                </Grid>
              </Grid>
            </Box>
            <Divider sx={{ my: 4 }} />
            <Box>
              <TextField
                {...register("testimonials.title", {
                  required: "O título da seção é obrigatório",
                })}
                label="Título dessa seção"
                required
                fullWidth
                margin="normal"
                error={!!errors.testimonials?.title}
                helperText={errors.testimonials?.title?.message}
                defaultValue={showcase?.testimonials?.title || ""}
              />
              <TestimonialsComponent
                data={{
                  control,
                  register,
                  showcase,
                  registerNames: buildRegisterNames(3, "testimonials"),
                }}
              />
            </Box>
          </Stack>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit(onSubmit)}
          >
            Publicar
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
