import type { Metadata } from 'next'
import QuestionnaireClient from './components/QuestionnaireClient'

export const metadata: Metadata = {
  title: 'Quel cycliste es-tu ? — Michelin',
  description: 'Découvre ton profil cycliste parmi 5 archétypes du cycliste français.',
}

export default function QuestionnairePage() {
  return <QuestionnaireClient />
}
