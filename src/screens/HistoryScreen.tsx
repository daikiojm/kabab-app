import React, { useMemo, useCallback, useRef, useState } from 'react'
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native'
import BottomSheet, { BottomSheetView, BottomSheetBackdrop } from '@gorhom/bottom-sheet'
import { BottomNavigation } from '../components/BottomNavigation'
import { useKebabRecords } from '../hooks/useKebabRecords'
import { groupByMonth } from '../utils/date'
import { KebabHistoryItem } from '../components/history/KebabHistoryItem'
import { MonthlyGroup } from '../components/history/MonthlyGroup'
import { RecordForm } from '../components/home/RecordForm'
import { colors } from '../styles/colors'
import { spacing } from '../styles/spacing'
import { typography } from '../styles/typography'
import { KebabRecord } from '../types/record'

export const HistoryScreen = () => {
  const { records, loadRecords } = useKebabRecords()
  const bottomSheetRef = useRef<BottomSheet>(null)
  const [selectedRecord, setSelectedRecord] = useState<KebabRecord | null>(null)
  const snapPoints = useMemo(() => ['65%', '90%'], [])

  const groupedRecords = useMemo(() => {
    const sorted = [...records].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    return groupByMonth(sorted)
  }, [records])

  const handleRecordPress = useCallback((record: KebabRecord) => {
    setSelectedRecord(record)
    bottomSheetRef.current?.snapToIndex(0)
  }, [])

  const handleEditComplete = useCallback(() => {
    bottomSheetRef.current?.close()
    setSelectedRecord(null)
    void loadRecords()
  }, [loadRecords])

  return (
    <>
      <View style={styles.root}>
        <SafeAreaView style={styles.container}>
          <ScrollView style={styles.scrollView}>
            <View style={styles.header}>
              <Text style={styles.title}>📅 ケバブ履歴</Text>
            </View>

            {Object.entries(groupedRecords).map(([month, monthRecords]) => (
              <MonthlyGroup key={month} month={month}>
                {monthRecords.map((record) => (
                  <KebabHistoryItem key={record.id} record={record} onPress={handleRecordPress} />
                ))}
              </MonthlyGroup>
            ))}

            {records.length === 0 && (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>まだケバブの記録がありません 🥙</Text>
                <Text style={styles.emptySubText}>ホーム画面から記録を追加してみましょう！</Text>
              </View>
            )}
          </ScrollView>
        </SafeAreaView>
        <BottomNavigation />
      </View>

      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        enableContentPanningGesture
        enableOverDrag
        enablePanDownToClose
        handleIndicatorStyle={styles.handleIndicator}
        backgroundStyle={styles.bottomSheetBackground}
        backdropComponent={(props) => (
          <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} />
        )}
      >
        <BottomSheetView style={styles.contentContainer}>
          <Text style={[styles.editTitle, !selectedRecord && styles.hidden]}>記録を編集</Text>
          <RecordForm
            mode="edit"
            recordId={selectedRecord?.id}
            initialValues={
              selectedRecord
                ? {
                    kebabType: selectedRecord.kebabType,
                    meatType: selectedRecord.meatType,
                    sauceType: selectedRecord.sauceType,
                    size: selectedRecord.size,
                  }
                : undefined
            }
            onComplete={handleEditComplete}
          />
        </BottomSheetView>
      </BottomSheet>
    </>
  )
}

const styles = StyleSheet.create({
  bottomSheetBackground: {
    backgroundColor: colors.background,
  },
  container: {
    backgroundColor: colors.background,
    flex: 1,
  },
  contentContainer: {
    flex: 1,
  },
  editTitle: {
    ...typography.heading.h2,
    marginVertical: spacing.md,
    textAlign: 'center',
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: spacing.xl,
    padding: spacing.md,
  },
  emptySubText: {
    ...typography.body.medium,
    color: colors.text.disabled,
  },
  emptyText: {
    ...typography.body.large,
    color: colors.text.secondary,
    marginBottom: spacing.sm,
  },
  handleIndicator: {
    backgroundColor: colors.text.disabled,
    height: 4,
    width: 40,
  },
  header: {
    backgroundColor: colors.background,
    padding: spacing.md,
    paddingTop: spacing.xl,
  },
  hidden: {
    opacity: 0,
  },
  root: {
    backgroundColor: colors.background,
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  title: {
    ...typography.heading.h1,
  },
})
