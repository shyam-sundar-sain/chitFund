import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator,
} from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// Icon
import ic_vector from '../assets/icon/vector.png';
import {async_keys, getData} from '../api/UserPreference';
import {BASE_URL} from '../api/ApiInfo';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const ResetPasswordScreen = ({navigation}) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [subId_Data, setSubId_Data] = useState('');
  const [token, setToken] = useState('');
  const [loader, setLoader] = useState(false);

  const handleOldPassWord = oldPass => {
    setOldPassword(oldPass);
  };

  const handleNewPassWord = newPass => {
    setNewPassword(newPass);
  };
  const handleConfirmPassWord = confirmPass => {
    setConfirmPassword(confirmPass);
  };

  useEffect(() => {
    const data = async () => {
      const sub_Id = await getData(async_keys.sub_id);
      const auth_token = await getData(async_keys.token);
      const subID = sub_Id[0];
      setSubId_Data(subID);
      setToken(auth_token);
    };
    data();
  }, []);

  const handleSaveChange = async () => {
    if (oldPassword.trim() === '') {
      Alert.alert('', 'Please enter your old password');
      return true;
    }
    if (newPassword.trim() === '') {
      Alert.alert('', 'Please enter your new password');
      return true;
    }
    if (confirmPassword.trim() === '') {
      Alert.alert('', 'Please enter your confirm password');
      return true;
    }

    try {
      setLoader(true);
      const params = {
        current_password: oldPassword,
        new_password: newPassword,
        confirm_password: confirmPassword,
        sub_id: subId_Data,
      };

      const myHeaders = new Headers();
      myHeaders.append('Authorization', `Bearer ${token}`);

      const formData = new FormData();
      for (let key in params) {
        formData.append(key, params[key]);
      }

      const info = {
        method: 'POST',
        headers: myHeaders,
        body: formData,
        redirect: 'follow',
      };

      const response = await fetch(`${BASE_URL}change_password`, info);
      console.log('response', response);
      const newResponse = await response.json();
      console.log('newResponse .pppp', newResponse);
      setLoader(false);
      const {Status, Message} = newResponse;
      if (Status === true) {
        Alert.alert('', 'Password update successful', [
          {
            text: 'OK',
            onPress: () => {
              navigation.navigate('HomeScreenSubscriber');
            },
          },
        ]);
        setLoader(false);
      } else {
        alert(Message);
        setLoader(false);
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
    <View style={styles.container}>
      <View style={styles.headerBox}>
        <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
          <Image source={ic_vector} style={styles.vectorIcon} />
        </TouchableOpacity>
        <Text style={styles.TransactionsText}>Reset Password</Text>
      </View>

      <KeyboardAwareScrollView enableOnAndroid>
        <View style={styles.homeContainer}>
          <View style={styles.accountIdBox}>
            <Text style={styles.phoneNumberText}>Old Password </Text>
            <View style={styles.phoneNumberBox}>
              <TextInput
                style={styles.phoneInputText}
                placeholder="Enter your Old password"
                placeholderTextColor={'#515151'}
                onChangeText={handleOldPassWord}
                value={oldPassword}
              />
            </View>
          </View>

          <View style={styles.accountIdBox}>
            <Text style={styles.phoneNumberText}>New Password </Text>
            <View style={styles.phoneNumberBox}>
              <TextInput
                style={styles.phoneInputText}
                placeholder="Enter your New password"
                placeholderTextColor={'#515151'}
                onChangeText={handleNewPassWord}
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
                placeholderTextColor={'#515151'}
                onChangeText={handleConfirmPassWord}
                value={confirmPassword}
              />
            </View>
          </View>

          <TouchableOpacity
            style={styles.saveChangeButton}
            onPress={handleSaveChange}>
            <Text style={styles.saveChangeText}>Save Changes</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default ResetPasswordScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  headerBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp(2),
    marginLeft: wp(6),
  },

  homeContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },

  vectorIcon: {
    height: hp(2.5),
    width: wp(5),
  },

  TransactionsText: {
    fontSize: wp(5),
    color: '#000',
    fontFamily: 'Montserrat-Medium',
    marginLeft: wp(4),
  },

  saveChangeButton: {
    height: hp(6),
    backgroundColor: '#ED802B',
    marginHorizontal: wp(4),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: wp(4),
    marginTop: hp(49),
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
    marginBottom: hp(1),
    color: '#000',
  },

  phoneNumberBox: {
    height: hp(7),
    marginHorizontal: wp(6),
    borderWidth: 0.2,
    borderRadius: wp(1),
  },

  phoneInputText: {
    marginLeft: wp(4),
    fontSize: wp(3.5),
    color: '#515151',
    fontFamily: 'Montserrat-Regular',
  },
});
