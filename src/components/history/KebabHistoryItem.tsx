import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { colors } from '../../styles/colors'
import { spacing, radius } from '../../styles/spacing'
import { typography } from '../../styles/typography'
import { KebabRecord } from '../../types/record'
import { formatDate, formatTime } from '../../utils/date'
import {
  getKebabTypeLabel,
  getMeatTypeLabel,
  getSauceTypeLabel,
  getSizeLabel,
  getKebabEmoji,
} from '../../constants/kebabOptions'

type KebabHistoryItemProps = {
  record: KebabRecord
  onPress?: (record: KebabRecord) => void
}

export const KebabHistoryItem: React.FC<KebabHistoryItemProps> = ({ record, onPress }) => {
  const handlePress = () => {
    onPress?.(record)
  }

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress} activeOpacity={0.7}>
      <Text style={styles.date}>{formatDate(record.createdAt)}</Text>
      <View style={styles.kebabInfoContainer}>
        <Text style={styles.kebabInfo}>
          {getKebabEmoji(record.kebabType)} {getKebabTypeLabel(record.kebabType)}
        </Text>
        <Text style={styles.kebabDetail}>
          {getMeatTypeLabel(record.meatType)} • {getSauceTypeLabel(record.sauceType)} •{' '}
          {getSizeLabel(record.size)}
        </Text>
      </View>
      <Text style={styles.time}>{formatTime(record.createdAt)}</Text>
    </TouchableOpacity>
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
  date: {
    ...typography.body.large,
    marginRight: spacing.sm,
  },
  kebabInfoContainer: {
    flex: 1,
    marginHorizontal: spacing.sm,
  },
  kebabInfo: {
    ...typography.body.large,
    marginBottom: spacing.xs,
  },
  kebabDetail: {
    ...typography.body.small,
    color: colors.text.secondary,
  },
  time: {
    ...typography.body.small,
    color: colors.text.secondary,
  },
})
