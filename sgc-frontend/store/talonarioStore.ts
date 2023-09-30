import {create} from 'zustand';
import axios from 'axios';

// Define la interfaz del modelo base
import { Talonario,TalonarioFormated } from '@/models/talonario';

// Define la interfaz del modelo de solicitud
const apiUrl = process.env.API_URL+"talonarios/"

interface TalonarioState {
  data: Talonario[],
  getData: () => Promise<void>,
  createData: (data: TalonarioFormated) => Promise<void>,
  deleteData: (id: number) => Promise<void>,
  selectedData: Talonario| null,
  setSelectedData: (data: Talonario| null) => void,
  searchData: (id:number) => Promise<void>,
}
// Define el store de "zustand"
const talonarioStore = create<TalonarioState>((set) => ({
  data:[],
  selectedData: null,

  // Funciones para gestionar el estado de selección y el modal
  setSelectedData: (talonario: Talonario| null) => set({ selectedData: talonario }),

  // Función para cargar datos
  getData: async () => {
    try {
      const response = await axios.get(apiUrl+'gasolinera/status/');
      const data = response.data;
      set({ data });
    } catch (error) {
        throw error;
    }
  },


  // Función para crear datos
  createData: async (newData:TalonarioFormated) => {
    console.log(newData)
    try { 
      await axios.post(apiUrl,newData);
    } catch (error) {
        throw error;
    }
  },

  // Función para borrar datos
  deleteData: async (id: number) => {
    try {
        await axios.delete(apiUrl + id); 
    } catch (error) {
        throw error;
    }
  },

  //Funcion para buscar datos
  searchData: async (id:number) => {
    try {
      const response = await axios.get(apiUrl+id);
      const talonario = response.data;
      set({ selectedData: talonario });
    } catch (error) {
        throw error;
    }
  },


  }));

  export const useTalonarioStore = talonarioStore;


