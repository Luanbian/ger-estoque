import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Collapse,
} from "@mui/material";
import {
  IconChevronLeft,
  IconChevronRight,
  IconHome,
  IconCategory,
  IconStack3Filled,
  IconReportMoney,
  IconLockFilled,
  IconShoppingBag,
  IconGardenCart,
  IconUsers,
  IconBrandCashapp,
  IconWorldPin,
  IconDeviceLaptop,
  IconLibrary,
} from "@tabler/icons-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { Features } from "../../../features/common/featuresEnum";

interface Props {
  isOpen: boolean;
  onToggle: () => void;
  sidebarWidth: number;
  features: Record<Features, string | boolean | number>;
}

interface IMenuItem {
  text: string;
  icon: React.ReactNode;
  path: string;
  planIcon?: React.ReactNode;
  children?: IMenuItem[];
}

export const SidebarComponent = ({
  isOpen,
  onToggle,
  sidebarWidth,
  features,
}: Props) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems: IMenuItem[] = [
    {
      text: "Início",
      icon: <IconHome />,
      path: "/",
    },
    {
      text: "Vitrine",
      icon: <IconWorldPin />,
      path: "/showcase",
      children: [
        {
          text: "Visualização",
          icon: <IconDeviceLaptop />,
          path: "/showcase",
        },
        {
          text: "Catalogo",
          icon: <IconLibrary />,
          path: "/catalog",
        },
      ],
    },
    {
      text: "PDV",
      icon: <IconGardenCart />,
      path: "/pdv",
      children: [
        {
          text: "Nova Venda",
          icon: <IconBrandCashapp />,
          path: "/sale",
        },
        {
          text: "Produtos",
          icon: <IconStack3Filled />,
          path: "/stock",
        },
        {
          text: "Categorias",
          icon: <IconCategory />,
          path: "/category",
        },
        {
          text: "Vendas",
          icon: <IconShoppingBag />,
          path: "/sales",
          planIcon: !features[Features.SALES_REPORTS] ? (
            <IconLockFilled color="gray" />
          ) : null,
        },
      ],
    },
    {
      text: "Financeiro",
      icon: <IconReportMoney />,
      path: "/finance",
      planIcon: !features[Features.FINANCIAL_DASHBOARD] ? (
        <IconLockFilled color="gray" />
      ) : null,
    },
    {
      text: "Clientes",
      icon: <IconUsers />,
      path: "/customers",
      planIcon: !features[Features.CUSTOMER_MANAGEMENT] ? (
        <IconLockFilled color="gray" />
      ) : null,
    },
  ];

  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>(() => {
    const init: Record<string, boolean> = {};
    menuItems.forEach((m) => {
      if (m.children && m.children.some((c) => c.path === location.pathname)) {
        init[m.text] = true;
      }
    });
    return init;
  });

  const toggleMenu = (key: string) =>
    setOpenMenus((prev) => ({ ...prev, [key]: !prev[key] }));

  const handleNavigation = (path: string) => {
    navigate(path);
  };

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
            {menuItems.map((item) => {
              const hasChildren = !!item.children && item.children.length > 0;
              const isActiveParent =
                location.pathname === item.path ||
                (hasChildren &&
                  item.children!.some((c) => c.path === location.pathname));

              return (
                <Box key={item.text}>
                  <ListItem disablePadding>
                    <ListItemButton
                      selected={isActiveParent}
                      onClick={() =>
                        hasChildren
                          ? toggleMenu(item.text)
                          : handleNavigation(item.path)
                      }
                      sx={{
                        paddingInline: 0,
                        alignItems: "center",
                        "&.Mui-selected": {
                          backgroundColor: (theme) =>
                            theme.palette.primary.main,
                          color: "white",
                          "&:hover": {
                            backgroundColor: (theme) =>
                              theme.palette.primary.dark,
                          },
                          "& .MuiListItemIcon-root": {
                            color: "white",
                          },
                        },
                      }}
                    >
                      <Box
                        display={"flex"}
                        alignItems="center"
                        width="100%"
                        justifyContent={"space-between"}
                      >
                        <Box display="flex" alignItems="center" gap={1}>
                          <ListItemIcon>{item.icon}</ListItemIcon>
                          <ListItemText primary={item.text} />
                        </Box>

                        <Box display="flex" alignItems="center" gap={1}>
                          {item.planIcon && (
                            <ListItemIcon>{item.planIcon}</ListItemIcon>
                          )}
                          {hasChildren && (
                            <Box sx={{ pr: 1 }}>
                              <IconChevronRight
                                size={16}
                                style={{
                                  transform: openMenus[item.text]
                                    ? "rotate(90deg)"
                                    : "rotate(0deg)",
                                  transition: "transform 0.18s",
                                }}
                              />
                            </Box>
                          )}
                        </Box>
                      </Box>
                    </ListItemButton>
                  </ListItem>

                  {hasChildren && (
                    <Collapse
                      in={!!openMenus[item.text]}
                      timeout="auto"
                      unmountOnExit
                    >
                      <List component="div" disablePadding>
                        {item.children!.map((child) => (
                          <ListItem key={child.text} disablePadding>
                            <ListItemButton
                              selected={location.pathname === child.path}
                              onClick={() => handleNavigation(child.path)}
                              sx={{
                                paddingInline: 0,
                                alignItems: "center",
                                pl: 4,
                                "&.Mui-selected": {
                                  backgroundColor: (theme) =>
                                    theme.palette.primary.main,
                                  color: "white",
                                  "&:hover": {
                                    backgroundColor: (theme) =>
                                      theme.palette.primary.dark,
                                  },
                                  "& .MuiListItemIcon-root": {
                                    color: "white",
                                  },
                                },
                              }}
                            >
                              <Box
                                display="flex"
                                alignItems="center"
                                width="100%"
                                justifyContent="space-between"
                              >
                                <Box display="flex" alignItems="center" gap={1}>
                                  <ListItemIcon>{child.icon}</ListItemIcon>
                                  <ListItemText primary={child.text} />
                                </Box>
                                {child.planIcon && (
                                  <ListItemIcon>{child.planIcon}</ListItemIcon>
                                )}
                              </Box>
                            </ListItemButton>
                          </ListItem>
                        ))}
                      </List>
                    </Collapse>
                  )}
                </Box>
              );
            })}
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
