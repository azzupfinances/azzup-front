import {
  ChartColumn,
  LayoutGrid,
  Rocket,
  ShieldCheck,
  SlidersHorizontal,
  TrendingUp,
  UserPlus,
  Zap,
} from 'lucide-react'

import type {
  FaqItem,
  FeatureItem,
  FooterLinkGroup,
  NavigationLink,
  PressMention,
  PricingPlan,
  StepItem,
} from '@/features/landing/types/landing.types'

export const SIGN_UP_HREF = '/register'
export const SIGN_IN_HREF = '/login'

export const NAVIGATION_LINKS: NavigationLink[] = [
  { label: 'Recursos', href: '#features' },
  { label: 'Como funciona', href: '#how-it-works' },
  { label: 'Planos', href: '#pricing' },
  { label: 'Dúvidas', href: '#faq' },
]

export const HERO_HIGHLIGHTS: FeatureItem[] = [
  { icon: Zap, title: 'Rápido', description: 'Comece em minutos, não em dias.' },
  { icon: ShieldCheck, title: 'Seguro', description: 'Proteção de ponta a ponta.' },
]

export const FEATURE_ITEMS: FeatureItem[] = [
  {
    icon: LayoutGrid,
    title: 'Tudo centralizado',
    description: 'Reúna informações, pessoas e processos em um único lugar, sem planilhas soltas.',
  },
  {
    icon: ChartColumn,
    title: 'Relatórios claros',
    description: 'Acompanhe resultados com visões objetivas e fáceis de entender, em tempo real.',
  },
  {
    icon: Rocket,
    title: 'Feito para escalar',
    description: 'Desempenho consistente do primeiro cliente ao milésimo, em qualquer dispositivo.',
  },
]

export const STEP_ITEMS: StepItem[] = [
  {
    icon: UserPlus,
    title: 'Crie sua conta',
    description: 'Cadastre-se em poucos minutos, sem burocracia.',
  },
  {
    icon: SlidersHorizontal,
    title: 'Configure do seu jeito',
    description: 'Ajuste a plataforma para a realidade do seu negócio com poucos cliques.',
  },
  {
    icon: TrendingUp,
    title: 'Acompanhe os resultados',
    description: 'Veja tudo evoluindo em tempo real e tome decisões com mais segurança.',
  },
]

// MVP: a single plan is on sale; the other two are shown as "coming soon" to keep the layout balanced.
// The featured plan sits in the middle on desktop.
export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'starter',
    name: 'Starter',
    description: 'Um plano de entrada para quem está começando.',
    status: 'coming-soon',
    features: [],
    ctaLabel: 'Em breve',
  },
  {
    id: 'pro',
    name: 'Pro',
    description: 'Tudo o que você precisa para organizar a sua operação.',
    status: 'available',
    pricing: {
      monthlyPriceInCents: 2999,
      introductoryOffer: { priceInCents: 1499, durationInMonths: 3 },
      yearlyPriceInCents: 26990,
    },
    features: [
      'Todos os recursos da plataforma',
      'Relatórios completos',
      'Integrações',
      'Atualizações contínuas',
      'Suporte por e-mail e chat',
    ],
    ctaLabel: 'Assinar agora',
  },
  {
    id: 'business',
    name: 'Business',
    description: 'Para times que precisam de mais escala e automação.',
    status: 'coming-soon',
    features: [],
    ctaLabel: 'Em breve',
  },
]

// Placeholder coverage: replace with real press mentions before launch.
export const PRESS_MENTIONS: PressMention[] = [
  {
    id: 'tech-portal',
    source: 'Portal de Tecnologia',
    quote: 'A Azzup transforma a rotina de gestão em algo simples, sem planilhas e sem complicação.',
    href: '#',
  },
  {
    id: 'business-magazine',
    source: 'Revista de Negócios',
    quote: 'Uma plataforma que coloca tudo em um só lugar e devolve tempo para quem empreende.',
    href: '#',
  },
  {
    id: 'innovation-blog',
    source: 'Blog de Inovação',
    quote: 'Interface clara, onboarding rápido e um suporte que realmente responde.',
    href: '#',
  },
  {
    id: 'startup-news',
    source: 'Notícias de Startups',
    quote: 'A Azzup aposta em simplicidade para crescer com pequenos e médios negócios.',
    href: '#',
  },
  {
    id: 'market-journal',
    source: 'Jornal do Mercado',
    quote: 'Mais clareza e menos trabalho manual: a proposta que conquistou os primeiros clientes.',
    href: '#',
  },
]

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'what-is',
    question: 'O que é a Azzup e para quem ela serve?',
    answer:
      'A Azzup é uma plataforma que centraliza a sua operação em um só lugar. Ela foi pensada para negócios de todos os tamanhos que querem mais clareza e menos trabalho manual.',
  },
  {
    id: 'pricing',
    question: 'Quanto custa?',
    answer:
      'No plano mensal, você paga R$ 14,99 por mês nos 3 primeiros meses e R$ 29,99 a partir do 4º mês. Se preferir, o plano anual sai por R$ 269,90, pagos uma vez por ano.',
  },
  {
    id: 'security',
    question: 'Meus dados ficam seguros?',
    answer:
      'Sim. Seguimos boas práticas de segurança e criptografia para proteger suas informações em todas as etapas.',
  },
  {
    id: 'support',
    question: 'Como funciona o suporte?',
    answer:
      'Nosso time atende por diferentes canais e está pronto para ajudar sempre que você precisar.',
  },
]

export const FOOTER_LINK_GROUPS: FooterLinkGroup[] = [
  {
    title: 'Conta',
    links: [
      { label: 'Criar conta', href: SIGN_UP_HREF },
      { label: 'Entrar', href: SIGN_IN_HREF },
    ],
  },
  {
    title: 'Produto',
    links: NAVIGATION_LINKS,
  },
]
