import React, { useState } from 'react'
import { View, Text, StyleSheet, Switch, TouchableOpacity, Alert, SafeAreaView } from 'react-native'
import { HeaderBackButton } from '@react-navigation/elements'
import { useTypedRouter } from '../types/navigation'
import { useKebabRecords } from '../hooks/useKebabRecords'
import { useNotifications } from '../hooks/useNotifications'
import { ReminderTimeSheet } from '../components/settings/ReminderTimeSheet'
import { colors } from '../styles/colors'

export const SettingsScreen = () => {
  const router = useTypedRouter()
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
          onPress: () => {
            void (async () => {
              await clearRecords()
              Alert.alert('完了', '履歴を削除しました')
            })()
          },
        },
      ]
    )
  }

  const handleToggleNotifications = (value: boolean) => {
    void (async () => {
      const result = await toggleNotifications(value)
      if (!result.success) {
        Alert.alert('エラー', result.error)
      }
    })()
  }

  const handleToggleReminder = (value: boolean) => {
    void (async () => {
      const result = await toggleReminder(value)
      if (!result.success) {
        Alert.alert('エラー', result.error)
      }
    })()
  }

  const [isTimeSheetVisible, setIsTimeSheetVisible] = useState(false)

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <HeaderBackButton onPress={() => router.back()} />
        <Text style={styles.title}>⚙️ 設定</Text>
      </View>
      <View style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>通知</Text>
          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>通知を有効にする</Text>
            <Switch value={notificationsEnabled} onValueChange={handleToggleNotifications} />
          </View>

          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>毎日のケバブ記録リマインダー</Text>
            <Switch
              value={reminder.enabled}
              onValueChange={handleToggleReminder}
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
        onSubmit={(time) => {
          void updateReminderTime(time)
        }}
        initialTime={reminder.time}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  dangerButton: {
    alignItems: 'center',
    backgroundColor: colors.background,
    borderColor: colors.error,
    borderRadius: 8,
    borderWidth: 1,
    padding: 15,
  },
  dangerButtonText: {
    color: colors.error,
    fontSize: 16,
    fontWeight: '600',
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingTop: 8,
  },
  infoItem: {
    alignItems: 'center',
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  infoLabel: {
    color: colors.text.secondary,
    fontSize: 16,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '500',
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    color: colors.text.secondary,
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
  },
  settingItem: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  settingLabel: {
    fontSize: 16,
  },
  timeSettingButton: {
    backgroundColor: colors.surface,
    borderRadius: 8,
    marginTop: 8,
    padding: 16,
  },
  timeSettingHint: {
    color: colors.text.secondary,
    fontSize: 12,
  },
  timeSettingLabel: {
    fontSize: 16,
    marginBottom: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 8,
  },
})
