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
