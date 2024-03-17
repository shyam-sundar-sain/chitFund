import React, {useState, useRef, useEffect} from 'react';
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
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Modal from 'react-native-modal';
import {RNCamera} from 'react-native-camera';
import {ViewPropTypes} from 'deprecated-react-native-prop-types';
import {useCamera} from 'react-native-camera-hooks';
import ImageResizer from 'react-native-image-resizer';

import RNFetchBlob from 'rn-fetch-blob';
import {async_keys, getData, storeData} from '../api/UserPreference';
import {BASE_URL} from '../api/ApiInfo';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const KycVerificationAdhar = ({navigation}) => {
  // validation
  const handleAdharCardNumber = async () => {
    if (panCardNumber.trim() === '') {
      Alert.alert('', 'Please enter your pan number');
      return true;
    }

    if (panCardImage === null) {
      Alert.alert('', 'Please enter pan card image');
      return true;
    }

    try {
      setLoader(true);

      const params = {
        pan_number: panCardNumber,
        pan_image: {
          name: panCardImage.name,
          uri: panCardImage.uri,
          type: 'image/jpeg',
        },
        visitor_id: visiterIdData,
        aadhar_number: aadharNumberData,
        aadhar_image: {
          name: aadharImageData.name,
          uri: aadharImageData.uri,
          type: 'image/jpeg',
        },
      };

      const formdata = new FormData();
      for (let key in params) {
        formdata.append(key, params[key]);
      }
      var info = {};
      info.method = 'POST';
      info.body = formdata;

      console.log('infok', info);

      const response = await fetch(`${BASE_URL}upload_kyc`, info);
      const newResponse = await response.json();
      console.log('response &&&&&', response);
      console.log('newResponse &&&&&', newResponse);
      const {Status, Message} = newResponse;
      if (Status === true) {
        await storeData(async_keys.KycVerification, true);
        navigation.navigate('SuccessDocumentScreen');
        setLoader(false);
      } else {
        setLoader(false);
        alert(Message);
      }
    } catch (error) {
      setLoader(false);
      console.log('error', error);
    }
  };

  useEffect(() => {
    const pan_Image = async () => {
      await getData(async_keys.panCardImage);
    };
    pan_Image();
  }, []);

  useEffect(() => {
    const adhar_Data = async () => {
      const get_aadharNumber = await getData(async_keys.aadharNumber);
      const get_aadharImage = await getData(async_keys.addharImage);
      const get_visiterId = await getData(async_keys.visitor_id);
      // console.log('get_visiterId lpppppppppppp', get_visiterId);
      setVisiterIdData(get_visiterId);
      setAadharNumberData(get_aadharNumber);
      // console.log('get_aadharImage ad', get_aadharImage);
      setAadharImageData(get_aadharImage);
    };
    adhar_Data();
  }, []);

  const [panCardNumber, setPanCardNumber] = useState('');
  const [panCardImage, setPanCardImage] = useState(null);
  const [{cameraRef}, {takePicture}] = useCamera(null);
  const [showCamera, setShowCamera] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [loader, setLoader] = useState(false);
  const [aadharNumberData, setAadharNumberData] = useState(false);
  const [aadharImageData, setAadharImageData] = useState(false);
  const [visiterIdData, setVisiterIdData] = useState(false);

  const animationRef = useRef(null);
  // Document Section
  const handlePanCardNumberChange = panCardNumber => {
    setPanCardNumber(panCardNumber);
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

  useEffect(() => {
    if (animationRef.current) {
      animationRef.current.play();
    }
    // getUserProfileDetail();
  }, []);

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
        const imagePath = resizedImageURI.path;

        // Use rn-fetch-blob to read the image file
        const imageBase64 = await RNFetchBlob.fs.readFile(imagePath, 'base64');

        setPanCardImage(resizedImageURI);
        setShowCamera(false);
        setModalVisible(false);
      }
    });
  };
  const handleAadharCameraUpload = async () => {
    try {
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
      setShowCamera(false);
      setModalVisible(false);
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
    <KeyboardAwareScrollView enableOnAndroid>
      <View style={styles.contianer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            marginLeft: wp(6),
            alignSelf: 'flex-start',
            marginTop: hp(2),
            marginBottom: hp(1),
          }}>
          <Image source={ic_vector} style={styles.vectorIcon} />
        </TouchableOpacity>

        <View style={styles.homeContainer}>
          <Text style={styles.loginText}>Kyc verification</Text>
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
                onPress={handleCombinedUpload}
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
                  Upload pan Image
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

            <TouchableOpacity
              style={styles.loginButton}
              onPress={handleAdharCardNumber}>
              <Text style={styles.loginButtonText}>Next</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default KycVerificationAdhar;

const styles = StyleSheet.create({
  editFieldContainer: {
    marginTop: hp(2),
  },

  inputContainer: {
    height: hp(7),
    marginHorizontal: wp(6),
    borderWidth: 0.2,
    borderRadius: wp(1),
  },
  formText: {
    marginLeft: wp(4),
    fontSize: wp(3.5),
    color: '#515151',
    fontFamily: 'Montserrat-Regular',
  },
  uploadDocContainer: {
    height: hp(20),
    marginHorizontal: wp(6),
    borderRadius: wp(4),
    marginVertical: hp(2),
    borderWidth: 1,
    borderColor: '#D1CACA',
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
  ///////
  contianer: {
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
    marginLeft: wp(6),
    color: '#ed802b',
    marginBottom: hp(1),
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
    fontSize: wp(4),
    color: '#515151',
    fontFamily: 'Montserrat-Regular',
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
    marginTop: hp(40),
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
    justifyContent: 'center',
    marginHorizontal: wp(10),
  },

  preview: {
    height: hp(47),
    marginHorizontal: wp(4),
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
});
