import React, { useCallback, useMemo, useState, useRef, useEffect } from 'react'
import { View, Text, StyleSheet, Platform } from 'react-native'
import BottomSheet, { BottomSheetView, BottomSheetBackdrop } from '@gorhom/bottom-sheet'
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker'
import { Button } from '@rneui/themed'
import { reminderTimeSchema } from '../../schemas/reminder'
import { colors } from '../../styles/colors'

interface ReminderTimeSheetProps {
  isVisible: boolean
  onClose: () => void
  onSubmit: (time: string) => void
  initialTime?: string
}

export const ReminderTimeSheet: React.FC<ReminderTimeSheetProps> = ({
  isVisible,
  onClose,
  onSubmit,
  initialTime = '21:00',
}) => {
  const [selectedTime, setSelectedTime] = useState(() => {
    const [hours, minutes] = initialTime.split(':').map(Number)
    const date = new Date()
    date.setHours(hours)
    date.setMinutes(minutes)
    return date
  })

  const snapPoints = useMemo(() => ['65%'], [])

  const handleTimeChange = useCallback((_: DateTimePickerEvent, date?: Date) => {
    if (date) {
      setSelectedTime(date)
    }
  }, [])

  const handleSubmit = useCallback(() => {
    const timeString = `${selectedTime.getHours().toString().padStart(2, '0')}:${selectedTime
      .getMinutes()
      .toString()
      .padStart(2, '0')}`

    try {
      reminderTimeSchema.parse({ time: timeString })
      onSubmit(timeString)
      onClose()
    } catch (error) {
      console.error('Invalid time format:', error)
    }
  }, [selectedTime, onSubmit, onClose])

  const bottomSheetRef = useRef<BottomSheet>(null)

  useEffect(() => {
    if (isVisible && bottomSheetRef.current) {
      bottomSheetRef.current.snapToIndex(0)
    } else if (!isVisible && bottomSheetRef.current) {
      bottomSheetRef.current.close()
    }
  }, [isVisible])

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      snapPoints={snapPoints}
      enablePanDownToClose
      enableContentPanningGesture
      enableOverDrag
      onChange={(index) => {
        if (index === -1) {
          onClose()
        }
      }}
      backdropComponent={(props) => (
        <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} />
      )}
      handleIndicatorStyle={styles.handleIndicator}
      backgroundStyle={styles.bottomSheetBackground}
    >
      <BottomSheetView style={styles.contentContainer}>
        <View style={styles.container}>
          <Text style={styles.title}>🕒 リマインド時刻の設定</Text>
          <Text style={styles.description}>毎日この時刻にケバブ記録の通知が届きます</Text>

          <View style={styles.pickerContainer}>
            <DateTimePicker
              value={selectedTime}
              mode="time"
              is24Hour={true}
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={handleTimeChange}
            />
          </View>

          <View style={styles.buttonContainer}>
            <Button
              title="キャンセル"
              type="outline"
              onPress={onClose}
              containerStyle={styles.buttonWrapper}
              buttonStyle={styles.outlineButton}
              titleStyle={{ color: colors.primary }}
            />
            <Button
              title="設定"
              onPress={handleSubmit}
              containerStyle={styles.buttonWrapper}
              buttonStyle={styles.primaryButton}
            />
          </View>
        </View>
      </BottomSheetView>
    </BottomSheet>
  )
}

const styles = StyleSheet.create({
  bottomSheetBackground: {
    backgroundColor: colors.background,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    marginTop: 24,
  },
  buttonWrapper: {
    flex: 1,
    marginHorizontal: 8,
  },
  container: {
    flex: 1,
    padding: 16,
  },
  contentContainer: {
    flex: 1,
  },
  description: {
    color: colors.text.secondary,
    fontSize: 14,
    marginBottom: 24,
  },
  handleIndicator: {
    backgroundColor: colors.text.disabled,
    height: 4,
    width: 40,
  },
  outlineButton: {
    borderColor: colors.primary,
    borderRadius: 8,
    paddingVertical: 12,
  },
  pickerContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  primaryButton: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingVertical: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
})
