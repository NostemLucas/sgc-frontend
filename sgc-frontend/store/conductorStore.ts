import {create} from 'zustand';
import axios from 'axios';

// Define la interfaz del modelo base
import { Conductor,ConductorFormated } from '@/models/conductor';

// Define la interfaz del modelo de solicitud
const apiUrl = process.env.API_URL+"conductores/"

interface ConductorState {
  data: Conductor[],
  getData: () => Promise<void>,
  createData: (data: ConductorFormated) => Promise<void>,
  deleteData: (id: number) => Promise<void>,
  selectedData: Conductor | null,
  setSelectedData: (data: Conductor | null) => void,
  updateData: (id: number, data: ConductorFormated) => Promise<void>,
  uploadPhoto:(id:number,formData:FormData)=>Promise<void>,
  deletePhoto: (id: number) => Promise<void>,
  searchData: (id:number) => Promise<void>,
}

// Define el store de "zustand"
const conductorStore = create<ConductorState>((set) => ({
 data:[],
 selectedData: null,

 // Funciones para gestionar el estado de selección y el modal
 setSelectedData: (conductor: Conductor| null) => set({ selectedData: conductor }),
  // Función para cargar datos
  getData: async () => {
    try {
      const response = await axios.get(apiUrl);
      const data = response.data;
      set({ data });
    } catch (error) {
        throw error;
    }
  },

  // Función para crear datos
  createData: async (newData:ConductorFormated) => {
    try {
      
      const responseData = await axios.post(apiUrl,newData);
      const conductor = responseData.data;
      set({ selectedData: conductor });
      //Cambiamos a selectedData
      conductorStore.getState().getData();
    } catch (error) {
        throw error;
    }
  },

  // Función para borrar datos
  deleteData: async (id: number) => {
    try {
        await axios.delete(apiUrl + id); 
        conductorStore.getState().getData();
    } catch (error) {
        throw error;
    }
  },

  // Función para actualizar datos
  updateData: async (id: number, updateData: ConductorFormated) => {
    try {
        await axios.patch(apiUrl + id, updateData);
        conductorStore.getState().getData();
        conductorStore.getState().searchData(id);
      } catch (error) {
        throw error;
    }
  },

  // Funcion para cargar Foto
  uploadPhoto: async (id: number, formData: FormData) => {
    try {
      const responseData = await axios.post(apiUrl+ "upload/" + id, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const conductor = responseData.data;
      set({ selectedData: conductor });
      conductorStore.getState().getData();
    } catch (error) {
      throw error;
    }
  },

  //Funcion para borra fotos
  deletePhoto: async (id: number) => {
    try {
      const responseData = await axios.delete(apiUrl + "delete/" + id);
      // Recarga los datos del conductor después de eliminar la foto
      const conductor = responseData.data;
      set({ selectedData: conductor });
      conductorStore.getState().getData();
    } catch (error) {
      throw error;
    }
  },

  //Funcion para buscar datos
  searchData: async (id:number) => {
    try {
      const response = await axios.get(apiUrl+id);
      const conductor = response.data;
      set({ selectedData: conductor });
    } catch (error) {
        throw error;
    }
  },

  }));

  export const useConductorStore = conductorStore;


