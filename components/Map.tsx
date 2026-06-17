"use client";

import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect, useMemo, useRef } from "react";

type Marker<T> = { name: string; location: [number, number]; data: T };

type Props<T> = {
  center: [number, number];
  zoom: number;
  markers: Array<Marker<T>>;
  segments: Array<[number, number]>;
  onclick: (data: T) => void;
  bound_type: "markers" | "segments" | "center";
};

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

const createPinIcon = (color = "#27509b") =>
  L.divIcon({
    className: "",
    html: `<svg width="36" height="46" viewBox="0 0 36 46" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="pshadow" x="-40%" y="-20%" width="180%" height="160%">
          <feDropShadow dx="0" dy="3" stdDeviation="3" flood-color="rgba(0,0,0,0.45)"/>
        </filter>
        <radialGradient id="pgrad" cx="40%" cy="35%">
          <stop offset="0%" stop-color="#fff" stop-opacity="0.25"/>
          <stop offset="100%" stop-color="#fff" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <path d="M18 2C9.163 2 2 9.163 2 18C2 30 18 44 18 44C18 44 34 30 34 18C34 9.163 26.837 2 18 2Z"
        fill="${color}" filter="url(#pshadow)"/>
      <path d="M18 2C9.163 2 2 9.163 2 18C2 30 18 44 18 44C18 44 34 30 34 18C34 9.163 26.837 2 18 2Z"
        fill="url(#pgrad)"/>
      <circle cx="18" cy="18" r="7.5" fill="rgba(255,255,255,0.92)"/>
      <circle cx="18" cy="18" r="3.5" fill="${color}"/>
    </svg>`,
    iconSize: [36, 46],
    iconAnchor: [18, 44],
    popupAnchor: [0, -46],
  });

function MapController({
  mapRef,
  bound_type,
  center,
  markers,
  segments,
}: {
  mapRef: React.RefObject<L.Map | null>;
  bound_type: "center" | "markers" | "segments";
  center: [number, number];
  markers: Array<Marker<unknown>>;
  segments: Array<[number, number]>;
}) {
  const map = useMap();
  useEffect(() => {
    mapRef.current = map;
  }, [map, mapRef]);

  useEffect(() => {
    console.log(bound_type);
    if (bound_type === "center") {
      map.flyTo(center);
    } else if (bound_type === "markers" && markers.length > 0) {
      if (markers.length === 1) {
        map.flyTo(markers[0].location, 15, {
          duration: 1.4,
        });
      } else {
        map.flyToBounds(L.latLngBounds(markers.map((m) => m.location)), {
          padding: [40, 40],
          animate: true,
          duration: 0.8,
        });
      }
    } else if (bound_type === "segments" && segments.length > 0) {
      map.fitBounds(L.latLngBounds(segments), { padding: [40, 40] });
    }
  }, [bound_type, center, markers, segments, map]);
  return null;
}

function ZoomButtons({ mapRef }: { mapRef: React.RefObject<L.Map | null> }) {
  const btn =
    "w-9 h-9 flex items-center justify-center rounded-xl " +
    "bg-zinc-900/80 backdrop-blur-md text-zinc-100 text-xl font-extralight " +
    "border border-zinc-700/50 shadow-lg " +
    "hover:bg-zinc-700/90 hover:scale-105 active:scale-95 transition-all duration-150";

  return (
    <div className="absolute bottom-6 right-4 z-1000 flex flex-col gap-1.5">
      <button className={btn} onClick={() => mapRef.current?.zoomIn()}>
        +
      </button>
      <button className={btn} onClick={() => mapRef.current?.zoomOut()}>
        −
      </button>
    </div>
  );
}

export function Map<T>({
  center = [0, 0],
  zoom,
  markers,
  segments,
  onclick,
  bound_type,
}: Props<T>) {
  const icon = useMemo(() => createPinIcon(), []);
  const mapRef = useRef<L.Map | null>(null);

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      className="w-screen h-screen"
      attributionControl={false}
      zoomControl={false}
      doubleClickZoom={false}
    >
      <MapController
        mapRef={mapRef}
        bound_type={bound_type}
        center={center}
        markers={markers}
        segments={segments}
      />
      {/*<ChangeView center={center} zoom={zoom} />*/}
      <TileLayer url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png" />

      {markers.map((m) => (
        <Marker
          position={m.location}
          key={m.location.toString()}
          icon={icon}
          eventHandlers={{ click: () => onclick(m.data) }}
        />
      ))}

      <Polyline pathOptions={{ color: "blue" }} positions={segments} />
      <ZoomButtons mapRef={mapRef} />
    </MapContainer>
  );
}
