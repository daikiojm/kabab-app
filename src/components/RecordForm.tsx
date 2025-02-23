import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import { useKebabRecords } from '../hooks/useKebabRecords'
import { KebabType, MeatType, SauceType, Size } from '../types/record'

type Option<T> = {
  label: string
  value: T
}

type SelectionProps<T> = {
  title: string
  options: Option<T>[]
  value: T | ''
  onSelect: (value: T) => void
}

const Selection = <T extends string>({ title, options, value, onSelect }: SelectionProps<T>) => {
  return (
    <View style={styles.selectionContainer}>
      <Text style={styles.selectionTitle}>{title}</Text>
      <View style={styles.optionsContainer}>
        {options.map((option) => (
          <TouchableOpacity
            key={option.value}
            style={[
              styles.optionButton,
              value === option.value && styles.optionButtonSelected,
            ]}
            onPress={() => onSelect(option.value)}
          >
            <Text
              style={[
                styles.optionText,
                value === option.value && styles.optionTextSelected,
              ]}
            >
              {option.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  )
}

type RecordFormProps = {
  onComplete?: () => void
}

export const RecordForm: React.FC<RecordFormProps> = ({ onComplete }) => {
  const { addRecord } = useKebabRecords()
  const [kebabType, setKebabType] = useState<KebabType | ''>('')
  const [meatType, setMeatType] = useState<MeatType | ''>('')
  const [sauceType, setSauceType] = useState<SauceType | ''>('')
  const [size, setSize] = useState<Size | ''>('')

  const kebabTypes: Option<KebabType>[] = [
    { label: 'ケバブ', value: 'kebab' },
    { label: 'ケバブ丼', value: 'kebab-bowl' },
  ]

  const meatTypes: Option<MeatType>[] = [
    { label: 'チキン', value: 'chicken' },
    { label: 'ビーフ', value: 'beef' },
    { label: 'ミックス', value: 'mix' },
  ]

  const sauceTypes: Option<SauceType>[] = [
    { label: 'マイルド', value: 'mild' },
    { label: 'ホット', value: 'hot' },
    { label: 'ミックス', value: 'mix' },
  ]

  const sizes: Option<Size>[] = [
    { label: '普通', value: 'regular' },
    { label: '大盛り', value: 'large' },
  ]

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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ケバブを記録</Text>
      <Selection<KebabType>
        title="ケバブの種類"
        options={kebabTypes}
        value={kebabType}
        onSelect={setKebabType}
      />
      <Selection<MeatType>
        title="肉の種類"
        options={meatTypes}
        value={meatType}
        onSelect={setMeatType}
      />
      <Selection<SauceType>
        title="ソースの種類"
        options={sauceTypes}
        value={sauceType}
        onSelect={setSauceType}
      />
      <Selection<Size>
        title="量"
        options={sizes}
        value={size}
        onSelect={setSize}
      />
      <TouchableOpacity
        style={[
          styles.submitButton,
          !(kebabType && meatType && sauceType && size) && styles.submitButtonDisabled,
        ]}
        onPress={handleSubmit}
        disabled={!(kebabType && meatType && sauceType && size)}
      >
        <Text style={styles.submitButtonText}>記録する</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  selectionContainer: {
    marginBottom: 24,
  },
  selectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  optionButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
  optionButtonSelected: {
    backgroundColor: '#FF5722',
    borderColor: '#FF5722',
  },
  optionText: {
    color: '#666',
  },
  optionTextSelected: {
    color: '#fff',
  },
  submitButton: {
    backgroundColor: '#FF5722',
    paddingVertical: 16,
    borderRadius: 8,
    marginTop: 16,
  },
  submitButtonDisabled: {
    backgroundColor: '#ddd',
  },
  submitButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
})
