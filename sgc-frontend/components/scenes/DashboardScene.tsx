import { Box } from "@mui/material";
import Cards from "../dashboard/Cards";
import Panel from "../dashboard/Panel";

export default function DashboardScene() {
  
  return (
    <Box
      component="main"
      sx={{ flexGrow: 1 }}
    >
      <Cards/>
      <Panel/> 
    </Box>
  );
}
