import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { HeaderBackButton } from '@react-navigation/elements'
import { colors } from '../../styles/colors'
import { spacing } from '../../styles/spacing'
import { typography } from '../../styles/typography'

type HeaderProps = {
  title: string
  emoji?: string
  showBack?: boolean
  onBack?: () => void
  rightIcon?: string
  onRightIconPress?: () => void
}

export const Header: React.FC<HeaderProps> = ({
  title,
  emoji,
  showBack = false,
  onBack,
  rightIcon,
  onRightIconPress,
}) => {
  return (
    <View style={styles.container}>
      {showBack && <HeaderBackButton onPress={onBack} />}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>
          {emoji && `${emoji} `}{title}
        </Text>
      </View>
      {rightIcon ? (
        <TouchableOpacity
          style={styles.rightIcon}
          onPress={onRightIconPress}
        >
          <Text style={styles.iconText}>{rightIcon}</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.rightIcon} />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: spacing.sm,
    paddingHorizontal: spacing.sm,
    backgroundColor: colors.background,
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: spacing.md,
  },
  title: {
    ...typography.heading.h1,
    color: colors.text.primary,
  },
  rightIcon: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: {
    fontSize: 24,
  },
})
