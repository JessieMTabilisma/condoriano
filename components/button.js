import React from 'react'
import { Text, View, StyleSheet, Pressable } from 'react-native'

export default function Button(props) {
  const { onPress, title } = props
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    paddingHorizontal: 30,
    elevation: 3,
    backgroundColor: 'blue',
    margin: 12,
    height: 55,
    borderRadius: 5,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
})
