"use client";

import Navbar from "@/components/landing/Navbar";
import { get_suppliers, Supplier } from "@/lib/firestore";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const DynamicMap = dynamic(
  () => import("@/components/Map").then((mod) => mod.Map),
  {
    ssr: false,
    loading: () => <MapLoading />,
  },
);

function MapLoading() {
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-zinc-950 gap-4">
      <svg
        width="72"
        height="72"
        viewBox="0 0 72 72"
        xmlns="http://www.w3.org/2000/svg"
        className="animate-spin"
        style={{ animationDuration: "1.4s" }}
      >
        <circle
          cx="36"
          cy="36"
          r="33"
          fill="none"
          stroke="#6366f1"
          strokeWidth="3"
        />
        <circle
          cx="36"
          cy="36"
          r="26"
          fill="none"
          stroke="#6366f1"
          strokeWidth="1"
          strokeOpacity="0.3"
        />
        <circle cx="36" cy="36" r="4.5" fill="#6366f1" />
        <circle cx="36" cy="36" r="2" fill="#18181b" />
        {Array.from({ length: 8 }).map((_, i) => {
          const angle = (i * 360) / 8;
          const rad = (angle * Math.PI) / 180;
          const x1 = 36 + 4.5 * Math.cos(rad);
          const y1 = 36 + 4.5 * Math.sin(rad);
          const x2 = 36 + 33 * Math.cos(rad);
          const y2 = 36 + 33 * Math.sin(rad);
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="#818cf8"
              strokeWidth="1.5"
              strokeOpacity={i % 2 === 0 ? 0.9 : 0.4}
            />
          );
        })}
      </svg>
      <p className="text-zinc-500 text-lg font-semibold tracking-wide animate-pulse uppercase italic">
        Chargement de la carte…
      </p>
    </div>
  );
}

export default function Page() {
  const searchParams = useSearchParams();

  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(
    null,
  );
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    get_suppliers()
      .map((data) => {
        setSuppliers(data);
        const id_supplier = searchParams.get("id_supplier");
        if (id_supplier !== null) {
          setSelectedSupplier(data.find((s) => s.id === id_supplier) ?? null);
        }

        setError(null);
        setLoading(false);
      })
      .mapErr((err) => {
        setError(err);
        setSuppliers([]);
        setLoading(false);
      });
  }, [searchParams]);

  if (loading) return <MapLoading />;
  if (error) return <div>Erreur: {error}</div>;

  return (
    <div className="relative h-screen w-screen">
      <Navbar />

      {loading ? (
        <MapLoading />
      ) : error ? (
        <div>Error: {error}</div>
      ) : (
        <div className="relative h-full w-full">
          <div className="absolute top-32 left-4 z-500 flex flex-col gap-4">
            <FloatingSearchBar
              suppliers={suppliers}
              onselected={setSelectedSupplier}
            />
            {selectedSupplier !== null && (
              <ServiceProviderCard
                homepageUrl="https://"
                article={{ title: "Roue XRL", url: "https://" }}
                provider={selectedSupplier}
                onClose={() => setSelectedSupplier(null)}
              />
            )}
          </div>

          <DynamicMap
            center={[48, 2.3]}
            zoom={10}
            markers={
              selectedSupplier !== null
                ? [
                    {
                      name: selectedSupplier.name,
                      location: [
                        selectedSupplier.position.latitude,
                        selectedSupplier.position.longitude,
                      ],
                      data: selectedSupplier,
                    },
                  ]
                : suppliers.map((s) => ({
                    name: s.name,
                    location: [s.position.latitude, s.position.longitude],
                    data: s,
                  }))
            }
            segments={[
              [48.8566, 2.3522],
              [48.8584, 2.2945],
            ]}
            bound_type="markers"
            onclick={(data) => {
              console.log(data);
              setSelectedSupplier(data as any);
            }}
          />
        </div>
      )}
    </div>
  );
}

interface Article {
  title: string;
  url: string;
}

interface ServiceProviderCardProps {
  provider: Supplier;
  article?: Article;
  homepageUrl: string;
  onClose: () => void;
}

const CARD_CLASS =
  "bg-white rounded-xl shadow-xl border border-gray-100 w-md text-gray-900 overflow-hidden";

const FloatingSearchBar = ({
  suppliers,
  onselected,
}: {
  suppliers: Supplier[];
  onselected: (supplier: Supplier) => void;
}) => {
  const [search, setSearch] = useState("");

  const filteredSuppliers = suppliers.filter(
    (supplier) =>
      supplier.name.toLowerCase().includes(search.toLowerCase()) ||
      supplier.city.toLowerCase().includes(search.toLowerCase()) ||
      supplier.speciality.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className={CARD_CLASS}>
      <div className="p-3 border-b border-gray-100">
        <div className="relative">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher un fournisseur..."
            className="w-full pl-9 pr-3 py-2 text-sm border-0 focus:ring-0 focus:outline-none placeholder-gray-400"
          />
        </div>
      </div>

      {search && filteredSuppliers.length > 0 && (
        <div className="max-h-96 overflow-y-auto">
          {filteredSuppliers.map((supplier) => (
            <button
              key={supplier.id}
              onClick={() => {
                onselected(supplier);
                setSearch("");
              }}
              className="w-full text-left p-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm text-gray-900 truncate">
                    {supplier.name}
                  </p>
                  <p className="text-xs text-gray-600 mt-0.5">
                    {supplier.speciality} • {supplier.city}
                  </p>
                </div>
                <span
                  className={`ml-2 w-2 h-2 rounded-full flex-shrink-0 mt-1 ${
                    supplier.active ? "bg-green-500" : "bg-gray-300"
                  }`}
                />
              </div>
            </button>
          ))}
        </div>
      )}

      {search && filteredSuppliers.length === 0 && (
        <div className="p-4 text-center text-sm text-gray-500">
          Aucun fournisseur trouvé
        </div>
      )}
    </div>
  );
};

const ServiceProviderCard: React.FC<ServiceProviderCardProps> = ({
  provider,
  article,
  homepageUrl,
  onClose,
}) => {
  const targetUrl = article ? article.url : homepageUrl;
  const buttonLabel = article
    ? "Commander " + article.title + " sur le site du fournisseur"
    : "Commander le site du fournisseur";

  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${provider.position.latitude},${provider.position.longitude}`;

  return (
    <div className={CARD_CLASS}>
      <div className="flex justify-between items-start p-4 border-b border-gray-100">
        <div className="pr-6">
          <h3 className="font-semibold text-base leading-tight">
            {provider.name}
          </h3>

          <div className="flex items-center text-sm">
            <p className="text-sm text-gray-500 mr-4">{provider.speciality}</p>
            <span
              className={`w-2 h-2 rounded-full mr-2 ${provider.active ? "bg-green-500" : "bg-gray-300"}`}
            />
            <span
              className={
                provider.active ? "text-green-700 font-medium" : "text-gray-500"
              }
            >
              {provider.active ? "Boutique active" : "Fermé"}
            </span>
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-900 transition-colors p-1 -mr-1 -mt-1"
          aria-label="Fermer"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      <img className="w-full" src="https://placeimg.dev/400x300/4F46E5" />

      <div className="p-4 space-y-3">
        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-start group hover:bg-gray-50 -mx-2 px-2 py-1.5 rounded-md transition-colors"
        >
          <svg
            className="size-4 text-gray-500 mt-0.5 mr-2 shrink-0"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <div className="text-sm">
            {provider.address && (
              <p className="text-gray-900 group-hover:text-blue-600 transition-colors">
                {provider.address}
              </p>
            )}
            <p className="text-gray-600 group-hover:text-blue-600 transition-colors">
              {provider.city}
            </p>
          </div>
        </a>

        {provider.phone && (
          <a
            href={`tel:${provider.phone}`}
            className="flex items-center text-sm text-gray-700 hover:text-blue-600 transition-colors"
          >
            <svg
              className="w-4 h-4 mr-2 text-gray-500"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            {provider.phone}
          </a>
        )}

        <a
          href={targetUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full text-center py-2.5 mt-4 bg-gray-900 hover:bg-gray-800 text-white text-sm font-medium rounded-lg transition-colors"
        >
          {buttonLabel}
        </a>
      </div>
    </div>
  );
};
