import { Conductor } from "./conductor";
import { Talonario } from "./talonario";
import { Vehiculo } from "./vehiculo";

export type Vale = { 
    id: number;
    numero: number;
    kilometraje: number;
    litros: number;
    precio: number;
    tipo: boolean;
    status: boolean;
    notas: string;
    createdAt: Date;
    updatedAt: Date;
    talonario: Talonario | null;
    conductor: Conductor | null;
    vehiculo:Vehiculo | null;
    }


  export type ValeFormated = Omit<Vale, "id" | "updatedAt" | "createdAt">;