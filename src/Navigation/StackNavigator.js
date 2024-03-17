import React from 'react';
import SignUp from '../../src/Screen/SignUp';
import LoginScreen from '../../src/Screen/LoginScreen';
import LoginVisiterPassword from '../../src/Screen/LoginVisiterPassword';
import OtpScreen from '../../src/Screen/OtpScreen';
import KycVerificationPanCard from '../../src/Screen/KycVerificationPanCard';
import KycVerificationAdhar from '../../src/Screen/KycVerificationAdhar';
import SuccessDocumentScreen from '../../src/Screen/SuccessDocumentScreen';
import HomeScreenRegister from '../../src/Screen/HomeScreenRegister';

// Navigation
import {createStackNavigator} from '@react-navigation/stack';
import LoginSubscriberScreen from '../Screen/LoginSubscriberScreen';
import HomeScreenSubscriber from '../Screen/HomeScreenSubscriber';
import ResetPasswordScreen from '../Screen/ResetPasswordScreen';
import SubscriptionsScreen from '../Screen/SubscriberPlans';
import ForgetPasswordIdScreen from '../Screen/ForgetPasswordIdScreen';
import OtpVerificationScreen from '../Screen/OtpVerificationScreen';
import ForgetPassChangeScreen from '../Screen/ForgetPassChangeScreen';
import MyprofileScreen from '../Screen/MyprofileScreen';
import SplashScreen from './SplashScreen';
import SuccessScreen from '../Screen/SuccessScreen';

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="">
      <Stack.Screen
        name="SplashScreen"
        component={SplashScreen}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="LoginVisiterPassword"
        component={LoginVisiterPassword}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="OtpScreen"
        component={OtpScreen}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="KycVerificationPanCard"
        component={KycVerificationPanCard}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="KycVerificationAdhar"
        component={KycVerificationAdhar}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="SuccessDocumentScreen"
        component={SuccessDocumentScreen}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="HomeScreenRegister"
        component={HomeScreenRegister}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="HomeScreenSubscriber"
        component={HomeScreenSubscriber}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="LoginSubscriberScreen"
        component={LoginSubscriberScreen}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="ResetPasswordScreen"
        component={ResetPasswordScreen}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="SubscriptionsScreen"
        component={SubscriptionsScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ForgetPasswordIdScreen"
        component={ForgetPasswordIdScreen}
        options={{headerShown: false}}
        ForgetPasswordIdScreen
      />
      <Stack.Screen
        name="OtpVerificationScreen"
        component={OtpVerificationScreen}
        options={{headerShown: false}}
        ForgetPasswordIdScreen
      />
      <Stack.Screen
        name="ForgetPassChangeScreen"
        component={ForgetPassChangeScreen}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="MyprofileScreen"
        component={MyprofileScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SuccessScreen"
        component={SuccessScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;
