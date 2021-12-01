import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'
import Login from './pages/login'

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Login />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    flexDirection: 'column',
  },
})
