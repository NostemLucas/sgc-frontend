import { Gasolinera } from "./gasolinera";

export type Talonario = {
    id: number;
    inicio: number;
    final?: number | null;
    status: boolean;
    gasolinera: Gasolinera | null;
    createdAt: Date;
    updatedAt: Date;
  }
  
export type TalonarioFormated = Omit<Talonario, "id" | "updatedAt" | "createdAt">;
