import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { colors } from '../../styles/colors'
import { spacing, radius } from '../../styles/spacing'
import { typography } from '../../styles/typography'

type ListItemProps = {
  title: string
  subtitle?: string
  rightText?: string
  emoji?: string
  onPress?: () => void
  highlighted?: boolean
}

export const ListItem: React.FC<ListItemProps> = ({
  title,
  subtitle,
  rightText,
  emoji,
  onPress,
  highlighted = false,
}) => {
  const Container = onPress ? TouchableOpacity : View

  return (
    <Container
      style={[
        styles.container,
        highlighted && styles.highlighted,
      ]}
      onPress={onPress}
    >
      <View style={styles.mainContent}>
        <Text style={styles.title}>
          {emoji && `${emoji} `}{title}
        </Text>
        {subtitle && (
          <Text style={styles.subtitle}>{subtitle}</Text>
        )}
      </View>
      {rightText && (
        <Text style={styles.rightText}>{rightText}</Text>
      )}
    </Container>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    marginBottom: spacing.sm,
  },
  highlighted: {
    backgroundColor: colors.notification.unread,
  },
  mainContent: {
    flex: 1,
  },
  title: {
    ...typography.body.large,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  subtitle: {
    ...typography.body.small,
    color: colors.text.secondary,
  },
  rightText: {
    ...typography.body.small,
    color: colors.text.secondary,
    marginLeft: spacing.sm,
  },
})
