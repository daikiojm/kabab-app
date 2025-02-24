import { z } from 'zod'

export const kebabRecordSchema = z.object({
  kebabType: z.enum(['kebab', 'kebab-bowl'] as const).describe('ケバブの種類'),
  meatType: z.enum(['chicken', 'beef', 'mix'] as const).describe('肉の種類'),
  sauceType: z.enum(['mild', 'hot', 'mix'] as const).describe('ソースの種類'),
  size: z.enum(['regular', 'large'] as const).describe('量'),
})

export type KebabRecordSchema = z.infer<typeof kebabRecordSchema>
