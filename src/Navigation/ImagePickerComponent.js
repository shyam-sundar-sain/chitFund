/* eslint-disable prettier/prettier */
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
  PermissionsAndroid,
  Platform,
  Modal,
} from 'react-native';
import React, {useRef, useEffect, useState, useLayoutEffect} from 'react';
import RnModal from 'react-native-modal';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import {RNCamera} from 'react-native-camera';
import DocumentPicker from 'react-native-document-picker';
import ImageResizer from 'react-native-image-resizer';

//ICONS
import ic_gallery from '../assets/icons/gallery.png';
import ic_camera from '../assets/icons/camera.png';
import ic_switch_camera from '../assets/icons/switch-camera.png';
import {Icon} from '@rneui/themed';

const CameraScreen = ({setShowCamera, showCamera, handleResizing}) => {
  const cameraRef = useRef(null);
  const [cameraType, setCameraType] = useState(RNCamera.Constants.Type.back);

  const switchCameraType = () => {
    setCameraType(prevType =>
      prevType === RNCamera.Constants.Type.back
        ? RNCamera.Constants.Type.front
        : RNCamera.Constants.Type.back,
    );
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const options = {quality: 0.2, base64: false};
        const data = await cameraRef.current.takePictureAsync(options);

        setShowCamera(false);
        handleResizing(data);

        // Here, you can do whatever you want with the captured picture data.
      } catch (error) {
        console.log('Error taking picture:', error);
      }
    }
  };

  return (
    <Modal visible={showCamera} onRequestClose={() => setShowCamera(false)}>
      <View
        style={[
          cameraStyles.captureButtonContainer,
          {
            flex: 0.5,
            justifyContent: 'flex-start',
          },
        ]}>
        <TouchableOpacity
          style={{marginHorizontal: wp(4)}}
          onPress={() => setShowCamera(false)}>
          <Icon
            raised
            type="material-icons"
            name="arrow-back-ios"
            size={12}
            iconStyle={{
              fontSize: wp(6),
            }}
            containerStyle={{margin: 0}}
          />
        </TouchableOpacity>
      </View>

      <RNCamera
        pictureSize="322x332"
        ref={cameraRef}
        style={{
          flex: 4,
        }}
        type={cameraType}
        flashMode={RNCamera.Constants.FlashMode.auto}
        captureAudio={false}
      />
      <View style={cameraStyles.captureButtonContainer}>
        <TouchableOpacity
          onPress={takePicture}
          style={cameraStyles.camButton}
        />

        <TouchableOpacity
          style={{alignSelf: 'center', right: wp(15), position: 'absolute'}}
          onPress={switchCameraType}>
          <Image source={ic_switch_camera} style={{width: 30, height: 30}} />
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const cameraStyles = StyleSheet.create({
  captureButtonContainer: {
    flex: 1,
    backgroundColor: '#000',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  camButton: {
    height: 70,
    width: 70,
    borderRadius: 40,
    backgroundColor: '#fff',
    borderWidth: 4,
    borderColor: '#B2BEB5',
  },
});

//#######################
const ImagePickerComponent = ({
  isVisible,
  setIsVisible,
  handleDone,
  navigation,
}) => {
  const [showCamera, setShowCamera] = useState(false);

  const handleModal = () => setIsVisible(!isVisible);

  const handleCamera = async () => {
    handleModal();
    setShowCamera(true);
  };

  const handleLibrary = async () => {
    handleModal();
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
      // console.log(result);
      const data = result[0];

      handleResizing({...data});
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User cancelled document picker');
      } else {
        console.error('Error while picking a document:', err);
      }
    }
  };

  const handleResizing = picData => {
    const newWidth = 322;
    const newHeight = 332;
    const uri = picData.uri;
    ImageResizer.createResizedImage(
      uri,
      newWidth,
      newHeight,
      'JPEG',
      20,
      0,
      null,
      true,
      {mode: 'stretch', onlyScaleDown: true},
    )
      .then(resized => {
        // console.log('resized==>>', resized);
        handleDone({
          name: resized.name,
          type: 'image/jpeg',
          uri: resized.uri,
        });
      })
      .catch(error => console.log(error));
  };

  return showCamera ? (
    <CameraScreen
      setShowCamera={setShowCamera}
      showCamera={showCamera}
      handleResizing={handleResizing}
      handleModal={handleModal}
    />
  ) : (
    <RnModal
      isVisible={isVisible}
      useNativeDriver
      style={[
        showCamera
          ? {
              top: -18,
              left: 0,
              justifyContent: 'flex-start',
            }
          : {
              width: wp(120),
              left: -18,
              justifyContent: 'flex-end',
            },
      ]}
      onBackButtonPress={handleModal}
      onBackdropPress={handleModal}>
      <View style={styles.modalContainer}>
        <TouchableOpacity onPress={handleCamera} style={styles.buttonContainer}>
          <View style={styles.iconContainer}>
            <Image source={ic_camera} style={styles.icon} />
          </View>

          <Text style={styles.text}>Camera</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleLibrary}
          style={styles.buttonContainer}>
          <View style={styles.iconContainer}>
            <Image source={ic_gallery} style={styles.icon} />
          </View>

          <Text style={styles.text}>Gallery</Text>
        </TouchableOpacity>
      </View>
    </RnModal>
  );
};

export default ImagePickerComponent;

const styles = StyleSheet.create({
  modal: {
    width: wp(120),
    left: -18,
    justifyContent: 'flex-end',
  },
  modalContainer: {
    flex: 1,
    maxHeight: 100,
    backgroundColor: '#c1c1c1',
    bottom: -20,
    flexDirection: 'row',
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: wp(7),
  },
  iconContainer: {
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#00bf00',
    padding: 13,
  },
  icon: {
    width: 25,
    height: 25,
  },
  text: {color: '#00BF00'},
});
