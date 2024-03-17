import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {SafeAreaView} from 'react-native-safe-area-context';
import ic_vector from '../assets/icon/vector.png';
import {async_keys, getData} from '../api/UserPreference';
import {BASE_URL} from '../api/ApiInfo';

const OtpScreen = ({navigation}) => {
  const numberOfInputs = 4;
  const [otp, setOtp] = useState(new Array(numberOfInputs).fill(''));
  const inputRefs = useRef([]);

  const [mob, setMob] = useState('');
  const [loader, setLoader] = useState(false);

  const [resendTime, setResendTime] = useState(30);
  const handleResend = () => {
    if (resendTime > 0) {
      return true;
    }
    setResendTime(30);
  };

  useEffect(() => {
    if (resendTime === 0) {
      return;
    }
    const intervalId = setInterval(() => {
      setResendTime(resendTime - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [resendTime]);

  // Custom OTP Input Functionality
  const handleOtpChange = (value, index) => {
    if (value.length === 1 && index < numberOfInputs - 1) {
      inputRefs.current[index + 1].focus();
    }
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
  };

  // Function to handle backspace key
  const handleBackspace = index => {
    if (index > 0) {
      const newOtp = [...otp];
      newOtp[index - 1] = '';
      setOtp(newOtp);
      inputRefs.current[index - 1].focus();
    }
  };

  useEffect(() => {
    const pass = async () => {
      const mobData = await getData(async_keys.mobile);
      setMob(mobData);
    };
    pass();
  }, []);

  const handleOTP = async () => {
    // validation
    if (otp.length === 0) {
      Alert.alert('', 'Please enter 4 digit otp!', [{text: 'OK'}], {
        cancelable: false,
      });
      return;
    }

    try {
      setLoader(true);
      const params = {
        mobile: mob,
        otp: otp.join(''),
      };

      const formdata = new FormData();
      for (let key in params) {
        formdata.append(key, params[key]);
      }

      const info = {};
      info.method = 'POST';
      info.body = formdata;
      // console.log('info', info);

      const response = await fetch(`${BASE_URL}verify_otp`, info);
      if (response) {
        const newResponse = await response.json();

        const {Status, Message} = newResponse;
        if (Status === true) {
          navigation.navigate('SignUp');
          setLoader(false);
        } else {
          setLoader(false);
          alert(Message);
        }
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
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate('LoginScreen')}
        style={{
          marginLeft: wp(6),
          alignSelf: 'flex-start',
          marginTop: hp(2),
          marginBottom: hp(2),
        }}>
        <Image source={ic_vector} style={styles.backArrowIcon} />
      </TouchableOpacity>

      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <View style={styles.OtpVerifyProfileContainer}>
          <Text
            style={{
              fontSize: wp(6),
              color: '#ed802b',
              marginLeft: wp(4),
              marginTop: hp(2),
              fontFamily: 'Montserrat-Bold',
            }}>
            Confirm your pin
          </Text>
          <Text
            style={{
              fontSize: wp(3),
              color: '#000',
              marginLeft: wp(4),
              fontFamily: 'Montserrat-Regular',
            }}>
            Enter your code to confirm
          </Text>

          <View style={modal.container}>
            {otp.map((digit, index) => (
              <View key={index} style={modal.inputContainer}>
                <TextInput
                  ref={input => (inputRefs.current[index] = input)}
                  style={modal.input}
                  keyboardType="numeric"
                  maxLength={1}
                  value={digit}
                  onChangeText={value => handleOtpChange(value, index)}
                  onKeyPress={({nativeEvent}) => {
                    if (nativeEvent.key === 'Backspace') {
                      handleBackspace(index);
                    }
                  }}
                />
              </View>
            ))}
          </View>

          <Text
            style={[
              {
                marginVertical: hp(1),
                fontSize: wp(3.5),
                color: '#000',
                fontFamily: 'Montserrat-Regular',
                textAlign: 'center',
              },
            ]}>
            Didn't receive the code?{' '}
            <Text
              onPress={handleResend}
              style={[
                {
                  color: '#ed802d',
                  fontSize: wp(4),
                  borderColor: '#000',
                  fontFamily: 'Montserrat-Medium',
                },
                resendTime > 0 && {
                  color: '#000',
                  fontSize: wp(4),
                  borderColor: '#000',
                  fontFamily: 'Montserrat-Medium',
                },
              ]}>
              Resend OTP
              {resendTime > 0 && (
                <>
                  <Text style={{color: '#000'}}> In </Text>
                  <Text style={{color: '#000'}}>{resendTime}</Text>
                </>
              )}
            </Text>
          </Text>

          <TouchableOpacity
            onPress={handleOTP}
            style={{
              height: hp(6),
              width: wp(80),
              borderRadius: wp(4),
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#ed802b',
              marginTop: hp(5.5),
              alignSelf: 'center',
            }}>
            <Text
              style={{
                fontSize: wp(6),
                color: '#fff',
                fontFamily: 'Montserrat-Medium',
              }}>
              Verify
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default OtpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  backArrowIcon: {
    height: hp(2.5),
    width: wp(5),
  },

  OtpVerifyProfileContainer: {
    height: hp(40),
    width: wp(90),
    marginHorizontal: wp(4),
    backgroundColor: '#fff',
    borderRadius: wp(4),
    elevation: 5,
  },

  enterOtpInput: {
    flexDirection: 'row',
    padding: 10,
  },

  otpInput: {
    width: wp(15),
    margin: 3,
    borderRadius: 2,
    borderWidth: 0.75,
    borderColor: '#23416E',
    color: '#000',
  },
  didNotReceiveText: {
    color: '#000',
    fontFamily: 'Roboto-Light',
    fontSize: 12,
  },
  resendOtpButton: {
    color: '#FC5A0A',
    marginLeft: wp(2),
    fontFamily: 'Roboto-Bold',
    borderBottomWidth: 1.5,
    borderColor: '#23416E',
  },
  verifyButton: {
    backgroundColor: '#FC5A0A',
    marginTop: hp(3),
    width: wp(55),
    height: hp(7),
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
  },
  verifyText: {
    alignSelf: 'center',
    color: '#fff',
    fontFamily: 'Roboto-Bold',
  },
});

// Modal Style
const modal = StyleSheet.create({
  modalContainer: {
    maxHeight: 300,
    backgroundColor: '#fff',
    marginTop: hp(28),
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  inputRow: {
    flexDirection: 'row', // Display horizontally
  },
  input: {
    width: wp(12),
    height: hp(5.5),
    borderWidth: 0.5,
    borderRadius: wp(1),
    textAlign: 'center',
    fontSize: wp(3.5),
    marginLeft: wp(3),
    marginTop: hp(4),
    color: '#000',
  },

  ConfirmPinText: {
    fontSize: wp(6),
    color: '#ed802b',
    marginLeft: wp(4),
    marginTop: hp(2),
    fontFamily: 'Montserrat-Bold',
  },

  ifyoudidtext: {
    fontSize: wp(3.5),
    color: '#613b16',
    marginVertical: hp(2),
  },

  resenttext: {
    fontSize: wp(3.5),
    fontWeight: '700',
    color: '#5fbff4',
  },
  intext: {
    fontSize: wp(3.5),
    color: '#000',
  },
});
