import React, {isValidElement, useState} from 'react';
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

import {BASE_URL} from '../api/ApiInfo';
import {async_keys, storeData} from '../api/UserPreference';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const LoginScreen = ({navigation}) => {
  const [phomeNumber, setPhoneNumber] = useState('');
  const handlePhoneNumber = number => {
    setPhoneNumber(number.replace(/[^0-9]/g, ''));
  };

  const [loader, setLoader] = useState(false);

  // validation
  const handleLogin = async () => {
    if (phomeNumber.trim() === '') {
      Alert.alert('', 'Please enter your mobile number');
      return true;
    }

    if (phomeNumber.length < 10) {
      Alert.alert('', 'Please enter valid phone number');
      return true;
    }

    try {
      setLoader(true);
      const params = {
        mobile: phomeNumber,
      };

      const formdata = new FormData();
      for (let key in params) {
        formdata.append(key, params[key]);
      }

      var info = {};
      info.method = 'POST';
      info.body = formdata;

      const response = await fetch(`${BASE_URL}check_mobile`, info);
      console.log(response, 'yuuuuuuuuuuuuuuuu');

      if (response) {
        const newResponse = await response.json();
        console.log('newResponse checkMObnmmmmmmmmmmmm', newResponse);
        const {Status, Data} = newResponse;

        if (Status === true) {
          await storeData(async_keys.mobile, Data.mobile);
          await storeData(async_keys.type, Data.type);

          if (Data.is_register === true && Data.type === 'visitor') {
            console.log('Data.id 12', Data.id);
            await storeData(async_keys.visitor_id, Data.id);
            await storeData(async_keys.visitor, Data.type);
            navigation.navigate('LoginVisiterPassword');
            setLoader(false);
          } else if (Data.is_register === true && Data.type === 'subscriber') {
            const subIdArray = [];

            Data.subscriber_id.forEach(element => {
              const subId = element.sub_id;
              subIdArray.push(subId);
            });

            await storeData(async_keys.sub_id, subIdArray);
            navigation.navigate('LoginSubscriberScreen');
            setLoader(false);
          } else {
            navigation.navigate('OtpScreen');
            setLoader(false);
          }
        }
      }
    } catch (error) {
      console.log(error.message);
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
    <KeyboardAwareScrollView enableOnAndroid>
      <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
        <Image
          source={loginImage}
          style={{height: hp(44), aspectRatio: 1 / 1}}
        />
        <View style={styles.homeContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate('HomeScreenImmer')}>
            <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity>
          <Text style={styles.phoneNumberText}>Phone number </Text>
          <View style={styles.phoneNumberBox}>
            <TextInput
              style={styles.phoneInputText}
              placeholder="Enter your phone number"
              placeholderTextColor={'#515151'}
              onChangeText={handlePhoneNumber}
              maxLength={10}
              value={phomeNumber}
              keyboardType="phone-pad"
            />
          </View>
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
};

export default LoginScreen;
const styles = StyleSheet.create({
  constainer: {
    flex: 1,
    backgroundColor: '#fff',
  },

  homeContainer: {
    flex: 1,
    // marginTop: hp(-5),
    backgroundColor: '#fff',
  },

  loginText: {
    fontSize: wp(7),
    marginLeft: wp(6),
    color: '#ED802B',
    fontFamily: 'Montserrat-Bold',
  },

  phoneNumberText: {
    fontSize: wp(4.5),
    marginLeft: wp(6),
    fontFamily: 'Montserrat-Regular',
    marginTop: hp(2),
    marginBottom: hp(1),
    color: '#000',
  },

  phoneNumberBox: {
    height: hp(7),
    marginHorizontal: wp(6),
    borderRadius: wp(2),
    borderWidth: 0.5,
    borderColor: '#D1CACA',
  },

  phoneInputText: {
    fontSize: wp(3.5),
    color: '#000',
    fontFamily: 'Montserrat-Regular',
    marginLeft: wp(4),
  },

  orText: {
    fontSize: wp(4),
    color: '#000',
    alignSelf: 'center',
    marginTop: hp(1),
  },

  dontHaveText: {
    fontSize: wp(4),
    color: '#000',
  },

  loginButton: {
    height: hp(6),
    marginHorizontal: wp(6),
    borderRadius: wp(4),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ed802b',
    marginTop: hp(31),
    marginBottom: hp(2),
  },

  loginButtonText: {
    fontSize: wp(6),
    color: '#fff',
    fontFamily: 'Montserrat-Regular',
  },
});
