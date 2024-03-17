import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// icon
import ic_vector from '../assets/icon/vector.png';
import ic_profile from '../assets/icon/profile.png';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Modal from 'react-native-modal';
import {RNCamera} from 'react-native-camera';
import {ViewPropTypes} from 'deprecated-react-native-prop-types';
import {useCamera} from 'react-native-camera-hooks';
import ImageResizer from 'react-native-image-resizer';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import RNFetchBlob from 'rn-fetch-blob';
import {async_keys, getData, storeData} from '../api/UserPreference';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import BottomNavigator from '../Navigation/BottomNavigator';
import {BASE_URL} from '../api/ApiInfo';

const MyprofileScreen = props => {
  const {navigation} = props;
  // validation

  useEffect(() => {
    const adhar_Pan_Data = async () => {
      const get_visiterId = await getData(async_keys.visitor_id);
      const get_sub_Id = await getData(async_keys.sub_id);
      const get_type = await getData(async_keys.type);
      // const get_type = await getData(async_keys.type);
      setTypeData(get_type);
      setSubId_Data(get_sub_Id);
      console.log('get_sub_ss', get_type);
      setVisiterIdData(get_visiterId);

      // getUserProfileDetail(get_sub_Id);

      if (get_type === 'visitor') {
        await getUserProfileDetail(get_visiterId, 'visitor_id');
      } else if (get_type === 'subscriber') {
        await getUserProfileDetail(get_sub_Id, 'sub_id');
      }
    };
    adhar_Pan_Data();
  }, []);

  const handleSaveData = async () => {
    if (typeData === 'visitor') {
      if (name.trim() === '') {
        Alert.alert('', 'Please enter your name');
        return true;
      }

      if (emailId.trim() === '') {
        Alert.alert('', 'Please enter your emailId');
        return true;
      }

      if (mobNumber.trim() === '') {
        Alert.alert('', 'Please enter your mobile number');
        return true;
      }
    } else {
      if (firstName.trim() === '') {
        Alert.alert('', 'Please enter your name');
        return true;
      }

      if (lastName.trim() === '') {
        Alert.alert('', 'Please enter your name');
        return true;
      }

      if (emailId.trim() === '') {
        Alert.alert('', 'Please enter your emailId');
        return true;
      }

      if (mobNumber.trim() === '') {
        Alert.alert('', 'Please enter your mobile number');
        return true;
      }
    }

    try {
      setLoader(true);
      const params = {
        email: emailId,
        mobile: mobNumber,
      };

      console.log('typeData **--', typeData);
      if (typeData === 'visitor') {
        params.name = name;
        params.visitor_id = visiterIdData;
        console.log('visiterIdData ** --', visiterIdData);
      } else {
        params.sub_id = subId_Data;
        params.first_name = firstName;
        params.last_name = lastName;
        console.log('subId_Data ** --', subId_Data);
      }

      const formdata = new FormData();
      for (let key in params) {
        formdata.append(key, params[key]);
      }

      var info = {};
      info.method = 'POST';
      info.body = formdata;

      console.log('infoooo kyc', info);

      const response = await fetch(`${BASE_URL}update_profile`, info);
      console.log('responseee ** --', response);
      const newResponse = await response.json();
      console.log('kyc newResponse ** --', newResponse);
      const {Status, Message} = newResponse;

      if (Status === true) {
        typeData === 'visitor'
          ? Alert.alert('', 'Profile update successful', [
              {
                text: 'OK',
                onPress: () => {
                  navigation.navigate('Home');
                },
              },
            ])
          : Alert.alert('', 'Profile update successful', [
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
      console.log('error', error);
    }
  };

  const handleAdharCardNumber = async () => {
    if (aadharNumber.trim() === '') {
      Alert.alert('', 'Please enter your aadhar number');
      return true;
    }

    if (addharImage === null) {
      Alert.alert('', 'Please upload adhar image');
      return true;
    }

    if (panCardNumber.trim() === '') {
      Alert.alert('', 'Please enter your pan number');
      return true;
    }

    if (panCardImage === null) {
      Alert.alert('', 'Please upload pan image');
      return true;
    }

    try {
      setLoader(true);

      const params = {
        pan_number: panCardNumber,
        aadhar_number: aadharNumber,
      };
      if (panCardImage.name) {
        params.pan_image = {
          name: panCardImage.name,
          uri: panCardImage.uri,
          type: 'image/jpeg',
        };
      }
      if (addharImage.name) {
        params.aadhar_image = {
          name: addharImage.name,
          uri: addharImage.uri,
          type: 'image/jpeg',
        };
      }

      if (typeData === 'visitor') {
        params.visitor_id = visiterIdData;
      } else {
        params.sub_id = subId_Data;
      }

      const formdata = new FormData();
      for (let key in params) {
        formdata.append(key, params[key]);
      }

      var info = {};
      info.method = 'POST';
      info.body = formdata;
      console.log('info kycc', info);

      const response = await fetch(`${BASE_URL}upload_kyc`, info);
      console.log('response kycc', response);
      const newResponse = await response.json();
      console.log('newResponse kycc', newResponse);
      const {Status, Message} = newResponse;
      if (Status === true) {
        typeData === 'visitor'
          ? Alert.alert('', 'Profile update successful', [
              {
                text: 'OK',
                onPress: () => {
                  navigation.navigate('Home');
                },
              },
            ])
          : Alert.alert('', 'Profile update successful', [
              {
                text: 'OK',
                onPress: () => {
                  navigation.navigate('HomeScreenSubscriber');
                },
              },
            ]);
        setLoader(false);
      } else {
        setLoader(false);
        alert(Message);
      }
    } catch (error) {
      setLoader(false);
      console.log('error1111', error);
    }
  };

  // get data fill
  const getUserProfileDetail = async (id, type) => {
    console.log(';id', id);
    console.log(';type', type);
    try {
      setLoader(true);
      const response = await fetch(`${BASE_URL}get_profile?${type}=${id}`);
      // const response = await fetch(`${BASE_URL}get_profile?$=${id}`);
      console.log('response %%%%%%%% get profile', response);
      if (response) {
        const newResponse = await response.json();
        const {Status, Data, Message} = newResponse;
        console.log('newResponse get profile ############', newResponse);
        if (Status === true) {
          // console.log('Data.namew', Data.name);
          setName(Data?.name);
          setEmailId(Data?.email);
          setMobnumber(Data?.mobile);
          setAadharNumber(Data?.aadhar_number);
          console.log('Data?.aadhar_numberrrrpp', Data?.aadhar_number);
          // setAddharImage(Data?.aadhar_image);
          setAddharImage({uri: Data?.aadhar_image});
          console.log('Data?.ashar', Data?.aadhar_image);
          setPanCardNumber(Data?.pan_number);
          setPanCardImage(Data?.pan_image);
          console.log('Data?.pan', Data?.aadhar_image);
          setFirstName(Data?.first_name);
          setLastName(Data?.last_name);
          setLoader(false);
        } else {
          setLoader(false);
          alert(Message);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  ///pppp

  useEffect(() => {
    const addhar_Image = async () => {
      await getData(async_keys.addharImage);
    };
    addhar_Image();
  }, []);

  const [aadharNumber, setAadharNumber] = useState('');
  const [addharImage, setAddharImage] = useState(null);
  console.log('addhar ytyyyyyyy', addharImage);
  const [{cameraRef}, {takePicture}] = useCamera(null);
  const [showCamera, setShowCamera] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [visiterIdData, setVisiterIdData] = useState(false);
  const [subId_Data, setSubId_Data] = useState(false);
  const [typeData, setTypeData] = useState(false);

  const [panCardNumber, setPanCardNumber] = useState('');
  const [panCardImage, setPanCardImage] = useState(null);
  const [showCameraPan, setShowCameraPan] = useState(false);
  const [modalVisiblePan, setModalVisiblePan] = useState(false);
  const [loader, setLoader] = useState(false);
  const [mobNumber, setMobnumber] = useState('');

  // const handleNumber = mob => {
  //   setMobnumber(mob);
  // };

  const animationRef = useRef(null);
  // Document Section
  const handleAadharNumberChange = aadharNumber => {
    console.log('aadharNumberr', aadharNumber);
    setAadharNumber(aadharNumber);
  };

  // Camera Modal Functions
  const handleShowCamera = () => {
    setModalVisible(false);
    setShowCamera(true);
  };

  // Image Upload Functionality
  const handleCombinedUpload = () => {
    setModalVisible(true);
  };
  const imageUrlRegex = /^https?:\/\//;

  const handleAadharFileUpload = () => {
    launchImageLibrary({mediaType: 'photo'}, async response => {
      if (!response.didCancel && !response.error) {
        const newWidth = 500;
        const newHeight = 500;

        const resizedImageURI = await ImageResizer.createResizedImage(
          response.assets[0].uri,
          newWidth,
          newHeight,
          'JPEG',
          100,
        );
        console.log('Resized Image URI:', resizedImageURI);
        const imagePath = resizedImageURI.path;
        console.log('imagePath +kkk', imagePath);

        // Use rn-fetch-blob to read the image file
        const imageBase64 = await RNFetchBlob.fs.readFile(imagePath, 'base64');
        console.log('imageBase64 /image', imageBase64);
        setAddharImage(resizedImageURI);
        setShowCamera(false);
        setModalVisible(false);
      }
    });
  };

  const handleAadharCameraUpload = async () => {
    try {
      // const {uri} = await takePicture(options);
      const options = {quality: 0.5, base64: true};

      const data = await takePicture(options);
      console.log('data data', data);

      const newWidth = 500;
      const newHeight = 500;

      const resizedImageURI = await ImageResizer.createResizedImage(
        data.uri,
        newWidth,
        newHeight,
        'JPEG',
        100,
      );

      console.log('resizedImageURI camera', resizedImageURI);

      const imagePath = resizedImageURI.path;
      console.log('imagePath', imagePath);

      // Use rn-fetch-blob to read the image file
      const imageBase64 = await RNFetchBlob.fs.readFile(imagePath, 'base64');

      setAddharImage(resizedImageURI);
      setShowCamera(false);
      setModalVisible(false);
    } catch (error) {
      console.log(error);
    }
  };

  // Document Section
  const handlePanCardNumberChange = panCardNumber => {
    console.log('panCardNumbermmll', panCardNumber);
    setPanCardNumber(panCardNumber);
  };

  // Camera Modal Functions
  const handleShowCameraPan = () => {
    setModalVisiblePan(false);
    setShowCameraPan(true);
  };

  // Image Upload Functionality
  const handleCombinedUploadPan = () => {
    setModalVisiblePan(true);
  };

  const handlePanCardFileUpload = () => {
    launchImageLibrary({mediaType: 'photo'}, async response => {
      // console.log('response (yyyyyyyyyyyyyyyyyy', response);
      if (!response.didCancel && !response.error) {
        const newWidth = 500;
        const newHeight = 500;

        const resizedImageURI = await ImageResizer.createResizedImage(
          response.assets[0].uri,
          newWidth,
          newHeight,
          'JPEG',
          100,
        );
        const imagePath = resizedImageURI.path;

        // Use rn-fetch-blob to read the image file
        const imageBase64 = await RNFetchBlob.fs.readFile(imagePath, 'base64');
        console.log('imageBase64 000000000', imageBase64);

        setPanCardImage(resizedImageURI);
        setShowCameraPan(false);
        setModalVisiblePan(false);
      }
    });
  };

  const handlePanCardCameraUpload = async () => {
    try {
      // const {uri} = await takePicture(options);
      const options = {quality: 0.5, base64: true};

      const data = await takePicture(options);

      const newWidth = 500;
      const newHeight = 500;

      const resizedImageURI = await ImageResizer.createResizedImage(
        data.uri,
        newWidth,
        newHeight,
        'JPEG',
        100,
      );

      const imagePath = resizedImageURI.path;

      // Use rn-fetch-blob to read the image file
      const imageBase64 = await RNFetchBlob.fs.readFile(imagePath, 'base64');

      setPanCardImage(resizedImageURI);
      setShowCameraPan(false);
      setModalVisiblePan(false);
    } catch (error) {
      console.log(error);
    }
  };
  // ii
  const [name, setName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [emailId, setEmailId] = useState('');

  const handleName = name => {
    const sanitizedText = name.replace(/[^a-zA-Z]/g, ' ');
    setName(sanitizedText);
  };

  const handleFirstName = firstNa => {
    const sanitizedText = firstNa.replace(/[^a-zA-Z]/g, ' ');
    setFirstName(sanitizedText);
  };

  const handleLastName = lastNa => {
    const sanitizedText = lastNa.replace(/[^a-zA-Z]/g, ' ');
    setLastName(sanitizedText);
  };

  const handleAccount = email_id => {
    setEmailId(email_id);
  };

  const handleButtonPress = () => {
    handleSaveData();
    handleAdharCardNumber();
  };

  if (loader) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator color="green" size="large" />
      </View>
    );
  }

  return (
    <View style={styles.contianer}>
      <KeyboardAwareScrollView
        enableOnAndroid
        showsVerticalScrollIndicator={false}>
        <View style={styles.homeContainer}>
          <TouchableOpacity
            style={{
              marginLeft: wp(6),
              alignSelf: 'flex-start',
              // marginTop: hp(2),
              marginBottom: hp(1),
            }}
            onPress={() => navigation.goBack()}>
            <Image source={ic_vector} style={styles.vectorIcon} />
          </TouchableOpacity>

          {typeData === 'visitor' ? (
            <View style={styles.accountIdBox}>
              <Image source={ic_profile} style={styles.profileIcon} />
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
          ) : (
            <>
              <View style={styles.accountIdBox}>
                <Image source={ic_profile} style={styles.profileIcon} />
                <Text style={styles.phoneNumberText}>First Name</Text>
                <View style={styles.phoneNumberBox}>
                  <TextInput
                    style={styles.phoneInputText}
                    placeholder="Enter your Name"
                    placeholderTextColor={'#515151'}
                    onChangeText={handleFirstName}
                    value={firstName}
                  />
                </View>
              </View>

              <View style={styles.accountIdBox}>
                <Text style={styles.phoneNumberText}>Last Name</Text>
                <View style={styles.phoneNumberBox}>
                  <TextInput
                    style={styles.phoneInputText}
                    placeholder="Enter your Name"
                    placeholderTextColor={'#515151'}
                    onChangeText={handleLastName}
                    value={lastName}
                  />
                </View>
              </View>
            </>
          )}

          <View style={styles.accountIdBox}>
            <Text style={styles.phoneNumberText}>Email ID</Text>
            <View style={styles.phoneNumberBox}>
              <TextInput
                style={styles.phoneInputText}
                placeholder="Enter your Account ID"
                placeholderTextColor={'#515151'}
                onChangeText={handleAccount}
                value={emailId}
                keyboardType={'email-address'}
              />
            </View>
          </View>

          {/* <View style={styles.accountIdBox}>
            <Text style={styles.phoneNumberText}>Mobile Number</Text>
            <View style={styles.phoneNumberBox}>
              <TextInput
                style={styles.phoneInputText}
                placeholder="Enter your Account ID"
                placeholderTextColor={'#515151'}
                onChangeText={handleNumber}
                value={mobNumber}
                keyboardType={'email-address'}
              />
            </View>
          </View> */}

          <View style={styles.accountIdBox}>
            <Text
              style={{
                fontSize: wp(4.5),
                marginLeft: wp(6),
                fontFamily: 'Montserrat-Regular',
                marginBottom: hp(1),
                color: '#000',
              }}>
              Aadhar Number
            </Text>

            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Aadhar Number"
                placeholderTextColor={'#515151'}
                style={styles.formText}
                value={aadharNumber}
                maxLength={12}
                keyboardType="decimal-pad"
                onChangeText={handleAadharNumberChange}
              />
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-end',
                marginRight: wp(6),
                marginTop: hp(1),
              }}>
              <Text style={styles.uploadText}>Upload Image</Text>
              <FontAwesome
                name="camera"
                size={20}
                color="#ED802B"
                onPress={handleCombinedUpload}
              />
            </View>

            {addharImage === null ? (
              <View
                style={[
                  styles.uploadDocContainer,
                  {alignItems: 'center', justifyContent: 'center'},
                ]}>
                {/* <Entypo
                name="upload-to-cloud"
                size={60}
                color="#ccc"
                onPress={handleCombinedUpload}
              /> */}

                <Text
                  style={{
                    fontSize: wp(3.9),
                    fontFamily: 'Roboto-Regular',
                    color: '#ccc',
                    marginLeft: wp(2),
                  }}>
                  Upload Aadhar Image
                </Text>
              </View>
            ) : (
              <TouchableOpacity
                onPress={handleCombinedUpload}
                style={[
                  styles.uploadDocContainer,
                  {alignItems: 'center', justifyContent: 'center'},
                ]}>
                <Image
                  source={{
                    uri: addharImage.uri,
                  }}
                  resizeMode="cover"
                  style={{
                    width: wp(90),
                    height: hp(20),
                    borderRadius: wp(4),
                  }}
                />
              </TouchableOpacity>
            )}

            <Modal
              style={{margin: 0}}
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onBackButtonPress={() => {
                setModalVisible(false);
              }}
              onBackdropPress={() => {
                setModalVisible(false);
              }}
              onRequestClose={() => {
                setModalVisible(false);
              }}>
              <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                  <TouchableOpacity
                    style={styles.option}
                    onPress={handleShowCamera}>
                    <Text
                      style={{
                        fontSize: wp(3.9),
                        fontFamily: 'Roboto-Bold',
                        color: '#fff',
                        marginLeft: wp(2),
                      }}>
                      Take Photo...
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.option}
                    onPress={handleAadharFileUpload}>
                    <Text
                      style={{
                        fontSize: wp(3.9),
                        fontFamily: 'Roboto-Bold',
                        color: '#fff',
                        marginLeft: wp(2),
                      }}>
                      Choose from Library...
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.option}
                    onPress={() => setModalVisible(false)}>
                    <Text
                      style={{
                        fontSize: wp(3.9),
                        fontFamily: 'Roboto-Bold',
                        color: '#fff',
                        marginLeft: wp(2),
                      }}>
                      Cancel
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>

            {/* Camera Modal For Document Upload */}
            <Modal
              style={modal.modalContainer}
              isVisible={showCamera}
              onBackdropPress={() => setShowCamera(false)}
              onBackButtonPress={() => setShowCamera(false)}>
              <View style={modal.outlineContainer}>
                <View style={modal.lineContainer}>
                  <View style={{marginRight: 'auto', marginLeft: wp(4)}}>
                    <View
                      style={{
                        height: 6,
                        width: 61,
                        backgroundColor: '#fff',
                      }}
                    />

                    <View
                      style={{
                        height: 61,
                        width: 6,
                        backgroundColor: '#fff',
                      }}
                    />
                  </View>

                  <View style={{marginLeft: 'auto', marginRight: wp(4)}}>
                    <View
                      style={{
                        height: 6,
                        width: 61,
                        backgroundColor: '#fff',
                        transform: [{rotate: '360deg'}],
                      }}
                    />

                    <View
                      style={{
                        height: 61,
                        marginLeft: wp(14),
                        width: 6,
                        backgroundColor: '#fff',
                      }}
                    />
                  </View>
                </View>

                {/* <ViewPropTypes style={modal.cameraContainer}> */}
                <View style={modal.cameraContainer}>
                  <RNCamera
                    ref={cameraRef}
                    style={modal.preview}
                    type={RNCamera.Constants.Type.back}
                    captureAudio={false}
                  />
                  {/* </ViewPropTypes> */}
                </View>

                <View style={modal.lineContainer}>
                  <View
                    style={{
                      marginRight: 'auto',
                      marginLeft: wp(4),
                    }}>
                    <View
                      style={{
                        height: 61,

                        width: 6,
                        backgroundColor: '#fff',
                      }}
                    />

                    <View
                      style={{
                        height: 6,
                        width: 61,
                        backgroundColor: '#fff',
                      }}
                    />
                  </View>

                  <View style={{marginLeft: 'auto', marginRight: wp(4)}}>
                    <View
                      style={{
                        height: 61,
                        marginLeft: wp(14),
                        width: 6,
                        backgroundColor: '#fff',
                      }}
                    />

                    <View
                      style={{
                        height: 6,
                        width: 61,
                        backgroundColor: '#fff',
                        transform: [{rotate: '360deg'}],
                      }}
                    />
                  </View>
                </View>

                <View style={modal.captureButton}>
                  <TouchableOpacity
                    style={modal.insideCaptureButton}
                    onPress={() => handleAadharCameraUpload()}
                  />
                </View>
              </View>

              <MaterialIcons
                name="cancel"
                size={24}
                color={'#fff'}
                style={modal.cancelContainer}
                onPress={() => setShowCamera(false)}
              />
            </Modal>

            <View style={styles.accountIdBox}>
              <Text
                style={{
                  fontSize: wp(4.5),
                  marginLeft: wp(6),
                  fontFamily: 'Montserrat-Regular',
                  marginBottom: hp(1),
                  color: '#000',
                }}>
                Pan card Number
              </Text>

              <View style={styles.inputContainer}>
                <TextInput
                  placeholder="Pan card Number"
                  placeholderTextColor={'#515151'}
                  style={styles.formText}
                  value={panCardNumber}
                  maxLength={12}
                  onChangeText={handlePanCardNumberChange}
                />
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  marginRight: wp(6),
                  marginTop: hp(1),
                }}>
                <Text style={styles.uploadText}>Upload Image</Text>
                <FontAwesome
                  name="camera"
                  size={20}
                  color="#ED802B"
                  onPress={handleCombinedUploadPan}
                />
              </View>

              {panCardImage === null ? (
                <View
                  style={[
                    styles.uploadDocContainer,
                    {alignItems: 'center', justifyContent: 'center'},
                  ]}>
                  <Text
                    style={{
                      fontSize: wp(3.9),
                      fontFamily: 'Roboto-Regular',
                      color: '#ccc',
                      marginLeft: wp(2),
                    }}>
                    Upload Pan Image
                  </Text>
                </View>
              ) : (
                <TouchableOpacity
                  onPress={handleCombinedUploadPan}
                  style={[
                    styles.uploadDocContainer,
                    {alignItems: 'center', justifyContent: 'center'},
                  ]}>
                  <Image
                    source={{
                      uri: imageUrlRegex?.test(panCardImage)
                        ? panCardImage
                        : panCardImage.uri,
                    }}
                    resizeMode="cover"
                    style={{
                      width: wp(90),
                      height: hp(20),
                      borderRadius: wp(4),
                    }}
                  />
                </TouchableOpacity>
              )}

              <Modal
                style={{margin: 0}}
                animationType="slide"
                transparent={true}
                visible={modalVisiblePan}
                onBackButtonPress={() => {
                  setModalVisiblePan(false);
                }}
                onBackdropPress={() => {
                  setModalVisiblePan(false);
                }}
                onRequestClose={() => {
                  setModalVisiblePan(false);
                }}>
                <View style={styles.modalContainer}>
                  <View style={styles.modalContent}>
                    <TouchableOpacity
                      style={styles.option}
                      onPress={handleShowCameraPan}>
                      <Text
                        style={{
                          fontSize: wp(3.9),
                          fontFamily: 'Roboto-Bold',
                          color: '#fff',
                          marginLeft: wp(2),
                        }}>
                        Take Photo...
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.option}
                      onPress={handlePanCardFileUpload}>
                      <Text
                        style={{
                          fontSize: wp(3.9),
                          fontFamily: 'Roboto-Bold',
                          color: '#fff',
                          marginLeft: wp(2),
                        }}>
                        Choose from Library...
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.option}
                      onPress={() => setModalVisiblePan(false)}>
                      <Text
                        style={{
                          fontSize: wp(3.9),
                          fontFamily: 'Roboto-Bold',
                          color: '#fff',
                          marginLeft: wp(2),
                        }}>
                        Cancel
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>

              {/* Camera Modal For Document Upload */}
              <Modal
                style={modal.modalContainer}
                isVisible={showCameraPan}
                onBackdropPress={() => setShowCameraPan(false)}
                onBackButtonPress={() => setShowCameraPan(false)}>
                <View style={modal.outlineContainer}>
                  <View style={modal.lineContainer}>
                    <View style={{marginRight: 'auto', marginLeft: wp(4)}}>
                      <View
                        style={{
                          height: 6,
                          width: 61,
                          backgroundColor: '#fff',
                        }}
                      />

                      <View
                        style={{
                          height: 61,
                          width: 6,
                          backgroundColor: '#fff',
                        }}
                      />
                    </View>

                    <View style={{marginLeft: 'auto', marginRight: wp(4)}}>
                      <View
                        style={{
                          height: 6,
                          width: 61,
                          backgroundColor: '#fff',
                          transform: [{rotate: '360deg'}],
                        }}
                      />

                      <View
                        style={{
                          height: 61,
                          marginLeft: wp(14),
                          width: 6,
                          backgroundColor: '#fff',
                        }}
                      />
                    </View>
                  </View>

                  {/* <ViewPropTypes style={modal.cameraContainer}> */}
                  <View style={modal.cameraContainer}>
                    <RNCamera
                      ref={cameraRef}
                      style={modal.preview}
                      type={RNCamera.Constants.Type.back}
                      captureAudio={false}
                    />
                    {/* </ViewPropTypes> */}
                  </View>

                  <View style={modal.lineContainer}>
                    <View
                      style={{
                        marginRight: 'auto',
                        marginLeft: wp(4),
                      }}>
                      <View
                        style={{
                          height: 61,

                          width: 6,
                          backgroundColor: '#fff',
                        }}
                      />

                      <View
                        style={{
                          height: 6,
                          width: 61,
                          backgroundColor: '#fff',
                        }}
                      />
                    </View>

                    <View style={{marginLeft: 'auto', marginRight: wp(4)}}>
                      <View
                        style={{
                          height: 61,
                          marginLeft: wp(14),
                          width: 6,
                          backgroundColor: '#fff',
                        }}
                      />

                      <View
                        style={{
                          height: 6,
                          width: 61,
                          backgroundColor: '#fff',
                          transform: [{rotate: '360deg'}],
                        }}
                      />
                    </View>
                  </View>

                  <View style={modal.captureButton}>
                    <TouchableOpacity
                      style={modal.insideCaptureButton}
                      onPress={() => handlePanCardCameraUpload()}
                    />
                  </View>
                </View>

                <MaterialIcons
                  name="cancel"
                  size={24}
                  color={'#fff'}
                  style={modal.cancelContainer}
                  onPress={() => setShowCameraPan(false)}
                />
              </Modal>

              <TouchableOpacity
                style={styles.loginButton}
                onPress={handleButtonPress}>
                <Text style={styles.loginButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>

      <View style={styles.bottomNavigatorBox}>
        <BottomNavigator
          navigation={props.navigation}
          parent="MyprofileScreen"
        />
      </View>
    </View>
  );
};

export default MyprofileScreen;
const styles = StyleSheet.create({
  profileIcon: {
    height: hp(10),
    width: wp(20),
    borderRadius: wp(4),
    alignSelf: 'center',
  },

  editFieldContainer: {
    marginTop: hp(2),
  },

  inputContainer: {
    height: hp(7),
    marginHorizontal: wp(6),
    borderRadius: wp(2),
    borderWidth: 0.5,
    borderColor: '#D1CACA',
  },
  formText: {
    marginLeft: wp(4),
    fontSize: wp(3.5),
    color: '#000',
    fontFamily: 'Montserrat-Regular',
  },
  uploadDocContainer: {
    height: hp(20),
    marginHorizontal: wp(6),
    borderRadius: wp(1),
    marginVertical: hp(2),
    borderWidth: 0.2,
    borderColor: '#555',
  },

  modalContent: {
    backgroundColor: '#ED802B',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    padding: 20,
    top: hp(37.5),
    width: '100%',
  },

  option: {
    padding: 10,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },

  contianer: {
    flex: 1,
    backgroundColor: '#fff',
  },

  homeContainer: {
    flex: 1,
    marginTop: hp(1),
    backgroundColor: '#fff',
  },

  loginText: {
    fontSize: wp(7),
    fontFamily: 'Montserrat-Bold',
    marginLeft: wp(6),
    color: '#ed802b',
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

  uploadText: {
    fontSize: wp(4),
    color: '#000',
    fontFamily: 'Montserrat-Regular',
    marginRight: wp(2),
  },

  loginButton: {
    height: hp(6),
    marginHorizontal: wp(6),
    borderRadius: wp(4),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ed802b',
    marginTop: hp(10),
    marginRight: wp(4),
    marginBottom: hp(2),
  },

  loginButtonText: {
    fontSize: wp(6),
    color: '#fff',
    fontFamily: 'Montserrat-Regular',
  },

  Ima_AdharCardImage: {
    height: hp(25),
    width: wp(88),
    marginTop: hp(2),
    borderRadius: wp(2),
    alignSelf: 'center',
    // borderWidth: 1,
  },

  vectorIcon: {
    height: hp(2.5),
    width: wp(5),
    marginTop: hp(2),
    marginLeft: wp(1),
  },

  bottomNavigatorBox: {
    marginBottom: hp(-2),
  },
});
// Modal Style
const modal = StyleSheet.create({
  modalContainer: {
    backgroundColor: '#303030',
    maxHeight: 700,
    borderRadius: wp(2),
    top: hp(5),
  },
  cancelContainer: {
    position: 'absolute',
    right: 0,
    top: 0,
    margin: wp(2),
    width: wp(7),
    height: hp(4),
    marginTop: hp(2),
  },
  outlineContainer: {},
  takeSelfieText: {
    fontSize: wp(3.8),
    fontFamily: 'Roboto-Bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: hp(10),
  },
  lineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cameraContainer: {
    height: hp(40),
    // flex: 1,
    // width: wp(20),
    // alignItems: 'center',
    justifyContent: 'center',
    // borderWidth: 1,
    // marginHorizontal: wp(4),
    // marginVertical: hp(2),
    marginHorizontal: wp(10),
    // paddingVertical: hp(10),
  },
  preview: {
    // flex: 1,
    height: hp(47),
    // width: wp(40),
    // justifyContent: 'center',
    // alignItems: 'center',
    // justifyContent: 'flex-end',
    // alignItems: 'center',
    marginHorizontal: wp(4),
    // marginVertical: hp(2),
  },
  captureButton: {
    width: 70,
    height: 70,
    borderWidth: 3,
    borderColor: '#fff',
    borderRadius: wp(100),
    alignSelf: 'center',
    marginVertical: hp(2),
    alignItems: 'center',
    justifyContent: 'center',
  },
  insideCaptureButton: {
    width: wp(18),
    height: hp(9),
    borderRadius: wp(100),
    backgroundColor: '#4f4f4f',
  },
  captureContainer: {
    alignSelf: 'center',
    height: hp(40),
    width: wp(78),
    padding: wp(2),
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageStyle: {
    height: hp(47),
    aspectRatio: 3 / 4,
    marginHorizontal: wp(2),
  },
  buttonOptions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp(5),
    marginTop: hp(6),
  },
  retakeButton: {
    height: hp(5),
    width: wp(35),
    borderWidth: 2,
    borderRadius: wp(2),
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#fff',
  },
  retakeText: {
    fontSize: wp(3.9),
    fontFamily: 'Roboto-Bold',
    color: '#fff',
  },
  submitButton: {
    height: hp(5),
    width: wp(35),
    borderRadius: wp(2),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  submitText: {
    fontSize: wp(3.9),
    fontFamily: 'Roboto-Bold',
    color: '#002366',
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
