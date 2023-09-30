
export type Conductor = {
    id: number;
    nombre: string;
    ci: string;
    licencia: string;
    foto?: string | null;
    contacto?: string | null;
    status: boolean;
    createdAt: Date;
    updatedAt: Date;
  }
export type ConductorFormated = Omit<Conductor, "id" | "updatedAt" | "createdAt" >;

