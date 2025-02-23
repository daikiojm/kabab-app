import React, { useCallback } from 'react'
import { View, Text, StyleSheet, FlatList, SafeAreaView, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { HeaderBackButton } from '@react-navigation/elements'
import { RootStackNavigationProp } from '../types/navigation'
import { useNotifications } from '../hooks/useNotifications'
import { formatDate, formatTime } from '../utils/date'
import { Notification } from '../types/notification'

export const NotificationScreen = () => {
  const navigation = useNavigation<RootStackNavigationProp>()
  const { notifications, markAsRead } = useNotifications()

  const handleNotificationPress = useCallback((notification: Notification) => {
    if (!notification.read) {
      markAsRead(notification.id)
    }
  }, [markAsRead])

  const renderItem = useCallback(({ item }: { item: Notification }) => (
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
  ), [handleNotificationPress])

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
  );
};

const styles = StyleSheet.create({
  unreadItem: {
    backgroundColor: '#fff3e0',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 8,
    paddingHorizontal: 8,
  },
  content: {
    flex: 1,
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  listContainer: {
    padding: 16,
  },
  notificationItem: {
    backgroundColor: '#f8f8f8',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  date: {
    fontSize: 12,
    color: '#666',
  },
  message: {
    fontSize: 14,
    color: '#333',
  },
});
