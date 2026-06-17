"use client";

import { get_suppliers, Supplier } from "@/lib/firestore";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const DynamicMap = dynamic(
  () => import("@/components/Map").then((mod) => mod.Map),
  {
    ssr: false,
    loading: () => <p>Chargement de la carte en cours...</p>,
  },
);

export default function Page() {
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
        setError(null);
        setLoading(false);
      })
      .mapErr((err) => {
        setError(err);
        setSuppliers([]);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>Erreur: {error}</div>;

  return (
    <div>
      {selectedSupplier !== null && (
        <div className="absolute top-4 left-4 bottom-4 w-md z-500 bg-q-bg">
          {selectedSupplier.name}
        </div>
      )}

      <DynamicMap
        zoom={13}
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
          setSelectedSupplier(data);
        }}
      />
    </div>
  );
}
