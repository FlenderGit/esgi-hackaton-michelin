"use client";

import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  useMap,
  ZoomControl,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect } from "react";

type Marker<T> = { name: string; location: [number, number]; data: T };

type Props<T> = {
  center: [number, number];
  zoom: number;
  markers: Array<Marker<T>>;
  segments: Array<[number, number]>;
  onclick: (data: T) => void;
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

function ChangeView({
  center,
  zoom,
}: {
  center: [number, number];
  zoom: number;
}) {
  const map = useMap();

  useEffect(() => {
    map.flyTo(center, zoom);
  }, [center, zoom, map]);

  return null;
}

export function Map<T>({ center, zoom, markers, segments, onclick }: Props<T>) {
  return (
    <MapContainer
      center={center}
      zoom={zoom}
      className="w-screen h-screen"
      zoomControl={false}
    >
      <ChangeView center={center} zoom={zoom} />
      <ZoomControl position="bottomright" />
      <TileLayer url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png" />

      {markers.map((m) => (
        <Marker
          position={m.location}
          key={m.location.toString()}
          eventHandlers={{ click: () => onclick(m.data) }}
        />
      ))}

      <Polyline pathOptions={{ color: "blue" }} positions={segments} />
    </MapContainer>
  );
}
