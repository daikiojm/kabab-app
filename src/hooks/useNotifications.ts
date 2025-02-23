import { useState, useEffect, useCallback } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Notification, NotificationState } from '../types/notification'

const STORAGE_KEY = '@notifications'
const SETTINGS_KEY = '@notification_settings'

const DEFAULT_STATE: NotificationState = {
  notifications: [],
  enabled: false,
}

export const useNotifications = () => {
  const [state, setState] = useState<NotificationState>(DEFAULT_STATE)

  const loadNotifications = useCallback(async () => {
    try {
      const [notificationsJson, settingsJson] = await Promise.all([
        AsyncStorage.getItem(STORAGE_KEY),
        AsyncStorage.getItem(SETTINGS_KEY),
      ])

      const notifications = notificationsJson ? JSON.parse(notificationsJson) : []
      const settings = settingsJson ? JSON.parse(settingsJson) : { enabled: false }

      setState({
        notifications,
        enabled: settings.enabled,
      })
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
        setState((prev) => ({
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
      const updatedNotifications = state.notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      )
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedNotifications))
      setState((prev) => ({
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
      setState((prev) => ({
        ...prev,
        notifications: [],
      }))
    } catch (e) {
      console.error('Error clearing notifications:', e)
    }
  }, [])

  const toggleNotifications = useCallback(async (enabled: boolean) => {
    try {
      await AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify({ enabled }))
      setState((prev) => ({
        ...prev,
        enabled,
      }))
    } catch (e) {
      console.error('Error toggling notifications:', e)
    }
  }, [])

  useEffect(() => {
    loadNotifications()
  }, [loadNotifications])

  return {
    notifications: state.notifications,
    enabled: state.enabled,
    addNotification,
    markAsRead,
    clearNotifications,
    toggleNotifications,
  }
}
