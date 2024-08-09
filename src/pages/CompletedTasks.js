import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';

const CompletedTasks = () => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/pexels-photo-5717455.jpeg')}
        style={styles.background}
      >
        <View style={styles.overlay}>
          <Text style={styles.text}>Completed Tasks</Text>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    resizeMode: 'cover', 
    justifyContent: 'center',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
  },
  text: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default CompletedTasks;
