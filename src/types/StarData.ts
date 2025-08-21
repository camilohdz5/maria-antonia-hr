export interface StarData {
  id: string;
  name: string;
  // Coordenadas en el diagrama HR
  colorIndex: number; // B-V o BP-RP (índice de color)
  absoluteMagnitude: number; // Magnitud absoluta

  // Propiedades físicas
  mass: number; // Masa solar (M☉)
  radius: number; // Radio solar (R☉)
  temperature: number; // Temperatura efectiva (K)
  luminosity: number; // Luminosidad solar (L☉)

  // Propiedades orbitales y espaciales
  distance: number; // Distancia en años luz
  gravitationalAxis?: number; // Eje gravitacional (si aplicable)

  // Clasificación estelar
  spectralClass: string; // O, B, A, F, G, K, M
  stellarType: string; // Enana principal, gigante, supergigante, etc.

  // Propiedades observacionales
  apparentMagnitude: number; // Magnitud aparente
  metallicity: number; // [Fe/H]
  age: number; // Edad en millones de años

  // Información adicional
  constellation?: string;
  discoveryYear?: number;
  hasExoplanets: boolean;
  variableType?: string; // Si es variable
}

export interface ConstellationData {
  name: string;
  stars: StarData[];
}
