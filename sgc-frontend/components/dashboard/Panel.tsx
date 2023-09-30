
import { Card, CardContent, Grid } from "@mui/material";
import { useTalonarioStore } from "@/store/talonarioStore";
import { useEffect } from "react";
import Typography from '@mui/material/Typography';
import StorefrontIcon from "@mui/icons-material/Storefront";
import CardVale from "./talonarios/CardVale";

export default function Panel() {

const {getData,data}=useTalonarioStore();

useEffect(()=>{
getData();
},[]);
return (
  <>
    <Grid container spacing={2} className=" h-[70vh] mt-1 overflow-hidden">
      <Grid item xs={12} sm={12} md={6} className="">
        <Card className=" p-4 rounded-[15px]">
          <Typography variant="h6" color="text.primary" gutterBottom>
            Registro de Vale de Compra
          </Typography>
          {data.map((talonario) => (
            <CardVale 
              key={talonario.id + talonario.inicio}
              talonario={talonario}
            />
          ))}
        </Card>
      </Grid>
      <Grid item xs={12} sm={12} md={6}>
        <Card className=" min-h-[100%] rounded-[15px] p-2">
          <CardContent></CardContent>
        </Card>
      </Grid>
    </Grid>
  </>
);
}
