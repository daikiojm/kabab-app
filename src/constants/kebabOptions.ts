import { KebabType, MeatType, SauceType, Size } from '../types/record'

type Option<T> = {
  label: string
  value: T
  emoji?: string
}

export const kebabTypes: Option<KebabType>[] = [
  { label: 'ケバブ', value: 'kebab', emoji: '🥙' },
  { label: 'ケバブ丼', value: 'kebab-bowl', emoji: '🍚' },
]

export const meatTypes: Option<MeatType>[] = [
  { label: 'チキン', value: 'chicken', emoji: '🍗' },
  { label: 'ビーフ', value: 'beef', emoji: '🥩' },
  { label: 'ミックス', value: 'mix', emoji: '🍖' },
]

export const sauceTypes: Option<SauceType>[] = [
  { label: 'マイルド', value: 'mild', emoji: '😌' },
  { label: 'ホット', value: 'hot', emoji: '🔥' },
  { label: 'ミックス', value: 'mix', emoji: '🌶' },
]

export const sizes: Option<Size>[] = [
  { label: '普通', value: 'regular', emoji: '🍽' },
  { label: '大盛り', value: 'large', emoji: '🍱' },
]

export const getKebabTypeLabel = (value: KebabType): string => {
  return kebabTypes.find(type => type.value === value)?.label ?? value
}

export const getMeatTypeLabel = (value: MeatType): string => {
  return meatTypes.find(type => type.value === value)?.label ?? value
}

export const getSauceTypeLabel = (value: SauceType): string => {
  return sauceTypes.find(type => type.value === value)?.label ?? value
}

export const getSizeLabel = (value: Size): string => {
  return sizes.find(size => size.value === value)?.label ?? value
}

export const getKebabEmoji = (value: KebabType): string => {
  return kebabTypes.find(type => type.value === value)?.emoji ?? '🥙'
}
