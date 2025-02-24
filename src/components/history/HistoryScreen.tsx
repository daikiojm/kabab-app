import React, { useMemo } from 'react'
import { View, StyleSheet, ScrollView, SafeAreaView } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { RootStackNavigationProp } from '../../types/navigation'
import { BottomNavigation } from '../../components/BottomNavigation'
import { Header } from '../common/Header'
import { EmptyState } from '../common/EmptyState'
import { MonthlyGroup } from './MonthlyGroup'
import { useKebabRecords } from '../../hooks/useKebabRecords'
import { groupByMonth } from '../../utils/date'
import { colors } from '../../styles/colors'
import { spacing } from '../../styles/spacing'

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
          <Header
            title="ケバブ履歴"
            emoji="📅"
          />

          {records.length === 0 ? (
            <EmptyState
              title="まだケバブの記録がありません"
              description="ホーム画面から記録を追加してみましょう！"
              emoji="🥙"
            />
          ) : (
            <View style={styles.content}>
              {Object.entries(groupedRecords).map(([month, monthRecords]) => (
                <MonthlyGroup
                  key={month}
                  month={month}
                  records={monthRecords}
                />
              ))}
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
      <BottomNavigation />
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingTop: spacing.md,
  },
})
