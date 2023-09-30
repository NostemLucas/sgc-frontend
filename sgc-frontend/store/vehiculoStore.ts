import {create} from 'zustand';
import axios from 'axios';
// Define la interfaz del modelo base
import { Vehiculo,VehiculoFormated } from '@/models/vehiculo';

// Define la interfaz del modelo de solicitud
const apiUrl = process.env.API_URL+"vehiculos/"

interface VehiculoState {
  data: Vehiculo[],
  getData: () => Promise<void>,
  createData: (data: VehiculoFormated) => Promise<void>,
  deleteData: (id: number) => Promise<void>,
  selectedData: Vehiculo | null,
  setSelectedData: (data: Vehiculo | null) => void,
  updateData: (id: number, data: VehiculoFormated) => Promise<void>,
  uploadPhoto:(id:number,formData:FormData)=>Promise<void>,
  deletePhoto: (id: number) => Promise<void>,
  searchData: (id:number) => Promise<void>,
}
// Define el store de "zustand"
const vehiculoStore = create<VehiculoState>((set) => ({
  data:[],
  selectedData: null,

 // Funciones para gestionar el estado de selección 
 setSelectedData: (vehiculo: Vehiculo| null) => set({ selectedData: vehiculo }),
  // Función para cargar datos
  getData: async () => {
    try {
      const response = await axios.get(apiUrl);
      const data= response.data;
      set({ data });
    } catch (error) {
        throw error;
    }
  },

  // Función para crear datos
  createData: async (newData:VehiculoFormated) => {
    try {
      const responseData = await axios.post(apiUrl,newData);
      const vehiculo = responseData.data;
      set({ selectedData: vehiculo });
      vehiculoStore.getState().getData();
    } catch (error) {
        throw error;
    }
  },

  // Función para borrar datos
  deleteData: async (id: number) => {
    try {
        await axios.delete(apiUrl + id); 
        vehiculoStore.getState().getData();
    } catch (error) {
        throw error;
    }
  },

  // Función para actualizar datos
  updateData: async (id: number, updateData: VehiculoFormated) => {
    try {
        await axios.patch(apiUrl + id, updateData);
        vehiculoStore.getState().getData();
        vehiculoStore.getState().searchData(id);
    } catch (error) {
        throw error;
    }
  },
  uploadPhoto: async (id: number, formData: FormData) => {
    try {
      const responseData = await axios.post(apiUrl+ "upload/" + id, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const conductor = responseData.data;
      set({ selectedData: conductor });
      // Recarga los datos del vehiculo después de subir la foto
      vehiculoStore.getState().getData();
    } catch (error) {
      throw error;
    }
  },

  deletePhoto: async (id: number) => {
    try {
      const responseData = await axios.delete(apiUrl + "delete/" + id);
      // Recarga los datos del vehiculo después de eliminar la foto
      const vehiculo = responseData.data;
      set({ selectedData: vehiculo });
      vehiculoStore.getState().getData();
    } catch (error) {
      throw error;
    }
  },
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

  export const useVehiculoStore = vehiculoStore;

