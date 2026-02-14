import { Paper, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export const StoriesComponent = () => {
  const theme = useTheme();

  return (
    <Box
      display="flex"
      gap={4}
      alignItems="center"
      justifyContent={"center"}
      marginBlock={2}
    >
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <Paper
          key={i}
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
          }}
        />
      ))}
    </Box>
  );
};
