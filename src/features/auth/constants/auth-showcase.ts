import {
  ArrowLeftRight,
  Banknote,
  CalendarClock,
  ChartPie,
  CreditCard,
  House,
  LayoutDashboard,
  PiggyBank,
  ShoppingCart,
  Smartphone,
  Tag,
  Wallet,
  Zap,
  type LucideIcon,
} from 'lucide-react'

import type {
  BudgetCategory,
  ChartPoint,
  DashboardMetric,
  ShowcaseSlide,
  TransactionItem,
} from '@/features/auth/types/auth-showcase.types'

export const SHOWCASE_SLIDES: ShowcaseSlide[] = [
  {
    id: 'dashboard',
    highlightedTitle: 'Seu salário sob controle,',
    title: 'do dia 5 ao fim do mês',
    description: 'Veja para onde vai cada real e quanto sobra até o próximo pagamento.',
  },
  {
    id: 'bills',
    highlightedTitle: 'Contas em dia,',
    title: 'metas no caminho',
    description: 'Lembretes de vencimento, orçamento por categoria e sua reserva crescendo.',
  },
]

export const SHOWCASE_NAV_ICONS: LucideIcon[] = [
  LayoutDashboard,
  ArrowLeftRight,
  CalendarClock,
  PiggyBank,
  ChartPie,
]

export const DASHBOARD_PERIODS = ['Hoje', 'Esse mês', 'Últimos 30 dias', 'Personalizar']
export const DASHBOARD_SELECTED_PERIOD = 'Esse mês'

export const DASHBOARD_MONTH_BALANCE = 2340
export const DASHBOARD_MONTH_SAVINGS = 650

export const DASHBOARD_METRICS: DashboardMetric[] = [
  {
    icon: Wallet,
    label: 'Entradas',
    value: 'R$ 4.850',
    trend: { value: '+3%', direction: 'up', tone: 'positive' },
  },
  {
    icon: CreditCard,
    label: 'Gastos',
    value: 'R$ 2.510',
    trend: { value: '-6%', direction: 'down', tone: 'positive' },
  },
  { icon: Tag, label: 'Maior gasto', value: 'Moradia' },
  { icon: CalendarClock, label: 'Contas a vencer', value: '3' },
  {
    icon: PiggyBank,
    label: 'Reserva',
    value: '62%',
    trend: { value: '+5%', direction: 'up', tone: 'positive' },
  },
]

// Daily spending, in the chart's 480x160 viewBox (y grows downwards).
export const SPENDING_CHART_WIDTH = 480
export const SPENDING_CHART_HEIGHT = 160
export const SPENDING_CHART_POINTS: ChartPoint[] = [
  { x: 0, y: 120 },
  { x: 60, y: 96 },
  { x: 120, y: 132 },
  { x: 180, y: 40 },
  { x: 240, y: 112 },
  { x: 300, y: 98 },
  { x: 360, y: 124 },
  { x: 420, y: 76 },
  { x: 480, y: 108 },
]
export const SPENDING_CHART_HIGHLIGHT_INDEX = 3
export const SPENDING_CHART_Y_LABELS = ['R$ 400', 'R$ 300', 'R$ 200', 'R$ 100', 'R$ 0']

export const SAVINGS_BAR_HEIGHTS = [28, 40, 34, 52, 46, 64, 70, 84]
export const SAVINGS_Y_LABELS = ['R$ 800', 'R$ 600', 'R$ 400', 'R$ 200', 'R$ 0']

export const TRANSACTION_ITEMS: TransactionItem[] = [
  {
    icon: Banknote,
    title: 'Salário recebido',
    description: 'Depósito da empresa · dia 5',
    status: '+R$ 4.850',
  },
  {
    icon: House,
    title: 'Aluguel',
    description: 'Vence em 2 dias',
    status: 'A vencer',
  },
  {
    icon: Zap,
    title: 'Conta de luz',
    description: 'Paga no débito · dia 3',
    status: 'Paga',
  },
  {
    icon: ShoppingCart,
    title: 'Mercado',
    description: 'Cartão de crédito · ontem',
    status: '-R$ 320',
  },
  {
    icon: Smartphone,
    title: 'Internet e celular',
    description: 'Débito automático · dia 15',
    status: 'Agendada',
  },
]

export const EMERGENCY_FUND_PERCENTAGE = 62

export const BUDGET_CATEGORIES: BudgetCategory[] = [
  { label: 'Moradia', percentage: 90 },
  { label: 'Alimentação', percentage: 74 },
  { label: 'Lazer', percentage: 48 },
]
