import { useEffect } from "react";
import { useCombustiblesStore } from "@/store/combustibleStore";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useFormik } from "formik";
import * as yup from "yup";
import { toast } from "sonner";
import { CombustibleFormated } from "@/models/combustible";
import { useSystemOperations } from "@/store/systemStore";
import NumberInput from "../NumberInput";


export default function  CombustibleForm() {
  const {
    selectedData,
    setSelectedData,
    updateData,
  } = useCombustiblesStore();

const {modalState,setModalState}=useSystemOperations();

  let initialValues:CombustibleFormated= {
    nombre:"",
    precio:0
  };
  const onSubmit2= async (dataCombustible:any) => {
   console.log(dataCombustible)
  };
  const onSubmit= async (dataCombustible:any) => {
    if (selectedData) {
      try {  
       toast.promise(updateData(selectedData.id, dataCombustible), {
          error: "Ocurrio un Error",
          success: "Se Actulizo con exito",
          loading: "Actualizando Registro....",
        });
        setSelectedData(null);
        resetForm();
        setModalState(!modalState);
      } catch {
        console.log("Error");
      }
    }
  };

  useEffect(() => {
    if (selectedData) {
      setValues({
        nombre: selectedData.nombre,
        precio: selectedData.precio
      });   
    }
  }, [selectedData]);
 
  const validationSchema = yup.object().shape({
    precio: yup.number().round().positive("EL valor es requerido y debe ser mayor a 0").required("El precio es requerido"),
  });

  const {
    handleSubmit,
    setFieldValue,
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
    <Dialog
      open={modalState}
      fullWidth={true}
      maxWidth={"md"}
      onClose={() => {
        setModalState(!modalState);
        resetForm();
        setSelectedData(null);
      }}
    >
      <DialogTitle>Cambiar el precio del Combustible</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent dividers>
          <div className="flex flex-col justify-around align-middle   w-full">
            {/*}  <TextField
              id="txt_precio"
              className="m-3 "
              type="text"
              label="Ingrese el nuevo precio"
              variant="outlined"
              name="precio"
              value={values.precio}
              onChange={(e) => {
                const newValue = parseFloat(e.target.value);
                setFieldValue("precio", isNaN(newValue) ? "" : newValue);
              }}
              error={Boolean(errors.precio)}
              helperText={errors.precio}
            />*/}

            <NumberInput
              key={"txt_pte"}
              name="precio"
              disable={false}
              label="Ingrese el Nuevo Monto"
              value={values.precio}
              onChange={(e: any) => {
                const newValue = parseFloat(e.target.value);
                setFieldValue("precio", isNaN(newValue) ? 0 : newValue);
              }}
              error={Boolean(errors.precio)}
              helperText={errors.precio}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button type="submit" onClick={() => {}}>
            Actualizar
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
    </Dialog>
  );
}
