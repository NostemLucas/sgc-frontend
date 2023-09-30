import Dialog from "@/components/Dialog";
import Form from "@/components/conductor/Form"
import {Tabs,Tab} from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import PhotoCameraBackIcon from '@mui/icons-material/PhotoCameraBack';
import { useState } from "react";
import { Box } from "@mui/material";
import ImageUpload from "./Image";
import { useConductorStore } from "@/store/conductorStore";

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

  const {selectedData} = useConductorStore();
  const handleChange = (event:any, newValue:number) => {
    setValue(newValue);
  };
  return (
    <>
      <Dialog title="Registro de Conductor" actions={false}>
        <Tabs value={value} onChange={handleChange} aria-label="icon" centered>
          <Tab icon={<PeopleIcon />} label="Conductor" />
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
