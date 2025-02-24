import React from 'react'
import { View, StyleSheet, Platform, ViewStyle } from 'react-native'
import { colors } from '../../styles/colors'

type Props = {
  children: React.ReactNode
}

export const WebContainer: React.FC<Props> = ({ children }) => {
  if (Platform.OS !== 'web') {
    return <>{children}</>
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>{children}</View>
    </View>
  )
}

const styles = StyleSheet.create<{
  container: ViewStyle
  content: ViewStyle
}>({
  container: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    flex: 1,
    minHeight: '100%',
    paddingBottom: Platform.select({ web: 16 }),
    paddingTop: Platform.select({ web: 16 }),
    position: Platform.OS === 'web' ? 'relative' : undefined,
  },
  content: {
    alignSelf: 'center',
    backgroundColor: colors.background,
    flex: 1,
    maxWidth: '100%',
    overflow: Platform.OS === 'web' ? 'hidden' : undefined,
    position: Platform.OS === 'web' ? 'relative' : undefined,
    width: Platform.OS === 'web' ? 375 : '100%',
  },
})
