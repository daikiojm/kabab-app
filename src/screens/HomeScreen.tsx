import React, { useCallback, useMemo, useRef } from 'react'
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Platform,
  Pressable,
  ScrollView,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import BottomSheet, { BottomSheetView, BottomSheetBackdrop } from '@gorhom/bottom-sheet'
import { Card } from '@rneui/themed'
import { RootStackNavigationProp } from '../types/navigation'
import { BottomNavigation } from '../components/BottomNavigation'
import { RecordForm } from '../components/RecordForm'

export const HomeScreen = () => {
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

  return (
    <>
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.content}>
            <View style={styles.header}>
              <TouchableOpacity
                style={styles.headerIcon}
                onPress={() => navigation.navigate('Settings')}
              >
                <Text style={styles.iconText}>⚙️</Text>
              </TouchableOpacity>
              <View style={styles.titleContainer}>
                <Text style={styles.title}>🥙 ケバブ記録</Text>
                <Text style={styles.subtitle}>今日のケバブを記録しましょう</Text>
              </View>
              <TouchableOpacity
                style={styles.headerIcon}
                onPress={() => navigation.navigate('Notification')}
              >
                <Text style={styles.iconText}>🔔</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.dashboardContainer}>
              <Card containerStyle={styles.dashboardCard}>
                <View style={styles.cardContent}>
                  <Text style={styles.cardTitle}>🔥 連続ケバブ日数</Text>
                  <Text style={styles.cardValue}>7日</Text>
                </View>
              </Card>
              <Card containerStyle={styles.dashboardCard}>
                <View style={styles.cardContent}>
                  <Text style={styles.cardTitle}>📊 累積ケバブ数</Text>
                  <Text style={styles.cardValue}>42個</Text>
                </View>
              </Card>
              <Card containerStyle={styles.dashboardCard}>
                <View style={styles.cardContent}>
                  <Text style={styles.cardTitle}>💡 ケバブ豆知識</Text>
                  <Text style={styles.cardDescription}>
                    ケバブの「ケバブ」はトルコ語で「焼き肉」を意味します
                  </Text>
                </View>
              </Card>
            </View>
            <TouchableOpacity style={styles.recordButton} onPress={handleOpenPress}>
              <Text style={styles.recordButtonText}>記録する</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
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
          <RecordForm />
        </BottomSheetView>
      </BottomSheet>
    </>
  )
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#fff',
  },
  bottomSheet: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 16,
    paddingBottom: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  headerIcon: {
    padding: 8,
  },
  iconText: {
    fontSize: 24,
  },
  titleContainer: {
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: 16,
  },
  dashboardContainer: {
    width: '100%',
    paddingHorizontal: 16,
    marginBottom: 32,
  },
  dashboardCard: {
    borderRadius: 12,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    padding: 16,
  },
  cardContent: {
    alignItems: 'flex-start',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  cardValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF5722',
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 32,
  },
  recordButton: {
    backgroundColor: '#FF5722',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  recordButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  handleIndicator: {
    backgroundColor: '#999',
    width: 40,
    height: 4,
  },
  bottomSheetBackground: {
    backgroundColor: '#fff',
  },
  contentContainer: {
    flex: 1,
    padding: 24,
  },
})
