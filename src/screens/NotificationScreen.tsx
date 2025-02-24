import React, { useCallback } from 'react'
import { View, Text, StyleSheet, FlatList, SafeAreaView, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { HeaderBackButton } from '@react-navigation/elements'
import { RootStackNavigationProp } from '../types/navigation'
import { useNotifications } from '../hooks/useNotifications'
import { formatDate, formatTime } from '../utils/date'
import { Notification } from '../types/notification'
import { colors } from '../styles/colors'

export const NotificationScreen = () => {
  const navigation = useNavigation<RootStackNavigationProp>()
  const { notifications, markAsRead } = useNotifications()

  const handleNotificationPress = useCallback(
    (notification: Notification) => {
      if (!notification.read) {
        void markAsRead(notification.id)
      }
    },
    [markAsRead]
  )

  const renderItem = useCallback(
    ({ item }: { item: Notification }) => (
      <TouchableOpacity
        style={[styles.notificationItem, !item.read && styles.unreadItem]}
        onPress={() => handleNotificationPress(item)}
      >
        <View style={styles.itemHeader}>
          <Text style={styles.title}>
            {item.type === 'record' ? '🥙 ' : '💡 '}
            {item.title}
          </Text>
          <Text style={styles.date}>
            {formatDate(item.createdAt)} {formatTime(item.createdAt)}
          </Text>
        </View>
        <Text style={styles.message}>{item.message}</Text>
      </TouchableOpacity>
    ),
    [handleNotificationPress]
  )

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <HeaderBackButton onPress={() => navigation.goBack()} />
        <Text style={styles.screenTitle}>🔔 通知</Text>
      </View>
      <View style={styles.content}>
        <FlatList
          data={notifications}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
        />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1,
  },
  content: {
    flex: 1,
  },
  date: {
    color: colors.text.secondary,
    fontSize: 12,
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingTop: 8,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  listContainer: {
    padding: 16,
  },
  message: {
    color: colors.text.primary,
    fontSize: 14,
  },
  notificationItem: {
    backgroundColor: colors.surface,
    borderRadius: 8,
    marginBottom: 12,
    padding: 16,
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  unreadItem: {
    backgroundColor: colors.notification.unread,
  },
})
