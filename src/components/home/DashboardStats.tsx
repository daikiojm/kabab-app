import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Card, CardValue } from '../common/Card'
import { spacing } from '../../styles/spacing'

type DashboardStatsProps = {
  consecutiveDays: number
  totalCount: number
}

export const DashboardStats: React.FC<DashboardStatsProps> = ({ consecutiveDays, totalCount }) => {
  return (
    <View style={styles.container}>
      <Card title="連続ケバブ日数" emoji="🔥">
        <CardValue value={`${consecutiveDays}日`} highlight />
      </Card>

      <Card title="累積ケバブ数" emoji="📊">
        <CardValue value={`${totalCount}個`} highlight />
      </Card>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: spacing.xl,
  },
})
