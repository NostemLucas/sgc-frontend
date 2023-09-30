import {create} from 'zustand';
import axios from 'axios';

// Define la interfaz del modelo base
import { Dependencia,DependenciaFormated } from '@/models/dependencia';

// Define la interfaz del modelo de solicitud
const apiUrl = process.env.API_URL+"dependencias/"

interface DependenciaState {
  data: Dependencia[],
  getData: () => Promise<void>,
  createData: (data: DependenciaFormated) => Promise<void>,
  deleteData: (id: number) => Promise<void>,
  selectedData: Dependencia | null,
  setSelectedData: (data: Dependencia | null) => void,
  updateData: (id: number, data: DependenciaFormated) => Promise<void>,
}
// Define el store de "zustand"
const dependenciaStore = create<DependenciaState>((set) => ({
  data:[],
  selectedData: null,

  // Funciones para gestionar el estado de selección y el modal
  setSelectedData: (dependencia: Dependencia | null) => set({ selectedData: dependencia }),

  // Función para cargar datos de momento solo se usa esto:
  getData: async () => {
    try {
      const response = await axios.get(apiUrl);
      const data = response.data;
      set({ data });
    } catch (error) {
        throw error;
    }
  },
//Planeado a futuro
  // Función para crear datos
  createData: async (newData:DependenciaFormated) => {
    try { 
      await axios.post(apiUrl,newData);
      dependenciaStore.getState().getData();
    } catch (error) {
        throw error;
    }
  },

  // Función para borrar datos
  deleteData: async (id: number) => {
    try {
        await axios.delete(apiUrl + id); 
        dependenciaStore.getState().getData();
    } catch (error) {
        throw error;
    }
  },

  // Función para actualizar datos
  updateData: async (id: number, updateData: DependenciaFormated) => {
    try {
        await axios.patch(apiUrl + id, updateData);
        dependenciaStore.getState().getData();
    } catch (error) {
        throw error;
    }
  },

  }));

  export const useDependenciasStore = dependenciaStore;


