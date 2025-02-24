import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { colors } from '../../styles/colors'
import { spacing, radius } from '../../styles/spacing'
import { typography } from '../../styles/typography'
import { Notification } from '../../types/notification'
import { formatDate, formatTime } from '../../utils/date'

type NotificationItemProps = {
  notification: Notification
  onPress: (notification: Notification) => void
}

export const NotificationItem: React.FC<NotificationItemProps> = ({ notification, onPress }) => {
  return (
    <TouchableOpacity
      style={[styles.container, !notification.read && styles.unreadContainer]}
      onPress={() => onPress(notification)}
    >
      <View style={styles.header}>
        <Text style={styles.title}>
          {notification.type === 'record' ? '🥙 ' : '💡 '}
          {notification.title}
        </Text>
        <Text style={styles.date}>
          {formatDate(notification.createdAt)} {formatTime(notification.createdAt)}
        </Text>
      </View>
      <Text style={styles.message}>{notification.message}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    marginBottom: spacing.sm,
    padding: spacing.md,
  },
  date: {
    ...typography.body.small,
    color: colors.text.secondary,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  message: {
    ...typography.body.medium,
    color: colors.text.primary,
  },
  title: {
    ...typography.body.large,
    fontWeight: '600',
  },
  unreadContainer: {
    backgroundColor: colors.notification.unread,
  },
})
