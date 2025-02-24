import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { colors } from '../../styles/colors'
import { spacing, radius } from '../../styles/spacing'
import { typography } from '../../styles/typography'

type Option<T> = {
  label: string
  value: T
  emoji?: string
}

type SelectorProps<T> = {
  title: string
  options: Option<T>[]
  value: T | ''
  onSelect: (value: T) => void
}

export const Selector = <T extends string>({
  title,
  options,
  value,
  onSelect,
}: SelectorProps<T>) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.optionsContainer}>
        {options.map((option) => (
          <TouchableOpacity
            key={option.value}
            style={[styles.optionButton, value === option.value && styles.optionButtonSelected]}
            onPress={() => onSelect(option.value)}
          >
            <Text style={[styles.optionText, value === option.value && styles.optionTextSelected]}>
              {option.emoji && `${option.emoji} `}
              {option.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.lg,
  },
  optionButton: {
    backgroundColor: colors.background,
    borderColor: colors.border,
    borderRadius: radius.round,
    borderWidth: 1,
    minWidth: 80,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  optionButtonSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  optionText: {
    ...typography.body.medium,
    color: colors.text.secondary,
    textAlign: 'center',
  },
  optionTextSelected: {
    color: colors.background,
    fontWeight: '600',
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  title: {
    ...typography.body.large,
    color: colors.text.primary,
    fontWeight: '600',
    marginBottom: spacing.sm,
  },
})
