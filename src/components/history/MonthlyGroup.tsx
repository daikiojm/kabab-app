import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { colors } from '../../styles/colors'
import { spacing } from '../../styles/spacing'
import { typography } from '../../styles/typography'
import { KebabRecord } from '../../types/record'
import { KebabHistoryItem } from './KebabHistoryItem'

type MonthlyGroupProps = {
  month: string
  records: KebabRecord[]
}

export const MonthlyGroup: React.FC<MonthlyGroupProps> = ({
  month,
  records,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.monthTitle}>{month}</Text>
      {records.map((record) => (
        <KebabHistoryItem
          key={record.id}
          record={record}
        />
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.lg,
    paddingHorizontal: spacing.lg,
  },
  monthTitle: {
    ...typography.heading.h3,
    color: colors.text.secondary,
    marginBottom: spacing.sm,
  },
})
