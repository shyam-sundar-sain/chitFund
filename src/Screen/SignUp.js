import React, {lazy, useEffect, useState} from 'react';
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
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {BASE_URL} from '../api/ApiInfo';

// icon
import ic_vector from '../assets/icon/vector.png';
import {async_keys, getData, storeData} from '../api/UserPreference';

const SignUp = ({navigation}) => {
  const [name, setName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loader, setLoader] = useState(false);

  const handleName = name => {
    //  Remove non-alphabetic characters using a regular expression
    const sanitizedText = name.replace(/[^a-zA-Z]/g, ' ');
    setName(sanitizedText);
  };

  const handleMobile = mobile => {
    setMobileNumber(mobile.replace(/[^0-9]/g, ''));
  };

  const handleEmail = email => {
    setEmail(email);
  };

  const handlePassword = password => {
    setPassword(password);
  };

  useEffect(() => {
    const getMobile = async () => {
      const mobileData = await getData(async_keys.mobile);
      setMobileNumber(mobileData);
    };
    getMobile();
  }, []);

  // validation
  const handleSignup = async () => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (name.trim() === '') {
      Alert.alert('', 'Please enter name');
      return true;
    }

    if (mobileNumber.trim() === '') {
      Alert.alert('', 'Please enter mobile number');
      return true;
    }

    if (mobileNumber.length < 10) {
      Alert.alert('', 'Please enter valid mobile number');
      return true;
    }

    if (email.trim() === '') {
      Alert.alert('', 'Please enter email id');
      return true;
    }

    if (!regex.test(email)) {
      Alert.alert('', 'Please enter valid email id');
      return true;
    }

    if (password.trim() === '') {
      Alert.alert('', 'Please enter password');
      return true;
    }

    if (password.length < 6) {
      Alert.alert('', 'Please should not be less then 6 digit password');
    }

    try {
      setLoader(true);
      const params = {
        name: name,
        mobile: mobileNumber,
        email: email,
        password: password,
      };

      const formdata = new FormData();
      for (let key in params) {
        formdata.append(key, params[key]);
      }

      var info = {};
      info.method = 'POST';
      info.body = formdata;

      console.log('info+++', info);
      const response = await fetch(`${BASE_URL}visitor_register`, info);
      console.log('response((999___', response);

      if (response) {
        const newResponse = await response.json();
        console.log('newResponse =?????PPPsss', newResponse);
        const {Status, Data} = newResponse;
        if (Status === true) {
          await storeData(async_keys.is_register, Data.is_register);
          await storeData(async_keys.visitor_id, Data.id);
          navigation.navigate('KycVerificationAdhar');
          setLoader(false);
        } else {
          setLoader(false);
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
    <SafeAreaView style={styles.Container}>
      <KeyboardAwareScrollView
        enableOnAndroid
        showsVerticalScrollIndicator={false}>
        <View style={styles.homeContainer}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              marginLeft: wp(2),
              alignSelf: 'flex-start',
              marginTop: hp(2),
              marginBottom: hp(2),
              marginLeft: hp(3),
            }}>
            <Image source={ic_vector} style={styles.vectorIcon} />
          </TouchableOpacity>
          <Text style={styles.loginText}>Let's know your better</Text>

          <View style={styles.accountIdBox}>
            <Text style={styles.phoneNumberText}>Name</Text>
            <View style={styles.phoneNumberBox}>
              <TextInput
                style={styles.phoneInputText}
                placeholder="Enter your Name"
                placeholderTextColor={'#515151'}
                onChangeText={handleName}
                value={name}
              />
            </View>
          </View>

          {/* <View style={styles.accountIdBox}>
            <Text style={styles.phoneNumberText}>Mobile number </Text>
            <View style={styles.phoneNumberBox}>
              <TextInput
                style={styles.phoneInputText}
                placeholder="Enter your mobile number"
                placeholderTextColor={'#515151'}
                onChangeText={handleMobile}
                value={mobileNumber}
                maxLength={10}
                keyboardType="phone-pad"
              />
            </View>
          </View> */}

          <View style={styles.accountIdBox}>
            <Text style={styles.phoneNumberText}>Email </Text>
            <View style={styles.phoneNumberBox}>
              <TextInput
                style={styles.phoneInputText}
                placeholder="Enter your Email"
                placeholderTextColor={'#515151'}
                onChangeText={handleEmail}
                value={email}
                keyboardType="email-address"
              />
            </View>
          </View>

          <View style={styles.accountIdBox}>
            <Text style={styles.phoneNumberText}>Password </Text>
            <View style={styles.phoneNumberBox}>
              <TextInput
                style={styles.phoneInputText}
                placeholder="Enter your password"
                placeholderTextColor={'#515151'}
                onChangeText={handlePassword}
                value={password}
              />
            </View>
          </View>
          <TouchableOpacity style={styles.loginButton} onPress={handleSignup}>
            <Text style={styles.loginButtonText}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  homeContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },

  loginText: {
    fontSize: wp(7),
    fontFamily: 'Montserrat-Bold',
    marginLeft: wp(5.5),
    color: '#ed802b',
    width: wp(60),
  },

  phoneNumberText: {
    fontSize: wp(4.5),
    marginLeft: wp(6),
    fontFamily: 'Montserrat-Regular',
    marginBottom: hp(1),
    color: '#000',
  },

  phoneNumberBox: {
    height: hp(7),
    marginHorizontal: wp(6),
    borderWidth: 0.5,
    borderRadius: wp(2),
    borderColor: '#D1CACA',
  },

  phoneInputText: {
    marginLeft: wp(4),
    fontSize: wp(3.5),
    color: '#515151',
    fontFamily: 'Montserrat-Regular',
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
    marginTop: hp(38.5),
  },

  loginButtonText: {
    fontSize: wp(6),
    color: '#fff',
    fontFamily: 'Montserrat-Regular',
  },

  accountIdBox: {
    marginTop: hp(2),
  },

  vectorIcon: {
    height: hp(2.5),
    width: wp(5),
  },
});
