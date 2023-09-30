import { Talonario } from "./talonario";

export type Gasolinera = { 
    id: number;
    nombre: string;
    departamento: string;
    direccion?: string | null;
    nit?: string | null;
    contacto?: string | null;
    status: boolean;
    notas?: string | null;
    createdAt: Date;
    talonarios:Talonario[] | null;
    updatedAt: Date;
    }


  export type GasolineraFormated = Omit<Gasolinera, "id" | "updatedAt" | "createdAt" | "talonarios">;