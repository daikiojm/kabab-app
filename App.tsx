import 'react-native-gesture-handler'
import 'react-native-reanimated'
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { createStackNavigator } from '@react-navigation/stack'
import { StatusBar } from 'expo-status-bar'
import { useEffect } from 'react'
import { Platform, StyleSheet } from 'react-native'
import { WebContainer } from './src/components/common/WebContainer'
import { setNotificationHandler, initializeNotifications } from './src/services/notification'
import { HomeScreen } from './src/screens/HomeScreen'
import { HistoryScreen } from './src/screens/HistoryScreen'
import { SettingsScreen } from './src/screens/SettingsScreen'
import { NotificationScreen } from './src/screens/NotificationScreen'
import { RootStackParamList } from './src/types/navigation'

const Stack = createStackNavigator<RootStackParamList>()

export default function App() {
  const navigationRef = useNavigationContainerRef<RootStackParamList>()

  useEffect(() => {
    if (Platform.OS !== 'web') {
      // 通知の初期設定
      initializeNotifications()

      // 通知タップ時のハンドラー設定
      setNotificationHandler((response) => {
        const data = response.notification.request.content.data

        if (data?.type === 'reminder' && data?.action === 'record') {
          navigationRef.current?.navigate('Home')
        }
      })
    }
  }, [navigationRef])

  return (
    <GestureHandlerRootView style={styles.gestureHandler}>
      <WebContainer>
        <NavigationContainer
          ref={navigationRef}
          linking={{
            prefixes: ['https://daikiojm.github.io/kabab-app'],
            config: {
              screens: {
                Home: '',
                History: 'history',
                Settings: 'settings',
                Notification: 'notification',
              },
            },
            enabled: true,
            getInitialURL: () => {
              if (Platform.OS !== 'web') return undefined

              // GitHub Pages での SPA ルーティング対応
              const query = window.location.search
              if (query.startsWith('?p=')) {
                const route = decodeURIComponent(query.substr(3))
                window.history.replaceState({}, '', '/kabab-app/' + route)
                return `https://daikiojm.github.io/kabab-app/${route}`
              }

              const path = window.location.pathname
              const baseUrl = '/kabab-app'
              if (path.startsWith(baseUrl)) {
                const route = path.slice(baseUrl.length) || '/'
                return `https://daikiojm.github.io/kabab-app${route}`
              }
              return undefined
            },
          }}
        >
          <StatusBar style="auto" />
          <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
              headerShown: false,
              cardStyle: { backgroundColor: '#fff' },
            }}
          >
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{
                gestureEnabled: false,
                animation: 'none',
              }}
            />
            <Stack.Screen
              name="History"
              component={HistoryScreen}
              options={{
                gestureEnabled: false,
                animation: 'none',
              }}
            />
            <Stack.Screen name="Settings" component={SettingsScreen} />
            <Stack.Screen name="Notification" component={NotificationScreen} />
          </Stack.Navigator>
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
