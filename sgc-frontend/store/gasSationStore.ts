import {create} from 'zustand';
import axios from 'axios';
// Define la interfaz del modelo base
import { Gasolinera,GasolineraFormated } from '@/models/gasolinera';

// Define la interfaz del modelo de solicitud
const apiUrl = process.env.API_URL+"gasolineras/"

interface GasolineraState {
  data: Gasolinera[],
  getData: () => Promise<void>,
  createData: (data: GasolineraFormated) => Promise<void>,
  deleteData: (id: number) => Promise<void>,
  searchData: (id: number) => Promise<void>,
  selectedData: Gasolinera | null,
  setSelectedData: (data: Gasolinera | null) => void,
  updateData: (id: number, data: GasolineraFormated) => Promise<void>,
  modalState: boolean,
  setModalState: (isOpen: boolean) => void,
}
// Define el store de "zustand"
export const gasStationStore = create<GasolineraState>((set) => ({
 data:[],
 selectedData: null,
 modalState:false,

 // Funciones para gestionar el estado de selección y el modal
 setSelectedData: (gasolinera: Gasolinera| null) => set({ selectedData: gasolinera }),
 setModalState: (isOpen: boolean) => set({ modalState: isOpen }),

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
  createData: async (newData:GasolineraFormated) => {
    try {
      const responseData = await axios.post(apiUrl,newData);
      const gasStation = responseData.data;
      set({ selectedData: gasStation });
      //Cambiamos a selectedData
      gasStationStore.getState().getData();
    } catch (error) {
        throw error;
    }
  },

  // Función para borrar datos
  deleteData: async (id: number) => {
    try {
        await axios.delete(apiUrl + id); 
        gasStationStore.getState().getData();
    } catch (error) {
        throw error;
    }
  },

  // Función para actualizar datos
  updateData: async (id: number, updateData: GasolineraFormated) => {
    try {
        await axios.patch(apiUrl + id, updateData);
        gasStationStore.getState().getData();
    } catch (error) {
        throw error;
    }
  },

  searchData: async (id: number) => {
    try {
        const response = await axios.get(apiUrl + id);
        const data = response.data;
        set({ selectedData: data });
    } catch (error) {
        throw error;
    }
  },
  }));

  export const useGasStationStore = gasStationStore;



