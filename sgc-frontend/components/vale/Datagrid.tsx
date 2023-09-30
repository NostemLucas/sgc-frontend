import { useEffect, useMemo } from 'react';
import { useConductorStore } from "@/store/conductorStore";
//MRT Imports
//import MaterialReactTable, { type MRT_ColumnDef } from 'material-react-table'; //default import deprecated
import { MaterialReactTable, type MRT_ColumnDef } from 'material-react-table';

//Material UI Imports
import { Avatar, Box, Button, Chip, ListItemIcon, MenuItem, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { MRT_Localization_ES } from 'material-react-table/locales/es';
import { useSystemOperations } from '@/store/systemStore';
import { useValeStore } from '@/store/valeStore';
import { Vale } from '@/models/vale';


export default function DataGrid() {
 
  const {
    setSelectedData,deleteData,data
  } = useValeStore();

  const {modalState,setModalState}=useSystemOperations();
  //Llamamos al contexto
  //columnas de la tabla
  const columns = useMemo<MRT_ColumnDef<Vale>[]>(
    () => [
  
      {
        accessorKey: "numero",

        header: "Numero",

        size: 100,
      },

      {
        accessorKey: "litros", 

        header: "Litros",

        size: 100,
      },
      {
        accessorKey: "precio", 

        header: "Precio",

        size: 100,
      },

      {
        header: "TIpo", 
        accessorFn: (originalRow) => (originalRow.tipo ? 'true' : 'false'),
        id:'status',
        filterVariant: 'checkbox',
        size: 100,

        Cell: ({ row }) => (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            {row.original.status === true ? (
              <Chip color="success" label="Vehiculo" />
            ) : (
              <Chip color="error" label="Bidon" />
            )}
          </Box>
        ),
      },
    ],

    []
  );

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
      renderRowActionMenuItems={({ closeMenu, row }) => [
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
            <EditIcon />
          </ListItemIcon>
          Editar
        </MenuItem>,

        <MenuItem
          key={1}
          onClick={async () => {
            if (
              window.confirm(
                "¿Estás seguro de eliminar esta instancia de Vale?"
              )
            ) {
              if(row.original.talonario){
               await deleteData(row.original.talonario.id, row.original.id); 
              }
              
            }
            closeMenu();
          }}
          aria-label="Borrar"
          sx={{ m: 0 }}
        >
          <ListItemIcon>
            <DeleteIcon />
          </ListItemIcon>
          Eliminar
        </MenuItem>,
      ]}
      renderDetailPanel={({ row }) => (
        <Box
          sx={{
            display: "flex",

            justifyContent: "space-around",

            alignItems: "center",
          }}
        >
          {row.original.notas}
        </Box>
      )}
      enableColumnFilterModes
      enableColumnResizing
      positionToolbarAlertBanner="bottom"
      initialState={{
        density: "compact",
      }}
    />
  );
  

};

