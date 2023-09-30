import {create} from 'zustand';
import axios from 'axios';

// Define la interfaz del modelo base
import { Combustible,CombustibleFormated } from '@/models/combustible';

// Define la interfaz del modelo de solicitud
const apiUrl = process.env.API_URL+"combustibles/"

interface CombustibleState {
  data: Combustible[],
  getData: () => Promise<void>,
  createData: (data: CombustibleFormated) => Promise<void>,
  deleteData: (id: number) => Promise<void>,
  selectedData: Combustible | null,
  setSelectedData: (data: Combustible | null) => void,
  updateData: (id: number, data: CombustibleFormated) => Promise<void>,
}
// Define el store de "zustand"
const combustibleStore = create<CombustibleState>((set) => ({
  data:[],
  selectedData: null,

  // Funciones para gestionar el estado de selección y el modal
  setSelectedData: (combustible: Combustible | null) => set({ selectedData: combustible }),

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

  // Función para crear datos todba¿via no se usa pero esta para usarse a futuro
  createData: async (newData:CombustibleFormated) => {
    try { 
      await axios.post(apiUrl,newData);
      combustibleStore.getState().getData();
    } catch (error) {
        throw error;
    }
  },

  // Función para borrar datos
  deleteData: async (id: number) => {
    try {
        await axios.delete(apiUrl + id); 
        combustibleStore.getState().getData();
    } catch (error) {
        throw error;
    }
  },

  // Función para actualizar datos
  updateData: async (id: number, updateData: CombustibleFormated) => {
    try {
        await axios.patch(apiUrl + id, updateData);
        combustibleStore.getState().getData();
    } catch (error) {
        throw error;
    }
  },

  }));

  export const useCombustiblesStore = combustibleStore;


