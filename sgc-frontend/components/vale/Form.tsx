import Dialog from "@/components/Dialog";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import NumberInput from "../NumberInput";
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
    Divider,
    DialogTitle,
    Checkbox,
  } from "@mui/material";
  import { useFormik } from "formik";
  import * as yup from "yup";
  import { toast } from "sonner";
import { ValeFormated } from "@/models/vale";

//importacion de datos de otras tablas
import { useVehiculoStore } from "@/store/vehiculoStore";
import { useConductorStore } from "@/store/conductorStore";
import { useValeStore } from "@/store/valeStore";

//importamos el accionamiento de Dialogs
import { useSystemOperations } from "@/store/systemStore";
import { useTalonarioStore } from "@/store/talonarioStore";
import { useEffect } from "react";

export default function DialogForm() {
  //recuperamois el dato del talonario 
  const {selectedData:talonarioSelected}= useTalonarioStore();
  //declaramos el estado del dialog
  const { setModalState, modalState } = useSystemOperations();
  //delaramos los store a utilizar
  //renombramos las variable desde el store
  const { data: vehiculos } = useVehiculoStore();
  const { data: conductores } = useConductorStore();

  //declaramos las funciones de vale a utilizar
  const { selectedData, setSelectedData, updateData, createData } =
    useValeStore();
  //valores iniciales del formulario

  let initialValues: ValeFormated = {
    numero: 0,
    kilometraje: 0,
    litros: 0,
    precio: 0,
    tipo: true,
    status: true,
    notas: "",
    talonario: talonarioSelected,
    conductor: null,
    vehiculo: null,
  };
  //metodo on SUbmit
  const onSubmit = async (data: any) => {
    console.log(data)
    if (!selectedData) {
      toast.promise(createData(data), {
        error: "Ocurrio un Error",
        success: "Se creo con exito",
        loading: "Creando Registro....",
      });
      limpiarCampos();
      setModalState(false);
    } else {
      toast.promise(updateData(selectedData.id, data), {
        error: "Ocurrio un Error",
        success: "Se Actulizo con exito",
        loading: "Actualizando Registro....",
      });
    }
  };

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
    validateOnChange: false,
    onSubmit,
  });

  //Metodo personalizado para limpiar 
  function limpiarCampos() {
    setValues({
      ...values,
      kilometraje: 0,
      litros: 0,
      precio: 0,
      tipo: true,
      status: true,
      notas: "",
      conductor: null,
      vehiculo: null,
    });
  }
  useEffect(() => {
    if(talonarioSelected && !selectedData){
        setValues({
            ...values,numero: talonarioSelected.final? talonarioSelected.final+1 : talonarioSelected.inicio,
            talonario:talonarioSelected,
        })
    }

    if (selectedData) {
      setValues({
        numero: selectedData.numero || 0,
        kilometraje: selectedData.kilometraje || 0,
        litros: selectedData.litros || 0,
        precio: selectedData.precio,
        tipo: true,
        status: selectedData.status || true,
        notas: selectedData.notas  || "",
        talonario: selectedData.talonario  || null,
        conductor: selectedData.conductor || null,
        vehiculo: selectedData.vehiculo || null,
      });
    }
  }, [selectedData,talonarioSelected]);
console.log(talonarioSelected)
  return (
    <>
      <Dialog title="Registro de Vehiculo" actions={false}>
        <DialogTitle className=" bg-violet-400 rounded-[15px] text-white">
          {selectedData ? "Editar Vale" : "Registrar Vale"}
        </DialogTitle>
        <form onSubmit={handleSubmit} className=" p-4">
          <Box mt={2}>
            <Grid container spacing={{ xs: 2, md: 3 }}>
              <Grid item md={6} sm={12} xs={12}>
                <TextField
                  id="txt_placa"
                  type="text"
                  label="Numero de vale"
                  fullWidth
                  disabled
                  variant="outlined"
                  name="numero"
                  value={values.numero}
                  onChange={handleChange}
                  error={Boolean(errors.numero)}
                  helperText={errors.numero}
                />
              </Grid>
              <Grid item md={6} sm={12} xs={12}>
                <Autocomplete
                  id="tags-outlined"
                  options={vehiculos}
                  fullWidth
                  value={values.vehiculo}
                  onChange={(_, newValue) => {
                    setFieldValue("vehiculo", newValue);
                    if (newValue) {
                      const nuevoPrecio = newValue.combustible?.precio; // Supongamos que 'precio' es un campo del vehiculo
                      setFieldValue("precio", nuevoPrecio);
                    } else {
                      // Si no se selecciona ningún vehículo, puedes establecer el precio en 0 o el valor que desees
                      setFieldValue("precio", 0);
                    }
                  }}
                  isOptionEqualToValue={(option, value) =>
                    option.id === value.id
                  }
                  filterSelectedOptions
                  getOptionLabel={(option) => option.placa}
                  renderOption={(props, option) => (
                    <li {...props} key={option.id}>
                      {option.placa}
                    </li>
                  )}
                  renderTags={(tagValue, getTagProps) =>
                    tagValue.map((option, index) => (
                      <Chip
                        {...getTagProps({ index })}
                        key={option.id}
                        label={option.placa}
                      />
                    ))
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Selecione el Vehiculo"
                      placeholder="Vehiculo"
                      error={Boolean(errors.vehiculo)}
                      helperText={errors.vehiculo}
                    />
                  )}
                />
              </Grid>
              <Grid item md={6} sm={12} xs={12}>
                <Autocomplete
                  id="tags-conductores"
                  options={conductores}
                  fullWidth
                  value={values.conductor}
                  onChange={(_, newValue) => {
                    setFieldValue("conductor", newValue);
                  }}
                  isOptionEqualToValue={(option, value) =>
                    option.id === value.id
                  }
                  filterSelectedOptions
                  getOptionLabel={(option) => option.ci}
                  renderOption={(props, option) => (
                    <li {...props} key={option.id}>
                      {option.ci}
                    </li>
                  )}
                  renderTags={(tagValue, getTagProps) =>
                    tagValue.map((option, index) => (
                      <Chip
                        {...getTagProps({ index })}
                        key={option.id}
                        label={option.ci}
                      />
                    ))
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Selecione el Conductor"
                      placeholder="Conductor"
                      error={Boolean(errors.conductor)}
                      helperText={errors.conductor}
                    />
                  )}
                />
              </Grid>
              <Grid item md={6} sm={12} xs={12}>
                <NumberInput
                  key={"txt_kilometraje"}
                  name="kilometraje"
                  label="Ingrese el Kilometraje"
                  disable={false}
                  value={values.kilometraje}
                  onChange={(e: any) => {
                    const newValue = parseFloat(e.target.value);
                    setFieldValue(
                      "kilometraje",
                      isNaN(newValue) ? 0 : newValue
                    );
                  }}
                  error={Boolean(errors.precio)}
                  helperText={errors.precio}
                />
              </Grid>
              <Grid item md={6} sm={12} xs={12}>
                <NumberInput
                  key={"txt_litros"}
                  name="litros"
                  label="Ingrese cantidad de Litros"
                  disable={false}
                  value={values.litros}
                  onChange={(e: any) => {
                    const newValue = parseFloat(e.target.value);
                    setFieldValue("litros", isNaN(newValue) ? 0 : newValue);
                  }}
                  error={Boolean(errors.litros)}
                  helperText={errors.litros}
                />
              </Grid>
              <Grid item md={6} sm={12} xs={12}>
                <NumberInput
                  key={"txt_precio"}
                  name="precio"
                  label="Precio de compra"
                  disable={true}
                  value={values.precio}
                  onChange={(e: any) => {
                    const newValue = parseFloat(e.target.value);
                    setFieldValue("precio", isNaN(newValue) ? 0 : newValue);
                  }}
                  error={Boolean(errors.precio)}
                  helperText={errors.precio}
                />
              </Grid>

        
              <Grid item md={12} sm={12} xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={values.tipo} // El valor de 'tipo' debe ser 'true' o 'false'
                      onChange={(e) => {
                        // Cambia el valor de 'tipo' cuando se cambia el estado del checkbox
                        setFieldValue("tipo", e.target.checked);
                      }}
                    />
                  }
                  label="Si el vale de compra es para vehiculo deja marcada esta opcion" // Puedes ajustar la etiqueta según tus necesidades
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
                  limpiarCampos();
                }}
              >
                Cerrar
              </Button>
            </DialogActions>
          </Box>
        </form>
      </Dialog>
    </>
  );
}
