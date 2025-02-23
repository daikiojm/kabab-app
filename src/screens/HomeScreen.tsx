import React, { useCallback, useMemo, useRef } from 'react'
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Platform,
  Pressable,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import BottomSheet, { BottomSheetBackdrop, BottomSheetBackdropProps } from '@gorhom/bottom-sheet'
import { RootStackNavigationProp } from '../types/navigation'
import { BottomNavigation } from '../components/BottomNavigation'
import { RecordForm } from '../components/RecordForm'

export const HomeScreen = () => {
  const navigation = useNavigation<RootStackNavigationProp>()
  const bottomSheetRef = useRef<BottomSheet>(null)
  const snapPoints = useMemo(() => ['50%', '90%'], [])

  const handleOpenPress = useCallback(() => {
    bottomSheetRef.current?.snapToIndex(0)
  }, [])

  const handleDismiss = useCallback(() => {
    bottomSheetRef.current?.close()
  }, [])

  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>🥙 ケバブ記録</Text>
          <Text style={styles.subtitle}>今日のケバブを記録しましょう</Text>
          <TouchableOpacity style={styles.recordButton} onPress={handleOpenPress}>
            <Text style={styles.recordButtonText}>記録する</Text>
          </TouchableOpacity>
        </View>
        <BottomNavigation />
      </SafeAreaView>

      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose
        handleIndicatorStyle={styles.handleIndicator}
        backgroundStyle={styles.bottomSheetBackground}
        android_keyboardInputMode="adjustResize"
        backdropComponent={useCallback(
          (props: BottomSheetBackdropProps) => (
            <BottomSheetBackdrop
              {...props}
              appearsOnIndex={0}
              disappearsOnIndex={-1}
              pressBehavior="close"
            />
          ),
          []
        )}
      >
        <View style={styles.bottomSheetContent}>
          <RecordForm />
        </View>
      </BottomSheet>
    </>
  )
}

const styles = StyleSheet.create({
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
    paddingTop: 40,
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
  bottomSheetContent: {
    flex: 1,
    paddingBottom: Platform.OS === 'ios' ? 34 : 24,
  },
})
