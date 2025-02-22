import { NativeStackNavigationProp } from '@react-navigation/native-stack'

export type RootStackParamList = {
  Home: undefined
  History: undefined
  Settings: undefined
}

export type RootStackNavigationProp = NativeStackNavigationProp<RootStackParamList>
