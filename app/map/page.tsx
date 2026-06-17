"use client";

import Navbar from "@/components/landing/Navbar";
import dynamic from "next/dynamic";
import { useState } from "react";

const DynamicMap = dynamic(
  () => import("@/components/Map").then((mod) => mod.Map),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full w-full items-center justify-center bg-q-bg">
        <p className="text-q-text-sub">Chargement de la carte…</p>
      </div>
    ),
  },
);

type Route = {
  id: string;
  name: string;
  region: string;
  distance: string;
  difficulty: string;
  highlights: string;
  gpx: string;
  color: string;
};

const ROUTES: Route[] = [
  {
    id: "vignoble-alsace",
    name: "EuroVelo 15 — Véloroute du Rhin",
    region: "Alsace",
    distance: "~180 km",
    difficulty: "Facile",
    highlights:
      "Suit le Rhin et le canal du Rhône au Rhin. Réserves naturelles (Petite Camargue alsacienne), Strasbourg (cathédrale, Petite France), Neuf-Brisach (Vauban, UNESCO), villages typiques, ambiance transfrontalière France-Allemagne. Idéal pour familles ou voyages lents.",
    gpx: "/vignoble_alsace.gpx",
    color: "#FCE500",
  },
  {
    id: "eurovelo-15-developed",
    name: "EuroVelo 15 — Tracé développé",
    region: "Rhin",
    distance: "~1 230 km",
    difficulty: "Modéré",
    highlights:
      "Le grand itinéraire du Rhin, de la source suisse à la mer du Nord. Tronçons balisés et aménagés traversant plusieurs pays le long du fleuve.",
    gpx: "/EuroVelo 15 - developed.gpx",
    color: "#38bdf8",
  },
  {
    id: "boucle-moselle",
    name: "Boucle de la Moselle",
    region: "Lorraine",
    distance: "~82 km",
    difficulty: "Modéré",
    highlights:
      "Boucle au fil de la Moselle entre coteaux viticoles et patrimoine lorrain. Parcours roulant alternant bords de rivière et villages.",
    gpx: "/boucle-moselle-82kms.gpx",
    color: "#34d399",
  },
  {
    id: "voie-bleue",
    name: "La Voie Bleue",
    region: "Lorraine",
    distance: "~700 km",
    difficulty: "Modéré",
    highlights:
      "De la frontière luxembourgeoise à Lyon, la Voie Bleue longe la Moselle puis la Saône. Itinéraire fluvial continu, jalonné de villes d'eau.",
    gpx: "/La_Voie_Bleue.gpx",
    color: "#60a5fa",
  },
  {
    id: "lac-du-der",
    name: "Tour du Lac du Der",
    region: "Champagne",
    distance: "~38 km",
    difficulty: "Facile",
    highlights:
      "Boucle complète autour du plus grand lac artificiel de France. Plat et ombragé, paradis des oiseaux migrateurs et des grues cendrées.",
    gpx: "/tour-du-lac-du-der.gpx",
    color: "#f472b6",
  },
];

const REGIONS = ["Alsace", "Lorraine", "Champagne", "Rhin"];
const DIFFICULTIES = ["Facile", "Modéré", "Difficile"];
const DISTANCES = ["Moins de 50 km", "50 à 100 km", "Plus de 100 km"];

const FRANCE_CENTER: [number, number] = [46.6, 2.3];

type Pt = [number, number];

// Échantillonne `n` points répartis le long du tracé (pour les waypoints).
function samplePoints(points: Pt[], n: number): Pt[] {
  if (points.length <= n) return points;
  const step = (points.length - 1) / (n - 1);
  return Array.from({ length: n }, (_, i) => points[Math.round(i * step)]);
}

// Google Maps : origine + destination + waypoints échantillonnés, à vélo.
// Limite de waypoints : 9 sur desktop, 3 sur mobile (les surplus sont ignorés).
function googleMapsUrl(points: Pt[]): string {
  const origin = points[0];
  const destination = points[points.length - 1];
  const mids = samplePoints(points.slice(1, -1), 8);
  const params = new URLSearchParams({
    api: "1",
    origin: `${origin[0]},${origin[1]}`,
    destination: `${destination[0]},${destination[1]}`,
    travelmode: "bicycling",
  });
  const waypoints = mids.map((p) => `${p[0]},${p[1]}`).join("|");
  const wp = waypoints ? `&waypoints=${encodeURIComponent(waypoints)}` : "";
  return `https://www.google.com/maps/dir/?${params.toString()}${wp}`;
}

async function loadGpx(url: string): Promise<Array<[number, number]>> {
  const res = await fetch(encodeURI(url));
  if (!res.ok) throw new Error(`Tracé introuvable (${res.status})`);
  const text = await res.text();
  const xml = new DOMParser().parseFromString(text, "application/xml");
  return Array.from(xml.getElementsByTagName("trkpt")).map((pt) => [
    parseFloat(pt.getAttribute("lat") ?? "0"),
    parseFloat(pt.getAttribute("lon") ?? "0"),
  ]);
}

export default function Page() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [segments, setSegments] = useState<Array<[number, number]>>([]);
  const [loadingRoute, setLoadingRoute] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cache] = useState<Map<string, Array<[number, number]>>>(new Map());

  const selectedRoute = ROUTES.find((r) => r.id === selectedId) ?? null;
  const hasRoute = segments.length > 1;

  const selectRoute = async (route: Route) => {
    // Re-cliquer sur le trajet actif le désélectionne.
    if (selectedId === route.id) {
      setSelectedId(null);
      setSegments([]);
      return;
    }

    setSelectedId(route.id);
    setError(null);

    const cached = cache.get(route.id);
    if (cached) {
      setSegments(cached);
      return;
    }

    setLoadingRoute(true);
    try {
      const points = await loadGpx(route.gpx);
      cache.set(route.id, points);
      setSegments(points);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erreur de chargement du tracé");
      setSegments([]);
    } finally {
      setLoadingRoute(false);
    }
  };

  return (
    <main className="relative flex h-screen w-screen flex-col overflow-hidden bg-q-bg">
      <Navbar />

      <div className="flex min-h-0 flex-1 gap-4 p-4 pt-20 md:gap-6 md:p-6 md:pt-28">
        {/* Colonne gauche (~70%) : carte + actions */}
        <div className="flex min-h-0 flex-1 flex-col gap-4">
          <section className="relative min-h-0 flex-1 overflow-hidden rounded-2xl border border-q-border shadow-2xl">
            {/* En-tête superposé */}
            <div className="pointer-events-none absolute left-5 top-5 z-[500] max-w-md">
              <span className="text-xs font-bold uppercase tracking-widest text-secondary">
                Itinéraires vélo
              </span>
              <h1 className="mt-1 text-2xl font-bold text-white drop-shadow-md md:text-3xl">
                {selectedRoute ? selectedRoute.name : "Explorez nos trajets"}
              </h1>
            </div>

            {loadingRoute && (
              <div className="absolute right-5 top-5 z-[500] rounded-full bg-q-card/90 px-4 py-2 text-sm text-q-text-sub backdrop-blur-md">
                Chargement du tracé…
              </div>
            )}

            <DynamicMap
              zoom={6}
              center={FRANCE_CENTER}
              markers={[]}
              segments={segments}
              segmentColor={selectedRoute?.color ?? "#FCE500"}
              bound_type={segments.length > 0 ? "segments" : "center"}
              onclick={() => {}}
            />
          </section>

          {/* Actions « Ouvrir sur » — sous la carte */}
          <div className="flex flex-none flex-wrap items-center gap-3 rounded-2xl border border-q-border bg-q-card/40 px-4 py-3">
            <span className="text-sm font-medium text-q-text-sub">
              Ouvrir sur
            </span>

            <OpenInButton
              label="Google Maps"
              href={hasRoute ? googleMapsUrl(segments) : null}
              icon={<GoogleMapsIcon />}
              disabledTitle="Sélectionnez un trajet"
            />
          </div>
        </div>

        {/* Liste des trajets — bloc droit (30%) */}
        <aside className="flex min-h-0 w-[30%] flex-col overflow-hidden rounded-2xl border border-q-border bg-q-card/40 shadow-2xl">
          <div className="flex-none border-b border-q-border-sub p-5">
            <h2 className="text-lg font-bold text-white">Trajets</h2>
            <p className="text-sm text-q-text-muted">
              Sélectionnez un itinéraire pour l’afficher sur la carte.
            </p>

            {/* Filtres (front uniquement pour l'instant) */}
            <div className="mt-4 grid grid-cols-3 gap-2">
              <Filter label="Région" options={REGIONS} />
              <Filter label="Difficulté" options={DIFFICULTIES} />
              <Filter label="Distance" options={DISTANCES} />
            </div>

            {/* Barre de recherche (front uniquement pour l'instant) */}
            <div className="relative mt-3">
              <svg
                className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-q-text-muted"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="search"
                placeholder="Rechercher un trajet…"
                className="w-full rounded-lg border border-q-border-sub bg-q-bg/60 py-2 pl-9 pr-3 text-sm text-white placeholder:text-q-text-muted focus:border-secondary focus:outline-none"
              />
            </div>
          </div>

          {/* Liste scrollable */}
          <div className="min-h-0 flex-1 space-y-3 overflow-y-auto p-4">
            {error && (
              <p className="rounded-lg bg-red-500/10 px-3 py-2 text-sm text-red-300">
                {error}
              </p>
            )}

            {ROUTES.map((route) => {
              const active = route.id === selectedId;
              return (
                <button
                  key={route.id}
                  onClick={() => selectRoute(route)}
                  className={`w-full rounded-xl border p-4 text-left transition-all ${
                    active
                      ? "border-secondary bg-q-card-hover"
                      : "border-q-border-sub bg-q-card hover:border-q-border hover:bg-q-card-hover"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-bold text-white">{route.name}</h3>
                    <span
                      className="mt-1 h-3 w-3 shrink-0 rounded-full"
                      style={{ backgroundColor: route.color }}
                    />
                  </div>

                  <div className="mt-2 flex flex-wrap gap-2 text-xs">
                    <span className="rounded-full bg-q-bg/60 px-2 py-1 text-q-text-sub">
                      {route.region}
                    </span>
                    <span className="rounded-full bg-q-bg/60 px-2 py-1 text-q-text-sub">
                      {route.distance}
                    </span>
                    <span className="rounded-full bg-q-bg/60 px-2 py-1 text-q-text-sub">
                      {route.difficulty}
                    </span>
                  </div>

                  <p className="mt-3 text-sm leading-relaxed text-q-text-muted">
                    {route.highlights}
                  </p>
                </button>
              );
            })}
          </div>
        </aside>
      </div>
    </main>
  );
}

function OpenInButton({
  label,
  href,
  icon,
  disabledTitle,
}: {
  label: string;
  href: string | null;
  icon: React.ReactNode;
  disabledTitle: string;
}) {
  const base =
    "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all";

  if (!href) {
    return (
      <span
        title={disabledTitle}
        aria-disabled="true"
        className={`${base} cursor-not-allowed border-q-border-sub bg-q-bg/30 text-q-text-dim`}
      >
        {icon}
        {label}
      </span>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${base} border-q-border-sub bg-q-card text-white hover:border-secondary hover:bg-q-card-hover`}
    >
      {icon}
      {label}
    </a>
  );
}

function GoogleMapsIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
      <path
        fill="#EA4335"
        d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
      />
      <circle cx="12" cy="9" r="2.6" fill="#fff" />
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 text-white" aria-hidden>
      <path
        fill="currentColor"
        d="M16.365 1.43c0 1.14-.46 2.22-1.2 3.02-.8.86-2.09 1.52-3.16 1.43-.13-1.1.45-2.27 1.16-3.05.78-.86 2.16-1.5 3.2-1.4zM20.9 17.1c-.55 1.27-.82 1.84-1.53 2.97-.99 1.57-2.39 3.53-4.12 3.55-1.54.01-1.93-1-4.02-.99-2.09.01-2.52 1.01-4.06.99-1.73-.02-3.05-1.79-4.04-3.36C.58 16.06.29 11.21 2.04 8.6c1.24-1.86 3.2-2.95 5.04-2.95 1.87 0 3.05 1.03 4.6 1.03 1.5 0 2.42-1.03 4.59-1.03 1.64 0 3.37.89 4.6 2.43-4.04 2.21-3.38 7.98.03 9.02z"
      />
    </svg>
  );
}

function MappyIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
      <path
        fill="currentColor"
        d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1112 6.5a2.5 2.5 0 010 5z"
      />
    </svg>
  );
}

function Filter({ label, options }: { label: string; options: string[] }) {
  return (
    <select
      defaultValue=""
      aria-label={label}
      className="min-w-0 rounded-lg border border-q-border-sub bg-q-bg/60 px-2 py-2 text-xs text-q-text-sub focus:border-secondary focus:outline-none"
    >
      <option value="" className="bg-q-card text-white">
        {label}
      </option>
      {options.map((opt) => (
        <option key={opt} value={opt} className="bg-q-card text-white">
          {opt}
        </option>
      ))}
    </select>
  );
}
