// import React, {useEffect, useState} from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   Image,
//   ScrollView,
//   TouchableOpacity,
//   TextInput,
//   Alert,
//   ActivityIndicator,
// } from 'react-native';

// import {
//   widthPercentageToDP as wp,
//   heightPercentageToDP as hp,
// } from 'react-native-responsive-screen';

// // Icon
// import ic_vector from '../assets/icon/vector.png';
// import {Dropdown} from 'react-native-element-dropdown';
// import ic_rightArrow from '../assets/icon/rightArrow.png';
// import {async_keys, getData, storeData} from '../api/UserPreference';
// import {BASE_URL} from '../api/ApiInfo';

// const OtpVerificationScreen = ({navigation}) => {
//   const [selectedId, setSelectedId] = useState(null);
//   const [otp, setOtp] = useState(null);
//   const [loader, setLoader] = useState(false);
//   const [visitorId, setVisitorId] = useState('');
//   const [typeData, setTypeData] = useState('');
//   // console.log('visitorIdyes', visitorId);
//   // console.log('typeDataa', typeData);

//   const handleOtp = otp => {
//     setOtp(otp);
//   };

//   const [id, setId] = useState([]);
//   // console.log("id''''''''''''''''", id);
//   // const formattedData =
//   //   typeData === 'subscriber'
//   //     ? id.map(item => ({label: item, value: item}))
//   //     : [];

//   useEffect(() => {
//     const pass = async () => {
//       const get = await getData(async_keys.subForPass);
//       const visitorId = await getData(async_keys.visitor_id);
//       const get_type = await getData(async_keys.type);
//       setTypeData(get_type);

//       setVisitorId(visitorId);
//       console.log('get', visitorId);
//       setId(get);
//     };
//     pass();
//   }, []);

//   const handleSaveChange = async () => {
//     // if (selectedId === '') {
//     //   Alert.alert('', 'Please select your subscribe id ');
//     //   return true;
//     // }

//     if (otp.trim() === '') {
//       Alert.alert('', 'Please enter otp!');
//       return true;
//     }

//     if (otp.length < 4) {
//       Alert.alert('', 'Please enter 4 digit otp');
//       return true;
//     }

//     try {
//       setLoader(true);
//       const params = {};

//       if (typeData === 'visitor') {
//         // const visitorId = await getData(async_keys.visiterId);
//         params.visitor_id = visitorId;
//       } else if (typeData === 'subscriber') {
//         params.sub_id = id;
//       }

//       params.otp = otp;
//       const formData = new FormData();
//       for (let key in params) {
//         formData.append(key, params[key]);
//       }

//       var info = {};
//       info.method = 'POST';
//       info.body = formData;

//       const response = await fetch(
//         `${BASE_URL}forget_password_verify_otp`,
//         info,
//       );
//       // console.log('response', response);
//       const newResponse = await response.json();
//       // console.log('newResponse', newResponse);
//       const {Status, Message} = newResponse;
//       if (Status === true) {
//         await storeData(async_keys.otp, otp);
//         navigation.navigate('ForgetPassChangeScreen');
//         setLoader(false);
//       } else {
//         setLoader(false);
//         alert(Message);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   if (loader) {
//     return (
//       <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
//         <ActivityIndicator color="green" size="large" />
//       </View>
//     );
//   }
//   return (
//     <View>
//       <View style={styles.headerBox}>
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <Image source={ic_vector} style={styles.vectorIcon} />
//         </TouchableOpacity>
//       </View>

//       {/* {typeData === 'subscriber' ? (
//         <View style={styles.accountIdBox}>
//           <Text style={[styles.phoneNumberText, {marginBottom: hp(0)}]}>
//             Subscriber ID
//           </Text>
//           <View style={styles.inputContainer}>
//             <Dropdown
//               style={styles.dropdown}
//               placeholder="Select your Account ID"
//               placeholderStyle={styles.placeholderStyle}
//               selectedTextStyle={styles.selectedTextStyle}
//               iconStyle={styles.iconStyle}
//               data={formattedData}
//               maxHeight={300}
//               labelField="label"
//               valueField="value"
//               itemTextStyle={{
//                 color: '#000',
//                 fontSize: wp(4),
//                 color: '#515151',
//                 fontFamily: 'Montserrat-Regular',
//               }}
//               value={selectedId} // Assuming you have a state variable like selectedCity to hold the selected value
//               onChange={item => {
//                 setSelectedId(item.value);
//               }}
//             />
//           </View>
//         </View>
//       ) : (
//         <View style={styles.accountIdBox}>
//           <Text style={styles.phoneNumberText}>Visiter ID </Text>
//           <View style={styles.phoneNumberBox}>
//             <TextInput
//               style={styles.phoneInputText}
//               placeholder="Enter your ID"
//               placeholderTextColor={'#515151'}
//               // onChangeText={handle}
//               // value={visitorId}
//             />
//           </View>
//         </View>
//       )} */}

//       <View style={styles.accountIdBox}>
//         <Text style={styles.phoneNumberText}>OTP </Text>
//         <View style={styles.phoneNumberBox}>
//           <TextInput
//             style={styles.phoneInputText}
//             placeholder="Enter your otp"
//             placeholderTextColor={'#515151'}
//             onChangeText={handleOtp}
//             value={otp}
//           />
//         </View>
//       </View>

//       <TouchableOpacity
//         style={styles.saveChangeButton}
//         onPress={handleSaveChange}>
//         <Text style={styles.saveChangeText}>Next</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default OtpVerificationScreen;
// const styles = StyleSheet.create({
//   headerBox: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginTop: hp(2),
//     marginLeft: wp(6),
//   },

//   vectorIcon: {
//     height: hp(2.5),
//     width: wp(5),
//   },

//   TransactionsText: {
//     fontSize: wp(6),
//     color: '#000',
//     fontFamily: 'Montserrat-Medium',
//     marginLeft: wp(4),
//   },

//   saveChangeButton: {
//     height: hp(6),
//     backgroundColor: '#ED802B',
//     marginHorizontal: wp(6),
//     alignItems: 'center',
//     justifyContent: 'center',
//     borderRadius: wp(4),
//     marginTop: hp(60),
//   },

//   saveChangeText: {
//     fontSize: wp(5),
//     color: '#fff',
//     fontFamily: 'Roboto-Regular',
//   },

//   //
//   accountIdBox: {
//     marginTop: hp(2),
//   },

//   phoneNumberText: {
//     fontSize: wp(4.5),
//     marginLeft: wp(6),
//     fontFamily: 'Montserrat-Regular',
//     color: '#000',
//   },

//   phoneNumberBox: {
//     height: hp(7),
//     marginHorizontal: wp(6),
//     marginTop: hp(1),
//     borderWidth: 0.5,
//     borderRadius: wp(2.5),
//     borderColor: '#D1CACA',
//   },

//   // ????????????????????????????????/
//   inputContainer: {
//     height: hp(7),
//     marginHorizontal: wp(6),
//     marginTop: hp(1),
//     marginBottom: hp(1),
//     borderWidth: 0.5,
//     borderRadius: wp(2.5),
//     borderColor: '#D1CACA',
//   },

//   dropdown: {
//     height: hp(6),
//   },

//   placeholderStyle: {
//     fontSize: wp(3.5),
//     color: '#808080',
//     marginLeft: wp(4),
//     fontFamily: 'Montserrat-Regular',
//   },

//   selectedTextStyle: {
//     marginLeft: wp(4),
//     fontSize: wp(3.5),
//     color: '#515151',
//     fontFamily: 'Montserrat-Regular',
//   },
//   iconStyle: {
//     width: 20,
//     height: 20,
//     marginRight: wp(4),
//   },

//   phoneInputText: {
//     marginLeft: wp(4),
//     fontSize: wp(3.5),
//     color: '#515151',
//     fontFamily: 'Montserrat-Regular',
//   },
// });

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
import {async_keys, getData, storeData} from '../api/UserPreference';
import {BASE_URL} from '../api/ApiInfo';

const OtpVerificationScreen = ({navigation}) => {
  const numberOfInputs = 4;
  const [otp, setOtp] = useState(new Array(numberOfInputs).fill(''));
  const inputRefs = useRef([]);

  const [loader, setLoader] = useState(false);
  const [id, setId] = useState([]);
  const [visitorId, setVisitorId] = useState('');
  const [typeData, setTypeData] = useState('');

  const [resendTime, setResendTime] = useState(30);
  const handleResend = () => {
    if (resendTime > 0) {
      return true;
    }
    setResendTime(30);
  };

  useEffect(() => {
    const pass = async () => {
      const get = await getData(async_keys.subForPass);
      const visitorId = await getData(async_keys.visitor_id);
      const get_type = await getData(async_keys.type);
      setTypeData(get_type);

      setVisitorId(visitorId);
      console.log('get', visitorId);
      setId(get);
    };
    pass();
  }, []);

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

  // useEffect(() => {
  //   const pass = async () => {
  //     const mobData = await getData(async_keys.mobile);
  //     // console.log('mobData', mobData);
  //     setMob(mobData);
  //   };
  //   pass();
  // }, []);

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
      const params = {};

      if (typeData === 'visitor') {
        params.visitor_id = visitorId;
      } else if (typeData === 'subscriber') {
        params.sub_id = id;
      }

      params.otp = otp.join('');
      const formdata = new FormData();
      for (let key in params) {
        formdata.append(key, params[key]);
      }

      const info = {};
      info.method = 'POST';
      info.body = formdata;
      console.log('infoo', info);

      const response = await fetch(
        `${BASE_URL}forget_password_verify_otp`,
        info,
      );

      const newResponse = await response.json();

      const {Status, Message} = newResponse;
      if (Status === true) {
        await storeData(async_keys.otp, otp);
        navigation.navigate('ForgetPassChangeScreen');
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
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate('LoginScreen')}
        style={{marginTop: hp(2), marginLeft: wp(6.8)}}>
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

export default OtpVerificationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  backArrowIcon: {
    height: hp(2.5),
    width: wp(5),
    marginLeft: wp(-2),
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
