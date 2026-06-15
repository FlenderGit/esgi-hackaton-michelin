export default function MichelinLogo() {
  return (
    <div className="flex items-center gap-3">
      <div className="relative w-8 h-8 flex-shrink-0">
        <div className="absolute inset-0 rounded-full bg-[#FFD100]" />
        <div className="absolute inset-[3px] rounded-full bg-[#0A0A0A]" />
        <div className="absolute inset-[6px] rounded-full bg-[#FFD100]" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-black font-black text-[9px] tracking-tight z-10">BIB</span>
        </div>
      </div>
      <div className="flex flex-col leading-none">
        <span className="text-[#FFD100] font-black text-sm tracking-[0.25em] uppercase">
          Michelin
        </span>
        <span className="text-[#444] text-[9px] tracking-[0.15em] uppercase">
          Une meilleure façon d'avancer
        </span>
      </div>
    </div>
  )
}
