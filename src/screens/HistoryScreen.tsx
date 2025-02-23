import React, { useMemo } from 'react'
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { RootStackNavigationProp } from '../types/navigation'
import { BottomNavigation } from '../components/BottomNavigation'
import { useKebabRecords } from '../hooks/useKebabRecords'
import { formatDate, formatTime, groupByMonth } from '../utils/date'

const getKebabEmoji = (kebabType: string): string => {
  return kebabType === 'kebab' ? '🥙' : '🍚'
}

export const HistoryScreen = () => {
  const navigation = useNavigation<RootStackNavigationProp>()
  const { records } = useKebabRecords()

  const groupedRecords = useMemo(() => {
    const sorted = [...records].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    return groupByMonth(sorted)
  }, [records])

  return (
    <>
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.header}>
            <Text style={styles.title}>📅 ケバブ履歴</Text>
          </View>

          {Object.entries(groupedRecords).map(([month, monthRecords]) => (
            <View key={month} style={styles.monthGroup}>
              <Text style={styles.monthTitle}>{month}</Text>
              {monthRecords.map((record) => (
                <View key={record.id} style={styles.historyItem}>
                  <Text style={styles.date}>{formatDate(record.createdAt)}</Text>
                  <View style={styles.kebabInfoContainer}>
                    <Text style={styles.kebabInfo}>
                      {getKebabEmoji(record.kebabType)}{' '}
                      {record.kebabType === 'kebab' ? 'ケバブ' : 'ケバブ丼'}
                    </Text>
                    <Text style={styles.kebabDetail}>
                      {record.meatType === 'chicken'
                        ? 'チキン'
                        : record.meatType === 'beef'
                        ? 'ビーフ'
                        : 'ミックス'}{' '}
                      •{' '}
                      {record.sauceType === 'mild'
                        ? 'マイルド'
                        : record.sauceType === 'hot'
                        ? 'ホット'
                        : 'ミックス'}{' '}
                      • {record.size === 'regular' ? '普通' : '大盛り'}
                    </Text>
                  </View>
                  <Text style={styles.time}>{formatTime(record.createdAt)}</Text>
                </View>
              ))}
            </View>
          ))}

          {records.length === 0 && (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>
                まだケバブの記録がありません 🥙
              </Text>
              <Text style={styles.emptyStateSubText}>
                ホーム画面から記録を追加してみましょう！
              </Text>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
      <BottomNavigation />
    </>
  )
}

const styles = StyleSheet.create({
  emptyState: {
    padding: 20,
    alignItems: 'center',
    marginTop: 40,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  emptyStateSubText: {
    fontSize: 14,
    color: '#999',
  },
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
  kebabInfoContainer: {
    flex: 1,
    marginHorizontal: 10,
  },
  kebabInfo: {
    fontSize: 16,
    marginBottom: 4,
  },
  kebabDetail: {
    fontSize: 12,
    color: '#666',
  },
  time: {
    fontSize: 14,
    color: '#666',
  },
})
