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
import React, { useCallback, useMemo, useRef, useState } from 'react'
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Platform } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import BottomSheet, { BottomSheetView, BottomSheetBackdrop } from '@gorhom/bottom-sheet'
import { RootStackNavigationProp } from '../types/navigation'
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
  const { stats, loadRecords } = useKebabRecords()
  const insets = useSafeAreaInsets()
  const navigation = useNavigation<RootStackNavigationProp>()
  const bottomSheetRef = useRef<BottomSheet>(null)
  const snapPoints = useMemo(() => ['65%', '90%'], [])
  const [isWebModalVisible, setIsWebModalVisible] = useState(false)

  const handleSheetChanges = useCallback((index: number) => {
    if (Platform.OS === 'web') {
      setIsWebModalVisible(index !== -1)
    }
  }, [])

  const handleOpenPress = useCallback(() => {
    if (Platform.OS === 'web') {
      setIsWebModalVisible(true)
    } else if (bottomSheetRef.current) {
      bottomSheetRef.current.snapToIndex(0)
    }
  }, [])

  const handleClosePress = useCallback(() => {
    if (Platform.OS === 'web') {
      setIsWebModalVisible(false)
    } else if (bottomSheetRef.current) {
      bottomSheetRef.current.close()
    }
  }, [])

  const handleNavigateToSettings = useCallback(() => {
    navigation.navigate('Settings')
  }, [navigation])

  const handleNavigateToNotification = useCallback(() => {
    navigation.navigate('Notification')
  }, [navigation])

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        pressBehavior="close"
        enableTouchThrough={false}
      />
    ),
    []
  )

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

      {Platform.OS !== 'web' ? (
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
          backdropComponent={renderBackdrop}
          enableHandlePanningGesture
        >
          <BottomSheetView style={styles.contentContainer}>
            <RecordForm
              onComplete={() => {
                handleClosePress()
                navigation.navigate('History')
              }}
            />
          </BottomSheetView>
        </BottomSheet>
      ) : (
        <View style={[styles.webModal, !isWebModalVisible && { display: 'none' }]}>
          <View style={styles.webModalContent}>
            <RecordForm
              onComplete={() => {
                handleClosePress()
                navigation.navigate('History')
              }}
            />
          </View>
        </View>
      )}
    </>
  )
}

const styles = StyleSheet.create({
  section: {
    width: '100%',
    marginBottom: -spacing.lg,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: spacing.md,
    color: colors.text.secondary,
  },
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
    paddingVertical: spacing.md,
    borderRadius: radius.md,
    elevation: 3,
    ...(Platform.OS === 'web' ? {
      boxShadow: '0px 2px 3.84px rgba(0, 0, 0, 0.25)',
    } : {
      shadowColor: colors.text.primary,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
    }),
    width: '80%',
    alignSelf: 'center',
  },
  recordButtonText: {
    ...typography.button.medium,
    color: colors.background,
    textAlign: 'center',
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
  webModal: Platform.select({
    web: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
    },
    default: {},
  }),
  webModalContent: Platform.select({
    web: {
      backgroundColor: colors.background,
      borderRadius: radius.lg,
      padding: spacing.lg,
      width: '90%',
      maxWidth: 500,
      maxHeight: '80%',
      overflowY: 'scroll',
    },
    default: {},
  }),
})
