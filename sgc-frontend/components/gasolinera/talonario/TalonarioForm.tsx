import Button from "@mui/material/Button";
import { useFormik } from "formik";
import * as yup from "yup";
import { toast } from "sonner";
import NumberInput from "../../NumberInput";
import { TalonarioFormated } from "@/models/talonario";
import { useTalonarioStore } from "@/store/talonarioStore";
import { useGasStationStore } from "@/store/gasSationStore";
import { Grid } from "@mui/material";

export default function  CombustibleForm() {
    //datos del la gasolinera
    const {
        selectedData:gasolineraSelected,searchData,getData
      } = useGasStationStore();
      
    //datos del talonario
    const {
    createData
  } = useTalonarioStore();
  
  let initialValues:TalonarioFormated= {
    inicio:0,
    gasolinera:gasolineraSelected,
    status:true,
  };

  const onSubmit= async (dataTalonario:any) => {
    if (gasolineraSelected) {
      try {  
        await createData(dataTalonario), 
        toast.success("se creo con exito")
        await searchData(gasolineraSelected.id)
        await getData();
        resetForm();
      } catch {
        console.log("Error");
      }
    }
  };


  const validationSchema = yup.object().shape({
    inicio: yup.number().positive("EL valor es requerido y debe ser mayor a 0").required("El valor es requerido"),
  });

  const {
    handleSubmit,
    setFieldValue,
    values,
    errors,
    resetForm,
  } = useFormik({
    initialValues,
    validationSchema,
    validateOnChange: false,
    onSubmit,
  });
 
  return (
    <form onSubmit={handleSubmit} className="w-full">
      <Grid container spacing={2} className=" mt-1 ">
        <Grid item xs={12} md={6} sm={6}>
          <NumberInput
            key={"txt_inicio"}
            name="inicio"
            label="Ingrese la nueva Numeración"
            disable={false}
            value={values.inicio}
            onChange={(e: any) => {
              const newValue = parseInt(e.target.value);
              setFieldValue("inicio", isNaN(newValue) ? 0 : newValue);
            }}
            error={Boolean(errors.inicio)}
            helperText={errors.inicio}
          />
        </Grid>
        <Grid item container xs={12} md={6} sm={6} spacing={2} >
          <Grid item xs={12} md={6} sm={6}>
            <Button
              fullWidth
              variant="contained"
              className=" bg-lime-600"
              color="success"
              type="submit"
            >
              Crear
            </Button>
          </Grid>
          <Grid item xs={12} md={6} sm={6}>
            <Button
              type="reset"
              variant="outlined"
              fullWidth
              color="error"
              onClick={() => {
                
                resetForm();
              }}
            >
              Cancelar
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
}
