"use client";

import Navbar from "@/components/landing/Navbar";
import { get_tracks, Tracks } from "@/lib/firestore";
import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";

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

// Palette appliquée aux trajets dans l'ordre de réception.
const PALETTE = ["#FCE500", "#38bdf8", "#34d399", "#60a5fa", "#f472b6", "#fb923c"];

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


export default function Page() {
  const [tracks, setTracks] = useState<Tracks[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    get_tracks()
      .map((data) => {
        console.log("tracks", data);
        setTracks(data);
        setError(null);
        setLoading(false);
      })
      .mapErr((err) => {
        setError(err);
        setTracks([]);
        setLoading(false);
      });
  }, []);

  const selectedTrack =
    selectedIndex !== null ? (tracks[selectedIndex] ?? null) : null;

  const segments: Pt[] = useMemo(
    () =>
      selectedTrack
        ? selectedTrack.segments.map((p) => [p.latitude, p.longitude])
        : [],
    [selectedTrack],
  );

  const selectedColor =
    selectedIndex !== null
      ? PALETTE[selectedIndex % PALETTE.length]
      : "#FCE500";
  const hasRoute = segments.length > 1;

  const selectTrack = (index: number) => {
    setSelectedIndex((current) => (current === index ? null : index));
  };

  // Recherche par nom ou description, en conservant l'index d'origine.
  const visibleTracks = useMemo(() => {
    const q = search.trim().toLowerCase();
    const indexed = tracks.map((track, index) => ({ track, index }));
    if (!q) return indexed;
    return indexed.filter(
      ({ track }) =>
        track.name.toLowerCase().includes(q) ||
        track.comment.toLowerCase().includes(q),
    );
  }, [tracks, search]);

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
                {selectedTrack ? selectedTrack.name : "Explorez nos trajets"}
              </h1>
            </div>

            <DynamicMap
              zoom={6}
              center={FRANCE_CENTER}
              markers={[]}
              segments={segments}
              segmentColor={selectedColor}
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

            {/* Barre de recherche */}
            <div className="relative mt-4">
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
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Rechercher un trajet…"
                className="w-full rounded-lg border border-q-border-sub bg-q-bg/60 py-2 pl-9 pr-3 text-sm text-white placeholder:text-q-text-muted focus:border-secondary focus:outline-none"
              />
            </div>
          </div>

          {/* Liste scrollable */}
          <div className="min-h-0 flex-1 space-y-3 overflow-y-auto p-4">
            {loading && (
              <p className="px-1 text-sm text-q-text-muted">
                Chargement des trajets…
              </p>
            )}

            {error && (
              <p className="rounded-lg bg-red-500/10 px-3 py-2 text-sm text-red-300">
                {error}
              </p>
            )}

            {!loading && !error && tracks.length === 0 && (
              <p className="px-1 text-sm text-q-text-muted">
                Aucun trajet disponible.
              </p>
            )}

            {!loading &&
              !error &&
              tracks.length > 0 &&
              visibleTracks.length === 0 && (
                <p className="px-1 text-sm text-q-text-muted">
                  Aucun trajet ne correspond à « {search} ».
                </p>
              )}

            {visibleTracks.map(({ track, index }) => {
              const active = index === selectedIndex;
              const color = PALETTE[index % PALETTE.length];
              return (
                <button
                  key={`${track.name}-${index}`}
                  onClick={() => selectTrack(index)}
                  className={`w-full rounded-xl border p-4 text-left transition-all ${
                    active
                      ? "border-secondary bg-q-card-hover"
                      : "border-q-border-sub bg-q-card hover:border-q-border hover:bg-q-card-hover"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-bold text-white">{track.name}</h3>
                    <span
                      className="mt-1 h-3 w-3 shrink-0 rounded-full"
                      style={{ backgroundColor: color }}
                    />
                  </div>

                  <div className="mt-2 flex flex-wrap gap-2 text-xs">
                    <span className="rounded-full bg-q-bg/60 px-2 py-1 text-q-text-sub">
                      {track.distance}
                    </span>
                    <span className="rounded-full bg-q-bg/60 px-2 py-1 text-q-text-sub">
                      {track.difficulty}
                    </span>
                  </div>

                  <p className="mt-3 text-sm leading-relaxed text-q-text-muted">
                    {track.comment}
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

