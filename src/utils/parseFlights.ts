import Papa, { type ParseError, type ParseResult } from 'papaparse';
import { type FlightRecord, type FlightStats } from '../types/flight';

type CsvRow = Record<string, string>;

const pick = (row: CsvRow, key: string) => row[key]?.trim() ?? '';

const toRecord = (row: CsvRow): FlightRecord => ({
  date: pick(row, 'Date'),
  airline: pick(row, 'Airline'),
  flight: pick(row, 'Flight'),
  from: pick(row, 'From'),
  to: pick(row, 'To'),
  aircraftType: pick(row, 'Aircraft Type Name') || undefined,
  tailNumber: pick(row, 'Tail Number') || undefined,
  gateDepartureActual: pick(row, 'Gate Departure (Actual)') || undefined,
  gateArrivalActual: pick(row, 'Gate Arrival (Actual)') || undefined,
  takeoffActual: pick(row, 'Take off (Actual)') || undefined,
  landingActual: pick(row, 'Landing (Actual)') || undefined,
});

const parseDateValue = (value?: string) => {
  if (!value) return null;
  const parsed = Date.parse(value);
  return Number.isNaN(parsed) ? null : parsed;
};

const computeDurationMinutes = (record: FlightRecord) => {
  const start =
    parseDateValue(record.takeoffActual) ??
    parseDateValue(record.gateDepartureActual) ??
    parseDateValue(record.date);
  const end =
    parseDateValue(record.landingActual) ??
    parseDateValue(record.gateArrivalActual) ??
    parseDateValue(record.date);

  if (!start || !end || end < start) return 0;
  return (end - start) / 1000 / 60;
};

export async function parseFlightFile(file: File): Promise<FlightRecord[]> {
  return new Promise((resolve, reject) => {
    Papa.parse<CsvRow>(file, {
      header: true,
      skipEmptyLines: true,
      delimitersToGuess: ['\t', ',', ';'],
      complete: (results: ParseResult<CsvRow>) => {
        if (results.errors?.length) {
          const firstError = results.errors[0] as ParseError | undefined;
          reject(new Error(firstError?.message ?? 'CSV parse error'));
          return;
        }
        const parsed = results.data
          .map(toRecord)
          .filter((record) => record.date && record.airline && record.from && record.to);
        resolve(parsed);
      },
      error: (error: Error, _file: unknown) => {
        reject(error);
      },
    });
  });
}

export function computeFlightStats(records: FlightRecord[]): FlightStats {
  const flights = records.length;
  const airlinesSet = new Set<string>();
  const aircraftSet = new Set<string>();
  const airportsSet = new Set<string>();
  const routesSet = new Set<string>();
  let firstYear: number | undefined;
  let lastYear: number | undefined;
  let totalMinutes = 0;

  const airlineCounts = new Map<string, number>();
  const aircraftCounts = new Map<string, number>();

  records.forEach((record) => {
    if (record.airline) {
      airlinesSet.add(record.airline);
      airlineCounts.set(record.airline, (airlineCounts.get(record.airline) ?? 0) + 1);
    }
    if (record.aircraftType) {
      aircraftSet.add(record.aircraftType);
      aircraftCounts.set(record.aircraftType, (aircraftCounts.get(record.aircraftType) ?? 0) + 1);
    }
    if (record.from) airportsSet.add(record.from);
    if (record.to) airportsSet.add(record.to);
    if (record.from && record.to) routesSet.add(`${record.from}-${record.to}`);

    const parsedDate = parseDateValue(record.date);
    if (parsedDate) {
      const year = new Date(parsedDate).getFullYear();
      firstYear = firstYear ? Math.min(firstYear, year) : year;
      lastYear = lastYear ? Math.max(lastYear, year) : year;
    }

    totalMinutes += computeDurationMinutes(record);
  });

  const topAirlines = Array.from(airlineCounts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4)
    .map(([name, flightCount]) => ({ name, flights: flightCount }));

  const aircraftEntries = Array.from(aircraftCounts.entries()).sort((a, b) => b[1] - a[1]);
  const [topAircraft, topAircraftCount] = aircraftEntries[0] ?? [];

  const aircraftBreakdown = aircraftEntries.slice(0, 3).map(([name, count]) => ({
    name,
    flights: count,
    share: flights ? Math.round((count / flights) * 100) : 0,
  }));

  return {
    flights,
    airlines: airlinesSet.size,
    aircraftTypes: aircraftSet.size,
    airports: airportsSet.size,
    routes: routesSet.size,
    totalHours: Number((totalMinutes / 60).toFixed(1)),
    firstYear,
    lastYear,
    topAirlines,
    topAircraft,
    topAircraftCount,
    aircraftBreakdown,
  };
}
