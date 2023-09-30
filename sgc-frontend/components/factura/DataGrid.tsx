import { useEffect, useMemo } from 'react';
//MRT Imports
//import MaterialReactTable, { type MRT_ColumnDef } from 'material-react-table'; //default import deprecated
import { MaterialReactTable, type MRT_ColumnDef } from 'material-react-table';

//Material UI Imports
import { Avatar, Box, Button, Chip, ListItemIcon, MenuItem, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Factura } from '@/models/factura';
import { MRT_Localization_ES } from 'material-react-table/locales/es';
import { useSystemOperations } from '@/store/systemStore';
import { useFacturaStore } from '@/store/facturaStore';

export default function DataGrid() {
 
  const {
    getData,setSelectedData,deleteData,data
  } = useFacturaStore();

  const {modalState,setModalState}=useSystemOperations();
  //Llamamos al contexto
  //columnas de la tabla
  const columns = useMemo<MRT_ColumnDef<Factura>[]>(
    () => [
    

      {
        accessorKey: "monto",

        header: "Monto",

        size: 100,
      },

      {
        accessorKey: "litros", 

        header: "litros",

        size: 100,
      },
      {
        accessorKey: "numero", 

        header: "",

        size: 100,
      },
   
    ],

    []
  );

  useEffect(() => {
    getData();
  }, []);

  return (
    <MaterialReactTable
      columns={columns}
      data={data}
      localization={MRT_Localization_ES}
      enableColumnOrdering
      enablePinning
      enableRowActions
      positionActionsColumn="last"
      muiTablePaperProps={{
        sx: {
          padding: "10px",
        },
      }}
      renderRowActionMenuItems={({ closeMenu,row }) => [
        <MenuItem
          key={0}
          
          onClick={() => {
            setSelectedData(row.original);                
            setModalState(!modalState);
            closeMenu();
          }}
          aria-label="Editar"


          sx={{ m: 0 }}
        >
          <ListItemIcon>
          <EditIcon/>
          </ListItemIcon>
          Editar
        </MenuItem>,

        <MenuItem
          key={1}
         
          onClick={async () => {
            if (window.confirm("¿Estás seguro de eliminar esta instancia de Conductor?")) {
              await deleteData(row.original.id);
            }
            closeMenu();
          }}
          aria-label="Borrar"
           sx={{ m: 0 }}
        >
          <ListItemIcon>
          <DeleteIcon/>
          </ListItemIcon>
          Eliminar
        </MenuItem>,
      ]}
    
      enableColumnFilterModes
      enableColumnResizing
      positionToolbarAlertBanner="bottom"
      initialState={{
        density: "compact",
      }}
    />
  );
  

};

