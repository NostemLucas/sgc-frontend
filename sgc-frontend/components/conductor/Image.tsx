import { useState } from "react";
import { Box, Button, Grid, IconButton, Paper, Typography } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useConductorStore } from "@/store/conductorStore";
import { toast } from "sonner";

export default function ImageUpload() {
  const {selectedData,uploadPhoto,deletePhoto}=useConductorStore();

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e: any) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleFileDelete = () => {
    setSelectedFile(null);
  };

  const uploadFile = async () => {
    const formData = new FormData();
    if(selectedData){
        if(selectedFile){
            formData.append("file", selectedFile);  
          }
        try {
        toast.promise(uploadPhoto(selectedData?.id,formData), {
          error: "Ocurrio un Error",
          success: "Se Subio con exito",
          loading: "Subiendo Fotografia....",
        });
      } catch {
        console.log("Error");
      }  
    } 
  }

  const deleteFile = async () => {
    if(selectedData){
        try {
        toast.promise(deletePhoto(selectedData.id), {
          error: "Ocurrio un Error",
          success: "Se Elimino con exito",
          loading: "Eliminando Fotografia....",
        });
      } catch {
        console.log("Error");
      }  
    } 
  }

  return (
    <Box>
      <Paper
        elevation={3}
        className=" mt-4 p-4 h-[420px] flex flex-col justify-center items-center"
      >
        {!selectedData?.foto && (
          <form onSubmit={(e) => { e.preventDefault(); uploadFile();} }>
            {!selectedFile && (
              <Box className=" h-full w-full flex flex-col justify-center items-center relative">
                <input
                  type="file"
                  accept="image/*" // Se Puede ajustar las extensiones de archivo permitidas
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                  id="file-upload-input"
                />

                <label htmlFor="file-upload-input">
                  <Button
                    variant="contained"
                    component="span"
                    startIcon={<CloudUploadIcon />}
                  >
                    Subir archivo
                  </Button>
                </label>
              </Box>
            )}
            {selectedFile && (
              <Grid container spacing={2}>
                <Grid item md={12}>
                  <Box className="flex justify-center items-center">
                    <img
                      src={URL.createObjectURL(selectedFile)}
                      alt="Vista previa"
                      className="h-72"
                    />
                  </Box>
                </Grid>
                <Grid item md={6} sm={12} xs={12}>
                  <Button
                    variant="outlined"
                    fullWidth
                    color="error"
                    onClick={handleFileDelete}
                  >
                    Borrar archivo
                  </Button>
                </Grid>
                <Grid item md={6} sm={12} xs={12}>
                  <Button
                    variant="outlined"
                    fullWidth
                    type="submit"
                  >
                    Subir Imagen
                  </Button>
                </Grid>
              </Grid>
            )}
          </form>
        )}
        {selectedData?.foto && (
        <form onSubmit={(e) => { e.preventDefault(); deleteFile(); }}>
            <Box className=" flex flex-col justify-center items-center">
              <img
                src={
                  process.env.API_URL +
                  "assets/conductores/" +
                  selectedData.foto
                }
                alt="conductor-photo"
                className="w-full h-72"
              />
              <Button
                variant="outlined"
                fullWidth
                className=" mt-3"
                color="error"
                type="submit"
              >
                Borrar archivo
              </Button>
            </Box>
          </form>
        )}
      </Paper>
    </Box>
  );
}
