import type { MealChoice } from '@/types'

export const MEAL_OPTIONS: { value: MealChoice; label: string; emoji: string }[] = [
  { value: 'carne',       label: 'Carne',       emoji: '🥩' },
  { value: 'pescado',     label: 'Pescado',     emoji: '🐟' },
  { value: 'vegetariano', label: 'Vegetariano', emoji: '🥗' },
]

export const MEAL_LABELS: Record<MealChoice, string> = Object.fromEntries(
  MEAL_OPTIONS.map((o) => [o.value, o.label])
) as Record<MealChoice, string>
