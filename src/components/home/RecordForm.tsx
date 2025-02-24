import React, { useState } from 'react'
import { View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native'
import { useKebabRecords } from '../../hooks/useKebabRecords'
import { KebabType, MeatType, SauceType, Size } from '../../types/record'
import { spacing, radius } from '../../styles/spacing'
import { colors } from '../../styles/colors'
import { typography } from '../../styles/typography'
import {
  KebabTypeSelector,
  MeatTypeSelector,
  SauceTypeSelector,
  SizeSelector,
} from './selectors'

type RecordFormProps = {
  onComplete?: () => void
}

export const RecordForm: React.FC<RecordFormProps> = ({ onComplete }) => {
  const { addRecord } = useKebabRecords()
  const [kebabType, setKebabType] = useState<KebabType | ''>('')
  const [meatType, setMeatType] = useState<MeatType | ''>('')
  const [sauceType, setSauceType] = useState<SauceType | ''>('')
  const [size, setSize] = useState<Size | ''>('')

  const handleSubmit = async () => {
    if (!kebabType || !meatType || !sauceType || !size) {
      Alert.alert('エラー', '全ての項目を選択してください')
      return
    }

    const result = await addRecord({
      kebabType,
      meatType,
      sauceType,
      size,
    })

    if (result.success) {
      Alert.alert('成功', 'ケバブの記録を保存しました！')
      setKebabType('')
      setMeatType('')
      setSauceType('')
      setSize('')
      onComplete?.()
    } else {
      Alert.alert('エラー', result.error)
    }
  }

  const isFormValid = kebabType && meatType && sauceType && size

  return (
    <View style={styles.container}>
      <KebabTypeSelector
        value={kebabType}
        onSelect={setKebabType}
      />
      <MeatTypeSelector
        value={meatType}
        onSelect={setMeatType}
      />
      <SauceTypeSelector
        value={sauceType}
        onSelect={setSauceType}
      />
      <SizeSelector
        value={size}
        onSelect={setSize}
      />
      <TouchableOpacity
        style={[
          styles.submitButton,
          !isFormValid && styles.submitButtonDisabled,
        ]}
        onPress={handleSubmit}
        disabled={!isFormValid}
      >
        <Text style={styles.submitButtonText}>記録する</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
    paddingBottom: spacing.xl,
  },
  submitButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    borderRadius: radius.md,
    marginTop: spacing.md,
  },
  submitButtonDisabled: {
    backgroundColor: colors.text.disabled,
  },
  submitButtonText: {
    ...typography.button.medium,
    color: colors.background,
    textAlign: 'center',
  },
})
