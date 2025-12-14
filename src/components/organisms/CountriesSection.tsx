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

const MAP_IMAGE = `${import.meta.env.BASE_URL}world-map-2x1.png`;

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
  const layerRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;
    if (layerRef.current) {
      layerRef.current.remove();
      layerRef.current = null;
    }

    const map = L.map(mapRef.current, {
      center: [42.5, 12.5], // Italy/Europe
      zoom: 4,
      zoomControl: true,
      scrollWheelZoom: false,
      dragging: true,
      doubleClickZoom: false,
      attributionControl: false,
      worldCopyJump: true,
    });
    map.zoomControl.setPosition('topright');

    const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    L.tileLayer(tileUrl, {
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
    } else {
      map.setView([42.5, 12.5], 4);
    }

    setTimeout(() => map.invalidateSize(), 150);
    layerRef.current = map;
    return () => {
      map.remove();
      layerRef.current = null;
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
            <div ref={mapRef} className="absolute inset-0 h-full w-full live-map" />
            {/* Static overlay used during export to ensure markers remain visible */}
            <div className="absolute inset-0 hidden export-only">
              <img
                src={MAP_IMAGE}
                alt="World map background"
                className="h-full w-full object-contain"
                loading="lazy"
              />
              {stats.airportCodes.map((code) => {
                const pos = positionForCode(code);
                const label = airportLabel(code);
                if (!pos) return null;
                return (
                  <span
                    key={code}
                    className="absolute h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary shadow-[0_0_14px_rgba(19,127,236,0.55)] ring-2 ring-white/80"
                    style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                    title={label}
                    aria-label={label}
                  />
                );
              })}
            </div>
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
