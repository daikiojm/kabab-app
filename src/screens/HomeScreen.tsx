/**
 * ホーム画面のメインコンポーネント
 *
 * @important
 * レイアウトに関する注意事項：
 * - SafeAreaView を使用していますが、ノッチ付きデバイスでヘッダーが隠れる可能性があります
 * - Header コンポーネントのパディング設定には useSafeAreaInsets の使用を推奨
 * - レイアウトの変更時は、様々なデバイスでの表示確認が必要
 *
 * @see {@link Header} コンポーネントのドキュメントも参照してください
 */
import React, { useCallback, useMemo, useRef } from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import BottomSheet, { BottomSheetView, BottomSheetBackdrop } from '@gorhom/bottom-sheet'
import { useTypedRouter } from '../types/navigation'
import { BottomNavigation } from '../components/BottomNavigation'
import { Header } from '../components/home/Header'
import { DashboardStats } from '../components/home/DashboardStats'
import { KebabTips } from '../components/home/KebabTips'
import { RecordForm } from '../components/home/RecordForm'
import { useKebabRecords } from '../hooks/useKebabRecords'
import { spacing, radius } from '../styles/spacing'
import { colors } from '../styles/colors'
import { typography } from '../styles/typography'

export const HomeScreen = () => {
  const { stats } = useKebabRecords()
  const insets = useSafeAreaInsets()
  const router = useTypedRouter()
  const bottomSheetRef = useRef<BottomSheet>(null)
  const snapPoints = useMemo(() => ['65%', '90%'], [])
  const handleOpenPress = useCallback(() => {
    bottomSheetRef.current?.snapToIndex(0)
  }, [])

  const handleClosePress = useCallback(() => {
    bottomSheetRef.current?.close()
  }, [])

  const handleNavigateToSettings = useCallback(() => {
    router.navigate('/settings')
  }, [router])

  const handleNavigateToNotification = useCallback(() => {
    router.navigate('/notification')
  }, [router])

  return (
    <>
      <View style={styles.container}>
        <Header
          title="ケバブ記録"
          emoji="🥙"
          leftIcon="⚙️"
          onLeftIconPress={handleNavigateToSettings}
          rightIcon="🔔"
          onRightIconPress={handleNavigateToNotification}
          containerStyle={{ paddingTop: insets.top + spacing.xs }}
        />
        <ScrollView style={styles.scrollView}>
          <View style={styles.content}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>ダッシュボード</Text>
              <DashboardStats
                consecutiveDays={stats.consecutiveDays}
                totalCount={stats.totalCount}
              />
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>ケバブ情報</Text>
              <KebabTips />
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>記録</Text>
              <TouchableOpacity style={styles.recordButton} onPress={handleOpenPress}>
                <Text style={styles.recordButtonText}>記録する</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
      <BottomNavigation />

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
          <Text style={styles.recordTitle}>ケバブを記録</Text>
          <RecordForm
            onComplete={() => {
              handleClosePress()
              router.navigate('/history')
            }}
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
  content: {
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.lg,
  },
  contentContainer: {
    flex: 1,
    ...(Platform.OS === 'web' && {
      position: 'relative',
      zIndex: 9999,
    }),
  },
  handleIndicator: {
    backgroundColor: colors.text.disabled,
    height: 4,
    width: 40,
  },
  recordButton: {
    backgroundColor: colors.primary,
    borderRadius: radius.md,
    elevation: 3,
    paddingVertical: spacing.md,
    ...(Platform.OS === 'web'
      ? {
          boxShadow: '0px 2px 3.84px rgba(0, 0, 0, 0.25)',
        }
      : {
          shadowColor: colors.text.primary,
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
        }),
    alignSelf: 'center',
    width: '80%',
  },
  recordButtonText: {
    ...typography.button.medium,
    color: colors.background,
    textAlign: 'center',
  },
  recordTitle: {
    ...typography.heading.h2,
    marginVertical: spacing.md,
    textAlign: 'center',
  },
  scrollView: {
    backgroundColor: colors.background,
    flex: 1,
  },
  section: {
    marginBottom: -spacing.lg,
    width: '100%',
  },
  sectionTitle: {
    color: colors.text.secondary,
    fontSize: 18,
    fontWeight: '600',
    marginBottom: spacing.md,
  },
})
