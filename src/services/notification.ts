import * as Notifications from 'expo-notifications'
import { NotificationTriggerInput } from 'expo-notifications'

interface NotificationConfig {
  title: string
  body: string
  data?: Record<string, unknown>
  sound?: boolean
  badge?: number
}

// 通知の権限取得
export const requestNotificationPermissions = async (): Promise<boolean> => {
  const { status } = await Notifications.requestPermissionsAsync()
  return status === 'granted'
}

// 通知のスケジューリング
export const scheduleNotification = async (
  config: NotificationConfig,
  trigger: NotificationTriggerInput
): Promise<string> => {
  return await Notifications.scheduleNotificationAsync({
    content: {
      title: config.title,
      body: config.body,
      data: config.data,
      sound: config.sound,
      badge: config.badge,
    },
    trigger,
  })
}

// 通知のキャンセル
export const cancelNotification = async (identifier: string): Promise<void> => {
  await Notifications.cancelScheduledNotificationAsync(identifier)
}

// 通知設定の取得
export const getNotificationSettings =
  async (): Promise<Notifications.NotificationPermissionsStatus> => {
    return await Notifications.getPermissionsAsync()
  }

// 通知ハンドラーの設定
export const setNotificationHandler = (
  handler: (response: Notifications.NotificationResponse) => void
) => {
  Notifications.addNotificationResponseReceivedListener(handler)
}

// バッジ数の更新
export const setBadgeCount = async (count: number): Promise<void> => {
  await Notifications.setBadgeCountAsync(count)
}

// 通知の初期設定
export const initializeNotifications = (): void => {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    }),
  })
}
