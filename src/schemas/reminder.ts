import { z } from 'zod'

export const reminderTimeSchema = z.object({
  time: z
    .string()
    .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, '時刻は HH:mm 形式で入力してください')
    .transform((val) => {
      const [hours, minutes] = val.split(':').map(Number)
      return { hours, minutes }
    }),
})

export type ReminderTimeInput = z.input<typeof reminderTimeSchema>
export type ReminderTimeOutput = z.output<typeof reminderTimeSchema>
