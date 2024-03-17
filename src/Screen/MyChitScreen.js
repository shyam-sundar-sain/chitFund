import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// Icon
import ic_vector from '../assets/icon/vector.png';
import ic_myChits from '../assets/icon/myChits.png';
import ic_money from '../assets/icon/money.png';
import {async_keys, getData} from '../api/UserPreference';
import {BASE_URL} from '../api/ApiInfo';
import {FlatList} from 'react-native-gesture-handler';

const MyChitScreen = ({navigation}) => {
  const [loader, setLoader] = useState(false);
  const [chitData, setChitData] = useState('');
  console.log('chitDatagg lenght', chitData.length);

  useEffect(() => {
    const my_chitData = async () => {
      const get_myChit = await getData(async_keys.token);
      console.log('get_myChit,,,,', get_myChit);
      fetch_myChit(get_myChit);
    };
    my_chitData();
  }, []);

  const fetch_myChit = async auth_token => {
    try {
      setLoader(true);
      const myHeaders = new Headers();
      myHeaders.append('Authorization', `Bearer ${auth_token}`);

      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow',
      };

      const response = await fetch(`${BASE_URL}my_chits`, requestOptions);
      const newResponse = await response.json();
      const {Status, Data} = newResponse;
      if (Status === true) {
        setChitData(Data);
        setLoader(false);
      } else {
        setLoader(false);
        Alert.alert('', 'Unauthrized user');
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  if (loader) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator color="green" size="large" />
      </View>
    );
  }

  const myChitItem = ({item}) => {
    return (
      <View style={styles.MainBox}>
        <View style={styles.testPlanBox}>
          <Text style={styles.testPlanText}>{`${item.plan_name}`}</Text>
          <Text style={styles.slotNumberText}>
            Slot Number -
            <Text
              style={[styles.slotNumberText, {fontFamily: 'Roboto-Regular'}]}>
              {`${item.slot_number}`}
            </Text>
          </Text>
        </View>

        <Text style={styles.discountText}>
          Discount Amount
          <Text style={[styles.discountText, {fontFamily: 'Roboto-Medium'}]}>
            {` - ₹${item.discount_amount}`}
          </Text>
        </Text>
        <Text style={styles.myChitText}>
          Chit
          <Text
            style={[
              styles.myChitText,
              {
                fontFamily: 'Roboto-Medium',
              },
            ]}>
            {` - ${item.chit_amount}`}
          </Text>
        </Text>
        <View style={styles.crossChitBox}>
          <View style={styles.myChitBox}>
            <Image source={ic_myChits} style={styles.myChitsIcon} />
            <Text style={styles.crossChitText}>
              Cross Chit
              <Text
                style={[styles.crossChitText, {fontFamily: 'Roboto-Regular'}]}>
                {` - ${item.gross_chit}`}
              </Text>
            </Text>
          </View>

          <View style={[styles.myChitBox]}>
            <Image source={ic_money} style={styles.myChitsIcon} />
            <Text style={styles.fessText}>
              Fees
              <Text style={[styles.fessText, {fontFamily: 'Roboto-Regular'}]}>
                {` - ${item.fees}`}
              </Text>
            </Text>
          </View>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.headerBox}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={ic_vector} style={styles.vectorIcon} />
        </TouchableOpacity>
        <Text style={styles.TransactionsText}>My Chits</Text>
      </View>

      <View style={styles.homeContainer}>
        {chitData.length > 0 ? (
          <FlatList data={chitData} renderItem={myChitItem} />
        ) : (
          <View style={styles.noTransactionBox}>
            <Text style={styles.noTransactionData}>No data found</Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default MyChitScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  homeContainer: {
    flex: 1,
  },
  headerBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp(2),
    marginLeft: wp(4),
    marginBottom: hp(3),
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

  NotificationIcon: {
    height: hp(4),
    width: wp(8),
  },

  MainBox: {
    height: hp(20),
    marginHorizontal: wp(4),
    backgroundColor: '#ED802B',
    borderRadius: wp(4),
    // marginTop: hp(2),
  },

  testPlanText: {
    fontSize: wp(5),
    color: '#fff',
    fontFamily: 'Montserrat-Bold',
  },

  slotNumberText: {
    fontSize: wp(3.5),
    color: '#fff',
    fontFamily: 'Montserrat-Medium',
  },

  testPlanBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: wp(4),
    marginTop: hp(2),
    alignItems: 'center',
  },

  discountText: {
    marginLeft: wp(4),
    marginTop: hp(0.5),
    fontFamily: 'Montserrat-Regular',
    color: '#fff',
  },

  myChitText: {
    marginLeft: wp(4),
    fontFamily: 'Montserrat-Regular',
    color: '#fff',
  },

  myChitsIcon: {
    height: hp(4),
    width: wp(8),
  },

  myChitBox: {
    alignItems: 'center',
  },

  crossChitBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: wp(4),
    marginTop: hp(1),
    // alignItems: 'center',
  },

  crossChitText: {
    fontSize: wp(4),
    color: '#fff',
    fontFamily: 'Montserrat-Regular',
  },

  fessText: {
    fontSize: wp(4),
    color: '#fff',
    fontFamily: 'Montserrat-Regular',
  },

  noTransactionBox: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
  },

  noTransactionData: {
    fontSize: wp(5),
    color: '#000',
    fontFamily: 'Montserrat-Regular',
  },
});
