import AsyncStorage from '@react-native-async-storage/async-storage';

export const async_keys = {
  is_register: 'is_register',
  Status: 'Status',
  mobile: 'mobile',
  sub_id: 'sub_id',
  subForPass: 'subForPass',
  visitor_id: 'visitor_id',
  visitor: 'visitor',
  visiterName: 'visiterName',
  type: 'type',
  token: 'token',
  otp: 'otp',
  addharImage: 'addharImage',
  panCardImage: 'panCardImage',
  aadharNumber: 'aadharNumber',
  panCardNumber: 'panCardNumber',
  KycVerification: 'KycVerification',
  loginSubscriber: 'loginSubscriber',
  loginVisiter: 'loginVisiter',
};

export const storeData = async (key, data) => {
  try {
    const info = JSON.stringify(data);
    await AsyncStorage.setItem(key, info);
  } catch (error) {
    console.log(error.message);
  }
};

export const getData = async key => {
  try {
    const data = await AsyncStorage.getItem(key);
    const info = JSON.parse(data);
    return info;
  } catch (error) {
    console.log(error.message);
    return null;
  }
};

export const clearData = async () => {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    console.log(error.message);
    return null;
  }
};
