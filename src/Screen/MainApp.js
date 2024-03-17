import React from 'react';
import AppNavigator from './AppNavigator';
import {NavigationContainer} from '@react-navigation/native';

const MainApp = () => {
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
};

export default MainApp;
