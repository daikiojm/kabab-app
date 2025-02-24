import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { colors } from '../../styles/colors'
import { spacing } from '../../styles/spacing'
import { radius } from '../../styles/spacing'
import { typography } from '../../styles/typography'

type CardProps = {
  title: string
  emoji?: string
  children: React.ReactNode
}

export const Card: React.FC<CardProps> = ({ title, emoji, children }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {emoji && `${emoji} `}
        {title}
      </Text>
      <View style={styles.content}>{children}</View>
    </View>
  )
}

export const CardValue: React.FC<{
  value: string | number
  highlight?: boolean
}> = ({ value, highlight }) => (
  <Text style={[styles.value, highlight && styles.highlightValue]}>{value}</Text>
)

export const CardDescription: React.FC<{
  text: string
}> = ({ text }) => <Text style={styles.description}>{text}</Text>

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    borderRadius: radius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
    elevation: 2,
    shadowColor: colors.text.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
  },
  title: {
    ...typography.heading.h3,
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  content: {
    alignItems: 'flex-start',
  },
  value: {
    ...typography.heading.h2,
    color: colors.text.primary,
  },
  highlightValue: {
    color: colors.primary,
  },
  description: {
    ...typography.body.medium,
    color: colors.text.secondary,
    lineHeight: 20,
  },
})
