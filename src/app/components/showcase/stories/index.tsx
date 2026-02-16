import {
  Paper,
  Box,
  Typography,
  Button,
  TextField,
  Divider,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { ModalComponent } from "../../modal";
import { useEffect, useRef, useState } from "react";
import { RenderImage } from "../renderImages";
import { Showcase } from "../../../../features/showcase/types";
import { IconPencil } from "@tabler/icons-react";
import { ASSETS_BASE_URL } from "../../../../constants/assets";

export const STORIES_QUANTITY = 2;
export const STORY_ITEMS_QUANTITY = 3;

interface Props {
  data: {
    register: any;
    watch: any;
    stories: Showcase["stories"];
  };
  actions: {
    setValue: any;
  };
}

export const StoriesComponent = ({ data, actions }: Props) => {
  const { register, stories, watch } = data;
  const { setValue } = actions;

  const theme = useTheme();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStoryId, setSelectedStoryId] = useState<number>(0);

  const titles: string[] = Array.from(
    { length: STORIES_QUANTITY },
    (_, i) => watch(`stories[${i}].title`) || stories?.[i]?.title || "",
  );

  const thumbnailPreviews: string[] = Array.from(
    { length: STORIES_QUANTITY },
    (_, i) => {
      const file = watch(`stories[${i}].thumbnail`);
      return file
        ? URL.createObjectURL(file)
        : `${ASSETS_BASE_URL}${stories?.[i]?.thumbnail}` || "";
    },
  );

  const handleOpenModal = (id: number) => {
    setSelectedStoryId(id);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveStory = () => {
    handleCloseModal();
  };

  const handleCancelStory = () => {
    handleCloseModal();
  };

  return (
    <Box
      display="flex"
      gap={4}
      alignItems="center"
      justifyContent={"center"}
      marginBlock={2}
    >
      {Array.from({ length: STORIES_QUANTITY }).map((_, i) => (
        <Box key={i}>
          <Paper
            onClick={() => handleOpenModal(i)}
            elevation={2}
            sx={{
              width: 56,
              height: 56,
              borderRadius: "50%",
              backgroundColor: theme.palette.primary.main,
              border: `4px solid ${theme.palette.secondary.main}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            {thumbnailPreviews[i] ? (
              <img
                src={thumbnailPreviews[i]}
                alt="Thumbnail Preview"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "50%",
                }}
              />
            ) : (
              <IconPencil />
            )}
          </Paper>
          <Typography variant="caption" display="block" textAlign={"center"}>
            {titles[i] || `Story ${i + 1}`}
          </Typography>
        </Box>
      ))}

      <ModalComponent
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        content={
          <RegisterStory
            data={{ index: selectedStoryId, stories, register }}
            actions={{ handleSaveStory, handleCancelStory, setValue }}
          />
        }
      />
    </Box>
  );
};

interface RegisterStoryProps {
  data: {
    index: number;
    stories: Showcase["stories"];
    register: any;
  };
  actions: {
    handleSaveStory: () => void;
    handleCancelStory: () => void;
    setValue: any;
  };
}

const RegisterStory = ({ data, actions }: RegisterStoryProps) => {
  const { index, stories, register } = data;
  const { handleSaveStory, handleCancelStory, setValue } = actions;
  const story = stories ? stories[index] : null;

  const thumbnailfileInputRef = useRef<HTMLInputElement>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string>("");
  const itemStoryOneInputRef = useRef<HTMLInputElement>(null);
  const [itemStoryOnePreview, setItemStoryOnePreview] = useState<string>("");
  const itemStoryTwoInputRef = useRef<HTMLInputElement>(null);
  const [itemStoryTwoPreview, setItemStoryTwoPreview] = useState<string>("");
  const itemStoryThreeInputRef = useRef<HTMLInputElement>(null);
  const [itemStoryThreePreview, setItemStoryThreePreview] =
    useState<string>("");

  useEffect(() => {
    if (story) {
      setThumbnailPreview(story.thumbnail);
      setItemStoryOnePreview(story.items[0]?.image || "");
      setItemStoryTwoPreview(story.items[1]?.image || "");
      setItemStoryThreePreview(story.items[2]?.image || "");
    }
  }, [story?.thumbnail, story?.items]);

  const handleThumbnailClick = () => {
    if (thumbnailfileInputRef.current) {
      thumbnailfileInputRef.current.click();
    }
  };

  const handleThumbnailFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue(`stories[${index}].thumbnail`, file);
      setThumbnailPreview(URL.createObjectURL(file));
    }
  };

  const handleItemStoryOneClick = () => {
    if (itemStoryOneInputRef.current) {
      itemStoryOneInputRef.current.click();
    }
  };

  const handleItemStoryOneFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue(`stories[${index}].items[0].image`, file);
      setItemStoryOnePreview(URL.createObjectURL(file));
    }
  };

  const handleItemStoryTwoClick = () => {
    if (itemStoryTwoInputRef.current) {
      itemStoryTwoInputRef.current.click();
    }
  };

  const handleItemStoryTwoFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue(`stories[${index}].items[1].image`, file);
      setItemStoryTwoPreview(URL.createObjectURL(file));
    }
  };

  const handleItemStoryThreeClick = () => {
    if (itemStoryThreeInputRef.current) {
      itemStoryThreeInputRef.current.click();
    }
  };

  const handleItemStoryThreeFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue(`stories[${index}].items[2].image`, file);
      setItemStoryThreePreview(URL.createObjectURL(file));
    }
  };

  const buildRenderImageProps = (index: 0 | 1 | 2) => {
    const props = {
      0: {
        data: {
          src: itemStoryOnePreview,
          ref: itemStoryOneInputRef,
          alt: `Imagem do ${index + 1}º Item do Story`,
        },
        actions: {
          onChange: handleItemStoryOneFileChange,
          onClick: handleItemStoryOneClick,
        },
      },
      1: {
        data: {
          src: itemStoryTwoPreview,
          ref: itemStoryTwoInputRef,
          alt: `Imagem do ${index + 1}º Item do Story`,
        },
        actions: {
          onChange: handleItemStoryTwoFileChange,
          onClick: handleItemStoryTwoClick,
        },
      },
      2: {
        data: {
          src: itemStoryThreePreview,
          ref: itemStoryThreeInputRef,
          alt: `Imagem do ${index + 1}º Item do Story`,
        },
        actions: {
          onChange: handleItemStoryThreeFileChange,
          onClick: handleItemStoryThreeClick,
        },
      },
    };

    return props[index];
  };

  return (
    <Box p={4}>
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h4"
          gutterBottom
          fontWeight={700}
          color="primary.main"
          sx={{ mb: 1 }}
        >
          Titulo do Story
        </Typography>
        <TextField
          label="Titulo do Story"
          fullWidth
          {...register(`stories[${index}].title`)}
          variant="outlined"
          sx={{ mb: 2 }}
          defaultValue={story?.title || ""}
        />
        <Typography
          variant="h4"
          gutterBottom
          fontWeight={700}
          color="primary.main"
          sx={{ mb: 1 }}
        >
          Thumbnail do Story
        </Typography>
        <RenderImage
          data={{
            src: thumbnailPreview,
            ref: thumbnailfileInputRef,
            alt: `Thumbnail do ${index + 1}º Story`,
          }}
          actions={{
            onChange: handleThumbnailFileChange,
            onClick: handleThumbnailClick,
          }}
        />
      </Box>

      <Divider />

      <Typography
        variant="h4"
        gutterBottom
        fontWeight={700}
        color="primary.main"
        sx={{ mt: 2 }}
      >
        Itens do Story
      </Typography>
      {Array.from({ length: STORY_ITEMS_QUANTITY }).map((_, i) => (
        <Box key={i} sx={{ mb: 2 }}>
          <Typography variant="h6" gutterBottom>
            Item {i + 1}
          </Typography>
          <TextField
            label="Titulo do Item"
            fullWidth
            {...register(`stories[${index}].items[${i}].title`)}
            defaultValue={story?.items?.[i]?.title || ""}
            variant="outlined"
            sx={{ mb: 1 }}
          />
          <TextField
            label="Subtitulo do Item"
            fullWidth
            {...register(`stories[${index}].items[${i}].subtitle`)}
            defaultValue={story?.items?.[i]?.subtitle || ""}
            variant="outlined"
          />
          <RenderImage {...buildRenderImageProps(i as 0 | 1 | 2)} />
        </Box>
      ))}

      <Box
        sx={{
          mt: 4,
          display: "flex",
          gap: 2,
          justifyContent: "flex-end",
        }}
      >
        <Button variant="outlined" onClick={handleCancelStory} size="large">
          Cancelar
        </Button>
        <Button
          onClick={handleSaveStory}
          variant="contained"
          size="large"
          sx={{ minWidth: 120 }}
        >
          Confirmar
        </Button>
      </Box>
    </Box>
  );
};
