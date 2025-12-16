import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
} from "@mui/material";
import {
  IconHome,
  IconPackage,
  IconUsers,
  IconSettings,
  IconChevronLeft,
  IconChevronRight,
} from "@tabler/icons-react";

interface Props {
  isOpen: boolean;
  onToggle: () => void;
  sidebarWidth: number;
}

export const SidebarComponent = ({ isOpen, onToggle, sidebarWidth }: Props) => {
  const menuItems = [
    { text: "Início", icon: <IconHome />, path: "/" },
    { text: "Produtos", icon: <IconPackage />, path: "/produtos" },
    { text: "Usuários", icon: <IconUsers />, path: "/usuarios" },
    { text: "Configurações", icon: <IconSettings />, path: "/configuracoes" },
  ];

  return (
    <>
      <Drawer
        anchor="left"
        open={isOpen}
        variant="persistent"
        sx={{
          width: isOpen ? sidebarWidth : 0,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: sidebarWidth,
            boxSizing: "border-box",
            top: "auto",
            position: "relative",
            borderRight: "none",
          },
        }}
      >
        <Box sx={{ overflow: "auto", height: "100%" }}>
          <List>
            {menuItems.map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
      <Box
        sx={{
          position: "fixed",
          left: isOpen ? sidebarWidth - 20 : 0,
          top: "50%",
          transform: "translateY(-50%)",
          transition: "left 0.3s",
          zIndex: 1300,
        }}
      >
        <IconButton
          onClick={onToggle}
          sx={{
            backgroundColor: (theme) => theme.palette.primary.main,
            color: "white",
            width: 40,
            height: 40,
            boxShadow: 3,
            "&:hover": {
              backgroundColor: (theme) => theme.palette.primary.dark,
            },
            borderRadius: isOpen ? "0 50% 50% 0" : "0 50% 50% 0",
          }}
        >
          {isOpen ? (
            <IconChevronLeft size={20} />
          ) : (
            <IconChevronRight size={20} />
          )}
        </IconButton>
      </Box>
    </>
  );
};
