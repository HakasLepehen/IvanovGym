import React from 'react'
import { StyleSheet } from 'react-native'

export const Container = ({ children }) => {
  return (
    <div style={styles.container}>{ children }</div>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: '0 1em',
    backgroundColor: 'red',
    width: '100%'
  }
})
