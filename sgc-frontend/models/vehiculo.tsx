import { Combustible } from "./combustible";
import { Dependencia } from "./dependencia";

export type Vehiculo = {
    id: number;
    placa: string;
    marca?: string | null;
    tipo?: string | null;
    foto?: string | null;
    dependencia: Dependencia | null;
    status: boolean;
    notas?: string | null;
    combustible: Combustible | null;
    createdAt: Date;
    updatedAt: Date;
  }

  
export type VehiculoFormated = Omit<Vehiculo, "id" | "updatedAt" | "createdAt" > 
