import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AppNavigator from './src/Screen/AppNavigator';
import {Provider} from 'react-redux';
import {myStore} from './src/ComponentsRedux/Store';

const App = () => {
  return (
    // <NavigationContainer>
    //   <AppNavigator />
    // </NavigationContainer>
    <Provider store={myStore}>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
