import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { colors } from '../../styles/colors'
import { spacing } from '../../styles/spacing'
import { typography } from '../../styles/typography'

type EmptyStateProps = {
  title: string
  description?: string
  emoji?: string
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  emoji,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {title} {emoji}
      </Text>
      {description && (
        <Text style={styles.description}>{description}</Text>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: spacing.lg,
    alignItems: 'center',
    marginTop: spacing.xxl,
  },
  title: {
    ...typography.body.large,
    color: colors.text.secondary,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  description: {
    ...typography.body.medium,
    color: colors.text.disabled,
    textAlign: 'center',
  },
})
