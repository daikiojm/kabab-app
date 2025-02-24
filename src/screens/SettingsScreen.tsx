import React, { useRef, useState } from 'react'
import { View, Text, StyleSheet, Switch, TouchableOpacity, Alert, SafeAreaView } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { HeaderBackButton } from '@react-navigation/elements'
import { RootStackNavigationProp } from '../types/navigation'
import { useKebabRecords } from '../hooks/useKebabRecords'
import { useNotifications } from '../hooks/useNotifications'
import { ReminderTimeSheet } from '../components/settings/ReminderTimeSheet'

export const SettingsScreen = () => {
  const navigation = useNavigation<RootStackNavigationProp>()
  const { clearRecords } = useKebabRecords()
  const {
    enabled: notificationsEnabled,
    reminder,
    toggleNotifications,
    toggleReminder,
    updateReminderTime,
  } = useNotifications()

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
          onPress: async () => {
            await clearRecords()
            Alert.alert('完了', '履歴を削除しました')
          },
        },
      ]
    )
  }

  const [isTimeSheetVisible, setIsTimeSheetVisible] = useState(false)

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <HeaderBackButton onPress={() => navigation.goBack()} />
        <Text style={styles.title}>⚙️ 設定</Text>
      </View>
      <View style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>通知</Text>
          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>通知を有効にする</Text>
            <Switch
              value={notificationsEnabled}
              onValueChange={(value) => toggleNotifications(value)}
            />
          </View>

          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>毎日のケバブ記録リマインダー</Text>
            <Switch
              value={reminder.enabled}
              onValueChange={(value) => toggleReminder(value)}
              disabled={!notificationsEnabled}
            />
          </View>

          {notificationsEnabled && reminder.enabled && (
            <TouchableOpacity
              style={styles.timeSettingButton}
              onPress={() => setIsTimeSheetVisible(true)}
            >
              <Text style={styles.timeSettingLabel}>リマインド時刻: {reminder.time}</Text>
              <Text style={styles.timeSettingHint}>タップして変更</Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>データ管理</Text>
          <TouchableOpacity style={styles.dangerButton} onPress={handleResetHistory}>
            <Text style={styles.dangerButtonText}>履歴をリセット</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>アプリ情報</Text>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>アプリ名</Text>
            <Text style={styles.infoValue}>kabab-app</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>バージョン</Text>
            <Text style={styles.infoValue}>1.0.0</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>フレームワーク</Text>
            <Text style={styles.infoValue}>React Native (Expo)</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Node.js</Text>
            <Text style={styles.infoValue}>v22.14.0</Text>
          </View>
        </View>
      </View>
      <ReminderTimeSheet
        isVisible={isTimeSheetVisible}
        onClose={() => setIsTimeSheetVisible(false)}
        onSubmit={updateReminderTime}
        initialTime={reminder.time}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  timeSettingButton: {
    backgroundColor: '#f8f8f8',
    padding: 16,
    borderRadius: 8,
    marginTop: 8,
  },
  timeSettingLabel: {
    fontSize: 16,
    marginBottom: 4,
  },
  timeSettingHint: {
    fontSize: 12,
    color: '#666',
  },
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
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  infoLabel: {
    fontSize: 16,
    color: '#666',
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '500',
  },
})
