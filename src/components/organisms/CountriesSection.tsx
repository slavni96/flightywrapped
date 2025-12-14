import { useEffect, useRef } from 'react';
import L from 'leaflet';
import { type FlightStats } from '../../types/flight';
import { SectionHeader } from '../molecules/SectionHeader';
import { Badge } from '../atoms/Badge';
import { airportLabel, getAirport } from '../../utils/airportLookup';

type CountriesSectionProps = {
  stats: FlightStats;
  containerId?: string;
};

const positionForCode = (code: string) => {
  const info = getAirport(code);
  if (info?.latitude != null && info?.longitude != null) {
    const x = ((info.longitude + 180) / 360) * 100;
    const y = ((90 - info.latitude) / 180) * 100;
    return { x: Math.max(1, Math.min(99, x)), y: Math.max(1, Math.min(99, y)), lat: info.latitude, lon: info.longitude };
  }
  return undefined;
};

export function CountriesSection({ stats, containerId }: CountriesSectionProps) {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstance = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;
    if (mapInstance.current) {
      mapInstance.current.remove();
      mapInstance.current = null;
    }

    const map = L.map(mapRef.current, {
      center: [42.5, 12.5],
      zoom: 4,
      zoomControl: true,
      scrollWheelZoom: false,
      dragging: true,
      doubleClickZoom: false,
      attributionControl: false,
      worldCopyJump: true,
    });
    map.zoomControl.setPosition('topright');

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      minZoom: 2,
      maxZoom: 6,
      crossOrigin: true,
    }).addTo(map);

    const coords = stats.airportCodes
      .map((code) => ({ code, pos: positionForCode(code) }))
      .filter((c): c is { code: string; pos: { lat: number; lon: number; x: number; y: number } } => Boolean(c.pos));

    coords.forEach(({ code, pos }) => {
      L.circleMarker([pos.lat, pos.lon], {
        radius: 6,
        color: '#137fec',
        weight: 2,
        fillColor: '#137fec',
        fillOpacity: 0.85,
      })
        .addTo(map)
        .bindTooltip(airportLabel(code), { direction: 'top' });
    });

    if (coords.length) {
      const bounds = L.latLngBounds(coords.map((c) => [c.pos.lat, c.pos.lon]));
      map.fitBounds(bounds, { padding: [40, 40], maxZoom: 6 });
    }

    setTimeout(() => map.invalidateSize(), 150);
    mapInstance.current = map;
    (window as any).__flightyMap = map;

    return () => {
      map.remove();
      mapInstance.current = null;
      (window as any).__flightyMap = null;
    };
  }, [stats.airportCodes]);

  return (
    <section
      id={containerId}
      className="relative overflow-hidden rounded-3xl border border-white/70 bg-white p-4 text-slate-900 shadow-card sm:p-6 lg:p-8 max-w-6xl w-full mx-auto"
    >
      <div className="relative z-10 flex flex-col gap-6">
        <SectionHeader
          align="center"
          eyebrow="Flighty ✈"
          title="World Reach"
          subtitle={`You visited ${stats.airports} airports across ${stats.routes} routes.`}
        />
        <div className="flex flex-col items-center gap-3">
          <Badge tone="primary" className="bg-primary/20 text-primary">
            {stats.routes} routes mapped
          </Badge>
          <div className="relative w-full overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 shadow-inner h-[340px] md:h-[480px]">
            <div ref={mapRef} className="absolute inset-0 h-full w-full" />
            <div className="pointer-events-none absolute inset-0 rounded-2xl border border-primary/25 shadow-[inset_0_0_0_1px_rgba(19,127,236,0.08)]" />
          </div>
          <p className="text-center text-slate-600">
            That’s your reach based on unique airport codes.
          </p>
        </div>
      </div>
    </section>
  );
}
