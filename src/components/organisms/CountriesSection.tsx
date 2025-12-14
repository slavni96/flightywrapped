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
    return { lat: info.latitude, lon: info.longitude };
  }
  return undefined;
};

export function CountriesSection({ stats, containerId }: CountriesSectionProps) {
  const mapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;
    const map = L.map(mapRef.current, {
      center: [50, 10], // center over Europe by default
      zoom: 3,
      zoomControl: true,
      scrollWheelZoom: false,
      dragging: true,
      doubleClickZoom: false,
      attributionControl: false,
      worldCopyJump: true,
    });

    // Place zoom controls on the top-right to avoid badges
    map.zoomControl.setPosition('topright');

    const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    L.tileLayer(tileUrl, {
      minZoom: 2,
      maxZoom: 6,
      crossOrigin: true,
    }).addTo(map);

    const coords = stats.airportCodes
      .map((code) => ({ code, pos: positionForCode(code) }))
      .filter((c): c is { code: string; pos: { lat: number; lon: number } } => Boolean(c.pos));

    if (coords.length) {
      const bounds = L.latLngBounds(coords.map((c) => [c.pos.lat, c.pos.lon]));
      map.fitBounds(bounds.pad(0.2));
    }

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

    return () => {
      map.remove();
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
          <div className="relative w-full overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 shadow-inner aspect-[2/1]">
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
