import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// Icon
import ic_vector from '../assets/icon/vector.png';
import ic_myChits from '../assets/icon/myChits.png';
import ic_costs from '../assets/icon/costs.png';
import ic_community from '../assets/icon/community.png';
import ic_rightArrow from '../assets/icon/rightArrow.png';
import {async_keys, getData} from '../api/UserPreference';
import {BASE_URL} from '../api/ApiInfo';
import {FlatList} from 'react-native-gesture-handler';
import {ActivityIndicator} from 'react-native';
import BottomNavigator from '../Navigation/BottomNavigator';

const SubscriptionScreen = props => {
  const {navigation} = props;
  const [loader, setLoader] = useState('');
  const [planData, setPlanData] = useState('');

  useEffect(() => {
    const pass = async () => {
      const auth_token = await getData(async_keys.token);
      fetchData(auth_token);
    };
    pass();
  }, []);

  const fetchData = async auth_token => {
    try {
      setLoader(true);

      const myHeaders = new Headers();
      myHeaders.append('Authorization', `Bearer ${auth_token}`);

      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow',
      };

      const response = await fetch(`${BASE_URL}subscriptions`, requestOptions);

      const newResponse = await response.json();
      const {Status, Data} = newResponse;

      if (Status === true) {
        setPlanData(Data);
        setLoader(false);
      } else {
        setLoader(false);
        Alert.alert('', 'Unauthrized user');
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const renderItem = ({item}) => {
    const dateData = item.start_month;
    const formatDate = dateString => {
      const options = {day: 'numeric', month: 'short', year: 'numeric'};
      const formattedDate = new Date(dateString).toLocaleDateString(
        undefined,
        options,
      );

      return formattedDate;
    };
    const formattedDate = formatDate(dateData);

    return (
      <View style={[styles.MainBox, {marginTop: hp(2)}]}>
        <View style={styles.testPlanBox}>
          <Text style={styles.testPlanText}> {`${item.plan_name}`}</Text>
        </View>
        <Text style={styles.discountText}>
          {`Subscription ID -${item.user_id}`}
        </Text>
        <Text style={styles.myChitText}>{formattedDate}</Text>
        <View style={styles.crossChitBox}>
          <View style={styles.myChitBox}>
            <Image source={ic_myChits} style={styles.myChitsIcon} />
            <Text style={styles.chitEmiText}> {`₹${item.emi}/`}</Text>
            <Text style={[styles.chitEmiText, {fontSize: wp(3)}]}>
              {'month'}
            </Text>
          </View>

          <View style={[styles.myChitBox]}>
            <Image source={ic_costs} style={styles.myChitsIcon} />
            <Text style={styles.chitEmiText}>{`₹${item.plan_amount}`}</Text>
          </View>

          <View style={[styles.myChitBox, {marginTop: hp(1)}]}>
            <Image
              source={ic_community}
              style={[styles.myChitsIcon, {marginBottom: hp(-3)}]}
            />

            <Text style={[styles.auctionText, {marginTop: hp(2)}]}>
              {`${item.total_subscription} Person`}
            </Text>
          </View>
        </View>
        <View
          style={styles.rightarrowBox}
          // onPress={() => toggleModal(item)}
        >
          <Text style={styles.ViewDetailsText}>View Details</Text>
          <Image source={ic_rightArrow} style={styles.rightArrowIcon} />
        </View>
      </View>
    );
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
        <Text style={styles.TransactionsText}>Subscriptions</Text>
      </View>

      <View style={styles.homeContainer}>
        <View style={styles.homeContainer}>
          {planData.length > 0 ? (
            <FlatList
              data={planData}
              renderItem={renderItem}
              containerStyle={{borderWidth: 1}}
            />
          ) : (
            <View style={styles.noTransactionBox}>
              <Text style={styles.noTransactionData}>No data found </Text>
            </View>
          )}

          <View style={styles.bottomNavigatorBox}>
            <BottomNavigator navigation={props.navigation} />
          </View>
        </View>
      </View>
    </View>
  );
};

export default SubscriptionScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  homeContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp(2),
    marginLeft: wp(4),
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
    height: hp(26),
    marginHorizontal: wp(4),
    backgroundColor: '#ED802B',
    borderRadius: wp(4),
    marginTop: hp(2),
    elevation: 6,
  },

  testPlanText: {
    fontSize: wp(4.5),
    color: '#fff',
    fontFamily: 'Montserrat-Bold',
  },

  testPlanBox: {
    marginHorizontal: wp(3),
    marginTop: hp(1),
  },

  discountText: {
    marginLeft: wp(4),
    marginTop: hp(0.5),
    fontFamily: 'Montserrat-SemiBold',
    color: '#fff',
  },

  myChitText: {
    marginLeft: wp(4),
    fontFamily: 'Montserrat-SemiBold',
    fontFamily: 'Montserrat-SemiBold',
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
    // alignItems: 'center',
    marginHorizontal: wp(4),
    marginTop: hp(1),
  },

  auctionText: {
    fontSize: wp(3.5),
    fontFamily: 'Roboto-Regular',
    color: '#fff',
  },

  chitEmiText: {
    fontSize: wp(3.5),
    fontFamily: 'Roboto-Regular',
    color: '#fff',
  },

  rightArrowIcon: {
    height: hp(2),
    width: wp(4),
    marginTop: hp(0.2),
    marginLeft: wp(0.5),
  },
  bottomNavigatorBox: {
    marginBottom: hp(-2),
  },
  // rightarrowBox: {
  //   height: hp(5.6),
  //   backgroundColor: '#fff',
  //   borderBottomRightRadius: wp(3.1),
  //   borderBottomLeftRadius: wp(3.1),
  //   marginTop: hp(1.3),
  // },

  rightarrowBox: {
    height: hp(4.5),
    width: wp(32),
    backgroundColor: '#FFF7F1',
    borderRadius: wp(6),
    marginRight: wp(4),
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: wp(4),
    alignSelf: 'flex-end',
  },
  ViewDetailsText: {
    fontSize: wp(3.7),
    color: '#000',
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
