'use client'

import { useState } from 'react'

import { Checkbox } from '@/shared/components/Checkbox/Checkbox'
import { CurrencyField } from '@/shared/components/CurrencyField/CurrencyField'
import { PasswordField } from '@/shared/components/PasswordField/PasswordField'
import { SegmentedControl } from '@/shared/components/SegmentedControl/SegmentedControl'
import { Select } from '@/shared/components/Select/Select'
import { Switch } from '@/shared/components/Switch/Switch'
import { TextField } from '@/shared/components/TextField/TextField'

import styles from './FormControlsDemo.module.scss'

const PERIOD_OPTIONS = [
  { value: 'today', label: 'Hoje' },
  { value: 'month', label: 'Esse mês' },
  { value: 'last-30-days', label: 'Últimos 30 dias' },
]

const TYPE_OPTIONS = [
  { value: 'expense', label: 'Saída' },
  { value: 'income', label: 'Entrada' },
]

const CATEGORY_OPTIONS = [
  { value: 'housing', label: 'Moradia' },
  { value: 'food', label: 'Alimentação' },
  { value: 'transport', label: 'Transporte' },
]

export function FormControlsDemo() {
  const [period, setPeriod] = useState('month')
  const [transactionType, setTransactionType] = useState('expense')
  const [amountInCents, setAmountInCents] = useState(12550)
  const [isRecurring, setIsRecurring] = useState(true)

  return (
    <div className={styles.demo}>
      <div className={styles.row}>
        <SegmentedControl
          label="Período"
          options={PERIOD_OPTIONS}
          value={period}
          onValueChange={setPeriod}
        />
        <SegmentedControl
          label="Tipo de lançamento"
          options={TYPE_OPTIONS}
          value={transactionType}
          onValueChange={setTransactionType}
          isFullWidth
        />
      </div>

      <div className={styles.grid}>
        <TextField label="Descrição" placeholder="Ex.: Mercado do mês" />
        <CurrencyField
          label="Valor"
          valueInCents={amountInCents}
          onValueChange={setAmountInCents}
          hint="Digite só os números."
        />
        <Select
          label="Categoria"
          placeholder="Selecione"
          options={CATEGORY_OPTIONS}
          defaultValue=""
        />
        <TextField label="Com erro" defaultValue="abc" error="Informe um valor válido" />
        <PasswordField label="Senha" placeholder="Digite sua senha" />
        <TextField label="Desabilitado" defaultValue="Não editável" disabled />
      </div>

      <div className={styles.row}>
        <Checkbox defaultChecked>Lembrar de mim</Checkbox>
        <label className={styles.switchLabel}>
          <Switch
            label="Conta recorrente"
            isChecked={isRecurring}
            onCheckedChange={setIsRecurring}
          />
          Conta recorrente
        </label>
      </div>
    </div>
  )
}
