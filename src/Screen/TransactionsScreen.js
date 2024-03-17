import {
  View,
  Text,
  Image,
  FlatList,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {StyleSheet} from 'react-native';

// Icon
import ic_vector from '../assets/icon/vector.png';
import ic_withdrawal from '../assets/icon/withdrawel.png';
import ic_receive from '../assets/icon/receive.png';
import BottomNavigator from '../Navigation/BottomNavigator';
import {async_keys, getData} from '../api/UserPreference';
import {BASE_URL} from '../api/ApiInfo';

const TransactionsScreen = props => {
  const {navigation} = props;

  const [transactionData, setTransactionData] = useState('');
  console.log('transactionData.transactionData', transactionData);
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    const get_Data = async () => {
      const auth_token = await getData(async_keys.token);
      TransactionData(auth_token);
      console.log('auth_token', auth_token);
    };
    get_Data();
  }, []);

  const TransactionData = async token => {
    try {
      setLoader(true);
      const myHeaders = new Headers();
      myHeaders.append('Authorization', `Bearer ${token}`);

      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow',
      };

      const response = await fetch(`${BASE_URL}transactions`, requestOptions);
      const newResponse = await response.json();
      const {Status, Data} = newResponse;
      if (Status === true) {
        setTransactionData(Data);
        console.log('transactionData.lengthhhh', transactionData.length);
        setLoader(false);
      } else {
        Alert.alert('', 'Unauthrized user');
        setLoader(false);
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

  const renderItem = ({item}) => {
    const date = item?.date;

    return (
      <View style={[styles.planNameBox]}>
        <View style={styles.maniBox}>
          <View style={{flexDirection: 'row'}}>
            <Image source={ic_withdrawal} style={styles.withdrawalIcon} />
            <View style={styles.nameBox}>
              <Text style={styles.nameText}>Name - {item?.planName}</Text>

              <Text style={styles.nameText}>
                Date -{date.length > 14 ? date.slice(0, 10) + ' ' : date}
              </Text>

              <Text style={styles.nameText}>
                Paid by - {item.transaction_mode}
              </Text>
            </View>
          </View>

          <View>
            <Text style={styles.nameText}>Ammount</Text>
            <Text style={styles.ammountText}>{item.amount}</Text>
            {item?.type === 'Received' ? (
              <Text style={[styles.ammountText, {color: 'green'}]}>
                {item?.type}
              </Text>
            ) : (
              <Text style={[styles.ammountText, {color: '#FF0000'}]}>
                {item?.type}
              </Text>
            )}
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
        <Text style={styles.TransactionsText}>Transactions</Text>
      </View>

      {/* <ScrollView> */}
      <View style={styles.homeContainer}>
        {/* <View style={styles.planNameBox}>
          <View style={styles.maniBox}>
            <View style={{flexDirection: 'row'}}>
              <Image source={ic_receive} style={styles.withdrawalIcon} />
              <View style={styles.nameBox}>
                <Text style={styles.nameText}>Name - Diamond plan</Text>
                <Text style={styles.nameText}>Date - 29-9-2023 </Text>
                <Text style={styles.nameText}>Paid by - Upi</Text>
              </View>
            </View>

            <View>
              <Text style={styles.nameText}>Ammount</Text>
              <Text style={styles.ammountText}>22,000</Text>
              <Text style={[styles.ammountText, {color: '#FF0000'}]}>
                Failed
              </Text>
            </View>
          </View>
        </View> */}
        {transactionData.length > 0 ? (
          <FlatList data={transactionData} renderItem={renderItem} />
        ) : (
          <View style={styles.noTransactionBox}>
            <Text style={styles.noTransactionData}>No transaction found</Text>
          </View>
        )}
      </View>
      <View style={styles.bottomNavigatorBox}>
        <BottomNavigator
          navigation={props.navigation}
          parent="TransactionsScreen"
        />
      </View>
    </View>
  );
};

export default TransactionsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  homeContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },

  vectorIcon: {
    height: hp(2.5),
    width: wp(5),
  },

  headerBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp(3),
    marginBottom: hp(3),
    marginLeft: wp(4),
  },
  TransactionsText: {
    fontSize: wp(5),
    color: '#000',
    fontFamily: 'Montserrat-Medium',
    marginLeft: wp(4),
  },

  planNameBox: {
    height: hp(11),
    marginHorizontal: wp(4),
    borderRadius: wp(2),
    borderWidth: 0.5,
    borderColor: '#D1CACA',
  },

  withdrawalIcon: {
    height: hp(6),
    width: wp(12),
    marginTop: hp(1),
    borderRadius: wp(2),
  },

  nameBox: {
    marginLeft: wp(4),
  },

  maniBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: wp(2),
    marginTop: hp(1.3),
  },

  nameText: {
    fontSize: wp(4),
    fontFamily: 'Montserrat-Regular',
    color: '#000',
  },

  ammountText: {
    fontSize: wp(4),
    fontFamily: 'Montserrat-Regular',
    color: '#ED802B',
    // marginLeft: wp(3),
    alignSelf: 'center',
  },

  bottomNavigatorBox: {
    marginBottom: hp(-2),
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
