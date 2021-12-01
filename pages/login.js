import { StatusBar } from 'expo-status-bar'
import React from 'react'
import {
  StyleSheet,
  Text,
  SafeAreaView,
  TextInput,
  Image,
  Alert,
  View,
} from 'react-native'

import CustomButton from '../components/button'
import logo from '../assets/logo.png'

export default function Login() {
  const [username, onChangeUsername] = React.useState('')
  const [password, onChangePassword] = React.useState('')
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logo}>
        <Image style={styles.tinyLogo} source={logo} />
        <Text style={styles.greetings}>Welcome back!</Text>
      </View>
      <TextInput
        style={styles.input}
        onChangeText={onChangeUsername}
        value={username}
        placeholder="username"
        keyboardType="number-pad"
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangePassword}
        value={password}
        placeholder="password"
        secureTextEntry={true}
      />
      <CustomButton
        title="Log in"
        onPress={() => Alert.alert(username, password)}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: '40%',
  },
  title: {
    textAlign: 'center',
    fontSize: 50,
    paddingVertical: 20,
  },
  label: {
    padding: 10,
  },
  input: {
    height: 55,
    margin: 12,
    backgroundColor: 'rgb(240, 240, 240)',
    padding: 10,
    borderRadius: 5,
  },
  logo: {
    width: '100%',
    padding: 10,
    textAlign: 'center',
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  greetings: {
    fontSize: 20,
    paddingVertical: 15,
  },
})
