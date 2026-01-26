import { type TemperatureUnit } from '../types/weather'; // Import typu jednostki temperatury

export const convertTemp = (temp: number, unit: TemperatureUnit): string => { // Konwersja temperatury do stringa wg jednostki
  if (unit === 'celsius') return `${Math.round(temp)}°`; // Jeśli API daje już C (metric) -> zaokrąglamy i dodajemy znak °
  if (unit === 'fahrenheit') return `${Math.round((temp * 9/5) + 32)}°`; // Jeśli trzymamy C, a chcemy F -> przeliczamy
  return `${Math.round(temp + 273.15)}K`; // Kelvin: jeśli trzymamy C -> dodajemy 273.15 i dopisujemy K
}; 