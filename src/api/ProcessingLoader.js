import React from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';

const ProcessingLoader = () => (
  <View>
    <ActivityIndicator size="large" color="#fff" />
  </View>
);

export default ProcessingLoader;

const styles = StyleSheet.create({
  modalContianer: {
    flex: 1,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    // backgroundColor:''
    justifyContent: 'center',
    alignItems: 'center',
  },
});
