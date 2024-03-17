import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Alert,
} from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// Icon
import ic_vector from '../assets/icon/vector.png';
import {async_keys, getData, storeData} from '../api/UserPreference';
import {BASE_URL} from '../api/ApiInfo';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const ForgetPassChangeScreen = ({navigation}) => {
  const [loader, setLoader] = useState(false);
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [typeData, setTypeData] = useState('');
  const [visiterIdData, setVisitorIdData] = useState('');

  const handleConfirmPassword = confirmPass => {
    setConfirmPassword(confirmPass);
  };
  const handleNewPassword = newPass => {
    setNewPassword(newPass);
  };

  const [id, setId] = useState([]);

  useEffect(() => {
    const pass = async () => {
      const otpData = await getData(async_keys.otp);
      const get_type = await getData(async_keys.type);
      const subscribeId = await getData(async_keys.subForPass);
      const visiterId = await getData(async_keys.visitor_id);
      setTypeData(get_type);
      setId(subscribeId);
      setOtp(otpData);
      setVisitorIdData(visiterId);
    };
    pass();
  }, []);

  const handleSaveChange = async () => {
    if (newPassword.length < 6) {
      Alert.alert('', 'Please enter 6 digit password');
      return true;
    }

    if (confirmPassword.length < 6) {
      Alert.alert('', 'Please enter 6 digit password');
      return true;
    }

    try {
      setLoader(true);
      const params = {};
      if (typeData === 'visitor') {
        params.visitor_id = visiterIdData;
      } else {
        params.sub_id = id;
      }

      // params.otp = otp.join();
      params.otp = otp.join('');
      params.new_password = newPassword;
      params.confirm_password = confirmPassword;

      const formData = new FormData();
      for (let key in params) {
        formData.append(key, params[key]);
      }

      var info = {};
      info.method = 'POST';
      info.body = formData;
      console.log('infopp', info);

      const response = await fetch(`${BASE_URL}forget_change_password`, info);
      console.log('response', response);
      const newResponse = await response.json();
      console.log('newResponse', newResponse);
      const {Status, Message} = newResponse;
      if (Status === true) {
        await storeData(async_keys.otp, otp);
        if (typeData === 'visitor') {
          navigation.navigate('LoginVisiterPassword');
        } else {
          navigation.navigate('LoginSubscriberScreen');
        }
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
    <KeyboardAwareScrollView
      enableOnAndroid
      showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <View style={styles.headerBox}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={ic_vector} style={styles.vectorIcon} />
          </TouchableOpacity>
        </View>

        <View style={styles.homeContainer}>
          <View style={styles.accountIdBox}>
            <Text style={styles.phoneNumberText}>New Password </Text>
            <View style={styles.phoneNumberBox}>
              <TextInput
                style={styles.phoneInputText}
                placeholder="Enter your new password"
                placeholderTextColor={'#808080'}
                onChangeText={handleNewPassword}
                value={newPassword}
              />
            </View>
          </View>

          <View style={styles.accountIdBox}>
            <Text style={styles.phoneNumberText}>Confirm Password </Text>
            <View style={styles.phoneNumberBox}>
              <TextInput
                style={styles.phoneInputText}
                placeholder="Enter your confirm password"
                placeholderTextColor={'#808080'}
                onChangeText={handleConfirmPassword}
                value={confirmPassword}
              />
            </View>
          </View>

          <TouchableOpacity
            style={styles.saveChangeButton}
            onPress={handleSaveChange}>
            <Text style={styles.saveChangeText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default ForgetPassChangeScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  homeContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },

  headerBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp(2),
    marginLeft: wp(6),
  },

  vectorIcon: {
    height: hp(2.5),
    width: wp(5),
  },

  TransactionsText: {
    fontSize: wp(6),
    color: '#000',
    fontFamily: 'Montserrat-Medium',
    marginLeft: wp(4),
  },

  saveChangeButton: {
    height: hp(6),
    backgroundColor: '#ED802B',
    marginHorizontal: wp(6),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: wp(4),
    marginTop: hp(62.5),
    marginBottom: hp(3),
  },

  saveChangeText: {
    fontSize: wp(5),
    color: '#fff',
    fontFamily: 'Roboto-Regular',
  },

  accountIdBox: {
    marginTop: hp(2),
  },

  phoneNumberText: {
    fontSize: wp(4.5),
    marginLeft: wp(6),
    fontFamily: 'Montserrat-Regular',
    color: '#000',
  },

  inputContainer: {
    height: hp(7),
    marginHorizontal: wp(6),
    borderWidth: 0.5,
    borderRadius: wp(2.5),
    borderColor: '#D1CACA',
    marginTop: hp(1),
  },

  dropdown: {
    height: hp(6),
  },

  placeholderStyle: {
    fontSize: wp(3.5),
    color: '#808080',
    marginLeft: wp(4),
    fontFamily: 'Montserrat-Regular',
  },

  selectedTextStyle: {
    marginLeft: wp(4),
    fontSize: wp(4),
    color: '#515151',
    fontFamily: 'Montserrat-Regular',
  },
  iconStyle: {
    width: 20,
    height: 20,
    marginRight: wp(4),
  },

  phoneNumberBox: {
    height: hp(7),
    marginHorizontal: wp(6),
    borderWidth: 0.5,
    borderRadius: wp(2.5),
    borderColor: '#D1CACA',
    marginTop: hp(1),
  },
  phoneInputText: {
    fontSize: wp(3.5),
    marginLeft: wp(4),
    color: '#515151',
    fontFamily: 'Montserrat-Regular',
  },
});
