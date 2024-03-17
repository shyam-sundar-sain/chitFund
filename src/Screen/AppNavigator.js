import React from 'react';
import StackNavigator from '../Navigation/StackNavigator';
import DrawerNavigator from '../Navigation/DrawerNavigator';

import {createStackNavigator} from '@react-navigation/stack';
import StackNavigatorLoggedOut from '../Navigation/StackNavigatorLoggedOut';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="loggedOut">
      <Stack.Screen
        name="loggedIn"
        component={DrawerNavigator}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="loggedOut"
        component={StackNavigator}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="logged_Out"
        component={StackNavigatorLoggedOut}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
