import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import TextAnimator from "./TextAnimator";

export default function App() {
  const _onFinish = () => {
    // alert('Animation finished');
  };

  return (
    <View style={styles.container}>
      <TextAnimator
        textContent="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        textStyle={styles.textStyle}
        duration={1000}
        onFinish={_onFinish}
        hideText
      />
      <StatusBar style="auto"/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    fontSize: 30,
    fontWeight: 'bold'
  }
});
