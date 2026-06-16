import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-q-bg flex flex-col items-center justify-center px-6">
      <div className="max-w-xl text-center space-y-8">
        <div className="space-y-3">
          <div className="inline-block px-4 py-1 rounded-full border border-q-yellow/30 text-q-yellow text-xs tracking-[2px] font-medium">
            ESGI HACKATHON • MICHELIN VÉLO
          </div>
          <h1 className="text-6xl font-black tracking-tighter">
            Michelin Velo
            <br />
            Expérience 2026
          </h1>
          <p className="text-xl text-q-text-sub">
            Découvrez votre profil cycliste puis configurez les pneus parfaits
            pour votre pratique.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
          <Link
            href="/questionnaire"
            className="inline-flex items-center justify-center px-8 h-14 rounded-2xl bg-white text-black font-bold text-lg hover:bg-q-yellow active:scale-[0.985] transition"
          >
            Faire le questionnaire
          </Link>
          <Link
            href="/configurateur"
            className="inline-flex items-center justify-center px-8 h-14 rounded-2xl border-2 border-q-yellow text-q-yellow font-bold text-lg hover:bg-q-yellow/10 active:scale-[0.985] transition"
          >
            Configurateur de pneus →
          </Link>
        </div>

        <div className="text-xs text-q-text-dim pt-6">
          Cohérence graphique respectée • Composants découpés • TypeScript
          strict
        </div>
      </div>
    </div>
  );
}
