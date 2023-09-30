import SideBar from "./SideBar"
import Navbar from "./Navbar"
import { Toaster} from "sonner";
//Iconos del Sidenav
import DriveEtaIcon from "@mui/icons-material/DriveEta";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import PersonIcon from "@mui/icons-material/Person";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import ReceiptIcon from "@mui/icons-material/Receipt";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import SettingsIcon from "@mui/icons-material/Settings";
import BarChartIcon from "@mui/icons-material/BarChart";

export default function Bar({children}: {children: React.ReactNode}) {

    //Configuracioon Del Nabvar y Sidebar
    const cruds=[
      {
        text: "Vehículos",
        icon: <DriveEtaIcon sx={{ color: "#fff" }} className=" mr-3"/>,
        route: "/vehiculo",
      },
      
      {
        text: "Conductores",
        icon: <PersonIcon sx={{ color: "#fff" }} className=" mr-3"/>,
        route: "/conductor",
      },
      {
        text: "Gasolineras",
        icon: <LocalGasStationIcon sx={{ color: "#fff" }} className=" mr-3"/>,
        route: "/gasolinera",
      },
    
    ]
    const operations = [
      {
        text: "Facturas",
        icon: <ReceiptIcon sx={{ color: "#fff" }} className=" mr-3"/>,
        route: "/factura",
      },
      { text: "Vales", icon: <LocalMallIcon sx={{ color: "#fff" }} className=" mr-3"/>, route: "/vale" },
      {
        text: "Configuración",
        icon: <SettingsIcon sx={{ color: "#fff" }} className=" mr-3"/>,
        route: "/configuracion",
      },
      {
        text: "Reportes",
        icon: <BarChartIcon sx={{ color: "#fff" }} className=" mr-3"/>,
        route: "/reporte",
      },
    ]
    const reports = [];
 
    const title="SIGECOM";
    
  return (
    <>
      <Navbar />
      <Toaster />
      <SideBar title={title}  operations={operations} cruds={cruds}>
        {children}
      </SideBar>
    </>
  );
}
