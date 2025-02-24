import { Alert } from 'react-native'
import { useState, useEffect, useCallback } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Notification, NotificationState, DEFAULT_REMINDER_SETTINGS } from '../types/notification'

type OperationResult<T = undefined> =
  | { success: true; data?: T }
  | { success: false; error: string }

type ReminderNotificationConfig = {
  title: string
  body: string
  sound: boolean
  badge: number
  data: {
    type: string
    action: string
  }
}

import type { CalendarTriggerInput } from 'expo-notifications'

type ReminderScheduleConfig = CalendarTriggerInput & {
  repeats: boolean
}
import {
  scheduleNotification,
  cancelNotification,
  requestNotificationPermissions,
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

  const loadNotifications = useCallback(async (): Promise<OperationResult> => {
    try {
      const [notificationsJson, settingsJson, reminderJson] = await Promise.all([
        AsyncStorage.getItem(STORAGE_KEY),
        AsyncStorage.getItem(SETTINGS_KEY),
        AsyncStorage.getItem(REMINDER_SETTINGS_KEY),
      ])

      const notifications = notificationsJson
        ? (JSON.parse(notificationsJson) as Notification[])
        : []
      const settings = settingsJson
        ? (JSON.parse(settingsJson) as { enabled: boolean })
        : { enabled: false }
      const reminder = reminderJson
        ? (JSON.parse(reminderJson) as typeof DEFAULT_REMINDER_SETTINGS)
        : DEFAULT_REMINDER_SETTINGS

      setState((prev) => ({
        ...prev,
        notifications,
        enabled: settings.enabled,
        reminder,
      }))
      return { success: true }
    } catch (e) {
      console.error('Error loading notifications:', e)
      return {
        success: false,
        error: e instanceof Error ? e.message : '通知の読み込み中にエラーが発生しました',
      }
    }
  }, [])

  const scheduleReminderNotification = useCallback(
    async (time: string): Promise<OperationResult<string>> => {
      try {
        // 既存のリマインダーをキャンセル
        if (state.reminder.notificationId) {
          await cancelNotification(state.reminder.notificationId)
        }

        const [hours, minutes] = time.split(':').map(Number)
        const config: ReminderNotificationConfig = {
          title: '🥙 ケバブの記録をお忘れなく',
          body: '今日のケバブ記録はもうつけましたか？',
          sound: true,
          badge: 1,
          data: {
            type: 'reminder',
            action: 'record',
          },
        }

        const schedule: ReminderScheduleConfig = {
          hour: hours,
          minute: minutes,
          repeats: true,
        }

        const notificationId = await scheduleNotification(config, schedule)

        const updatedReminder = {
          ...state.reminder,
          notificationId,
          time,
        }

        await AsyncStorage.setItem(REMINDER_SETTINGS_KEY, JSON.stringify(updatedReminder))
        setState((prev) => ({
          ...prev,
          reminder: updatedReminder,
        }))
        return { success: true, data: notificationId }
      } catch (e) {
        console.error('Error scheduling reminder:', e)
        return {
          success: false,
          error:
            e instanceof Error
              ? e.message
              : 'リマインダーのスケジュール設定中にエラーが発生しました',
        }
      }
    },
    [state.reminder]
  )

  const addNotification = useCallback(
    async (
      notification: Omit<Notification, 'id' | 'createdAt' | 'read'>
    ): Promise<OperationResult<Notification>> => {
      try {
        const newNotification: Notification = {
          id: Date.now().toString(),
          ...notification,
          createdAt: new Date().toISOString(),
          read: false,
        }

        const updatedNotifications = [newNotification, ...state.notifications]
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedNotifications))
        setState((prev) => ({
          ...prev,
          notifications: updatedNotifications,
        }))
        return { success: true, data: newNotification }
      } catch (e) {
        console.error('Error adding notification:', e)
        return {
          success: false,
          error: e instanceof Error ? e.message : '通知の追加中にエラーが発生しました',
        }
      }
    },
    [state.notifications]
  )

  const markAsRead = useCallback(
    async (id: string): Promise<OperationResult> => {
      try {
        const updatedNotifications = state.notifications.map((notification: Notification) =>
          notification.id === id ? { ...notification, read: true } : notification
        )
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedNotifications))
        setState((prev) => ({
          ...prev,
          notifications: updatedNotifications,
        }))
        return { success: true }
      } catch (e) {
        console.error('Error marking notification as read:', e)
        return {
          success: false,
          error: e instanceof Error ? e.message : '通知の既読設定中にエラーが発生しました',
        }
      }
    },
    [state.notifications]
  )

  const clearNotifications = useCallback(async (): Promise<OperationResult> => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify([]))
      setState((prev) => ({
        ...prev,
        notifications: [],
      }))
      return { success: true }
    } catch (e) {
      console.error('Error clearing notifications:', e)
      return {
        success: false,
        error: e instanceof Error ? e.message : '通知のクリア中にエラーが発生しました',
      }
    }
  }, [])

  const toggleNotifications = useCallback(
    async (enabled: boolean): Promise<OperationResult> => {
      try {
        if (enabled) {
          const permissionGranted = await requestNotificationPermissions()
          if (!permissionGranted) {
            return {
              success: false,
              error: '通知の権限が付与されませんでした',
            }
          }
        }

        const currentReminder = state.reminder
        const updatedReminder = {
          ...currentReminder,
          enabled: enabled ? currentReminder.enabled : false,
        }

        // 通知のスケジュール更新
        if (enabled && currentReminder.enabled) {
          await scheduleReminderNotification(currentReminder.time)
        } else if (!enabled && currentReminder.notificationId) {
          await cancelNotification(currentReminder.notificationId)
        }

        // 通知設定を保存
        await AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify({ enabled }))
        await AsyncStorage.setItem(REMINDER_SETTINGS_KEY, JSON.stringify(updatedReminder))

        // 状態を更新
        setState((prev) => ({
          ...prev,
          enabled,
          reminder: updatedReminder,
        }))
        return { success: true }
      } catch (e) {
        console.error('Error toggling notifications:', e)
        return {
          success: false,
          error: e instanceof Error ? e.message : '通知設定の更新中にエラーが発生しました',
        }
      }
    },
    [state.reminder, scheduleReminderNotification]
  )

  const toggleReminder = useCallback(
    async (enabled: boolean): Promise<OperationResult> => {
      try {
        // 通知が無効の場合は、リマインダーを有効にできない
        if (!state.enabled) {
          Alert.alert('エラー', '通知を有効にしてください')
          return {
            success: false,
            error: '通知が無効のため、リマインダーを設定できません',
          }
        }

        const updatedReminder = {
          ...state.reminder,
          enabled,
        }

        // 通知のスケジュール更新
        if (enabled) {
          await scheduleReminderNotification(updatedReminder.time)
        } else if (state.reminder.notificationId) {
          await cancelNotification(state.reminder.notificationId)
        }

        // リマインダー設定を保存
        await AsyncStorage.setItem(REMINDER_SETTINGS_KEY, JSON.stringify(updatedReminder))

        // 状態を更新
        setState((prev) => ({
          ...prev,
          reminder: updatedReminder,
        }))
        return { success: true }
      } catch (e) {
        console.error('Error toggling reminder:', e)
        Alert.alert('エラー', 'リマインダーの設定に失敗しました')
        return {
          success: false,
          error: e instanceof Error ? e.message : 'リマインダー設定の更新中にエラーが発生しました',
        }
      }
    },
    [state.reminder, state.enabled, scheduleReminderNotification]
  )

  const updateReminderTime = useCallback(
    async (time: string): Promise<OperationResult> => {
      try {
        const updatedReminder = {
          ...state.reminder,
          time,
        }

        // 通知が有効な場合は再スケジュール
        if (state.enabled && updatedReminder.enabled) {
          await scheduleReminderNotification(time)
        }

        // リマインダー設定を保存
        await AsyncStorage.setItem(REMINDER_SETTINGS_KEY, JSON.stringify(updatedReminder))

        // 状態を更新
        setState((prev) => ({
          ...prev,
          reminder: updatedReminder,
        }))
        return { success: true }
      } catch (e) {
        console.error('Error updating reminder time:', e)
        return {
          success: false,
          error: e instanceof Error ? e.message : 'リマインダー時刻の更新中にエラーが発生しました',
        }
      }
    },
    [state.reminder, state.enabled, scheduleReminderNotification]
  )

  useEffect(() => {
    void loadNotifications()
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
