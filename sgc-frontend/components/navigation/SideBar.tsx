import {useEffect, useState} from "react";
import { styled, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import CropSquareIcon from "@mui/icons-material/CropSquare";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useSystemOperations } from "@/store/systemStore";
import Link from "next/link";
import { useMediaQuery } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import ListItemComponent from "./ListItemComponent";

interface Model {
  text:string,
  icon:any,
  route:string,
}

interface SidebarProps {
  children: React.ReactNode;
  title: string,
  cruds : Model[],
  operations : Model[],
}

const openedMixin = (theme: Theme): CSSObject => ({
  width: 300,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
  borderRight: "none",
  backgroundColor:"#222222"
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 9px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
  borderRight: "none",
  backgroundColor:"#222222",
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),

  ...theme.mixins.toolbar,
}));
const LogoDrawer = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor:"#1E88E5", 
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: 240,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",

  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));


export default function SideBar({
  children,
  title,
  cruds,
  operations,
  
}: SidebarProps) {

  const {open,setStateSideBar}=useSystemOperations();

  const isSmallScreen = useMediaQuery("(max-width:700px)");
  
  useEffect(() => {
    if (isSmallScreen) {
      setStateSideBar(false); // Cambiamos el estado open a false en pantallas pequeñas
    } else {
      setStateSideBar(true); // Mantenemos el estado open en true en pantallas grandes
    }
  }, [isSmallScreen]);
  return (
    <Box sx={{ display: "flex", position: "relative" }}>
      <CssBaseline />
      {isSmallScreen && open && (
        // Capa de fondo semitransparente
        <div className=" fixed top-0 left-0 h-full w-full bg-black opacity-50 z-50"></div>
      )}
      <Drawer
        variant="permanent"
        open={open}
        sx={{ position: isSmallScreen ? "absolute" : "block" }}
      >
        <LogoDrawer>
          <ListItem key={"DDS"} disablePadding sx={{ display: "block" }}>
            <Link href={"#"}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <CropSquareIcon />
                </ListItemIcon>
                <ListItemText
                  primary={title}
                  primaryTypographyProps={{
                    variant: "h5",
                    fontWeight: "bold",
                    color: "#fff",
                  }}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </Link>
          </ListItem>
        </LogoDrawer>

        <List>
          <div className=" w-full  p-2 flex justify-center items-center">
            <Link href={"/"}>
              <a className=" w-[80%]  bg-slate-100 rounded-[15px] p-2 flex justify-start items-center">
                <HomeIcon className=" mr-3" />
                <p className=" font-medium">Dashboard</p>
              </a>
            </Link>
          </div>
          <Divider
            variant="middle"
            sx={{ backgroundColor: "#fff" }}
            className=" mt-2 mb-2"
          />
          {open && (
            <div className="ml-4 mt-4 mb-2 font-medium text-white delay-[2000]">
              Operaciones
            </div>
          )}

          {operations.map(({ text, icon, route }, index) => (
            <ListItemComponent
              text={text}
              icon={icon}
              route={route}
              key={text}
            />
          ))}
        </List>
        <Divider variant="middle" sx={{ backgroundColor: "#fff" }} />
        {open && (
          <div className="ml-4 mt-4 mb-2 font-medium text-white delay-[2000]">
            Adiciones
          </div>
        )}

        <List>
          {cruds.map(({ text, icon, route }, index) => (
            <ListItemComponent
              text={text}
              icon={icon}
              route={route}
              key={text}
            />
          ))}
        </List>
      </Drawer>
      {isSmallScreen && <div className="w-[72px]"></div>}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: "100%",
          overflowX: "auto",
          overflowY: "auto",
        }}
        className="bg-[#f3f3f3] bg-gradient-to-tl from-gray-300 to-blue-50  min-h-screen h-full w-full"
      >
        <DrawerHeader />
        {children}
      </Box>
    </Box>
  );
}
