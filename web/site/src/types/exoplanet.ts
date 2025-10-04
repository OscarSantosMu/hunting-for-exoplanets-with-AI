export interface Exoplanet {
  id: string;
  name: string;
  disposition: 'CONFIRMED' | 'FALSE POSITIVE' | 'CANDIDATE';
  distance: number; // light years
  radius: number; // Earth radii
  orbitalPeriod: number; // days
  stellarMagnitude: number;
  planetaryRadius: number; // Jupiter radii
  equilibriumTemperature: number; // Kelvin
  discoveryYear: number;
  discoveryMethod: string;
  stellarType: string;
}

export interface GlossaryTerm {
  term: string;
  definition: string;
  unit?: string;
}
