import { Alert } from 'react-native'
import { useState, useEffect, useCallback } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Notification, NotificationState, DEFAULT_REMINDER_SETTINGS } from '../types/notification'
import {
  scheduleNotification,
  cancelNotification,
  requestNotificationPermissions,
  initializeNotifications,
} from '../services/notification'

const STORAGE_KEY = '@notifications'
const SETTINGS_KEY = '@notification_settings'
const REMINDER_SETTINGS_KEY = '@reminder_settings'

const DEFAULT_STATE: NotificationState = {
  notifications: [],
  enabled: false,
  reminder: DEFAULT_REMINDER_SETTINGS,
}

export const useNotifications = () => {
  const [state, setState] = useState<NotificationState>(DEFAULT_STATE)

  const loadNotifications = useCallback(async () => {
    try {
      const [notificationsJson, settingsJson, reminderJson] = await Promise.all([
        AsyncStorage.getItem(STORAGE_KEY),
        AsyncStorage.getItem(SETTINGS_KEY),
        AsyncStorage.getItem(REMINDER_SETTINGS_KEY),
      ])

      const notifications = notificationsJson ? JSON.parse(notificationsJson) : []
      const settings = settingsJson ? JSON.parse(settingsJson) : { enabled: false }
      const reminder = reminderJson ? JSON.parse(reminderJson) : DEFAULT_REMINDER_SETTINGS

      setState((prev: NotificationState) => ({
        ...prev,
        notifications,
        enabled: settings.enabled,
        reminder,
      }))

      // 通知の初期化
      initializeNotifications()

      // リマインダーが有効な場合は再スケジュール
      if (reminder.enabled && reminder.time) {
        await scheduleReminderNotification(reminder.time)
      }
    } catch (e) {
      console.error('Error loading notifications:', e)
    }
  }, [])

  const addNotification = useCallback(
    async (notification: Omit<Notification, 'id' | 'createdAt' | 'read'>) => {
      try {
        const newNotification: Notification = {
          id: Date.now().toString(),
          ...notification,
          createdAt: new Date().toISOString(),
          read: false,
        }

        const updatedNotifications = [newNotification, ...state.notifications]
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedNotifications))
        setState((prev: NotificationState) => ({
          ...prev,
          notifications: updatedNotifications,
        }))
      } catch (e) {
        console.error('Error adding notification:', e)
      }
    },
    [state.notifications]
  )

  const markAsRead = useCallback(async (id: string) => {
    try {
      const updatedNotifications = state.notifications.map((notification: Notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedNotifications))
      setState((prev: NotificationState) => ({
        ...prev,
        notifications: updatedNotifications,
      }))
    } catch (e) {
      console.error('Error marking notification as read:', e)
    }
  }, [state.notifications])

  const clearNotifications = useCallback(async () => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify([]))
      setState((prev: NotificationState) => ({
        ...prev,
        notifications: [],
      }))
    } catch (e) {
      console.error('Error clearing notifications:', e)
    }
  }, [])

  const scheduleReminderNotification = async (time: string) => {
    try {
      // 既存のリマインダーをキャンセル
      if (state.reminder.notificationId) {
        await cancelNotification(state.reminder.notificationId)
      }

      const [hours, minutes] = time.split(':').map(Number)
      const notificationId = await scheduleNotification(
        {
          title: '🥙 ケバブの記録をお忘れなく',
          body: '今日のケバブ記録はもうつけましたか？',
          sound: true,
          badge: 1,
          data: {
            type: 'reminder',
            action: 'record',
          },
        },
        {
          hour: hours,
          minute: minutes,
          repeats: true,
        }
      )

      const updatedReminder = {
        ...state.reminder,
        notificationId,
        time,
      }

      await AsyncStorage.setItem(REMINDER_SETTINGS_KEY, JSON.stringify(updatedReminder))
      setState((prev: NotificationState) => ({
        ...prev,
        reminder: updatedReminder,
      }))
    } catch (e) {
      console.error('Error scheduling reminder:', e)
    }
  }

  const toggleNotifications = useCallback(async (enabled: boolean) => {
    try {
      if (enabled) {
        const permissionGranted = await requestNotificationPermissions()
        if (!permissionGranted) {
          return
        }
      }

      // 通知設定を保存
      await AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify({ enabled }))

      // リマインダー設定も含めて状態を更新
      const currentReminder = state.reminder
      setState((prev: NotificationState) => ({
        ...prev,
        enabled,
        reminder: {
          ...currentReminder,
          enabled: enabled ? currentReminder.enabled : false,
        },
      }))

      // リマインダー設定も更新
      const updatedReminder = {
        ...currentReminder,
        enabled: enabled ? currentReminder.enabled : false,
      }
      await AsyncStorage.setItem(REMINDER_SETTINGS_KEY, JSON.stringify(updatedReminder))

      // 通知が有効化され、リマインダーも有効な場合はスケジュール
      if (enabled && currentReminder.enabled) {
        await scheduleReminderNotification(currentReminder.time)
      } else if (!enabled && currentReminder.notificationId) {
        await cancelNotification(currentReminder.notificationId)
      }
    } catch (e) {
      console.error('Error toggling notifications:', e)
    }
  }, [state.reminder])

  const toggleReminder = useCallback(async (enabled: boolean) => {
    try {
      // 通知が無効の場合は、リマインダーを有効にできない
      if (!state.enabled) {
        Alert.alert('エラー', '通知を有効にしてください')
        return
      }

      const updatedReminder = {
        ...state.reminder,
        enabled,
        notificationId: undefined,
      }

      // リマインダー設定を保存
      await AsyncStorage.setItem(REMINDER_SETTINGS_KEY, JSON.stringify(updatedReminder))

      // 状態を更新
      setState((prev: NotificationState) => ({
        ...prev,
        reminder: updatedReminder,
      }))

      // 通知のスケジュール更新
      if (enabled) {
        await scheduleReminderNotification(updatedReminder.time)
      } else if (state.reminder.notificationId) {
        await cancelNotification(state.reminder.notificationId)
      }
    } catch (e) {
      console.error('Error toggling reminder:', e)
      Alert.alert('エラー', 'リマインダーの設定に失敗しました')
    }
  }, [state.reminder, state.enabled])

  const updateReminderTime = useCallback(async (time: string) => {
    try {
      const updatedReminder = {
        ...state.reminder,
        time,
        notificationId: undefined,
      }

      // リマインダー設定を保存
      await AsyncStorage.setItem(REMINDER_SETTINGS_KEY, JSON.stringify(updatedReminder))

      // 状態を更新
      setState((prev: NotificationState) => ({
        ...prev,
        reminder: updatedReminder,
      }))

      // 通知が有効な場合は再スケジュール
      if (state.enabled && updatedReminder.enabled) {
        await scheduleReminderNotification(time)
      }
    } catch (e) {
      console.error('Error updating reminder time:', e)
    }
  }, [state.reminder, state.enabled])

  useEffect(() => {
    loadNotifications()
  }, [loadNotifications])

  return {
    notifications: state.notifications,
    enabled: state.enabled,
    reminder: state.reminder,
    addNotification,
    markAsRead,
    clearNotifications,
    toggleNotifications,
    toggleReminder,
    updateReminderTime,
  }
}
