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
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// Image
import loginImage from '../assets/icon/loginImage.png';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {async_keys, getData, storeData} from '../api/UserPreference';
import {BASE_URL} from '../api/ApiInfo';

import {Dropdown} from 'react-native-element-dropdown';

const LoginSubscriberScreen = ({navigation}) => {
  const [loader, setLoader] = useState(false);

  const [selectedId, setSelectedId] = useState(null);

  const [id, setId] = useState([]);
  const formattedData = id.map(item => ({label: item, value: item}));

  useEffect(() => {
    const pass = async () => {
      const get = await getData(async_keys.sub_id);
      setId(get);
    };
    pass();
  }, []);

  const [password, setPassword] = useState('');
  const handlePassword = password => {
    setPassword(password);
  };

  // validation
  const handleLogin = async () => {
    if (selectedId.trim() === '') {
      Alert.alert('', 'Please enter your account Id');
      return true;
    }

    if (password.trim() === '') {
      Alert.alert('', 'Please enter the password');
      return true;
    }
    // if (password.length < 6) {
    //   Alert.alert('', 'Please enter 6 digit password');
    //   return true;
    // }

    try {
      setLoader(true);
      const params = {
        sub_id: selectedId,
        password: password,
      };

      const formData = new FormData();
      for (let key in params) {
        formData.append(key, params[key]);
      }

      const info = {};
      info.method = 'POST';
      info.body = formData;

      const response = await fetch(`${BASE_URL}subscriber_login`, info);
      console.log('response', response);
      const newResponse = await response.json();
      console.log('newResponse .pppp', newResponse);
      const {Status, Message, Data} = newResponse;
      console.log('sh', newResponse);

      if (Status === true) {
        await storeData(async_keys.token, Data.token);
        await storeData(async_keys.loginSubscriber, true);
        await storeData(async_keys.sub_id, selectedId);
        console.log('Data.token subscrivess', Data.token);
        navigation.reset({
          index: 0, // Index of the screen to reset to (first screen in the stack)
          routes: [{name: 'loggedIn'}], // Array of screens to replace the stack with
        });
        // navigation.navigate('Ho');
        setLoader(false);
      } else {
        setLoader(false);
        alert(Message);
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
    <ScrollView>
      <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
        <Image
          source={loginImage}
          style={{height: hp(44), aspectRatio: 1 / 1}}
        />
        <KeyboardAwareScrollView enableOnAndroid>
          <View style={styles.homeContainer}>
            <Text style={styles.loginText}>Login</Text>
            <Text
              style={[
                styles.phoneNumberText,
                {marginTop: hp(2), marginBottom: hp(1)},
              ]}>
              Account ID
            </Text>
            <View style={styles.inputContainer}>
              <Dropdown
                style={styles.dropdown}
                placeholder="Select your Account ID"
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                iconStyle={styles.iconStyle}
                data={formattedData}
                maxHeight={300}
                labelField="label"
                valueField="value"
                itemTextStyle={{
                  color: '#000',
                  fontSize: wp(4),
                  color: '#515151',
                  fontFamily: 'Montserrat-Regular',
                }}
                value={selectedId} // Assuming you have a state variable like selectedCity to hold the selected value
                onChange={item => {
                  setSelectedId(item.value);
                }}
              />
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

            <TouchableOpacity
              onPress={() => navigation.navigate('ForgetPasswordIdScreen')}>
              <Text style={styles.forgetPasswordText}>Forget password?</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
              <Text style={styles.loginButtonText}>Login</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </ScrollView>
  );
};

export default LoginSubscriberScreen;
const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },

  loginText: {
    fontSize: wp(7),
    marginLeft: wp(6),
    color: '#ed802b',
    fontFamily: 'Montserrat-Bold',
  },

  orText: {
    fontSize: wp(4),
    color: '#000',
    alignSelf: 'center',
    marginTop: hp(1),
    fontFamily: 'Montserrat-Light',
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
    marginTop: hp(13),
    marginBottom: hp(4),
  },

  loginButtonText: {
    fontSize: wp(6),
    color: '#fff',
    fontFamily: 'Montserrat-Regular',
  },

  accountIdBox: {
    marginTop: hp(2),
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
    borderRadius: wp(2),
    borderWidth: 0.5,
    borderColor: '#D1CACA',
    marginHorizontal: wp(6),
  },

  phoneInputText: {
    fontSize: wp(3.5),
    color: '#000',
    fontFamily: 'Montserrat-Regular',
    marginLeft: wp(4),
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

  // =>>>>>>
  inputContainer: {
    height: hp(7),
    backgroundColor: '#fff',
    marginHorizontal: wp(6),
    borderRadius: wp(2),
    borderWidth: 0.5,
    borderColor: '#D1CACA',
    marginBottom: hp(1),
  },

  dropdown: {
    height: hp(6),
  },

  placeholderStyle: {
    fontSize: wp(3.5),
    color: '#515151',
    marginLeft: wp(5),
    fontFamily: 'Montserrat-Regular',
    marginTop: hp(1),
  },

  selectedTextStyle: {
    marginLeft: wp(5),
    fontSize: wp(3.5),
    color: '#000',
    fontFamily: 'Montserrat-Regular',
    marginTop: hp(1),
  },
  iconStyle: {
    width: 20,
    height: 20,
    marginRight: wp(4),
    marginTop: hp(2),
  },
});
