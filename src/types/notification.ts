export type NotificationType = 'record' | 'news'

export interface Notification {
  id: string
  type: NotificationType
  title: string
  message: string
  createdAt: string
  read: boolean
}

export interface NotificationState {
  notifications: Notification[]
  enabled: boolean
}
