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
  mode?: 'create' | 'edit'
  recordId?: string
  initialValues?: {
    kebabType: KebabType
    meatType: MeatType
    sauceType: SauceType
    size: Size
  }
  onComplete?: () => void
}

export const RecordForm: React.FC<RecordFormProps> = ({
  mode = 'create',
  recordId,
  initialValues,
  onComplete,
}) => {
  const { addRecord, updateRecord } = useKebabRecords()
  const [kebabType, setKebabType] = useState<KebabType | ''>(mode === 'edit' && initialValues ? initialValues.kebabType : '')
  const [meatType, setMeatType] = useState<MeatType | ''>(mode === 'edit' && initialValues ? initialValues.meatType : '')
  const [sauceType, setSauceType] = useState<SauceType | ''>(mode === 'edit' && initialValues ? initialValues.sauceType : '')
  const [size, setSize] = useState<Size | ''>(mode === 'edit' && initialValues ? initialValues.size : '')

  const handleSubmit = async () => {
    if (!kebabType || !meatType || !sauceType || !size) {
      Alert.alert('エラー', '全ての項目を選択してください')
      return
    }

    const input = {
      kebabType,
      meatType,
      sauceType,
      size,
    }

    const result = mode === 'create'
      ? await addRecord(input)
      : await updateRecord(recordId!, input)

    if (result.success) {
      Alert.alert('成功', mode === 'create' ? 'ケバブの記録を保存しました！' : 'ケバブの記録を更新しました！')
      if (mode === 'create') {
        setKebabType('')
        setMeatType('')
        setSauceType('')
        setSize('')
      }
      onComplete?.()
    } else {
      Alert.alert('エラー', result.error)
    }
  }

  const isFormValid = kebabType && meatType && sauceType && size
  const hasChanges = mode === 'create' || (
    initialValues && (
      kebabType !== initialValues.kebabType ||
      meatType !== initialValues.meatType ||
      sauceType !== initialValues.sauceType ||
      size !== initialValues.size
    )
  )

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
          (!isFormValid || !hasChanges) && styles.submitButtonDisabled,
        ]}
        onPress={handleSubmit}
        disabled={!isFormValid || !hasChanges}
      >
        <Text style={styles.submitButtonText}>
          {mode === 'create' ? '記録する' : '保存する'}
        </Text>
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
