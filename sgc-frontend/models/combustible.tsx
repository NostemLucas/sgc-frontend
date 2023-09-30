export type Combustible = {
  id: number;
  nombre: string;
  precio: number;
  createdAt: Date;
  updatedAt: Date;
};

export type CombustibleFormated = Omit<Combustible, "id" | "updatedAt" | "createdAt">;