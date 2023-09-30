import Dialog from "@/components/Dialog";
import Form from "@/components/vehiculo/Form"
import {Tabs,Tab} from '@mui/material';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import PhotoCameraBackIcon from '@mui/icons-material/PhotoCameraBack';
import { useState } from "react";
import { Box } from "@mui/material";
import ImageUpload from "./Image";
import { useVehiculoStore } from "@/store/vehiculoStore";

const TabPanel = (props:any) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          {children}
        </Box>
      )}
    </div>
  );
};

export default function DialogForm() {
  const [value, setValue] = useState(0);

  const {selectedData} = useVehiculoStore();
  const handleChange = (event:any, newValue:number) => {
    setValue(newValue);
  };
  return (
    <>
      <Dialog title="Registro de Vehiculo" actions={false}>
        <Tabs value={value} onChange={handleChange} aria-label="icon" centered>
          <Tab icon={<DirectionsCarIcon />} label="Vehiculo" />
          <Tab icon={<PhotoCameraBackIcon />} label="Fotografia" disabled={selectedData === null}/>
        </Tabs>
        <TabPanel value={value} index={0}>
          <Form/>
        </TabPanel>       
        <TabPanel value={value} index={1}>
          <ImageUpload />
        </TabPanel>
      </Dialog>
    </>
  );
}
