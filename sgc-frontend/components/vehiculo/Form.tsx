import { useEffect } from "react";
import { useCombustiblesStore } from "@/store/combustibleStore";
import { useVehiculoStore } from "@/store/vehiculoStore";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import { useSystemOperations } from "@/store/systemStore";
import { dependencias } from "@/data/dependencias";
import { tipos } from "@/data/tipos";
import Divider from '@mui/material/Divider';
import { VehiculoFormated } from "@/models/vehiculo";
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
import { useDependenciasStore } from "@/store/dependenciaStore";

export default function Form() {
  const {
    data,
    createData,
    selectedData,
    setSelectedData,
    updateData,
  } = useVehiculoStore();

  const { data: combustibles } = useCombustiblesStore();
  const { data: dependencias } = useDependenciasStore();
  const {modalState,setModalState}=useSystemOperations();

  let initialValues:VehiculoFormated = {
    placa: "",
    marca: "",
    combustible: null,  
    tipo: "",
    dependencia: null,
    status: true,
    notas: "",
  };

  const sendBackend = async (data: any) => {
    if (!selectedData) {
    
      toast.promise(createData(data), {
        error: "Ocurrio un Error",
        success: "Se creo con exito",
        loading: "Creando Registro....",
      });

    } else {

      toast.promise(updateData(selectedData.id, data), {
        error: "Ocurrio un Error",
        success: "Se Actulizo con exito",
        loading: "Actualizando Registro....",
      });

    }
  };

  useEffect(() => {
    if (selectedData) {
      setValues({
        placa: selectedData.placa,
        marca: selectedData.marca || "",
        combustible: selectedData.combustible || null,
        tipo: selectedData.tipo || "",
        dependencia: selectedData.dependencia || null,
        status: selectedData.status || false,
        notas: selectedData.notas || "",
      });
    }
  }, [selectedData]);

  const validationSchema = yup.object().shape({
    placa: yup
      .string()
      .trim()
      .required("La placa es requerida")
      .test("placa-unique", "Esta placa ya existe", function (value) {
        if (!selectedData) {
          // No hay datos seleccionados, lo que significa que se está creando un nuevo registro.
          // La validación debe aplicarse normalmente.
          return !data.some((vehiculo) => vehiculo.placa === value);
        } else {
          // Hay datos seleccionados, lo que significa que se esta actualizando un registro existente.
          // La validación se omitirá si la placa es igual a la placa actual del registro seleccionado.
          if (value === selectedData.placa) {
            return true; // Omitir validación
          } else {
            return !data.some((vehiculo) => vehiculo.placa === value);
          }
        }
      }),
    marca: yup
      .string()
      .trim()
      .max(20, "La marca no debe superar los 20 caracteres"),
    combustible: yup.object().required("El tipo de Combustible es Requerido"),
    tipo: yup.string(),
    dependencia: yup.object().required("La dependencia es requerida"),
    status: yup.boolean().required("El estado es Requerido"),
    notas: yup.string().trim(),
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
    onSubmit: sendBackend,
  });
  return (
    <form onSubmit={handleSubmit}>
      <Box mt={2}>
        <Grid container spacing={{ xs: 2, md: 3 }}>
          <Grid item md={6} sm={12} xs={12}>
            <TextField
              id="txt_placa"
              type="text"
              label="Ingrese la Placa"
              fullWidth
              variant="outlined"
              name="placa"
              value={values.placa}
              onChange={handleChange}
              error={Boolean(errors.placa)}
              helperText={errors.placa}
            />
          </Grid>
          <Grid item md={6} sm={12} xs={12}>
            <TextField
              id="txt_marca"
              type="text"
              fullWidth
              label="Ingrese la Marca"
              variant="outlined"
              name="marca"
              value={values.marca}
              onChange={handleChange}
              error={Boolean(errors.marca)}
              helperText={errors.marca}
            />
          </Grid>

          <Grid item md={6} sm={12} xs={12}>
            <Autocomplete
              id="tags-outlined"
              fullWidth
              options={tipos}
              freeSolo
              filterSelectedOptions
              value={values.tipo}
              onInputChange={(_, newValue) => {
                setFieldValue("tipo", newValue);
              }}
              onChange={(_, newValue) => {
                setFieldValue("tipo", newValue);
              }}
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
                  label="Tipo de Vehiculo"
                  placeholder="Tipo"
                  error={Boolean(errors.tipo)}
                  helperText={errors.tipo}
                />
              )}
            />
          </Grid>

          <Grid item md={6} sm={12} xs={12}>
            <Autocomplete
              id="tags-outlined"
              options={dependencias}
              fullWidth
              value={values.dependencia}
           
              onChange={(_, newValue) => {
                setFieldValue("dependencia", newValue);
              }}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              filterSelectedOptions
              getOptionLabel={(option) => option.nombre}
              renderOption={(props, option) => (
                <li {...props} key={option.id}>
                  {option.nombre}
                </li>
              )}
              renderTags={(tagValue, getTagProps) =>
                tagValue.map((option, index) => (
                  <Chip
                    {...getTagProps({ index })}
                    key={option.id}
                    label={option.nombre}
                  />
                ))
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Selecione Dependencia"
                  placeholder="Dependencia"
                  error={Boolean(errors.dependencia)}
                  helperText={errors.dependencia}
                />
              )}
            />
          </Grid>
          <Grid item md={6} sm={12} xs={12}>
            <FormControl className=" w-full">
              <FormLabel id="combustible-label">Combustible</FormLabel>
              <RadioGroup
                aria-label="Combustible-label"
                className="justify-center"
                name="combustible_id"
                value={
                  values.combustible ? values.combustible.id.toString() : ""
                }
                row
                onChange={(e) => {
                  const selectedCombustibleId = e.target.value;
                  const selectedCombustible = combustibles.find(
                    (option) => option.id.toString() === selectedCombustibleId
                  );
                  setFieldValue("combustible", selectedCombustible || {}); // Establece el objeto de combustible seleccionado
                }}
              >
                {combustibles.map((option) => (
                  <FormControlLabel
                    key={option.id + option.nombre}
                    value={option.id.toString()}
                    control={<Radio />}
                    label={option.nombre}
                    labelPlacement="end"
                  />
                ))}
              </RadioGroup>
            </FormControl>
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
              name="notas"
              fullWidth
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
      <Box mt={2}>
        <Divider />

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
