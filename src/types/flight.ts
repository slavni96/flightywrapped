export type FlightRecord = {
  date: string;
  airline: string;
  flight: string;
  from: string;
  to: string;
  aircraftType?: string;
  tailNumber?: string;
  gateDepartureActual?: string;
  gateArrivalActual?: string;
  takeoffActual?: string;
  landingActual?: string;
};

export type FlightStats = {
  flights: number;
  airlines: number;
  aircraftTypes: number;
  airports: number;
  routes: number;
  totalHours: number;
  firstYear?: number;
  lastYear?: number;
  topAirlines: Array<{ name: string; flights: number }>;
  topAircraft?: string;
  topAircraftCount?: number;
  aircraftBreakdown: Array<{ name: string; flights: number; share: number }>;
};
