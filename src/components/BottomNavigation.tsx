import React from 'react'
import { View, TouchableOpacity, Text, StyleSheet, Platform } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import { RootStackNavigationProp } from '../types/navigation'

export const BottomNavigation = () => {
  const navigation = useNavigation<RootStackNavigationProp>()
  const route = useRoute()

  const isActive = (screenName: string) => route.name === screenName

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.tab} onPress={() => navigation.navigate('Home')}>
        <Text style={[styles.icon, isActive('Home') && styles.activeIcon]}>🥙</Text>
        <Text style={[styles.label, isActive('Home') && styles.activeLabel]}>記録</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.tab} onPress={() => navigation.navigate('History')}>
        <Text style={[styles.icon, isActive('History') && styles.activeIcon]}>📅</Text>
        <Text style={[styles.label, isActive('History') && styles.activeLabel]}>履歴</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    height: 80,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingBottom: Platform.OS === 'ios' ? 20 : 0,
  },
  tab: {
    alignItems: 'center',
    flex: 1,
  },
  icon: {
    fontSize: 24,
    marginBottom: 4,
    opacity: 0.5,
  },
  activeIcon: {
    opacity: 1,
  },
  label: {
    fontSize: 12,
    color: '#666',
  },
  activeLabel: {
    color: '#000',
    fontWeight: '600',
  },
})
