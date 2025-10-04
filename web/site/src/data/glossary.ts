import { GlossaryTerm } from "@/types/exoplanet";

export const glossaryTerms: GlossaryTerm[] = [
  {
    term: "Disposition",
    definition: "The classification status of a celestial body as either a confirmed exoplanet, a candidate awaiting confirmation, or a false positive that was initially detected but later ruled out.",
    unit: undefined
  },
  {
    term: "Distance",
    definition: "The measured distance from Earth to the exoplanet's host star system. This represents how far light travels from the exoplanet to Earth.",
    unit: "light years"
  },
  {
    term: "Radius",
    definition: "The physical size of the exoplanet measured relative to Earth's radius. A value of 1.0 means the planet is the same size as Earth.",
    unit: "Earth radii"
  },
  {
    term: "Orbital Period",
    definition: "The time it takes for the exoplanet to complete one full orbit around its host star. This is equivalent to the planet's 'year'.",
    unit: "days"
  },
  {
    term: "Stellar Magnitude",
    definition: "A measure of the brightness of the host star as seen from Earth. Lower values indicate brighter stars. This is measured on a logarithmic scale.",
    unit: "magnitude"
  },
  {
    term: "Planetary Radius",
    definition: "The physical size of the exoplanet measured relative to Jupiter's radius, the largest planet in our solar system.",
    unit: "Jupiter radii"
  },
  {
    term: "Equilibrium Temperature",
    definition: "The theoretical temperature of the exoplanet assuming it has no atmosphere and is in thermal equilibrium with the radiation from its host star.",
    unit: "Kelvin (K)"
  },
  {
    term: "Discovery Year",
    definition: "The year when the exoplanet was first discovered or when its discovery was publicly announced.",
    unit: "year"
  },
  {
    term: "Discovery Method",
    definition: "The astronomical technique used to detect the exoplanet. Common methods include Transit (measuring dimming when planet passes in front of star) and Radial Velocity (measuring wobble in star's motion).",
    unit: undefined
  },
  {
    term: "Stellar Type",
    definition: "The classification of the host star based on its spectral characteristics and temperature. M-type stars are cool red dwarfs, K-type are orange, G-type (like our Sun) are yellow, and so on.",
    unit: undefined
  }
];
