import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useRouter } from 'expo-router'

export type RootStackParamList = {
  '/': undefined
  '/history': undefined
  '/settings': undefined
  '/notification': undefined
}

export type RootStackNavigationProp = NativeStackNavigationProp<RootStackParamList>

// expo-routerのuseRouterをラップして型安全にする
export function useTypedRouter() {
  return useRouter() as unknown as {
    push: (href: keyof RootStackParamList) => void
    replace: (href: keyof RootStackParamList) => void
    back: () => void
    navigate: (href: keyof RootStackParamList) => void
  }
}
