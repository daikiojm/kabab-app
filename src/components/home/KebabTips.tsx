import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Card, CardDescription } from '../common/Card'
import { spacing } from '../../styles/spacing'

// TODO: 後で豆知識のデータを外部ファイルに移動
const KEBAB_TIP = 'ケバブの「ケバブ」はトルコ語で「焼き肉」を意味します'

type KebabTipsProps = {
  tip?: string
}

export const KebabTips: React.FC<KebabTipsProps> = ({
  tip = KEBAB_TIP,
}) => {
  return (
    <View style={styles.container}>
      <Card
        title="ケバブ豆知識"
        emoji="💡"
      >
        <CardDescription text={tip} />
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
