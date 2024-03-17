import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
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
import {Dropdown} from 'react-native-element-dropdown';
import {async_keys, getData, storeData} from '../api/UserPreference';
import {BASE_URL} from '../api/ApiInfo';

const ForgetPasswordIdScreen = ({navigation}) => {
  const [selectedId, setSelectedId] = useState(null);
  const [loader, setLoader] = useState('');

  const [id, setId] = useState([]);
  const formattedData = id.map(item => ({label: item, value: item}));

  useEffect(() => {
    const pass = async () => {
      const get = await getData(async_keys.sub_id);
      setId(get);
    };
    pass();
  }, []);

  const handleNext = async () => {
    if (selectedId === '') {
      Alert.alert('', 'Please select your subscribe id ');
      return true;
    }

    try {
      setLoader(true);
      const params = {
        sub_id: selectedId,
      };

      const formData = new FormData();
      for (let key in params) {
        formData.append(key, params[key]);
      }

      var info = {};
      info.method = 'POST';
      info.body = formData;

      const response = await fetch(`${BASE_URL}forget_password`, info);
      // console.log('response', response);
      const newResponse = await response.json();
      // console.log('newResponse', newResponse);
      const {Status, Message, Data} = newResponse;
      if (Status === true) {
        console.log(',,Data', Data);
        await storeData(async_keys.subForPass, Data.sub_id);
        navigation.navigate('OtpVerificationScreen');
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
    <View style={styles.container}>
      <View style={styles.headerBox}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={ic_vector} style={styles.vectorIcon} />
        </TouchableOpacity>
      </View>

      <View style={styles.accountIdBox}>
        <Text style={styles.phoneNumberText}>Subscriber Id </Text>
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
      </View>

      <TouchableOpacity style={styles.saveChangeButton} onPress={handleNext}>
        <Text style={styles.saveChangeText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ForgetPasswordIdScreen;
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

  vectorIcon: {
    height: hp(2, 5),
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
    marginTop: hp(75),
  },

  saveChangeText: {
    fontSize: wp(6),
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
    fontSize: wp(4),
    color: '#515151',
    fontFamily: 'Montserrat-Regular',
  },
  // ????????????????????????????????/
  inputContainer: {
    height: hp(7),
    marginHorizontal: wp(6),
    marginBottom: hp(1),
    borderRadius: wp(2),
    borderWidth: 0.5,
    borderColor: '#D1CACA',
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
  },
  iconStyle: {
    width: 20,
    height: 20,
    marginRight: wp(4),
    marginTop: hp(2),
  },
});
