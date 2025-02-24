import { useState, useEffect, useCallback, useContext } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { KebabRecord, KebabRecordInput } from '../types/record'
import { useNotifications } from './useNotifications'
import { kebabRecordSchema } from '../schemas/record'

const STORAGE_KEY = '@kebab_records'

export interface KebabStats {
  consecutiveDays: number
  totalCount: number
}

export const useKebabRecords = () => {
  const { addNotification } = useNotifications()
  const [records, setRecords] = useState<KebabRecord[]>([])
  const [stats, setStats] = useState<KebabStats>({
    consecutiveDays: 0,
    totalCount: 0,
  })

  const loadRecords = useCallback(async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(STORAGE_KEY)
      if (jsonValue != null) {
        const loadedRecords = JSON.parse(jsonValue) as KebabRecord[]
        setRecords(loadedRecords)
        calculateStats(loadedRecords)
      }
    } catch (e) {
      console.error('Error loading records:', e)
    }
  }, [])

  const calculateStats = useCallback((records: KebabRecord[]) => {
    // 合計数の計算
    const totalCount = records.length

    // 連続日数の計算
    const sortedDates = [...new Set(
      records.map(r => r.createdAt.split('T')[0])
    )].sort((a, b) => new Date(b).getTime() - new Date(a).getTime())

    let consecutiveDays = 0
    const today = new Date().toISOString().split('T')[0]
    let currentDate = new Date(today)

    for (const date of sortedDates) {
      const recordDate = new Date(date)
      const diffDays = Math.floor(
        (currentDate.getTime() - recordDate.getTime()) / (1000 * 60 * 60 * 24)
      )

      if (diffDays <= 1) {
        consecutiveDays++
        currentDate = recordDate
      } else {
        break
      }
    }

    setStats({
      consecutiveDays,
      totalCount,
    })
  }, [])

  const addRecord = useCallback(async (input: KebabRecordInput) => {
    try {
      // バリデーション
      kebabRecordSchema.parse(input)

      const newRecord: KebabRecord = {
        id: Date.now().toString(),
        ...input,
        createdAt: new Date().toISOString(),
      }

      const updatedRecords = [...records, newRecord]
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedRecords))
      setRecords(updatedRecords)
      calculateStats(updatedRecords)

      // 通知を作成
      await addNotification({
        type: 'record',
        title: '新規記録',
        message: `${input.kebabType === 'kebab' ? 'ケバブ' : 'ケバブ丼'}を記録しました！`,
      })

      return { success: true as const }
    } catch (error) {
      console.error('Error adding record:', error)
      return {
        success: false as const,
        error: error instanceof Error ? error.message : '不明なエラーが発生しました',
      }
    }
  }, [records, calculateStats])

  const updateRecord = useCallback(async (id: string, input: KebabRecordInput) => {
    try {
      // バリデーション
      kebabRecordSchema.parse(input)

      const recordIndex = records.findIndex(r => r.id === id)
      if (recordIndex === -1) {
        return {
          success: false as const,
          error: '指定されたレコードが見つかりませんでした',
        }
      }

      const updatedRecord: KebabRecord = {
        ...records[recordIndex],
        ...input,
      }

      const updatedRecords = [...records]
      updatedRecords[recordIndex] = updatedRecord
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedRecords))
      setRecords(updatedRecords)
      calculateStats(updatedRecords)

      // 通知を作成
      await addNotification({
        type: 'record',
        title: '記録を更新',
        message: `${input.kebabType === 'kebab' ? 'ケバブ' : 'ケバブ丼'}の記録を更新しました！`,
      })

      return { success: true as const }
    } catch (error) {
      console.error('Error updating record:', error)
      return {
        success: false as const,
        error: error instanceof Error ? error.message : '不明なエラーが発生しました',
      }
    }
  }, [records, calculateStats, addNotification])

  const clearRecords = useCallback(async () => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY)
      setRecords([])
      setStats({
        consecutiveDays: 0,
        totalCount: 0,
      })
    } catch (e) {
      console.error('Error clearing records:', e)
    }
  }, [])

  useEffect(() => {
    loadRecords()
  }, [loadRecords])

  return {
    records,
    stats,
    addRecord,
    clearRecords,
    loadRecords,
    updateRecord,
  }
}
