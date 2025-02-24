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
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import BottomSheet, { BottomSheetView, BottomSheetBackdrop } from '@gorhom/bottom-sheet'
import { RootStackNavigationProp } from '../types/navigation'
import { BottomNavigation } from '../components/BottomNavigation'
import { Header } from '../components/common/Header'
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
  const navigation = useNavigation<RootStackNavigationProp>()
  const bottomSheetRef = useRef<BottomSheet>(null)
  const snapPoints = useMemo(() => ['50%', '90%'], [])

  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index)
  }, [])

  const handleOpenPress = useCallback(() => {
    if (bottomSheetRef.current) {
      bottomSheetRef.current.snapToIndex(0)
    }
  }, [])

  const handleNavigateToSettings = useCallback(() => {
    navigation.navigate('Settings')
  }, [navigation])

  const handleNavigateToNotification = useCallback(() => {
    navigation.navigate('Notification')
  }, [navigation])

  return (
    <>
      <View style={styles.container}>
        <Header
          title="ケバブ記録"
          emoji="🥙"
          rightIcon="🔔"
          onRightIconPress={handleNavigateToNotification}
          onBack={handleNavigateToSettings}
          showBack
          containerStyle={{ paddingTop: insets.top + spacing.xxl }}
        />
        <ScrollView style={styles.scrollView}>
          <View style={styles.content}>
            <DashboardStats
              consecutiveDays={stats.consecutiveDays}
              totalCount={stats.totalCount}
            />
            <KebabTips />
            <TouchableOpacity
              style={styles.recordButton}
              onPress={handleOpenPress}
            >
              <Text style={styles.recordButtonText}>記録する</Text>
            </TouchableOpacity>
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
        onChange={handleSheetChanges}
        backdropComponent={(props) => (
          <BottomSheetBackdrop
            {...props}
            disappearsOnIndex={-1}
            appearsOnIndex={0}
          />
        )}
      >
        <BottomSheetView style={styles.contentContainer}>
          <RecordForm onComplete={() => bottomSheetRef.current?.close()} />
        </BottomSheetView>
      </BottomSheet>
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
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.lg,
  },
  recordButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    borderRadius: radius.md,
    elevation: 3,
    shadowColor: colors.text.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  recordButtonText: {
    ...typography.button.medium,
    color: colors.background,
  },
  handleIndicator: {
    backgroundColor: colors.text.disabled,
    width: 40,
    height: 4,
  },
  bottomSheetBackground: {
    backgroundColor: colors.background,
  },
  contentContainer: {
    flex: 1,
  },
})
