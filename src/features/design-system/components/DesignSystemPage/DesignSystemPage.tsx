import { ArrowRight, Banknote, House, Plus, ReceiptText, Settings, ShoppingCart, Zap } from 'lucide-react'
import type { CSSProperties } from 'react'

import { DesignSystemSection } from '@/features/design-system/components/DesignSystemSection/DesignSystemSection'
import { FormControlsDemo } from '@/features/design-system/components/FormControlsDemo/FormControlsDemo'
import { OverlaysDemo } from '@/features/design-system/components/OverlaysDemo/OverlaysDemo'
import { COLOR_TOKEN_GROUPS } from '@/features/design-system/constants/color-tokens'
import { Badge } from '@/shared/components/Badge/Badge'
import { Button } from '@/shared/components/Button/Button'
import { Card } from '@/shared/components/Card/Card'
import { EmptyState } from '@/shared/components/EmptyState/EmptyState'
import { ErrorState } from '@/shared/components/ErrorState/ErrorState'
import { Heading } from '@/shared/components/Heading/Heading'
import { IconButton } from '@/shared/components/IconButton/IconButton'
import { List } from '@/shared/components/List/List'
import { ListItem } from '@/shared/components/ListItem/ListItem'
import { Logo } from '@/shared/components/Logo/Logo'
import { Money } from '@/shared/components/Money/Money'
import { Skeleton } from '@/shared/components/Skeleton/Skeleton'
import { Text } from '@/shared/components/Text/Text'
import { ThemeToggle } from '@/shared/components/ThemeToggle/ThemeToggle'

import styles from './DesignSystemPage.module.scss'

// Internal catalog of the shared UI. Check here before creating a new component.
export function DesignSystemPage() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerTop}>
          <Logo />
          <ThemeToggle />
        </div>
        <Heading as="h1" size="md">
          Design system
        </Heading>
        <Text tone="muted">
          Tokens e componentes compartilhados da Azzup. Área restrita a administradores.
        </Text>
      </header>

      <DesignSystemSection title="Cores" description="Definidas em src/styles/themes.scss.">
        {COLOR_TOKEN_GROUPS.map((group) => (
          <div key={group.title} className={styles.swatchGroup}>
            <span className={styles.groupTitle}>{group.title}</span>
            <div className={styles.swatches}>
              {group.tokens.map((token) => (
                <div key={token} className={styles.swatch}>
                  <span
                    className={styles.swatchColor}
                    style={{ '--swatch-color': `var(${token})` } as CSSProperties}
                  />
                  <code className={styles.tokenName}>{token}</code>
                </div>
              ))}
            </div>
          </div>
        ))}
      </DesignSystemSection>

      <DesignSystemSection title="Tipografia" description="Montserrat; Heading separa nível semântico e tamanho.">
        <Heading as="h3" size="xl">
          Heading xl
        </Heading>
        <Heading as="h3" size="lg">
          Heading lg
        </Heading>
        <Heading as="h3" size="md">
          Heading md
        </Heading>
        <Heading as="h3" size="sm">
          Heading sm
        </Heading>
        <Text size="lg">Text lg — texto de destaque.</Text>
        <Text>Text md — texto padrão de parágrafo.</Text>
        <Text size="sm" tone="muted">
          Text sm muted — legendas e textos auxiliares.
        </Text>
      </DesignSystemSection>

      <DesignSystemSection title="Botões">
        <div className={styles.row}>
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="danger">Danger</Button>
          <Button disabled>Disabled</Button>
        </div>
        <div className={styles.row}>
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg" hasArrow>
            Large com seta
          </Button>
        </div>
        <div className={styles.row}>
          <IconButton icon={Settings} label="Configurações" />
          <IconButton icon={Plus} label="Adicionar" variant="soft" />
          <IconButton icon={ArrowRight} label="Avançar" variant="outline" />
          <IconButton icon={Plus} label="Adicionar" variant="soft" size="sm" />
        </div>
      </DesignSystemSection>

      <DesignSystemSection title="Status">
        <div className={styles.row}>
          <Badge>Neutral</Badge>
          <Badge tone="info">Agendada</Badge>
          <Badge tone="success">Paga</Badge>
          <Badge tone="warning">Vence amanhã</Badge>
          <Badge tone="danger">Vencida</Badge>
        </div>
      </DesignSystemSection>

      <DesignSystemSection title="Dinheiro" description="Valores sempre em centavos (inteiros). Use Money para exibir.">
        <Money amountInCents={234000} size="xl" />
        <div className={styles.row}>
          <Money amountInCents={485000} size="lg" tone="signed" />
          <Money amountInCents={-32000} size="lg" tone="signed" />
          <Money amountInCents={18240} />
          <Money amountInCents={990} size="sm" />
        </div>
      </DesignSystemSection>

      <DesignSystemSection title="Formulários">
        <FormControlsDemo />
      </DesignSystemSection>

      <DesignSystemSection title="Listas" description="Base para lançamentos e contas.">
        <List label="Exemplo de lançamentos">
          <ListItem
            icon={Banknote}
            iconTone="success"
            title="Salário recebido"
            description="Depósito da empresa · 05/06"
            trailing={<Money amountInCents={485000} tone="signed" size="sm" />}
          />
          <ListItem
            icon={ShoppingCart}
            title="Mercado"
            description="Cartão de crédito · ontem"
            trailing={<Money amountInCents={-32000} tone="signed" size="sm" />}
            trailingDetail="Alimentação"
            href="#"
          />
          <ListItem
            icon={House}
            iconTone="warning"
            title="Aluguel"
            description="Vence em 2 dias"
            trailing={<Money amountInCents={150000} size="sm" />}
            trailingDetail={<Badge tone="warning">A vencer</Badge>}
            href="#"
          />
          <ListItem
            icon={Zap}
            iconTone="danger"
            title="Conta de luz com um nome bem longo para testar o corte"
            description="Venceu há 3 dias"
            trailing={<Badge tone="danger">Vencida</Badge>}
          />
        </List>
      </DesignSystemSection>

      <DesignSystemSection title="Estados" description="Carregando, vazio e erro: toda lista precisa dos três.">
        <div className={styles.statesGrid}>
          <Card>
            <div className={styles.skeletonRows} aria-busy="true" aria-label="Carregando">
              {[0, 1, 2].map((row) => (
                <div key={row} className={styles.skeletonRow}>
                  <Skeleton width="40px" height="40px" shape="block" />
                  <div className={styles.skeletonText}>
                    <Skeleton width="60%" />
                    <Skeleton width="35%" height="10px" />
                  </div>
                  <Skeleton width="64px" />
                </div>
              ))}
            </div>
          </Card>
          <EmptyState
            icon={ReceiptText}
            title="Nenhum lançamento ainda"
            description="Importe seu extrato ou adicione seu primeiro gasto."
            action={<Button size="sm">Adicionar lançamento</Button>}
          />
          <ErrorState />
        </div>
      </DesignSystemSection>

      <DesignSystemSection title="Sobreposições" description="Modal (painel de baixo no celular) e toasts.">
        <OverlaysDemo />
      </DesignSystemSection>
    </div>
  )
}
