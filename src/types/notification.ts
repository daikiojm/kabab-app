export type NotificationType = 'record' | 'news' | 'reminder'

export interface Notification {
  id: string
  type: NotificationType
  title: string
  message: string
  createdAt: string
  read: boolean
}

interface ReminderSettings {
  enabled: boolean
  time: string // HH:mm format
  notificationId?: string // expo-notifications の識別子
}

export interface NotificationState {
  notifications: Notification[]
  enabled: boolean
  reminder: ReminderSettings
}

export const DEFAULT_REMINDER_SETTINGS: ReminderSettings = {
  enabled: false,
  time: '21:00',
}
