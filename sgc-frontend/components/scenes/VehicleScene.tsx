//importacion de Componetes De Material
import { Box, Grid, Typography,Button, Chip,IconButton, Stack} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
//Importacion de COmponetes Propios

import  Breadcumb from "@/components/navigation/Breadcumb";
//Importacion de utils
import { useVehiculoStore } from "@/store/vehiculoStore";
import  DialogForm  from "@/components/vehiculo/DialogForm"
import { useSystemOperations } from "@/store/systemStore";
import { useCombustiblesStore } from "@/store/combustibleStore";
import { useEffect } from "react";
import DataGrid from "../vehiculo/DataGridVehicle";
import { useDependenciasStore } from "@/store/dependenciaStore";
export default function VehicleScene() {
  //Llamamos al contexto
const {
    getData
  } = useVehiculoStore();

const{
  getData:getCombustibles
}=useCombustiblesStore();

const {
  getData:getDependencias
} = useDependenciasStore();

//Contexto del DIalog
const { modalState, setModalState } = useSystemOperations();
  
  //columnas de la tabla
  
  useEffect(() => {
    getData();
    getCombustibles();
    getDependencias();
  }, []);

  return (
    <Box component="main" sx={{ flexGrow: 1 }}>
     <DialogForm/>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="flex-start"
      >
        <Grid item xs={12} sm={8} md={8} >
          <Typography
            gutterBottom
            variant="h4"
            component="div"
            sx={{ color: "#2e2e2e" }}
          >
            Lista de Vehiculos
          </Typography>
          <Breadcumb text={"Conductores"}></Breadcumb>
        </Grid>
        <Grid item xs={12} sm={4} md={4}>
          <Stack spacing={2} justifyContent={"center"} alignItems={{sm: 'flex-end', md:'flex-end',}} height={{md:'80px', sm:'80px',xs:'50px'}}>
            <Button
              variant="contained"
              color="primary"
              className=" bg-[#2183CF]"
              endIcon={<AddIcon />}
              onClick={(e) => setModalState(!modalState)}
            >
              Nuevo
            </Button>
          </Stack>
        </Grid>
        <Grid item xs={12} sm={12} md={12} mt={2}>
          <DataGrid/>
        </Grid>
      </Grid>
    </Box>
  );
}
