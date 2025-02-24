import React, { useCallback } from 'react'
import { View, StyleSheet, FlatList, SafeAreaView } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { RootStackNavigationProp } from '../../types/navigation'
import { Header } from '../common/Header'
import { EmptyState } from '../common/EmptyState'
import { NotificationItem } from './NotificationItem'
import { useNotifications } from '../../hooks/useNotifications'
import { Notification } from '../../types/notification'
import { colors } from '../../styles/colors'
import { spacing } from '../../styles/spacing'

export const NotificationScreen = () => {
  const navigation = useNavigation<RootStackNavigationProp>()
  const { notifications, markAsRead } = useNotifications()

  const handleNotificationPress = useCallback((notification: Notification) => {
    if (!notification.read) {
      markAsRead(notification.id)
    }
  }, [markAsRead])

  const renderItem = useCallback(({ item }: { item: Notification }) => (
    <NotificationItem
      notification={item}
      onPress={handleNotificationPress}
    />
  ), [handleNotificationPress])

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="通知"
        emoji="🔔"
        showBack
        onBack={() => navigation.goBack()}
      />
      {notifications.length === 0 ? (
        <EmptyState
          title="通知はありません"
          description="新しい通知が来たらここに表示されます"
          emoji="🔔"
        />
      ) : (
        <FlatList
          data={notifications}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  listContainer: {
    padding: spacing.md,
  },
})
