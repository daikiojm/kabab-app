import 'react-native-gesture-handler'
import 'react-native-reanimated'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { StatusBar } from 'expo-status-bar'
import { useEffect } from 'react'
import { Platform, StyleSheet } from 'react-native'
import { WebContainer } from '../src/components/common/WebContainer'
import { setNotificationHandler, initializeNotifications } from '../src/services/notification'
import { Slot, useRouter } from 'expo-router'
import { NavigationContainer, DefaultTheme } from '@react-navigation/native'

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#FF6B6B',
    background: '#FFFFFF',
    card: '#FFFFFF',
    text: '#000000',
    border: '#E0E0E0',
    notification: '#FF6B6B',
  },
}

export default function RootLayout() {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  const router = useRouter()
  // 将来的にセグメント情報が必要になった場合はここでuseSegmentsを使用

  useEffect(() => {
    if (Platform.OS !== 'web') {
      // 通知の初期設定
      initializeNotifications()

      // 通知タップ時のハンドラー設定
      setNotificationHandler((response) => {
        const data = response.notification.request.content.data

        if (data?.type === 'reminder' && data?.action === 'record') {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
          router.replace('/')
        }
      })
    }
  }, [router])

  return (
    <GestureHandlerRootView style={styles.gestureHandler}>
      <WebContainer>
        <NavigationContainer theme={MyTheme}>
          <StatusBar style="auto" />
          <Slot />
        </NavigationContainer>
      </WebContainer>
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  gestureHandler: {
    flex: 1,
    position: Platform.OS === 'web' ? 'relative' : undefined,
  },
})
