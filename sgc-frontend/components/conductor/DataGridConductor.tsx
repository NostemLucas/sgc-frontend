import { useEffect, useMemo } from 'react';
import { useConductorStore } from "@/store/conductorStore";
//MRT Imports
//import MaterialReactTable, { type MRT_ColumnDef } from 'material-react-table'; //default import deprecated
import { MaterialReactTable, type MRT_ColumnDef } from 'material-react-table';

//Material UI Imports
import { Avatar, Box, Button, Chip, ListItemIcon, MenuItem, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
//Icons Imports
import { Conductor } from '@/models/conductor';

//Mock Data
import { MRT_Localization_ES } from 'material-react-table/locales/es';
import { useSystemOperations } from '@/store/systemStore';


//nested data is ok, see accessorKeys in ColumnDef below

export default function DataGrid() {
 
  const {
    getData,setSelectedData,deleteData
  } = useConductorStore();

  const {modalState,setModalState}=useSystemOperations();
  //Llamamos al contexto
  const { //modalState, 
    data,} = useConductorStore();
  //columnas de la tabla
  const columns = useMemo<MRT_ColumnDef<Conductor>[]>(
    () => [
      {
        id: "imagen",
        header: "Foto",
        size: 70,
        Cell: ({ row }) => (
          <Box>
            {row.original.foto ? (         
                  <Avatar
                    alt="FT"
                    src={process.env.CONDUCTOR_IMAGE_URL + row.original.foto}
                  />                       
            ) : (
              
               <Avatar/>
        
            )}
          </Box>
        ),
      },
      {
        accessorKey: "nombre",

        header: "Nombre",

        size: 150,
      },
      {
        accessorKey: "ci",

        header: "CI",

        size: 100,
      },
      {
        accessorKey: "ci",

        header: "CI",

        size: 100,
      },

      {
        accessorKey: "licencia", //normal accessorKey

        header: "Licencia",

        size: 100,
      },

      {
        header: "Estado", 
        accessorFn: (originalRow) => (originalRow.status ? 'true' : 'false'),
        id:'status',
        filterVariant: 'checkbox',
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
      renderDetailPanel={({ row }) => (
        <Box
          sx={{
            display: "flex",

            justifyContent: "space-around",

            alignItems: "center",
          }}
        >
          {!row.original.foto && (
            <Avatar/>
          )}
          {row.original.foto && (
            <Avatar
              alt="avatar"
              src={
                process.env.API_URL + "assets/conductores/" + row.original.foto
              }
              sx={{ width: 160, height: 160 }}
            />
          )}
          
          <Box sx={{ textAlign: "center" }}>
              <Typography variant="h3">Registro Creado el: </Typography>
       
            <Typography variant="h4">{new Date(row.original.createdAt).toLocaleDateString()}</Typography>

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

