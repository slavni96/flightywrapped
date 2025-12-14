import airports from '../data/airports.json';

export type AirportInfo = {
  icao: string;
  name: string;
  country: string;
  region: string;
  latitude: number | null;
  longitude: number | null;
};

export function getAirport(code?: string): AirportInfo | undefined {
  if (!code) return undefined;
  const normalized = code.trim().toUpperCase();
  const match = (airports as Record<string, AirportInfo>)[normalized];
  return match;
}

export function airportLabel(code?: string): string {
  const info = getAirport(code);
  if (!info) return code ?? '';
  const location = info.region ? `${info.region}, ${info.country}` : info.country;
  return `${info.name} (${code})${location ? ` · ${location}` : ''}`;
}
