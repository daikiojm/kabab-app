import React, { useState } from 'react'
import { View, Text, StyleSheet, Switch, TouchableOpacity, Alert, SafeAreaView } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { HeaderBackButton } from '@react-navigation/elements'
import { RootStackNavigationProp } from '../types/navigation'

export const SettingsScreen = () => {
  const navigation = useNavigation<RootStackNavigationProp>()
  const [notificationsEnabled, setNotificationsEnabled] = useState(false)

  const handleResetHistory = () => {
    Alert.alert(
      '履歴のリセット',
      '本当にすべての履歴を削除しますか？\nこの操作は取り消せません。',
      [
        {
          text: 'キャンセル',
          style: 'cancel',
        },
        {
          text: '削除',
          style: 'destructive',
          onPress: () => {
            // TODO: 履歴削除の実装
          },
        },
      ]
    )
  }

  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <HeaderBackButton onPress={() => navigation.goBack()} />
          <Text style={styles.title}>⚙️ 設定</Text>
        </View>
        <View style={styles.content}>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>通知</Text>
            <View style={styles.settingItem}>
              <Text style={styles.settingLabel}>毎日のケバブ記録リマインダー</Text>
              <Switch value={notificationsEnabled} onValueChange={setNotificationsEnabled} />
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>データ管理</Text>
            <TouchableOpacity style={styles.dangerButton} onPress={handleResetHistory}>
              <Text style={styles.dangerButtonText}>履歴をリセット</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 8,
    paddingHorizontal: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
    color: '#666',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  settingLabel: {
    fontSize: 16,
  },
  dangerButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ff4444',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  dangerButtonText: {
    color: '#ff4444',
    fontSize: 16,
    fontWeight: '600',
  },
})
