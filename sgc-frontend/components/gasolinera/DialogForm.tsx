import Dialog from "@/components/Dialog";
import {Tabs,Tab} from '@mui/material';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import StyleIcon from '@mui/icons-material/Style';
import { useState } from "react";
import { Box } from "@mui/material";
import GasolineraForm from "@/components/gasolinera/GasolineraForm"
import { useGasStationStore } from "@/store/gasSationStore";
import TalonarioPanel from "./talonario/TalonarioPanel";
//import TalonarioForm from "./TalonarioForm";
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

  const {selectedData} = useGasStationStore();
  const handleChange = (event:any, newValue:number) => {
    setValue(newValue);
  };
  return (
    <>
      <Dialog title="Registro de Gasolinea" actions={false}>
        <Tabs value={value} onChange={handleChange} aria-label="icon" centered>
          <Tab icon={<LocalGasStationIcon />} label="Gasolinera" />
          <Tab icon={<StyleIcon />} label="Talonarios" disabled={selectedData === null}/>
        </Tabs>
        <TabPanel value={value} index={0}>
          <GasolineraForm/>
        </TabPanel>       
        <TabPanel value={value} index={1}>
          <TalonarioPanel/>
        </TabPanel>
      </Dialog>
    </>
  );
}
