import React from 'react'
import { View, TouchableOpacity, Text, StyleSheet, Platform } from 'react-native'
import { usePathname } from 'expo-router'
import { useTypedRouter } from '../types/navigation'

export const BottomNavigation = () => {
  const router = useTypedRouter()
  const pathname = usePathname()

  const isActive = (path: string) => pathname === path

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.tab} onPress={() => router.navigate('/')}>
        <Text style={[styles.icon, isActive('/') && styles.activeIcon]}>🥙</Text>
        <Text style={[styles.label, isActive('/') && styles.activeLabel]}>記録</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.tab} onPress={() => router.navigate('/history')}>
        <Text style={[styles.icon, isActive('/history') && styles.activeIcon]}>📅</Text>
        <Text style={[styles.label, isActive('/history') && styles.activeLabel]}>履歴</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  activeIcon: {
    opacity: 1,
  },
  activeLabel: {
    color: '#000',
    fontWeight: '600',
  },
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderTopColor: '#f0f0f0',
    borderTopWidth: 1,
    flexDirection: 'row',
    height: 80,
    justifyContent: 'space-around',
    paddingBottom: Platform.OS === 'ios' ? 20 : 0,
  },
  icon: {
    fontSize: 24,
    marginBottom: 4,
    opacity: 0.5,
  },
  label: {
    color: '#666',
    fontSize: 12,
  },
  tab: {
    alignItems: 'center',
    flex: 1,
  },
})
