import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const HalfScreenLayout = () => {
  return (
    <View style={styles.container}>
      <View style={styles.half}>
        <Text style={styles.text}>Left Half</Text>
      </View>
      <View style={styles.half}>
        <Text style={styles.text}>Right Half</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column', // Horizontal layout
  },
  half: {
    flex: 1, // Each half takes equal space
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightgray',
  },
  text: {
    fontSize: 20,
  },
});

export default HalfScreenLayout;
