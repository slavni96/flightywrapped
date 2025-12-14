import airlines from '../data/airlines.json';

const manualOverrides: Record<string, string> = {
  ITY: 'ITA Airways',
  UAL: 'United Airlines',
  RYR: 'Ryanair',
  CES: 'China Eastern Airlines',
  AFR: 'Air France',
  DLH: 'Lufthansa',
};

export function getAirlineName(code?: string): string | undefined {
  if (!code) return undefined;
  const key = code.trim().toUpperCase();
  const override = manualOverrides[key];
  if (override) return override;
  const name = (airlines as Record<string, string>)[key];
  return name;
}

export function airlineLabel(code?: string): string {
  if (!code) return '';
  const name = getAirlineName(code);
  return name ? `${name} (${code.toUpperCase()})` : code.toUpperCase();
}
