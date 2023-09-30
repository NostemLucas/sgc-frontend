//importacion de Componetes De Material
import { Box, Grid, Typography,Button,Stack, Paper} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
//Importacion de COmponetes Propios
import DialogForm from "../vale/Form";
import  Breadcumb from "@/components/navigation/Breadcumb";
//Importacion de utils
import { useSystemOperations } from "@/store/systemStore";
import DataGrid from "../vale/Datagrid";
import { useEffect } from "react";
//IMportacion de metodos core
import { useValeStore } from "@/store/valeStore";
import { useTalonarioStore } from "@/store/talonarioStore";

//importacion de metodos para busquedad de datos
import {useVehiculoStore} from "@/store/vehiculoStore";
import { useConductorStore } from "@/store/conductorStore";

interface Props{
talonarioId:string;
}

export default function ValeScene({talonarioId}:Props) {
const { modalState, 
setModalState,} = useSystemOperations();
const {getData,selectedData} = useValeStore();

const {searchData,selectedData:talonarioSelected}=useTalonarioStore();

//declaramo la importacinon para la lista de vehiculos y conductores

const {getData:getVehicles} = useVehiculoStore();
const {getData:getConductors} = useConductorStore();

useEffect(() => {
  console.log(talonarioSelected)
  searchData(parseInt(talonarioId));
  getData(parseInt(talonarioId));
  getVehicles();
  getConductors();
}, []);
console.log(talonarioSelected)

  return (
    <Box component="main" sx={{ flexGrow: 1 }}>
    <DialogForm/>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="flex-start"
      >
        <Grid item xs={12} sm={8} md={8}>
          <Typography
            gutterBottom
            variant="h4"
            component="div"
            sx={{ color: "#2e2e2e" }}
          >
            {talonarioSelected?.gasolinera?.nombre}
          </Typography>
          <Breadcumb text={"Vale"}/>
        </Grid>
        <Grid item xs={12} sm={4} md={4}>
          <Stack
            spacing={2}
            justifyContent={"center"}
            alignItems={{ sm: "flex-end", md: "flex-end" }}
            height={{ md: "80px", sm: "80px", xs: "50px" }}
          >
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
      </Grid>
      <Box width={"100%"} marginTop={2}>
        <Paper elevation={2} sx={{ borderRadius: '16px',overflow:"hidden"}}>
        <DataGrid/>
        </Paper>
      </Box>
    </Box>
  );
}
