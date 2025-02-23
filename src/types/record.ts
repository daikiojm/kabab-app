export type KebabType = 'kebab' | 'kebab-bowl'
export type MeatType = 'chicken' | 'beef' | 'mix'
export type SauceType = 'mild' | 'hot' | 'mix'
export type Size = 'regular' | 'large'

export interface KebabRecord {
  id: string
  kebabType: KebabType
  meatType: MeatType
  sauceType: SauceType
  size: Size
  createdAt: string
}

export type KebabRecordInput = Omit<KebabRecord, 'id' | 'createdAt'>
