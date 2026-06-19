export type AnswerKey = "a" | "b" | "c" | "d";
export type QuizMode = "quick" | "full";

export interface Answer {
  key: AnswerKey;
  text: string;
}

export interface Question {
  id: number;
  text: string;
  answers: Answer[];
}

export type ProfileId =
  | "pedale-douce"
  | "grosse-pedale"
  | "tryharder"
  | "taffeur"
  | "gourmand";

export interface Profile {
  id: ProfileId;
  name: string;
  emoji: string;
  tagline: string;
  description: string;
  accentColor: string;
  bgColor: string;
}

export const ALL_QUESTIONS: Question[] = [
  {
    id: 1,
    text: "Une voiture te double à moins d'1 mètre en ville :",
    answers: [
      {
        key: "a",
        text: "Tu continues tranquillement en te disant « c'est la vie en ville »",
      },
      { key: "b", text: "Tu sprintes pour le rattraper et lui faire la leçon" },
      {
        key: "c",
        text: "Tu actives ta caméra et tu postes la vidéo sur Strava avec #ClosePass",
      },
      {
        key: "d",
        text: "Tu klaxonnes comme un possédé et tu lui balances tous les gros mots que tu connais",
      },
    ],
  },
  {
    id: 2,
    text: "Ta sortie idéale du week-end :",
    answers: [
      {
        key: "a",
        text: "30-40 km à allure tranquille avec un bon café en terrasse au milieu",
      },
      {
        key: "b",
        text: "120 km avec 2500 m de D+ en mode « je vais tout casser aujourd'hui »",
      },
      {
        key: "c",
        text: "Une sortie structurée avec intervalles, capteur de puissance et analyse post-ride",
      },
      {
        key: "d",
        text: "Une virée en ville pour « tester mes limites » (aka faire chier les automobilistes)",
      },
    ],
  },
  {
    id: 3,
    text: "Tu es en peloton et un gars devant toi freine tout le temps et bloque tout le monde :",
    answers: [
      { key: "a", text: "Tu restes patient et tu profites du paysage" },
      {
        key: "b",
        text: "Tu doubles tout le monde en force pour montrer qui est le chef",
      },
      {
        key: "c",
        text: "Tu râles intérieurement et tu penses « ce gars ruine mon avg speed »",
      },
      {
        key: "d",
        text: "Tu klaxonnes et tu lui cries « Bordel avance ou dégage ! »",
      },
    ],
  },
  {
    id: 4,
    text: "Une grosse côte de 8 % sur 3 km arrive :",
    answers: [
      {
        key: "a",
        text: "Tu passes en petite vitesse et tu montes à ton rythme en appréciant la vue",
      },
      {
        key: "b",
        text: "Tu restes en grand plateau et tu forces comme un taureau",
      },
      {
        key: "c",
        text: "Tu regardes ton capteur de puissance et tu restes pile dans ta zone 4",
      },
      {
        key: "d",
        text: "Tu montes en danseuse en criant des insanités contre la pente",
      },
    ],
  },
  {
    id: 5,
    text: "Tu crèves en rase campagne, à 30 km de chez toi :",
    answers: [
      {
        key: "a",
        text: "Tu répares tranquillement, c'est l'occasion de faire une pause",
      },
      {
        key: "b",
        text: "Tu changes la chambre en 2 minutes chrono et tu repars en mode « rien ne m'arrête »",
      },
      {
        key: "c",
        text: "Tu appelles un pote avec la voiture parce que « c'est pas prévu dans mon plan »",
      },
      {
        key: "d",
        text: "Tu insultes le sort, le pneu et tu marches en râlant",
      },
    ],
  },
  {
    id: 6,
    text: "Ton rapport à Strava :",
    answers: [
      { key: "a", text: "Strava ? C'est quoi ça ? Je roule pour moi" },
      {
        key: "b",
        text: "J'ai Strava mais je l'utilise juste pour voir mes sorties",
      },
      {
        key: "c",
        text: "Mon KOM du mois est plus important que mon anniversaire",
      },
      {
        key: "d",
        text: "Je refais le même segment 8 fois jusqu'à avoir le maillot jaune",
      },
    ],
  },
  {
    id: 7,
    text: "Comment tu t'habilles pour une sortie :",
    answers: [
      {
        key: "a",
        text: "Short confortable, maillot ample, rien de trop moulant",
      },
      {
        key: "b",
        text: "Tenue aero complète, chaussettes hautes, tout pour gagner des watts",
      },
      {
        key: "c",
        text: "Maillot pro team replica + capteurs + lunettes Oakley",
      },
      {
        key: "d",
        text: "N'importe quoi du moment que ça fait « je suis un cycliste urbain badass »",
      },
    ],
  },
  {
    id: 8,
    text: "Il pleut des cordes et il fait 8°C :",
    answers: [
      { key: "a", text: "Je reporte ou je fais un petit tour abrité" },
      {
        key: "b",
        text: "Je sors quand même et je roule plus fort pour me réchauffer",
      },
      {
        key: "c",
        text: "Je sors avec ma tenue hiver complète et je fais ma séance prévue",
      },
      {
        key: "d",
        text: "Je sors et je klaxonne les voitures qui m'éclaboussent",
      },
    ],
  },
  {
    id: 9,
    text: "Ton plus grand plaisir à vélo :",
    answers: [
      {
        key: "a",
        text: "Le vent dans les cheveux, le soleil et une bonne discussion avec des potes",
      },
      {
        key: "b",
        text: "Le bruit du vent quand je dépasse tout le monde en descente",
      },
      {
        key: "c",
        text: "Voir mon avg speed et ma puissance moyenne grimper dans les stats",
      },
      {
        key: "d",
        text: "Le sentiment de liberté totale en ville (même en slalomant entre les voitures)",
      },
    ],
  },
  {
    id: 10,
    text: "Tu croises un cycliste en cargo bike avec 2 gosses et des courses :",
    answers: [
      { key: "a", text: "Tu le salues et tu penses « chapeau, il assume »" },
      { key: "b", text: "Tu le doubles en mode « moi je vais plus vite »" },
      {
        key: "c",
        text: "Tu penses « il doit être en retard sur son plan d'entraînement »",
      },
      { key: "d", text: "Tu le klaxonnes parce qu'il prend trop de place" },
    ],
  },
  {
    id: 11,
    text: "Après 80 km de sortie :",
    answers: [
      {
        key: "a",
        text: "Je suis content, j'ai passé un bon moment, je vais me poser avec une bière",
      },
      {
        key: "b",
        text: "Je suis crevé mais j'ai envoyé du gros, je me sens vivant",
      },
      {
        key: "c",
        text: "Je regarde immédiatement mes données sur l'app pour voir si j'ai atteint mes objectifs",
      },
      {
        key: "d",
        text: "Je suis en sueur et en colère contre tous ceux qui m'ont ralenti",
      },
    ],
  },
  {
    id: 12,
    text: "Ta façon de prendre un virage serré à haute vitesse :",
    answers: [
      { key: "a", text: "Je freine un peu avant et je passe tranquillement" },
      { key: "b", text: "Je passe en drift en mode « je maîtrise »" },
      {
        key: "c",
        text: "Je calcule l'angle parfait en fonction de ma vitesse et de l'adhérence",
      },
      {
        key: "d",
        text: "Je klaxonne avant d'entrer pour que tout le monde dégage",
      },
    ],
  },
  {
    id: 13,
    text: "Tu as l'occasion de participer à un gran fondo / course amateur :",
    answers: [
      { key: "a", text: "Non merci, je préfère mes balades libres" },
      {
        key: "b",
        text: "Oui, je vais tout donner pour être dans les premiers de ma catégorie",
      },
      {
        key: "c",
        text: "Oui, et je vais analyser ma perf après avec des graphiques",
      },
      {
        key: "d",
        text: "Oui, pour montrer aux autres cyclistes de la région qui est le boss",
      },
    ],
  },
  {
    id: 14,
    text: "Ton avis sur les vélos électriques :",
    answers: [
      { key: "a", text: "Super, ça permet à plus de gens de profiter du vélo" },
      { key: "b", text: "C'est de la triche, les vrais pédalent" },
      {
        key: "c",
        text: "Intéressant pour l'entraînement, mais je préfère ma puissance pure",
      },
      {
        key: "d",
        text: "Encore des trucs qui prennent de la place et qui vont me doubler sans effort",
      },
    ],
  },
  {
    id: 15,
    text: "Tu rentres d'une sortie boueuse ou pluvieuse :",
    answers: [
      { key: "a", text: "Je rince vite fait le vélo et je le range" },
      {
        key: "b",
        text: "Je le nettoie en profondeur parce que « un vélo propre = un vélo rapide »",
      },
      { key: "c", text: "Je le nettoie méticuleusement et je graisse tout" },
      {
        key: "d",
        text: "Je le laisse comme ça, de toute façon la ville est sale",
      },
    ],
  },
  {
    id: 16,
    text: "Ton plus gros fail ou honte à vélo :",
    answers: [
      {
        key: "a",
        text: "J'ai eu une crevaison et j'ai mis 45 min à la réparer",
      },
      { key: "b", text: "J'ai attaqué trop fort et j'ai explosé au km 20" },
      {
        key: "c",
        text: "J'ai raté un KOM parce qu'un piéton marchait sur le segment",
      },
      {
        key: "d",
        text: "J'ai klaxonné un piéton qui traversait au vert et tout le monde m'a regardé",
      },
    ],
  },
  {
    id: 17,
    text: "Tu écoutes de la musique ou un podcast en roulant ?",
    answers: [
      {
        key: "a",
        text: "Oui, de la musique chill ou un bon podcast, ça rend la sortie plus sympa",
      },
      { key: "b", text: "Non, j'ai besoin d'entendre le vent et mon cardio" },
      {
        key: "c",
        text: "Oui, mais seulement des podcasts sur l'entraînement ou la perf",
      },
      {
        key: "d",
        text: "Oui, du métal à fond pour rester en rage contre le monde",
      },
    ],
  },
  {
    id: 18,
    text: "Un piéton traverse sans regarder sur ta piste cyclable :",
    answers: [
      { key: "a", text: "Je freine et je passe en souriant" },
      { key: "b", text: "Je slalome à toute vitesse en le frôlant" },
      { key: "c", text: "Je freine et je lui explique calmement les règles" },
      {
        key: "d",
        text: "Je klaxonne et je lui crie « Regarde où tu mets les pieds bordel ! »",
      },
    ],
  },
  {
    id: 19,
    text: "Si tu pouvais avoir n'importe quel vélo demain :",
    answers: [
      {
        key: "a",
        text: "Un beau vélo confortable pour faire de longues balades sans mal au cul",
      },
      { key: "b", text: "Un vélo aero ultra léger pour tout démonter" },
      {
        key: "c",
        text: "Un vélo avec toutes les dernières tech (capteurs intégrés, etc.)",
      },
      {
        key: "d",
        text: "Un vélo de ville indestructible avec grosse sonnette et lumières puissantes",
      },
    ],
  },
  {
    id: 20,
    text: "Au final, pourquoi tu fais du vélo ?",
    answers: [
      {
        key: "a",
        text: "Pour le plaisir, la santé, voir du paysage et me vider la tête",
      },
      {
        key: "b",
        text: "Pour me défouler, me sentir fort et dominer la route",
      },
      {
        key: "c",
        text: "Pour progresser, battre mes records et me sentir accompli",
      },
      {
        key: "d",
        text: "Pour me sentir libre dans cette ville de fous et exprimer ma personnalité",
      },
    ],
  },
];

export const QUICK_MODE_QUESTION_IDS = [2, 4, 6, 9, 11, 14, 18, 20];

export const PROFILES: Record<ProfileId, Profile> = {
  "pedale-douce": {
    id: "pedale-douce",
    name: "Tu te la coule douce",
    emoji: "🏝️",
    tagline: "Le cycliste zen",
    description:
      "Tu roules pour le plaisir, sans prise de tête. Tu évites les conflits et les efforts inutiles. Pour toi, le vélo c'est la liberté, un café en terrasse et des paysages qui défilent. Personne ne peut te voler ta bonne humeur.",
    accentColor: "#10B981",
    bgColor: "#071f14",
  },
  "grosse-pedale": {
    id: "grosse-pedale",
    name: "Ça pédale dur",
    emoji: "🐻",
    tagline: "Le bourrin de la route",
    description:
      "Tu envoies du gros watt, tu attaques tout le monde et tu laisses les autres derrière. Le vélo c'est la guerre et tu es là pour gagner. La douleur ? Connais pas. La fatigue ? Pour les autres.",
    accentColor: "#EF4444",
    bgColor: "#200808",
  },
  tryharder: {
    id: "tryharder",
    name: "Tryharder",
    emoji: "💉",
    tagline: "L'obsédé de la performance",
    description:
      "Strava, capteurs de puissance, zones d'effort, plans d'entraînement… Tu vis pour tes données. Chaque sortie est une expérience scientifique. Tu ne roules pas, tu optimises. Et ça marche.",
    accentColor: "#3B82F6",
    bgColor: "#071020",
  },
  taffeur: {
    id: "taffeur",
    name: "Tyran",
    emoji: "🥨",
    tagline: "Double standard sur deux roues",
    description:
      "Tu vas au taf à vélo et tu es ultra psychorigide sur les règles… mais seulement pour les voitures. Toi tu grilles les feux, tu roules sur les trottoirs et tu klaxonnes les piétons. Et alors ? C'est la ville, t'as compris.",
    accentColor: "#8B5CF6",
    bgColor: "#110820",
  },
  gourmand: {
    id: "gourmand",
    name: "L'aile ou la cuisse",
    emoji: "🍩",
    tagline: "La vie est trop courte pour ne pas faire une pause",
    description:
      "Un peu de tout, un peu de rien. Tu as un peu de bidoche, un peu de réserve, mais tu roules quand même. Tu aimes les longues sorties, surtout quand il y a des pauses pour manger et profiter. Le plaisir avant la performance.",
    accentColor: "#F97316",
    bgColor: "#1e0f04",
  },
};

export function calculateResult(answers: Record<number, AnswerKey>): ProfileId {
  const counts: Record<AnswerKey, number> = { a: 0, b: 0, c: 0, d: 0 };

  Object.values(answers).forEach((answer) => {
    counts[answer]++;
  });

  const profileMap: Record<AnswerKey, ProfileId> = {
    a: "pedale-douce",
    b: "grosse-pedale",
    c: "tryharder",
    d: "taffeur",
  };

  const maxCount = Math.max(...Object.values(counts));
  const winners = (Object.keys(counts) as AnswerKey[]).filter(
    (k) => counts[k] === maxCount,
  );

  if (winners.length === 1) {
    return profileMap[winners[0]];
  }

  if (winners.includes("a") && winners.includes("b")) {
    return "gourmand";
  }

  return profileMap[winners[0]];
}
