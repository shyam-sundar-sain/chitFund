import {Alert, PermissionsAndroid, Platform} from 'react-native';
import {PERMISSIONS, request} from 'react-native-permissions';
import RNFetchBlob from 'rn-fetch-blob';

export const downloadImage = async (url, name, setLoader) => {
  console.log('urlllll', url);
  try {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
      ]);

      if (
        granted['android.permission.READ_MEDIA_IMAGES'] === 'granted' ||
        granted['android.permission.WRITE_EXTERNAL_STORAGE'] === 'granted'
      ) {
        download(url, name, setLoader);
      }
    } else if (Platform.OS === 'ios') {
      const grant = await request(PERMISSIONS.IOS.PHOTO_LIBRARY);
      if (grant === 'granted' || grant === 'limited') {
        download(url, name, setLoader);
      }
    }
  } catch (err) {
    if (setLoader) {
      setLoader(false);
    }
    //  console.log(err);
  }
};

const download = async (url, name, setLoader) => {
  try {
    if (setLoader) {
      setLoader(true);
    }
    // let date = new Date();
    let image_URL = url;

    const origExt = /[.]/.exec(image_URL)
      ? /[^.]+$/.exec(image_URL)
      : undefined;

    const ext = '.' + origExt[0];

    const {config, fs} = RNFetchBlob;

    let DownloadDir =
      Platform.OS === 'ios' ? fs.dirs.DocumentDir : fs.dirs.DownloadDir;

    const destination_path = DownloadDir + `/${name}` + ext;

    // if (await fs.exists(destination_path)){
    //   await fs.unlink(destination_path);
    // }

    const configOptions = Platform.select({
      ios: {
        fileCache: true,
        path: destination_path,
        appendExt: origExt,
        notification: true,
      },

      android: {
        fileCache: true,
        addAndroidDownloads: {
          useDownloadManager: true,
          path: destination_path,
          notification: true,
          description: 'Image',
        },
      },
    });

    config(configOptions)
      .fetch('GET', image_URL)

      .then(res => {
        if (Platform.OS === 'ios') {
          RNFetchBlob.ios.openDocument(res.data);
        }

        if (setLoader) {
          setLoader(false);
        }

        // Show an alert message when the download is complete
        Alert.alert(
          'Download Complete',
          'The image has been downloaded successfully!',
        );
      })
      .catch(er => {
        if (setLoader) {
          setLoader(false);
        }
        console.log(er);
      });
  } catch (error) {
    if (setLoader) {
      setLoader(false);
    }
    //  console.log(error);
  }
};
