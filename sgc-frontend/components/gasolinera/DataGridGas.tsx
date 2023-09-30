import { useEffect, useMemo } from 'react';
//MRT Imports
//import MaterialReactTable, { type MRT_ColumnDef } from 'material-react-table'; //default import deprecated
import { MaterialReactTable, type MRT_ColumnDef } from 'material-react-table';

//Material UI Imports
import { Box, Chip, ListItemIcon, MenuItem, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { MRT_Localization_ES } from 'material-react-table/locales/es';
import { useSystemOperations } from '@/store/systemStore';
import { useGasStationStore } from '@/store/gasSationStore';
import { Gasolinera } from '@/models/gasolinera';

export default function DataGrid() {
 
  const {
    getData,setSelectedData,deleteData,data
  } = useGasStationStore();

  const {modalState,setModalState}=useSystemOperations();
  //Llamamos al contexto
  //columnas de la tabla
  const columns = useMemo<MRT_ColumnDef<Gasolinera>[]>(
    () => [
      {
        accessorKey: "nombre",

        header: "Placa",

        size: 100,
      },

      {
        accessorKey: "departamento", 

        header: "Departamento",

        size: 100,
      },
      {
        accessorKey: "direccion", 

        header: "Direccion",

        size: 100,
      },
      {
        accessorKey: "nit",

        header: "Nit",

        size: 100,
      },
      {
        accessorKey: "contacto",

        header: "Contacto",

        size: 150,
      },

      {
        accessorKey: "status",

        header: "Status",

        size: 100,

        Cell: ({ row }) => (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
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
                "¿Estás seguro de eliminar esta instancia de Gasolinera?"
              )
            ) {
              await deleteData(row.original.id);
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
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="h6">Notas: </Typography>

            <Typography variant="body1">{row.original.notas}</Typography>
          </Box>
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

