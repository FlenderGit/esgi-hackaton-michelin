export type BikeType = 'road' | 'gravel' | 'mtb' | 'city'

export interface Brand {
  id: string
  name: string
  accent: string
}

export interface Tire {
  id: string
  brandId: string
  model: string
  bikeType: BikeType
  diameter: '700c' | '650b' | '27.5"' | '29"'
  width: number
  weightG: number
  priceEur: number
  punctureProtection: number
  rollingScore: number
  gripDry: number
  gripWet: number
  tubeless: boolean
  description: string
  features: string[]
  bestFor: string[]
}

export const BRANDS: Brand[] = [
  { id: 'michelin', name: 'Michelin', accent: '#FCE500' },
  { id: 'continental', name: 'Continental', accent: '#E30613' },
  { id: 'schwalbe', name: 'Schwalbe', accent: '#0055A5' },
  { id: 'pirelli', name: 'Pirelli', accent: '#C8102E' },
]

export const ALL_TIRES: Tire[] = [
  // ===== MICHELIN =====
  {
    id: 'm-power-cup-28', brandId: 'michelin', model: 'Power Cup TLR', bikeType: 'road',
    diameter: '700c', width: 28, weightG: 285, priceEur: 62,
    punctureProtection: 4, rollingScore: 5, gripDry: 4, gripWet: 4, tubeless: true,
    description: "Le pneu route premium de Michelin. Très faible résistance au roulement, excellent grip et carcasse légère pour la compétition et l'entraînement rapide.",
    features: ['Gum-X', 'Tubeless Shield', 'TLR', '4x120 TPI'], bestFor: ['speed', 'performance'],
  },
  {
    id: 'm-power-adventure-42', brandId: 'michelin', model: 'Power Adventure', bikeType: 'gravel',
    diameter: '700c', width: 42, weightG: 410, priceEur: 58,
    punctureProtection: 4, rollingScore: 3, gripDry: 4, gripWet: 4, tubeless: true,
    description: "Polyvalent gravel rapide. Bon compromis vitesse / adhérence sur gravier compact et routes. Parfait pour l'aventure légère.",
    features: ['Tubeless Ready', 'Protection renforcée', 'Gum-X'], bestFor: ['speed', 'versatility'],
  },
  {
    id: 'm-wild-am2-24', brandId: 'michelin', model: 'Wild AM2', bikeType: 'mtb',
    diameter: '29"', width: 55, weightG: 920, priceEur: 48,
    punctureProtection: 3, rollingScore: 2, gripDry: 4, gripWet: 3, tubeless: true,
    description: 'Pneu All-Mountain polyvalent. Excellent grip en courbe et freinage tout en restant raisonnable en poids et rolling.',
    features: ['Gum-X', 'Tubeless Ready', 'Carcasse 3x60 TPI'], bestFor: ['grip', 'versatility'],
  },
  {
    id: 'm-city-protector-35', brandId: 'michelin', model: 'Protector', bikeType: 'city',
    diameter: '700c', width: 35, weightG: 380, priceEur: 32,
    punctureProtection: 5, rollingScore: 3, gripDry: 3, gripWet: 4, tubeless: true,
    description: 'Pneu urbain robuste avec protection anti-crevaison maximale. Idéal pour trajets quotidiens et chargés.',
    features: ['Protector+', 'Reflex', 'Tubeless Ready'], bestFor: ['protection', 'endurance'],
  },
  // ===== CONTINENTAL =====
  {
    id: 'c-gp5000-28', brandId: 'continental', model: 'Grand Prix 5000 S TR', bikeType: 'road',
    diameter: '700c', width: 28, weightG: 280, priceEur: 58,
    punctureProtection: 4, rollingScore: 5, gripDry: 5, gripWet: 4, tubeless: true,
    description: 'Référence du pneu route tubeless. Un des plus rapides au monde avec adhérence exceptionnelle et longévité surprenante.',
    features: ['BlackChili', 'Vectran Breaker', 'TLR', 'Lazer Grip'], bestFor: ['speed', 'performance'],
  },
  {
    id: 'c-terra-speed-35', brandId: 'continental', model: 'Terra Speed', bikeType: 'gravel',
    diameter: '700c', width: 35, weightG: 340, priceEur: 52,
    punctureProtection: 3, rollingScore: 4, gripDry: 4, gripWet: 3, tubeless: true,
    description: 'Gravel rapide et léger pour routes et gravier dur. Idéal pour la course et les sorties rapides sur mixed surfaces.',
    features: ['ShieldWall', 'BlackChili', 'TLR'], bestFor: ['speed', 'versatility'],
  },
  {
    id: 'c-race-king-23', brandId: 'continental', model: 'Race King', bikeType: 'mtb',
    diameter: '29"', width: 58, weightG: 680, priceEur: 42,
    punctureProtection: 3, rollingScore: 4, gripDry: 4, gripWet: 3, tubeless: true,
    description: 'Classique XC rapide et polyvalent. Très bon roulement sur terrain sec et mixte, excellent rapport poids/performance.',
    features: ['ShieldWall', 'BlackChili', 'TLR'], bestFor: ['speed', 'versatility'],
  },
  {
    id: 'c-gp5000-as-32', brandId: 'continental', model: 'Grand Prix 5000 All Season TR', bikeType: 'road',
    diameter: '700c', width: 32, weightG: 315, priceEur: 55,
    punctureProtection: 5, rollingScore: 4, gripDry: 4, gripWet: 5, tubeless: true,
    description: 'Version toutes saisons du GP5000. Protection renforcée + composé hiver pour grip exceptionnel sous la pluie et froid.',
    features: ['BlackChili All Season', 'Vectran+', 'TLR'], bestFor: ['protection', 'endurance'],
  },
  // ===== SCHWALBE =====
  {
    id: 's-pro-one-28', brandId: 'schwalbe', model: 'Pro One TLE', bikeType: 'road',
    diameter: '700c', width: 28, weightG: 275, priceEur: 60,
    punctureProtection: 3, rollingScore: 5, gripDry: 4, gripWet: 4, tubeless: true,
    description: 'Pneu tubeless haut de gamme ultra-léger et rapide. Carcasse souple pour un feeling exceptionnel sur la route.',
    features: ['Addix Race', 'V-Guard', 'TL Easy', 'MicroSkin'], bestFor: ['speed', 'performance'],
  },
  {
    id: 's-g-one-rs-40', brandId: 'schwalbe', model: 'G-One RS Pro', bikeType: 'gravel',
    diameter: '700c', width: 40, weightG: 370, priceEur: 55,
    punctureProtection: 3, rollingScore: 5, gripDry: 4, gripWet: 3, tubeless: true,
    description: 'Le gravel le plus rapide de Schwalbe. Conçu pour la vitesse sur gravier dur et asphalte. Parfait en course gravel.',
    features: ['Addix Race', 'TL Easy', 'Pro', 'SnakeSkin option'], bestFor: ['speed', 'performance'],
  },
  {
    id: 's-g-one-rx-45', brandId: 'schwalbe', model: 'G-One RX Pro', bikeType: 'gravel',
    diameter: '700c', width: 45, weightG: 420, priceEur: 58,
    punctureProtection: 4, rollingScore: 3, gripDry: 5, gripWet: 4, tubeless: true,
    description: 'Gravel tout-terrain polyvalent. Excellent en conditions mixtes et boueuses, très bon grip latéral.',
    features: ['Addix', 'TL Easy', 'Pro Radial'], bestFor: ['grip', 'versatility'],
  },
  {
    id: 's-magic-mary-24', brandId: 'schwalbe', model: 'Magic Mary Radial', bikeType: 'mtb',
    diameter: '29"', width: 61, weightG: 980, priceEur: 65,
    punctureProtection: 3, rollingScore: 2, gripDry: 5, gripWet: 5, tubeless: true,
    description: 'Le pneu gravity / enduro référence. Grip monstrueux dans la boue et les virages techniques grâce à la carcasse Radial.',
    features: ['Addix Soft/Ultra Soft', 'Super Gravity', 'Radial', 'TL Easy'], bestFor: ['grip'],
  },
  // ===== PIRELLI =====
  {
    id: 'p-pzero-26', brandId: 'pirelli', model: 'P Zero Race TLR', bikeType: 'road',
    diameter: '700c', width: 26, weightG: 265, priceEur: 52,
    punctureProtection: 3, rollingScore: 5, gripDry: 5, gripWet: 4, tubeless: true,
    description: 'Haut de gamme Pirelli issu de la F1. Adhérence et vitesse exceptionnelles, feeling premium.',
    features: ['SmartEVO Compound', 'TechWALL+', 'TLR', 'F1 derived'], bestFor: ['speed', 'performance'],
  },
  {
    id: 'p-cint-gravel-rc-40', brandId: 'pirelli', model: 'Cinturato Gravel RC', bikeType: 'gravel',
    diameter: '700c', width: 40, weightG: 390, priceEur: 48,
    punctureProtection: 4, rollingScore: 4, gripDry: 4, gripWet: 4, tubeless: true,
    description: 'Gravel racing polyvalent. Excellent sur sec et mouillé, très bon compromis vitesse/protection.',
    features: ['SpeedGRIP', 'TechWALL+', 'TLR'], bestFor: ['versatility', 'speed'],
  },
  {
    id: 'p-cint-gravel-m-45', brandId: 'pirelli', model: 'Cinturato Gravel M', bikeType: 'gravel',
    diameter: '700c', width: 45, weightG: 430, priceEur: 47,
    punctureProtection: 5, rollingScore: 3, gripDry: 4, gripWet: 5, tubeless: true,
    description: 'Gravel mixed / adventure. Protection renforcée, grip excellent en conditions humides et boue légère.',
    features: ['SpeedGRIP', 'TechWALL', 'TLR'], bestFor: ['protection', 'versatility'],
  },
  {
    id: 'p-scorpion-mtb-23', brandId: 'pirelli', model: 'Scorpion XC M', bikeType: 'mtb',
    diameter: '29"', width: 58, weightG: 750, priceEur: 45,
    punctureProtection: 4, rollingScore: 3, gripDry: 4, gripWet: 4, tubeless: true,
    description: 'Pneu XC / Trail polyvalent Pirelli. Bon roulement, adhérence fiable et carcasse résistante aux impacts.',
    features: ['SmartGRIP', 'ProWall', 'TLR'], bestFor: ['versatility', 'grip'],
  },
]

export function getBrand(id: string): Brand {
  return BRANDS.find((b) => b.id === id)!
}

// ── Wizard types ────────────────────────────────────────────────

export type RiderProfile = 'grand_rouleur' | 'reprise_vtt' | 'debutant' | 'competiteur' | 'balades' | 'velotaf'
export type TerrainType = 'sentiers' | 'chemins' | 'asphalte' | 'boue' | 'mixte'
export type WeatherType = 'sec' | 'humide' | 'boueux'
export type PriorityKey = 'adherence' | 'anti_crevaison' | 'vitesse' | 'confort' | 'longevite' | 'poids'
export type WizardBikeType = 'vtt' | 'route' | 'gravel' | 'ville' | 'electrique'
export type BudgetRange = 'lt35' | '35-55' | '55-80' | 'gt80' | 'peu_importe'

export interface WizardAnswers {
  profile?: RiderProfile
  terrain: TerrainType[]
  weather: WeatherType[]
  priorities: PriorityKey[]
  bikeType?: WizardBikeType
  width?: string
  // Advanced
  mounting?: 'tubeless_ready' | 'chambre_air' | 'les_deux'
  budget?: BudgetRange
  axle?: 'meme_pneu' | 'differents'
}

export const RIDER_PROFILES: { id: RiderProfile; label: string; desc: string }[] = [
  { id: 'grand_rouleur', label: 'Grand rouleur', desc: 'Beaucoup de kilomètres, longues sorties' },
  { id: 'reprise_vtt', label: 'Reprise du VTT', desc: "Je m'y remets après une pause" },
  { id: 'debutant', label: 'Débutant', desc: 'Je découvre  guide-moi' },
  { id: 'competiteur', label: 'Compétiteur', desc: 'Je cherche la performance' },
  { id: 'balades', label: 'Balades & loisir', desc: 'Sorties tranquilles le week-end' },
  { id: 'velotaf', label: 'Vélotaf / ville', desc: 'Trajets quotidiens, fiabilité' },
]

export const WIDTH_OPTIONS: Record<WizardBikeType, { label: string; value: string; mm: [number, number] }[]> = {
  vtt: [
    { label: '2.10"', value: '2.10', mm: [50, 54] },
    { label: '2.25"', value: '2.25', mm: [55, 59] },
    { label: '2.35"', value: '2.35', mm: [60, 65] },
  ],
  route: [
    { label: '25 mm', value: '25mm', mm: [23, 27] },
    { label: '28 mm', value: '28mm', mm: [27, 30] },
    { label: '32 mm', value: '32mm', mm: [30, 34] },
  ],
  gravel: [
    { label: '35 mm', value: '35mm', mm: [33, 38] },
    { label: '40 mm', value: '40mm', mm: [38, 43] },
    { label: '45 mm', value: '45mm', mm: [43, 50] },
  ],
  ville: [
    { label: '32 mm', value: '32mm', mm: [30, 35] },
    { label: '38 mm', value: '38mm', mm: [36, 40] },
    { label: '47 mm', value: '47mm', mm: [44, 50] },
  ],
  electrique: [
    { label: '38 mm', value: '38mm', mm: [36, 40] },
    { label: '47 mm', value: '47mm', mm: [44, 50] },
  ],
}

// ── Wizard scoring ───────────────────────────────────────────────

const BIKE_TYPE_MAP: Record<WizardBikeType, BikeType> = {
  vtt: 'mtb',
  route: 'road',
  gravel: 'gravel',
  ville: 'city',
  electrique: 'city',
}

const PROFILE_BIKE_MAP: Record<RiderProfile, BikeType> = {
  grand_rouleur: 'road',
  reprise_vtt: 'mtb',
  debutant: 'mtb',
  competiteur: 'road',
  balades: 'gravel',
  velotaf: 'city',
}

function inferBikeType(answers: WizardAnswers): BikeType | null {
  if (answers.bikeType) return BIKE_TYPE_MAP[answers.bikeType]

  if (answers.terrain.includes('sentiers') || answers.terrain.includes('boue')) return 'mtb'
  if (answers.terrain.includes('chemins') || answers.terrain.includes('mixte')) return 'gravel'
  if (answers.terrain.includes('asphalte')) return 'road'

  if (answers.profile) return PROFILE_BIKE_MAP[answers.profile]

  return null
}

function getWidthRange(answers: WizardAnswers): [number, number] {
  const bikeType = answers.bikeType
  const width = answers.width

  if (bikeType && width && width !== 'je_ne_sais_pas') {
    const opt = WIDTH_OPTIONS[bikeType]?.find((o) => o.value === width)
    if (opt) return opt.mm
  }

  const inferredType = inferBikeType(answers)
  if (inferredType === 'mtb') return [50, 65]
  if (inferredType === 'gravel') return [35, 50]
  if (inferredType === 'city') return [32, 50]
  return [25, 35] // road default
}

export function computeWizardScore(tire: Tire, answers: WizardAnswers): number {
  let score = 10

  // Bike type match (0-40 pts)
  const expectedType = inferBikeType(answers)
  if (expectedType) {
    if (tire.bikeType === expectedType) {
      score += 40
    } else if (
      (expectedType === 'gravel' && tire.bikeType === 'road') ||
      (expectedType === 'road' && tire.bikeType === 'gravel')
    ) {
      score += 15
    } else if (expectedType === 'city' && tire.bikeType === 'gravel') {
      score += 10
    }
  }

  // Width match (0-10 pts)
  const [wMin, wMax] = getWidthRange(answers)
  if (tire.width >= wMin && tire.width <= wMax) {
    score += 10
  } else {
    const dist = Math.min(Math.abs(tire.width - wMin), Math.abs(tire.width - wMax))
    score -= Math.min(15, dist * 0.5)
  }

  // Terrain match (0-16 pts)
  if (answers.terrain.length > 0) {
    const needsGrip = answers.terrain.some((t) => ['sentiers', 'boue', 'chemins'].includes(t))
    const asphalteOnly = answers.terrain.every((t) => t === 'asphalte')
    if (needsGrip && (tire.gripDry + tire.gripWet) / 2 >= 4) score += 8
    if (asphalteOnly && tire.rollingScore >= 4) score += 8
    if (answers.terrain.includes('boue') && tire.gripWet >= 4) score += 8
    if (answers.terrain.includes('mixte') && tire.bikeType === 'gravel') score += 5
  }

  // Weather (0-8 pts)
  if (answers.weather.includes('humide') || answers.weather.includes('boueux')) {
    if (tire.gripWet >= 4) score += 8
    else if (tire.gripWet <= 2) score -= 10
  }
  if (answers.weather.includes('sec') && tire.gripDry >= 4) score += 4

  // Priorities (0-24 pts, weighted by rank)
  answers.priorities.slice(0, 3).forEach((prio, idx) => {
    const w = idx === 0 ? 12 : idx === 1 ? 8 : 4
    if (prio === 'adherence' && (tire.gripDry + tire.gripWet) / 2 >= 4) score += w
    if (prio === 'anti_crevaison' && tire.punctureProtection >= 4) score += w
    if (prio === 'vitesse' && tire.rollingScore >= 4) score += w
    if (prio === 'confort' && tire.width >= 32) score += Math.round(w * 0.8)
    if (prio === 'longevite' && tire.punctureProtection >= 4) score += Math.round(w * 0.7)
    if (prio === 'poids') {
      const light =
        (tire.bikeType === 'road' && tire.weightG < 300) ||
        (tire.bikeType === 'gravel' && tire.weightG < 380) ||
        (tire.bikeType === 'mtb' && tire.weightG < 800)
      if (light) score += w
    }
  })

  // Profile bonuses (0-5 pts)
  if (answers.profile === 'debutant' && tire.punctureProtection >= 4) score += 5
  if (answers.profile === 'competiteur' && tire.rollingScore >= 5) score += 5
  if (answers.profile === 'velotaf' && tire.punctureProtection >= 4) score += 5
  if (answers.profile === 'grand_rouleur' && tire.rollingScore >= 4) score += 5

  // Budget (soft penalty)
  if (answers.budget && answers.budget !== 'peu_importe') {
    const inBudget =
      (answers.budget === 'lt35' && tire.priceEur < 35) ||
      (answers.budget === '35-55' && tire.priceEur >= 35 && tire.priceEur <= 55) ||
      (answers.budget === '55-80' && tire.priceEur > 55 && tire.priceEur <= 80) ||
      (answers.budget === 'gt80' && tire.priceEur > 80)
    if (!inBudget) score -= 25
  }

  return Math.max(0, Math.min(100, Math.round(score)))
}

function getIdealFor(tire: Tire): string {
  if (tire.punctureProtection >= 5) return 'Protection maximale'
  if (tire.rollingScore >= 5 && tire.bestFor.includes('speed')) return 'Vitesse & performance'
  if ((tire.gripDry + tire.gripWet) / 2 >= 4.5) return 'Adhérence terrain exigeant'
  if (tire.bestFor.includes('versatility')) return 'Polyvalence tout-terrain'
  if (tire.bikeType === 'city') return 'Usage quotidien fiable'
  if (tire.bestFor.includes('grip')) return 'Grip & contrôle'
  return 'Bon rapport qualité-prix'
}

export function getWizardResults(answers: WizardAnswers): Array<Tire & { match: number; idealFor: string }> {
  return ALL_TIRES
    .map((t) => ({ ...t, match: computeWizardScore(t, answers), idealFor: getIdealFor(t) }))
    .sort((a, b) => b.match - a.match)
}
