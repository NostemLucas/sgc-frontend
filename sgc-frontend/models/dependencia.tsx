export type Dependencia = {
    id: number;
    nombre: string;
    createdAt: Date;
    updatedAt: Date;
  };
  
  export type DependenciaFormated = Omit<Dependencia, "id" | "updatedAt" | "createdAt">;