import { useMemo } from 'react';
//MRT Imports
//import MaterialReactTable, { type MRT_ColumnDef } from 'material-react-table'; //default import deprecated
import { MaterialReactTable, type MRT_ColumnDef } from 'material-react-table';

//Material UI Imports
import { Box, Chip, ListItemIcon, MenuItem } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { MRT_Localization_ES } from 'material-react-table/locales/es';
import { Talonario } from '@/models/talonario';
import { useTalonarioStore } from '@/store/talonarioStore';
import { useGasStationStore } from '@/store/gasSationStore';

export default function DataGrid() {
 
  const {selectedData,searchData,getData} = useGasStationStore();
  
  const { deleteData } = useTalonarioStore();
  //columnas de la tabla
  const columns = useMemo<MRT_ColumnDef<Talonario>[]>(
    () => [
      {
        accessorKey: "inicio",

        header: "Inicio",

        size: 100,
      },

      {
        accessorKey: "final", 

        header: "final",

        size: 100,
      },
      {
        accessorKey: "status",

        header: "Status",

        size: 100,

        Cell: ({ row }) => (
          <Box>
            {row.original.status === true ? (
              <Chip color="success" label="Activo" />
            ) : (
              <Chip color="error" label="Inactivo" />
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
      data={selectedData?.talonarios? selectedData.talonarios:[]}
      localization={MRT_Localization_ES}
      enableRowActions
      positionActionsColumn="last"
      enableFullScreenToggle={false}
      muiTablePaginationProps={{
        rowsPerPageOptions:[5,10],
      }}
      muiTablePaperProps={{
        sx: {
          padding: "10px",
        },
      }}
      renderRowActionMenuItems={({ closeMenu, row }) => [
      
        <MenuItem
          key={0}
          onClick={async () => {
            if (
              window.confirm(
                "¿Estás seguro de eliminar esta instancia de Talonario?"
              )
            ) {
              if (selectedData) {
                await deleteData(row.original.id);
                await searchData(selectedData?.id);
                await getData();
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
      enableColumnFilterModes
      positionToolbarAlertBanner="bottom"
      initialState={{
        density: "compact",
        pagination: { pageSize:5,pageIndex:0 },
      }}
    />
  );
  

};

