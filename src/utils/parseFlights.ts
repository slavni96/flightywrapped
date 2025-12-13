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
  canceled: ['true', '1', 'yes', 'y'].includes(pick(row, 'Canceled').toLowerCase()),
  divertedTo: pick(row, 'Diverted To') || undefined,
  aircraftType: pick(row, 'Aircraft Type Name') || undefined,
  tailNumber: pick(row, 'Tail Number') || undefined,
  gateDepartureScheduled: pick(row, 'Gate Departure (Scheduled)') || undefined,
  gateArrivalScheduled: pick(row, 'Gate Arrival (Scheduled)') || undefined,
  takeoffScheduled: pick(row, 'Take off (Scheduled)') || undefined,
  landingScheduled: pick(row, 'Landing (Scheduled)') || undefined,
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
  let totalDelayMinutes = 0;

  const airlineCounts = new Map<string, number>();
  const aircraftCounts = new Map<string, number>();
  const airlineMinutes = new Map<string, number>();
  const airlineDelay = new Map<string, { delay: number; counted: number }>();
  const originDelay = new Map<string, { delay: number; counted: number }>();
  const originCounts = new Map<string, number>();
  const destinationCounts = new Map<string, number>();
  const routeCounts = new Map<string, number>();
  const airportVisits = new Map<string, number>();
  const yearCounts = new Map<number, number>();
  const monthCounts = new Map<number, number>();
  const weekdayCounts = new Map<number, number>();

  let shortestFlight: FlightStats['shortestFlight'];
  let longestFlight: FlightStats['longestFlight'];
  let firstFlight: FlightStats['firstFlight'];
  let lastFlight: FlightStats['lastFlight'];

  let onTimeDepartures = 0;
  let delayedDepartures = 0;
  let onTimeArrivals = 0;
  let delayedArrivals = 0;
  let canceled = 0;
  let diverted = 0;
  let worstDelay: FlightStats['worstDelay'];

  const durationBuckets = { short: 0, medium: 0, long: 0 };

  records.forEach((record) => {
    if (record.airline) {
      airlinesSet.add(record.airline);
      airlineCounts.set(record.airline, (airlineCounts.get(record.airline) ?? 0) + 1);
    }
    if (record.aircraftType) {
      aircraftSet.add(record.aircraftType);
      aircraftCounts.set(record.aircraftType, (aircraftCounts.get(record.aircraftType) ?? 0) + 1);
    }
    if (record.from) {
      airportsSet.add(record.from);
      originCounts.set(record.from, (originCounts.get(record.from) ?? 0) + 1);
      airportVisits.set(record.from, (airportVisits.get(record.from) ?? 0) + 1);
    }
    if (record.to) {
      airportsSet.add(record.to);
      destinationCounts.set(record.to, (destinationCounts.get(record.to) ?? 0) + 1);
      airportVisits.set(record.to, (airportVisits.get(record.to) ?? 0) + 1);
    }
    if (record.from && record.to) {
      const routeKey = `${record.from}-${record.to}`;
      routesSet.add(routeKey);
      routeCounts.set(routeKey, (routeCounts.get(routeKey) ?? 0) + 1);
    }

    const parsedDate = parseDateValue(record.date);
    if (parsedDate) {
      const year = new Date(parsedDate).getFullYear();
      firstYear = firstYear ? Math.min(firstYear, year) : year;
      lastYear = lastYear ? Math.max(lastYear, year) : year;
      yearCounts.set(year, (yearCounts.get(year) ?? 0) + 1);

      const month = new Date(parsedDate).getMonth();
      monthCounts.set(month, (monthCounts.get(month) ?? 0) + 1);

      const weekday = new Date(parsedDate).getDay();
      weekdayCounts.set(weekday, (weekdayCounts.get(weekday) ?? 0) + 1);

      if (!firstFlight || parsedDate < Date.parse(firstFlight.date)) {
        firstFlight = {
          date: record.date,
          from: record.from,
          to: record.to,
          flight: record.flight,
        };
      }
      if (!lastFlight || parsedDate > Date.parse(lastFlight.date)) {
        lastFlight = {
          date: record.date,
          from: record.from,
          to: record.to,
          flight: record.flight,
        };
      }
    }

    const minutes = computeDurationMinutes(record);
    totalMinutes += minutes;

    if (minutes > 0 && minutes < 120) durationBuckets.short += 1;
    else if (minutes >= 120 && minutes <= 240) durationBuckets.medium += 1;
    else if (minutes > 240) durationBuckets.long += 1;

    if (record.canceled) canceled += 1;
    if (record.divertedTo) diverted += 1;

    const scheduledDeparture =
      parseDateValue(record.takeoffScheduled) ?? parseDateValue(record.gateDepartureScheduled);
    const actualDeparture =
      parseDateValue(record.takeoffActual) ?? parseDateValue(record.gateDepartureActual);
    const scheduledArrival =
      parseDateValue(record.landingScheduled) ?? parseDateValue(record.gateArrivalScheduled);
    const actualArrival =
      parseDateValue(record.landingActual) ?? parseDateValue(record.gateArrivalActual);

    if (scheduledDeparture && actualDeparture) {
      const diff = Math.max(0, (actualDeparture - scheduledDeparture) / 1000 / 60);
      if (diff <= 5) onTimeDepartures += 1;
      else delayedDepartures += 1;
      if (diff > 0) {
        totalDelayMinutes += diff;
        if (!worstDelay || diff > worstDelay.minutes) {
          worstDelay = {
            flight: record.flight,
            from: record.from,
            to: record.to,
            minutes: Math.round(diff),
            phase: 'Departure',
          };
        }
        if (record.airline) {
          const current = airlineDelay.get(record.airline) ?? { delay: 0, counted: 0 };
          airlineDelay.set(record.airline, {
            delay: current.delay + diff,
            counted: current.counted + 1,
          });
        }
        if (record.from) {
          const current = originDelay.get(record.from) ?? { delay: 0, counted: 0 };
          originDelay.set(record.from, { delay: current.delay + diff, counted: current.counted + 1 });
        }
      }
    }

    if (scheduledArrival && actualArrival) {
      const diff = Math.max(0, (actualArrival - scheduledArrival) / 1000 / 60);
      if (diff <= 5) onTimeArrivals += 1;
      else delayedArrivals += 1;
      if (diff > 0) {
        totalDelayMinutes += diff;
        if (!worstDelay || diff > worstDelay.minutes) {
          worstDelay = {
            flight: record.flight,
            from: record.from,
            to: record.to,
            minutes: Math.round(diff),
            phase: 'Arrival',
          };
        }
        if (record.airline) {
          const current = airlineDelay.get(record.airline) ?? { delay: 0, counted: 0 };
          airlineDelay.set(record.airline, {
            delay: current.delay + diff,
            counted: current.counted + 1,
          });
        }
        if (record.to) {
          const current = originDelay.get(record.to) ?? { delay: 0, counted: 0 };
          originDelay.set(record.to, { delay: current.delay + diff, counted: current.counted + 1 });
        }
      }
    }

    if (minutes > 0) {
      const existingShortest = shortestFlight?.minutes ?? Number.POSITIVE_INFINITY;
      const existingLongest = longestFlight?.minutes ?? 0;
      if (minutes < existingShortest) {
        shortestFlight = {
          flight: record.flight,
          from: record.from,
          to: record.to,
          minutes,
        };
      }
      if (minutes > existingLongest) {
        longestFlight = {
          flight: record.flight,
          from: record.from,
          to: record.to,
          minutes,
        };
      }
      if (record.airline) {
        airlineMinutes.set(record.airline, (airlineMinutes.get(record.airline) ?? 0) + minutes);
      }
    }
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

  const topAirlineByTimeEntry = Array.from(airlineMinutes.entries()).sort((a, b) => b[1] - a[1])[0];
  const topAirlineByTime =
    topAirlineByTimeEntry && topAirlineByTimeEntry[1] > 0
      ? { name: topAirlineByTimeEntry[0], minutes: topAirlineByTimeEntry[1] }
      : undefined;

  const delayByAirline = Array.from(airlineDelay.entries())
    .map(([name, value]) => ({
      name,
      averageDelay: value.counted ? Math.round(value.delay / value.counted) : 0,
      flights: value.counted,
    }))
    .filter((item) => item.averageDelay > 0)
    .sort((a, b) => b.averageDelay - a.averageDelay)
    .slice(0, 3);

  const delayByOrigin = Array.from(originDelay.entries())
    .map(([code, value]) => ({
      code,
      averageDelay: value.counted ? Math.round(value.delay / value.counted) : 0,
      flights: value.counted,
    }))
    .filter((item) => item.averageDelay > 0)
    .sort((a, b) => b.averageDelay - a.averageDelay)
    .slice(0, 3);

  const pickTop = <T,>(map: Map<T, number>): { key: T; value: number } | undefined => {
    let current: { key: T; value: number } | undefined;
    for (const [key, value] of map.entries()) {
      if (!current || value > current.value) current = { key, value };
    }
    return current;
  };

  const topOriginEntry = pickTop(originCounts);
  const topDestinationEntry = pickTop(destinationCounts);
  const topRouteEntry = pickTop(routeCounts);
  const topAirportEntry = pickTop(airportVisits);

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const weekdayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const topYearEntry = pickTop(yearCounts);
  const topMonthEntry = pickTop(monthCounts);
  const topWeekdayEntry = pickTop(weekdayCounts);

  return {
    flights,
    airlines: airlinesSet.size,
    aircraftTypes: aircraftSet.size,
    airports: airportsSet.size,
    airportCodes: Array.from(airportsSet).sort(),
    routes: routesSet.size,
    totalHours: Number((totalMinutes / 60).toFixed(1)),
    totalMinutes: Math.round(totalMinutes),
    averageFlightMinutes: flights ? Math.round(totalMinutes / flights) : 0,
    durationBuckets,
    firstYear,
    lastYear,
    firstFlight,
    lastFlight,
    topAirlines,
    topAircraft,
    topAircraftCount,
    aircraftBreakdown,
    shortestFlight,
    longestFlight,
    topAirlineByTime,
    onTimeDepartures,
    delayedDepartures,
    onTimeArrivals,
    delayedArrivals,
    totalDelayMinutes: Math.round(totalDelayMinutes),
    averageDelayMinutes: flights ? Math.round(totalDelayMinutes / flights) : 0,
    worstDelay,
    delayByAirline,
    delayByOrigin,
    topOrigin: topOriginEntry ? { code: String(topOriginEntry.key), flights: topOriginEntry.value } : undefined,
    topDestination: topDestinationEntry
      ? { code: String(topDestinationEntry.key), flights: topDestinationEntry.value }
      : undefined,
    topRoute: topRouteEntry
      ? { route: String(topRouteEntry.key), flights: topRouteEntry.value }
      : undefined,
    topAirportOverall: topAirportEntry
      ? { code: String(topAirportEntry.key), visits: topAirportEntry.value }
      : undefined,
    topYear: topYearEntry?.key ? Number(topYearEntry.key) : undefined,
    topMonth: topMonthEntry ? monthNames[Number(topMonthEntry.key)] : undefined,
    topWeekday: topWeekdayEntry ? weekdayNames[Number(topWeekdayEntry.key)] : undefined,
    canceled,
    diverted,
  };
}
