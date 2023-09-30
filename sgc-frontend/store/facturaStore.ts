import {create} from 'zustand';
import axios from 'axios';

// Define la interfaz del modelo base
import { Factura,FacturaFormated } from '@/models/factura';

// Define la interfaz del modelo de solicitud
const apiUrl = process.env.API_URL+"facturas/"

interface FacturaState {
  data: Factura[],
  getData: () => Promise<void>,
  createData: (data: FacturaFormated) => Promise<void>,
  deleteData: (id: number) => Promise<void>,
  selectedData: Factura | null,
  setSelectedData: (data: Factura | null) => void,
  updateData: (id: number, data: FacturaFormated) => Promise<void>,
  searchData: (id:number) => Promise<void>,
}

// Define el store de "zustand"
const facturaStore = create<FacturaState>((set) => ({
 data:[],
 selectedData: null,

 // Funciones para gestionar el estado de selección y el modal
 setSelectedData: (factura: Factura| null) => set({ selectedData: factura }),
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
  createData: async (newData:FacturaFormated) => {
    try {
      
      const responseData = await axios.post(apiUrl,newData);
      const factura = responseData.data;
      set({ selectedData: factura });
      //Cambiamos a selectedData
      facturaStore.getState().getData();
    } catch (error) {
        throw error;
    }
  },

  // Función para borrar datos
  deleteData: async (id: number) => {
    try {
        await axios.delete(apiUrl + id); 
        facturaStore.getState().getData();
    } catch (error) {
        throw error;
    }
  },

  // Función para actualizar datos
  updateData: async (id: number, updateData: FacturaFormated) => {
    try {
        await axios.patch(apiUrl + id, updateData);
        facturaStore.getState().getData();
        facturaStore.getState().searchData(id);
      } catch (error) {
        throw error;
    }
  },
  //Funcion para buscar datos
  searchData: async (id:number) => {
    try {
      const response = await axios.get(apiUrl+'/gasolinera/'+id);
      const factura = response.data;
      set({ selectedData: factura });
    } catch (error) {
        throw error;
    }
  },

  }));

  export const useFacturaStore = facturaStore;


