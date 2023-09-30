import { Gasolinera } from "./gasolinera";

export type Factura = {
    id: number;
    numero: string;
    monto: string;
    litros: number;
    notas: string | null;
    gasolinera: Gasolinera;
    createdAt: Date;
    updatedAt: Date;
  }
export type FacturaFormated = Omit<Factura, "id" | "updatedAt" | "createdAt" >;

