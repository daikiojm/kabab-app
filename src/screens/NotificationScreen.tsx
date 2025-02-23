import React from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView } from 'react-native';

type NotificationItem = {
  id: string;
  type: 'record' | 'news';
  title: string;
  message: string;
  createdAt: string;
};

// サンプルデータ
const mockNotifications: NotificationItem[] = [
  {
    id: '1',
    type: 'record',
    title: '新規記録',
    message: '新しいケバブの記録が追加されました',
    createdAt: '2024-02-23 12:00',
  },
  {
    id: '2',
    type: 'news',
    title: 'ケバブ豆知識',
    message: 'ケバブの語源は「焼く」を意味するアラビア語「kabāb」です',
    createdAt: '2024-02-22 15:30',
  },
];

export const NotificationScreen = () => {
  const renderItem = ({ item }: { item: NotificationItem }) => (
    <View style={styles.notificationItem}>
      <View style={styles.header}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.date}>{item.createdAt}</Text>
      </View>
      <Text style={styles.message}>{item.message}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.screenTitle}>🔔 通知</Text>
        <FlatList
          data={mockNotifications}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingTop: 40,
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
  header: {
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
