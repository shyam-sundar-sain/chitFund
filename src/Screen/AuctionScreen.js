import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
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
import {async_keys, getData} from '../api/UserPreference';
import {BASE_URL} from '../api/ApiInfo';
import {FlatList} from 'react-native-gesture-handler';
import ic_calendar from '../assets/icon/calendar.png';
import ic_costs from '../assets/icon/costs.png';
import ic_myChits from '../assets/icon/myChits.png';
import BottomNavigator from '../Navigation/BottomNavigator';

const AuctionScreen = props => {
  const {navigation} = props;
  const [loader, setLoader] = useState('');
  const [AuctionData, setAuctionData] = useState('');
  console.log('AuctionData', AuctionData);
  const [selectedTab, setSelectedTab] = useState(AuctionData?.declared);
  console.log('AuctionData bbbb', AuctionData.declared);

  useEffect(() => {
    // Update selectedTab when AuctionData changes
    if (AuctionData) {
      setSelectedTab(AuctionData.pending);
    }
  }, [AuctionData]);

  // Tab Functionality
  const handleChangePadding = () => {
    setSelectedTab(AuctionData.pending);
  };

  const handleChangedeclared = () => setSelectedTab(AuctionData.declared);

  const handleChangecurrent = () => {
    setSelectedTab(AuctionData.current);
  };

  useEffect(() => {
    const emi_Data = async () => {
      const auth_token = await getData(async_keys.token);
      fetchEmi(auth_token);
      console.log('auth_token', auth_token);
    };
    emi_Data();
  }, []);

  const fetchEmi = async auth_token => {
    try {
      setLoader(true);
      const myHeaders = new Headers();
      myHeaders.append('Authorization', `Bearer ${auth_token}`);

      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow',
      };

      const response = await fetch(`${BASE_URL}auctions`, requestOptions);
      const newResponse = await response.json();
      const {Status, Data, Message} = newResponse;
      console.log('newRespons', newResponse);
      if (Status === true) {
        setAuctionData(Data);
        setLoader(false);
      } else {
        setLoader(false);
        Alert.alert('', Message);
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

  const renderItem = ({item}) => (
    <View>
      <View style={styles.homeBox}>
        <View style={styles.innerDateBox}>
          <View>
            <Text style={styles.dimondPlanText}>{`${item.plan_name}`}</Text>
            <View style={styles.dateBox}>
              <Image source={ic_calendar} style={styles.calendarStyle} />
              <Text style={styles.dateText}>{`${item.month}`}</Text>
            </View>
          </View>

          <View>
            <Text style={styles.declaredText}>{`${item.status}`}</Text>
            <Text style={[styles.auctionNumberText]}>
              {`Auction Number - ${item.auction_no}`}
            </Text>
          </View>
        </View>

        <View style={styles.minMainBox}>
          <View style={[styles.minBox, {alignItems: 'center'}]}>
            <Image
              source={ic_myChits}
              style={[styles.myChitsIcon, {marginLeft: wp(2)}]}
            />
            <View>
              <Text
                style={
                  styles.emiText
                }>{`₹${item.min_discount}/Min discount`}</Text>
            </View>
          </View>

          <View style={[styles.minBox, {alignItems: 'center'}]}>
            <Image source={ic_costs} style={styles.myChitsdddStyle} />
            <Text style={styles.emiText}>{`₹${item.plan_amount}`}</Text>
          </View>
        </View>
      </View>
    </View>
  );

  const declaredItem = ({item}) => (
    <View style={styles.homeBox}>
      <View style={styles.innerDateBox}>
        <View>
          <Text style={styles.dimondPlanText}>{`${item.plan_name}`}</Text>
          <View style={styles.dateBox}>
            <Image source={ic_calendar} style={styles.calendarStyle} />
            <Text style={styles.dateText}>{`${item.month}`}</Text>
          </View>
        </View>

        <View>
          <Text style={styles.declaredText}>{`${item.status}`}</Text>
          <Text style={[styles.auctionNumberText]}>
            {`Auction Number - ${item.auction_no}`}
          </Text>
        </View>
      </View>

      <View style={styles.minMainBox}>
        <View style={[styles.minBox, {alignItems: 'center'}]}>
          <Image
            source={ic_myChits}
            style={[styles.myChitsIcon, {marginLeft: wp(2)}]}
          />
          <View>
            <Text
              style={
                styles.emiText
              }>{`₹${item.min_discount}/Min discount`}</Text>
          </View>
        </View>

        <View style={[styles.minBox, {alignItems: 'center'}]}>
          <Image source={ic_costs} style={styles.myChitsdddStyle} />
          <Text style={styles.emiText}>{`₹${item.plan_amount}`}</Text>
        </View>
      </View>
    </View>
  );

  const currentItem = ({item}) => (
    <View style={styles.homeBox}>
      <View style={styles.innerDateBox}>
        <View>
          <Text style={styles.dimondPlanText}>{`${item.plan_name}`}</Text>
          <View style={styles.dateBox}>
            <Image source={ic_calendar} style={styles.calendarStyle} />
            <Text style={styles.dateText}>{`${item.month}`}</Text>
          </View>
        </View>

        <View>
          <Text style={styles.declaredText}>{`${item.status}`}</Text>
          <Text style={[styles.auctionNumberText]}>
            {`Auction Number - ${item.auction_no}`}
          </Text>
        </View>
      </View>

      <View style={styles.minMainBox}>
        <View style={[styles.minBox, {alignItems: 'center'}]}>
          <Image
            source={ic_myChits}
            style={[styles.myChitsIcon, {marginLeft: wp(2)}]}
          />
          <View>
            <Text
              style={
                styles.emiText
              }>{`₹${item.min_discount}/Min discount`}</Text>
          </View>
        </View>

        <View style={[styles.minBox, {alignItems: 'center'}]}>
          <Image source={ic_costs} style={styles.myChitsdddStyle} />
          <Text style={styles.emiText}>{`₹${item.plan_amount}`}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerBox}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={ic_vector} style={styles.vectorIcon} />
        </TouchableOpacity>
        <Text style={styles.TransactionsText}>Auction</Text>
      </View>

      <View style={styles.tabButtonBox}>
        <TouchableOpacity
          style={[
            styles.upComingButton,
            {
              backgroundColor:
                selectedTab === AuctionData.pending ? '#FF2F00' : '#fff',
            },
          ]}
          onPress={handleChangePadding}>
          <Text
            style={[
              styles.upComingText,
              {color: selectedTab === AuctionData.pending ? '#fff' : '#000'},
            ]}>
            Upcoming
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.upComingButton,
            {
              backgroundColor:
                selectedTab === AuctionData.declared ? '#FF2F00' : '#fff',
              width: wp(20),
              borderRadius: wp(4),
            },
          ]}
          onPress={handleChangedeclared}>
          <Text
            style={[
              styles.upComingText,
              {color: selectedTab === AuctionData.declared ? '#fff' : '#000'},
            ]}>
            Due
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.upComingButton,
            {
              backgroundColor:
                selectedTab === AuctionData.current ? '#FF2F00' : '#fff',
            },
          ]}
          onPress={handleChangecurrent}>
          <Text
            style={[
              styles.upComingText,
              {color: selectedTab === AuctionData.current ? '#fff' : '#000'},
            ]}>
            Complete
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.homeContainer}>
        {selectedTab === AuctionData.pending ? (
          AuctionData?.pending?.length > 0 ? (
            <FlatList
              data={AuctionData.pending}
              renderItem={renderItem}
              showsVerticalScrollIndicator={false}
            />
          ) : (
            <View style={styles.noTransactionBox}>
              <Text style={styles.noTransactionData}>No upcoming auction </Text>
            </View>
          )
        ) : selectedTab === AuctionData.declared ? (
          AuctionData?.declared?.length > 0 ? (
            <FlatList
              data={AuctionData.declared}
              renderItem={declaredItem}
              showsVerticalScrollIndicator={false}
            />
          ) : (
            <View style={styles.noTransactionBox}>
              <Text style={styles.noTransactionData}>No due auction </Text>
            </View>
          )
        ) : selectedTab === AuctionData.current ? (
          AuctionData?.current?.length > 0 ? (
            <FlatList
              data={AuctionData.current}
              renderItem={currentItem}
              showsVerticalScrollIndicator={false}
            />
          ) : (
            <View style={styles.noTransactionBox}>
              <Text style={styles.noTransactionData}>No complete auction </Text>
            </View>
          )
        ) : null}
      </View>

      <View style={styles.bottomNavigatorBox}>
        <BottomNavigator navigation={props.navigation} parent="AuctionScreen" />
      </View>
    </View>
  );
};

export default AuctionScreen;
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

  declaredBox: {
    flexDirection: 'row',
    marginLeft: wp(4),
    marginTop: hp(0.5),
  },

  rightArrowIcon: {
    height: hp(4.5),
    width: wp(9),
    marginTop: hp(1.3),
    alignSelf: 'flex-end',
  },
  paddingText: {
    fontSize: wp(4),
    color: '#FF2F00',
    fontFamily: 'Montserrat-SemiBold',
  },

  upComingButton: {
    height: hp(4.5),
    width: wp(32),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: wp(4),
  },

  tabButtonBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: wp(4),
    height: hp(6),
  },

  upComingText: {
    fontSize: wp(4),
    fontFamily: 'Montserrat-Regular',
  },

  homeBox: {
    height: hp(22),
    backgroundColor: '#ED802B',
    marginHorizontal: wp(4),
    borderColor: '#9A9999',
    borderWidth: 0.5,
    borderRadius: wp(4),
    marginBottom: hp(2),
  },

  dimondPlanText: {
    fontSize: wp(4.5),
    color: '#fff',
    fontFamily: 'Montserrat-Bold',
  },
  calendarStyle: {
    height: hp(2.5),
    width: wp(5),
    marginRight: wp(0),
  },

  dateBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  dateText: {
    fontSize: wp(4.5),
    color: '#fff',
    fontFamily: 'Montserrat-SemiBold',
    marginLeft: wp(1),
  },

  auctionNumberText: {
    fontSize: wp(4),
    fontFamily: 'Montserrat-Regular',
    color: '#fff',
  },

  declaredText: {
    fontSize: wp(4.5),
    fontFamily: 'Montserrat-Medium',
    color: '#fff',
  },

  innerDateBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: wp(6),
    marginTop: hp(2),
  },

  myChitsdddStyle: {
    height: hp(4),
    width: wp(8),
  },
  emiText: {
    fontSize: wp(4),
    fontFamily: 'Roboto-Regular',
    color: '#fff',
  },

  minMainBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: wp(6),
    marginTop: hp(4),
  },

  myChitsIcon: {
    height: hp(4),
    width: wp(8),
  },

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

  rightArrowIcon: {
    height: hp(2),
    width: wp(4),
    marginTop: hp(0.2),
    marginLeft: wp(0.5),
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
  bottomNavigatorBox: {
    marginBottom: hp(-2),
  },
});
