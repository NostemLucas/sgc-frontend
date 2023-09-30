import { useEffect } from "react";
import { useConductorStore } from "@/store/conductorStore";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { ConductorFormated } from "@/models/conductor";
import { useSystemOperations } from "@/store/systemStore";
import Divider from '@mui/material/Divider';
import {
  Autocomplete,
  Box,
  Chip,
  DialogActions,
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
import { useDependenciasStore } from "@/store/dependenciaStore";

export default function Form() {
  const {
    data,
    createData,
    selectedData,
    setSelectedData,
    updateData,
  } = useConductorStore();

  const {data:dependencias}=useDependenciasStore();
  const {modalState,setModalState}=useSystemOperations();
  let initialValues: ConductorFormated = {
    nombre: "",
    ci: "",
    licencia: "",
    contacto: "",
    status: true,
  };

  const onSubmit = async (dataConductor:any) => {
    if (!selectedData) {
      try {
        toast.promise(createData(dataConductor), {
          error: "Ocurrio un Error",
          success: "Se creo con exito",
          loading: "Creando Registro....",
        });
       
      } catch {
        console.log("Error");
      }
    } else {
      try {  
       toast.promise(updateData(selectedData.id, dataConductor), {
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
        nombre: selectedData.nombre || "",
        ci: selectedData.ci || "",
        licencia: selectedData.licencia || "",
        contacto: selectedData.contacto || "",
        status: selectedData.status || false,
       });   
    }
  }, [selectedData]);
 
  const validationSchema = yup.object().shape({
    nombre: yup.string().trim().required("El nombre es requerido"),
    ci: yup
      .string()
      .trim()
      .required("El ci es requerido")
      .test("ci-unique", "Este ci ya esta registrado", function (value) {
        if (!selectedData) {
          // No hay datos seleccionados, lo que significa que se está creando un nuevo registro.
          // La validación debe aplicarse normalmente.
          return !data.some((conductor) => conductor.ci === value);
        } else {
          // Hay datos seleccionados, lo que significa que se esta actualizando un registro existente.
          // La validación se omitirá si la placa es igual a la placa actual del registro seleccionado.
          if (value === selectedData.ci) {
            return true; // Omitir validación
          } else {
            return !data.some((conductor) => conductor.ci === value);
          }
        }
      }),
    licencia: yup
      .string()
      .trim()
      .max(30, "La licencia no debe superar los 20 caracteres")
      .required("La licencia es requerida")
      .test("lic-unique", "Este licencia ya esta registrada", function (value) {
        if (!selectedData) {
          // No hay datos seleccionados, lo que significa que se está creando un nuevo registro.
          // La validación debe aplicarse normalmente.
          return !data.some((conductor) => conductor.licencia === value);
        } else {
          // Hay datos seleccionados, lo que significa que se esta actualizando un registro existente.
          // La validación se omitirá si la placa es igual a la placa actual del registro seleccionado.
          if (value === selectedData.licencia) {
            return true; // Omitir validación
          } else {
            return !data.some((conductor) => conductor.licencia === value);
          }
        }
      }),
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
              fullWidth
              type="text"
              label="Ingrese el Nombre"
              variant="outlined"
              name="nombre"
              value={values.nombre}
              onChange={handleChange}
              error={Boolean(errors.nombre)}
              helperText={errors.nombre}
            />
          </Grid>
          <Grid item md={6} sm={12} xs={12}>
            <TextField
              id="txt_ci"
              type="text"
              fullWidth
              label="Ingrese el CI"
              variant="outlined"
              name="ci"
              value={values.ci}
              onChange={handleChange}
              error={Boolean(errors.ci)}
              helperText={errors.ci}
            />
          </Grid>
          <Grid item md={6} sm={12} xs={12}>
            <TextField
              id="txt_licencia"
              type="text"
              label="Ingrese la Licencia"
              variant="outlined"
              fullWidth
              name="licencia"
              value={values.licencia}
              onChange={handleChange}
              error={Boolean(errors.licencia)}
              helperText={errors.licencia}
            />
          </Grid>
          <Grid item md={6} sm={12} xs={12}>
            <TextField
              id="txt_contacto"
              type="text"
              fullWidth
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
        </Grid>
      </Box>

      <Box mt={2}>
        <Divider/>
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
          Cerrar
        </Button>
        </DialogActions>
       
      </Box>
    </form>
  );
}
