import { ArrowDownRight, ArrowUpRight, ChartLine, ChartNoAxesColumn, Info, PiggyBank } from 'lucide-react'
import type { CSSProperties } from 'react'

import { ShowcaseFrame } from '@/features/auth/components/ShowcaseFrame/ShowcaseFrame'
import {
  DASHBOARD_METRICS,
  DASHBOARD_MONTH_BALANCE,
  DASHBOARD_MONTH_SAVINGS,
  DASHBOARD_PERIODS,
  DASHBOARD_SELECTED_PERIOD,
  SAVINGS_BAR_HEIGHTS,
  SAVINGS_Y_LABELS,
  SPENDING_CHART_HEIGHT,
  SPENDING_CHART_HIGHLIGHT_INDEX,
  SPENDING_CHART_POINTS,
  SPENDING_CHART_WIDTH,
  SPENDING_CHART_Y_LABELS,
} from '@/features/auth/constants/auth-showcase'
import { useCountUp } from '@/shared/hooks/useCountUp'
import type { Trend } from '@/features/auth/types/auth-showcase.types'
import { classNames } from '@/shared/utils/class-names'

import styles from './DashboardScene.module.scss'

const numberFormatter = new Intl.NumberFormat('pt-BR')

const spendingLinePath = `M ${SPENDING_CHART_POINTS.map((point) => `${point.x} ${point.y}`).join(' L ')}`
const spendingAreaPath = `${spendingLinePath} L ${SPENDING_CHART_WIDTH} ${SPENDING_CHART_HEIGHT} L 0 ${SPENDING_CHART_HEIGHT} Z`
const highlightedPoint = SPENDING_CHART_POINTS[SPENDING_CHART_HIGHLIGHT_INDEX]
const gridLineYs = SPENDING_CHART_Y_LABELS.map(
  (_, index) => (SPENDING_CHART_HEIGHT / (SPENDING_CHART_Y_LABELS.length - 1)) * index,
)

type DashboardSceneProps = {
  isActive: boolean
}

export function DashboardScene({ isActive }: DashboardSceneProps) {
  const monthBalance = useCountUp(DASHBOARD_MONTH_BALANCE, isActive)
  const monthSavings = useCountUp(DASHBOARD_MONTH_SAVINGS, isActive)

  return (
    <ShowcaseFrame
      activeNavIndex={0}
      isActive={isActive}
      className={classNames(isActive && styles.isActive)}
    >
      <div className={styles.periods}>
        {DASHBOARD_PERIODS.map((period) => (
          <span
            key={period}
            className={classNames(
              styles.period,
              period === DASHBOARD_SELECTED_PERIOD && styles.isSelected,
            )}
          >
            {period}
          </span>
        ))}
      </div>

      <div className={styles.stats}>
        <div className={styles.stat}>
          <span className={styles.statLabel}>Saldo do mês</span>
          <span className={styles.statValue}>
            R$ {numberFormatter.format(monthBalance)}
            <small>,00</small>
          </span>
          <TrendIndicator trend={{ value: '+8%', direction: 'up', tone: 'positive' }} />
        </div>

        <span className={styles.statIllustration}>
          <PiggyBank size={44} strokeWidth={1.5} />
        </span>

        <div className={classNames(styles.stat, styles.statDivided)}>
          <span className={styles.statLabel}>
            Guardado este mês <Info size={14} />
          </span>
          <span className={styles.statValue}>
            R$ {numberFormatter.format(monthSavings)}
            <small>,00</small>
          </span>
          <TrendIndicator trend={{ value: '+15%', direction: 'up', tone: 'positive' }} />
        </div>
      </div>

      <div className={styles.metrics}>
        {DASHBOARD_METRICS.map((metric, index) => (
          <div
            key={metric.label}
            className={styles.metric}
            style={{ '--index': index } as CSSProperties}
          >
            <span className={styles.metricLabel}>
              <metric.icon size={16} />
              {metric.label}
            </span>
            <span className={styles.metricValue}>
              {metric.value}
              {metric.trend && <TrendIndicator trend={metric.trend} />}
            </span>
          </div>
        ))}
      </div>

      <div className={styles.charts}>
        <div className={styles.chartCard}>
          <span className={styles.chartTitle}>
            <ChartLine size={16} />
            Gastos por dia
          </span>

          <div className={styles.chartBody}>
            <div className={styles.axisLabels}>
              {SPENDING_CHART_Y_LABELS.map((label) => (
                <span key={label}>{label}</span>
              ))}
            </div>

            <div className={styles.lineChart}>
              <svg viewBox={`0 0 ${SPENDING_CHART_WIDTH} ${SPENDING_CHART_HEIGHT}`} overflow="visible">
                <defs>
                  <linearGradient id="spending-area-gradient" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" className={styles.areaGradientStart} />
                    <stop offset="100%" className={styles.areaGradientEnd} />
                  </linearGradient>
                </defs>
                {gridLineYs.map((y) => (
                  <line
                    key={y}
                    x1="0"
                    x2={SPENDING_CHART_WIDTH}
                    y1={y}
                    y2={y}
                    className={styles.gridLine}
                  />
                ))}
                <path d={spendingAreaPath} fill="url(#spending-area-gradient)" className={styles.lineArea} />
                <path d={spendingLinePath} pathLength={1} className={styles.line} />
                <circle
                  cx={highlightedPoint.x}
                  cy={highlightedPoint.y}
                  r="6"
                  className={styles.linePoint}
                />
              </svg>

              <span
                className={styles.tooltip}
                style={
                  {
                    '--tooltip-x': `${(highlightedPoint.x / SPENDING_CHART_WIDTH) * 100}%`,
                    '--tooltip-y': `${(highlightedPoint.y / SPENDING_CHART_HEIGHT) * 100}%`,
                  } as CSSProperties
                }
              >
                Mercado (R$ 320) <small>10/06</small>
              </span>
            </div>
          </div>
        </div>

        <div className={styles.chartCard}>
          <span className={styles.chartTitle}>
            <ChartNoAxesColumn size={16} />
            Quanto você guardou
            <span className={styles.chartTag}>
              <PiggyBank size={14} />
              Últimos 8 meses
            </span>
          </span>

          <div className={styles.chartBody}>
            <div className={styles.axisLabels}>
              {SAVINGS_Y_LABELS.map((label) => (
                <span key={label}>{label}</span>
              ))}
            </div>

            <div className={styles.barChart}>
              {SAVINGS_BAR_HEIGHTS.map((height, index) => (
                <span
                  key={index}
                  className={styles.bar}
                  style={{ '--bar-height': `${height}%`, '--index': index } as CSSProperties}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </ShowcaseFrame>
  )
}

type TrendIndicatorProps = {
  trend: Trend
}

function TrendIndicator({ trend }: TrendIndicatorProps) {
  const Icon = trend.direction === 'up' ? ArrowUpRight : ArrowDownRight

  return (
    <span className={classNames(styles.trend, trend.tone === 'negative' && styles.trendNegative)}>
      <Icon size={14} />
      {trend.value}
    </span>
  )
}
