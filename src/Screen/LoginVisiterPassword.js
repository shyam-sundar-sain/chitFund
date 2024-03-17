import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Alert,
  ActivityIndicator,
} from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// Image
import loginImage from '../assets/icon/loginImage.png';
import {async_keys, getData, storeData} from '../api/UserPreference';
import {BASE_URL} from '../api/ApiInfo';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const LoginVisiterPassword = ({navigation}) => {
  const [password, setPassword] = useState('');
  const [mob, setMob] = useState('');
  const [loader, setLoader] = useState('');

  const handlePassword = password => {
    setPassword(password);
  };

  useEffect(() => {
    const pass = async () => {
      const g = await getData(async_keys.mobile);
      setMob(g);
      console.log('g', g);
    };
    pass();
  }, []);

  // validation
  const handleLogin = async () => {
    if (password.trim() === '') {
      Alert.alert('', 'Please enter the password');
      return true;
    }

    try {
      setLoader(true);
      const params = {
        password: password,
        mobile: mob,
      };

      const formdata = new FormData();
      for (let key in params) {
        formdata.append(key, params[key]);
      }

      const info = {};
      info.method = 'POST';
      info.body = formdata;

      const response = await fetch(`${BASE_URL}visitor_login`, info);
      // console.log('response', response);
      const newResponse = await response.json();
      // console.log('newResponse', newResponse);
      const {Status, Message} = newResponse;
      if (Status === true) {
        await storeData(async_keys.loginVisiter, true);
        navigation.reset({
          index: 0, // Index of the screen to reset to (first screen in the stack)
          routes: [{name: 'loggedIn'}], // Array of screens to replace the stack with
        });
        setLoader(false);
      } else {
        setLoader(false);
        Alert.alert('', Message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (loader) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator color="green" size="large" />
      </View>
    );
  }

  return (
    <KeyboardAwareScrollView
      enableOnAndroid
      showsVerticalScrollIndicator={false}>
      <SafeAreaView style={{flex: 1, height: hp(110), backgroundColor: '#fff'}}>
        <Image
          source={loginImage}
          style={{height: hp(44), aspectRatio: 1 / 1}}
        />
        <View style={styles.homeContainer}>
          <Text style={styles.loginText}>Login</Text>

          <View style={styles.accountIdBox}>
            <Text style={styles.phoneNumberText}>Password </Text>
            <View style={styles.phoneNumberBox}>
              <TextInput
                style={styles.phoneInputText}
                placeholder="Enter your password"
                placeholderTextColor={'#808080'}
                onChangeText={handlePassword}
                value={password}
              />
            </View>
          </View>

          <TouchableOpacity
            onPress={() => navigation.navigate('OtpVerificationScreen')}>
            <Text style={styles.forgetPasswordText}>Forget password?</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
};

export default LoginVisiterPassword;
const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    marginTop: hp(-1),
    backgroundColor: '#fff',
  },

  loginText: {
    fontSize: wp(7),
    marginLeft: wp(6),
    color: '#ed802b',
    fontFamily: 'Montserrat-Bold',
    marginBottom: hp(2),
  },

  loginButton: {
    height: hp(6),
    marginHorizontal: wp(6),
    borderRadius: wp(4),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ed802b',
    marginTop: hp(28),
  },

  loginButtonText: {
    fontSize: wp(6),
    color: '#fff',
    fontFamily: 'Montserrat-Regular',
  },

  phoneNumberText: {
    fontSize: wp(4.5),
    marginLeft: wp(6),
    marginBottom: hp(1),
    fontFamily: 'Montserrat-Regular',
    color: '#000',
  },

  phoneNumberBox: {
    height: hp(7),
    borderWidth: 0.2,
    borderRadius: wp(1),
    marginHorizontal: wp(6),
  },

  phoneInputText: {
    marginLeft: wp(4),
    fontSize: wp(3.5),
    color: '#515151',
    fontFamily: 'Montserrat-Regular',
  },

  forgetPasswordText: {
    fontSize: wp(4),
    color: '#ed802b',
    fontFamily: 'Montserrat-Bold',
    alignSelf: 'flex-end',
    marginTop: hp(1),
    borderBottomWidth: 1.5,
    borderColor: '#ed802b',
    marginRight: wp(6),
  },
});
