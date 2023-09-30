import {create} from 'zustand';
import axios from 'axios';
// Define la interfaz del modelo base
import { Vale, ValeFormated } from '@/models/vale';

// Define la interfaz del modelo de solicitud
const apiUrl = process.env.API_URL+"vales/"

interface ValeState {
  data: Vale[],
  getData: (id:number) => Promise<void>,
  createData: (data: ValeFormated) => Promise<void>,
  deleteData: (idTalonario: number,id:number) => Promise<void>,
  selectedData: Vale | null,
  setSelectedData: (data: Vale | null) => void,
  updateData: (id: number, data: Vale) => Promise<void>,
}
// Define el store de "zustand"
const valeStore = create<ValeState>((set) => ({
  data:[],
  selectedData: null,

 // Funciones para gestionar el estado de selección 
 setSelectedData: (vale: Vale| null) => set({ selectedData: vale }),
  // Función para cargar datos
  getData: async (id:number) => {
    try {
      const response = await axios.get(apiUrl+'talonario/numeracion/'+id);
      const data= response.data;
      set({ data });
    } catch (error) {
        throw error;
    }
  },

  // Función para crear datos
  createData: async (newData:ValeFormated) => {
    try {
      await axios.post(apiUrl,newData);
      valeStore.getState().getData(newData.talonario.id);
    } catch (error) {
        throw error;
    }
  },

  // Función para borrar datos
  deleteData: async (idTalonario:number,id: number) => {
    try {
        await axios.delete(apiUrl + id); 
        valeStore.getState().getData(idTalonario);
    } catch (error) {
        throw error;
    }
  },

  // Función para actualizar datos
  updateData: async (id:number, updateData: ValeFormated) => {
    try {
        await axios.patch(apiUrl + id, updateData);
        valeStore.getState().getData(updateData.talonario.id);
    } catch (error) {
        throw error;
    }
  },

  }));

  export const useValeStore = valeStore;

