import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

type Option = {
  label: string
  value: string
}

type SelectionProps = {
  title: string
  options: Option[]
  value: string
  onSelect: (value: string) => void
}

const Selection: React.FC<SelectionProps> = ({ title, options, value, onSelect }) => {
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

export const RecordForm = () => {
  const [kebabType, setKebabType] = useState('')
  const [meatType, setMeatType] = useState('')
  const [sauceType, setSauceType] = useState('')
  const [size, setSize] = useState('')

  const kebabTypes: Option[] = [
    { label: 'ケバブ', value: 'kebab' },
    { label: 'ケバブ丼', value: 'kebab-bowl' },
  ]

  const meatTypes: Option[] = [
    { label: 'チキン', value: 'chicken' },
    { label: 'ビーフ', value: 'beef' },
    { label: 'ミックス', value: 'mix' },
  ]

  const sauceTypes: Option[] = [
    { label: 'マイルド', value: 'mild' },
    { label: 'ホット', value: 'hot' },
    { label: 'ミックス', value: 'mix' },
  ]

  const sizes: Option[] = [
    { label: '普通', value: 'regular' },
    { label: '大盛り', value: 'large' },
  ]

  const handleSubmit = () => {
    // TODO: 記録の保存処理
    console.log({
      kebabType,
      meatType,
      sauceType,
      size,
    })
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ケバブを記録</Text>
      <Selection
        title="ケバブの種類"
        options={kebabTypes}
        value={kebabType}
        onSelect={setKebabType}
      />
      <Selection
        title="肉の種類"
        options={meatTypes}
        value={meatType}
        onSelect={setMeatType}
      />
      <Selection
        title="ソースの種類"
        options={sauceTypes}
        value={sauceType}
        onSelect={setSauceType}
      />
      <Selection
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
