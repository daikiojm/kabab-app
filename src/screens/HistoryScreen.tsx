import React from 'react'
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { RootStackNavigationProp } from '../types/navigation'
import { BottomNavigation } from '../components/BottomNavigation'

export const HistoryScreen = () => {
  const navigation = useNavigation<RootStackNavigationProp>()

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.title}>📅 ケバブ履歴</Text>
        </View>

        {/* 月別グループの例 */}
        <View style={styles.monthGroup}>
          <Text style={styles.monthTitle}>2025年2月</Text>
          <View style={styles.historyItem}>
            <Text style={styles.date}>2月22日</Text>
            <Text style={styles.kebabInfo}>🥙 ドネルケバブ</Text>
            <Text style={styles.time}>18:30</Text>
          </View>
        </View>
      </ScrollView>
      <BottomNavigation />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingTop: 40,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  monthGroup: {
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  monthTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: '#666',
  },
  historyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    marginBottom: 10,
  },
  date: {
    fontSize: 16,
    marginRight: 10,
  },
  kebabInfo: {
    flex: 1,
    fontSize: 16,
  },
  time: {
    fontSize: 14,
    color: '#666',
  },
})
