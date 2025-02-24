import React from 'react'
import { View, StyleSheet, Platform, ViewStyle, DimensionValue } from 'react-native'

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
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    minHeight: '100%',
    paddingTop: Platform.select({ web: 16 }),
    paddingBottom: Platform.select({ web: 16 }),
    position: Platform.OS === 'web' ? 'relative' : undefined,
  },
  content: {
    width: Platform.OS === 'web' ? 375 : '100%',
    maxWidth: '100%',
    flex: 1,
    backgroundColor: 'white',
    alignSelf: 'center',
    overflow: Platform.OS === 'web' ? 'hidden' : undefined,
    position: Platform.OS === 'web' ? 'relative' : undefined,
  },
})
