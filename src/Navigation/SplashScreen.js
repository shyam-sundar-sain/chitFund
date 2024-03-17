import React, {useEffect} from 'react';
import {View, Text, Image} from 'react-native';
import {async_keys, getData} from '../api/UserPreference';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import ic_logo from '../assets/icons/logo.png';

const SplashScreen = ({navigation}) => {
  useEffect(() => {
    const fetchDetail = async () => {
      const get_Data = await getData(async_keys.is_register);
      console.log('get_Dataww', get_Data);
      const Kyc_Verification = await getData(async_keys.KycVerification);
      console.log('Kyc_Verification  kk', Kyc_Verification);
      const login_Subscriber = await getData(async_keys.loginSubscriber);
      console.log('login_Subscriber login', login_Subscriber);
      const login_Visiter = await getData(async_keys.loginVisiter);
      console.log('login_Visiter visitor', login_Visiter);
      return {get_Data, Kyc_Verification, login_Subscriber, login_Visiter};
    };

    fetchDetail();
    setTimeout(async () => {
      const status = await fetchDetail();
      // console.log('status', status);
      if (
        status.login_Subscriber ||
        status.login_Visiter ||
        status.Kyc_Verification
      ) {
        navigation.reset({
          index: 0, // Index of the screen to reset to (first screen in the stack)
          routes: [{name: 'loggedIn'}], // Array of screens to replace the stack with
        });
      } else if (status.get_Data == 1) {
        navigation.navigate('KycVerificationAdhar');
      } else {
        navigation.navigate('logged_Out');
      }
    }, 2000);
  }, []);

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text
        style={{
          fontSize: wp(5),
          color: '#ed802d',
          fontFamily: 'Montserrat-SemiBold',
        }}>
        Chit Fund
      </Text>
      <Image source={ic_logo} style={{height: hp(30), width: wp(60)}} />
    </View>
  );
};

export default SplashScreen;
