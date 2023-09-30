import { useEffect } from "react";
import { useGasStationStore } from "@/store/gasSationStore";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import { GasolineraFormated } from "@/models/gasolinera";
import { departamentos } from "@/data/departamentos";
import { useSystemOperations } from "@/store/systemStore";

import {
  Autocomplete,
  Box,
  Chip,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
} from "@mui/material";

import { useFormik } from "formik";
import * as yup from "yup";
import { toast } from "sonner";

export default function  GasStationForm() {
  const {
    createData,
    selectedData,
    setSelectedData,
    updateData,
  } = useGasStationStore();

const {
    modalState,
    setModalState,
} = useSystemOperations();

  let initialValues:GasolineraFormated = {
    nombre:"",
    departamento:"",
    direccion:"",
    nit:"",
    contacto: "",
    status:true,
    notas:"",
  };
 
  const onSubmit = async (dataGasStation:any) => {
    if (!selectedData) {
      try {
        toast.promise(createData(dataGasStation), {
          error: "Ocurrio un Error",
          success: "Se creo con exito",
          loading: "Creando Registro....",
        });
      } catch {
        console.log("Error");
      }
    } else {
      try {  
       toast.promise(updateData(selectedData.id, dataGasStation), {
          error: "Ocurrio un Error",
          success: "Se Actulizo con exito",
          loading: "Actualizando Registro....",
        });
      } catch {
        console.log("Error");
      }
    }
  };

  useEffect(() => {
    if (selectedData) {
      setValues({
        nombre: selectedData.nombre,
        departamento: selectedData.departamento,
        direccion: selectedData.direccion || "",
        nit: selectedData.nit || "",
        contacto: selectedData.contacto || "",
        status: selectedData.status || true,
        notas: selectedData.notas || "",
      });   
    }
  }, [selectedData]);
 
  const validationSchema = yup.object().shape({
    nombre: yup.string().trim().required("El nombre es requerido"),
    departamento: yup.string().trim().required("El departamento es requerido") ,
    direccion:yup.string().trim().max(50, "La direccion no puede sobrepasar los caracteres"),
    nit:yup.string().trim(),
    contacto: yup.string().trim(),
    status: yup.boolean().required("El estado es requerido"),
  });

  const {
    handleSubmit,
    setFieldValue,
    handleChange,
    setValues,
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
    <form onSubmit={handleSubmit}>
      <Box mt={2}>
        <Grid container spacing={{ xs: 2, md: 3 }}>
          <Grid item md={6} sm={12} xs={12}>
            <TextField
              id="txt_nombre"
              type="text"
              label="Ingrese el Nombre"
              variant="outlined"
              name="nombre"
              fullWidth
              value={values.nombre}
              onChange={handleChange}
              error={Boolean(errors.nombre)}
              helperText={errors.nombre}
            />
          </Grid>
          <Grid item md={6} sm={12} xs={12}>
            <TextField
              id="txt_nit"
              type="text"
              label="Ingrese el NIT"
              variant="outlined"
              fullWidth
              name="nit"
              value={values.nit}
              onChange={handleChange}
              error={Boolean(errors.nit)}
              helperText={errors.nit}
            />
          </Grid>
          <Grid item md={6} sm={12} xs={12}>
            <TextField
              id="txt_direccion"
              type="text"
              label="Ingrese la Direccion"
              fullWidth
              variant="outlined"
              name="direccion"
              value={values.direccion}
              onChange={handleChange}
              error={Boolean(errors.direccion)}
              helperText={errors.direccion}
            />
          </Grid>
          <Grid item md={6} sm={12} xs={12}>
            <TextField
              id="txt_contacto"
              fullWidth
              type="text"
              label="Numero de Telefono"
              variant="outlined"
              name="contacto"
              value={values.contacto}
              onChange={handleChange}
              error={Boolean(errors.contacto)}
              helperText={errors.contacto}
            />
          </Grid>
          <Grid item md={6} sm={12} xs={12}>
            <Autocomplete
              id="tags-outlined"
              options={departamentos}
              fullWidth
              value={values.departamento}
              freeSolo
              onChange={(_, newValue) => {
                setFieldValue("departamento", newValue);
              }}
              filterSelectedOptions
              renderOption={(props, option) => (
                <li {...props} key={option}>
                  {option}
                </li>
              )}
              renderTags={(tagValue, getTagProps) =>
                tagValue.map((option, index) => (
                  <Chip
                    {...getTagProps({ index })}
                    key={option}
                    label={option}
                  />
                ))
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Selecione Departamento"
                  placeholder="Departamento"
                  error={Boolean(errors.departamento)}
                  helperText={errors.departamento}
                />
              )}
            />
          </Grid>
          <Grid item md={6} sm={12} xs={12}>
            <FormControl className=" w-full">
              <FormLabel id="estado-label">Estado</FormLabel>
              <RadioGroup
                aria-label="estado-label"
                className=" justify-center"
                name="status"
                value={values.status ? "true" : "false"}
                onChange={(e) => {
                  setFieldValue("status", e.target.value === "true");
                }}
                row
              >
                <FormControlLabel
                  value={"true"}
                  control={<Radio />}
                  label="Activo"
                  labelPlacement="end"
                />
                <FormControlLabel
                  value={"false"}
                  control={<Radio />}
                  label="Inactivo"
                  labelPlacement="end"
                />
              </RadioGroup>
            </FormControl>
          </Grid>

          <Grid item md={12} sm={12} xs={12}>
            <TextField
              id="txt_notas"
              type="text"
              fullWidth
              name="notas"
              value={values.notas}
              onChange={handleChange}
              error={Boolean(errors.notas)}
              helperText={errors.notas}
              label="Notas"
              multiline
              rows={4}
            />
          </Grid>
        </Grid>
      </Box>
     
      <DialogActions> 
        <Button type="submit" onClick={() => {}}>
          {selectedData ? "Actualizar" : "Crear"}
        </Button>
        <Button
          type="reset"
          onClick={() => {
            setModalState(!modalState);
            setSelectedData(null);
            resetForm();
          }}
        >
          Cancelar
        </Button>
      </DialogActions>
    </form>
  );
}
