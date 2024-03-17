import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// Icon
import ic_menu from '../assets/icon/ic_menu.png';
import ic_bell from '../assets/icon/ic_bell.png';
import ic_plans from '../assets/icon/plans.png';
import ic_withdrawal from '../assets/icon/withdrawel.png';
import ic_InvestEmi from '../assets/icon/InvestEmi.png';
import {async_keys, getData} from '../api/UserPreference';
import {BASE_URL} from '../api/ApiInfo';
import BottomNavigator from '../Navigation/BottomNavigator';
import ic_auction from '../assets/icon/auction.png';
import ic_chits from '../assets/icon/chits.png';
import HorizontalScroller from '../Navigation/HorizontalScroller';
import BannerSlider from './BannerSlider';
import {useDispatch, useSelector} from 'react-redux';
import {getDataMethod} from '../ComponentsRedux/Action';

const HomeScreenSubscriber = props => {
  console.log('prppll', props);
  const {navigation} = props;
  const [homeData, setHomeData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [nameData, setNameData] = useState('');

  // use redux
  const dispatch = useDispatch();
  const data = useSelector(state => state.ApiReducer);

  useEffect(() => {
    const pass = async () => {
      const auth_token = await getData(async_keys.token);
      fetchData(auth_token);
    };
    pass();
  }, []);

  // const plandataa = homeData?.transactions.map(item => {

  // });

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

      const response = await fetch(`${BASE_URL}get_home_data`, requestOptions);
      const newResponse = await response.json();

      const {Status, Data} = newResponse;
      if (Status === true) {
        setHomeData(Data);
        setNameData(Data?.profile?.first_name);
        console.log('Datass', Data);
        setLoader(false);
        dispatch(getDataMethod(Data.profile));
      } else {
        setLoader(false);
        Alert.alert('', 'Unauthrized user');
      }
    } catch (error) {
      console.log(error.message);
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
      <View style={styles.header}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Image source={ic_menu} style={styles.menuIcon} />
          </TouchableOpacity>

          <Text style={styles.headerText}>{nameData}</Text>
        </View>

        <TouchableOpacity onPress={() => navigation.navigate('Notification')}>
          <Image source={ic_bell} style={styles.bellImage} />
        </TouchableOpacity>
      </View>

      <View style={styles.homeContainer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View>
            <BannerSlider />
          </View>

          <View style={[styles.plansViewHome, {marginTop: hp(-2)}]}>
            <View
            // onPress={() => navigation.navigate('StartAssessment')}
            >
              <Text style={styles.plansText}>Plans</Text>
            </View>

            <TouchableOpacity
              onPress={() => navigation.navigate('SubscriberPlans')}>
              <Text style={styles.ViewAllText}>View all</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.horizontalContainer}>
            <HorizontalScroller home_Data={homeData} />
          </View>

          <View style={styles.planAuctionmainBox}>
            <TouchableOpacity
              style={styles.planImageBox}
              onPress={() => navigation.navigate('SubscriberPlans')}>
              <Image
                source={ic_plans}
                style={[styles.auctionImage, {marginRight: wp(0.5)}]}
              />

              <Text style={styles.planText}>Plans</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.planImageBox}
              onPress={() => navigation.navigate('AuctionScreen')}>
              <Image
                source={ic_auction}
                style={[styles.auctionImage, {marginRight: wp(1)}]}
              />
              <Text style={styles.planText}>Auction</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.planAuctionmainBox}>
            <TouchableOpacity
              style={styles.planImageBox}
              onPress={() => navigation.navigate('EMI')}>
              <Image source={ic_InvestEmi} style={[styles.emiImage]} />
              <Text style={styles.planText}>EMI</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.planImageBox}
              onPress={() => navigation.navigate('MyChitScreen')}>
              <Image source={ic_chits} style={styles.auctionImage} />
              <Text style={styles.planText}>Chits</Text>
            </TouchableOpacity>
          </View>

          <View style={[styles.plansViewHome, {marginTop: hp(3)}]}>
            <TouchableOpacity onPress={() => navigation.navigate('Assessment')}>
              <Text style={styles.plansText}>Transaction</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('Transaction')}>
              <Text style={styles.ViewAllText}>View all</Text>
            </TouchableOpacity>
          </View>
          {homeData?.transactions?.length > 0 ? (
            <>
              <View>
                {homeData?.transactions.map((item, index) => {
                  return (
                    <View style={{marginBottom: hp(2)}} key={index}>
                      <View style={styles.withdrawalBox}>
                        <Image
                          source={ic_withdrawal}
                          style={styles.withdrawalBoxIcon}
                        />
                        <View style={{marginLeft: wp(2), marginTop: hp(1.5)}}>
                          <Text
                            style={
                              styles.withdrawalText
                            }>{`${item.trancation_type}`}</Text>
                          <Text style={styles.yousentText}>
                            You sent
                            <Text
                              style={
                                styles.moneyText
                              }>{`₹${item.final_amount}`}</Text>
                            to Diamond plan by bank transfer
                          </Text>
                          <Text
                            style={
                              styles.setText
                            }>{`₹${item.final_amount}`}</Text>
                          <Text
                            style={[styles.sendText, {marginRight: wp(-18)}]}>
                            {` ${item.type}`}
                          </Text>
                        </View>
                      </View>
                    </View>
                  );
                })}
              </View>
            </>
          ) : (
            <View style={styles.hello}>
              <Text style={styles.noDataText}>No Transaction Found</Text>
            </View>
          )}
        </ScrollView>
      </View>

      <View style={styles.bottomNavigatorBox}>
        <BottomNavigator
          navigation={props.navigation}
          parent="HomeScreenSubscriber"
        />
      </View>
    </View>
  );
};

export default HomeScreenSubscriber;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  homeContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },

  plansText: {
    fontSize: wp(4.5),
    color: '#000',
    fontFamily: 'Montserrat-Regular',
  },

  ViewAllText: {
    fontSize: wp(4.5),
    color: '#ed802b',
    borderBottomWidth: 1,
    justifyContent: 'flex-start',
    alignSelf: 'flex-end',
    borderColor: '#ed802b',
    fontFamily: 'Montserrat-Regular',
    marginRight: wp(2),
  },

  plansViewHome: {
    marginHorizontal: wp(4),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp(-1),
  },

  plansBox: {
    height: hp(24),
    marginHorizontal: wp(6),
    borderRadius: wp(3),
    backgroundColor: '#FFF7F1',
    elevation: 1,
  },

  dimandPlanText: {
    fontSize: wp(5),
    color: '#000',
    marginLeft: wp(6),
    marginTop: wp(4),
    fontFamily: 'Montserrat-Bold',
  },

  dateText: {
    fontSize: wp(4),
    color: '#9A9999',
    fontFamily: 'Montserrat-SemiBold',
  },

  clockIcon: {
    height: hp(3),
    width: wp(6),
    marginRight: wp(2),
  },

  clockMonthBox: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },

  productIcon: {
    height: hp(4),
    width: wp(8),
    marginLeft: wp(4),
  },

  emiText: {
    fontSize: wp(3.5),
    color: '#9A9999',
    fontFamily: 'Roboto-Regular',
  },

  constMainBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp(3),
    marginHorizontal: wp(6),
  },

  rightArrowIcon: {
    height: hp(4),
    width: wp(8),
    alignSelf: 'flex-end',
    marginRight: wp(6),
    marginTop: hp(-1),
  },

  planImageBox: {
    height: hp(12),
    width: wp(43),
    borderRadius: wp(2),
    backgroundColor: '#faf6f2',
    elevation: 1,
  },

  planAuctionmainBox: {
    flexDirection: 'row',
    marginHorizontal: wp(4),
    justifyContent: 'space-between',
    marginTop: hp(3),
  },

  plansIcon: {
    height: hp(10),
    width: wp(30),
    marginLeft: wp(12),
  },

  planText: {
    fontSize: wp(4),
    marginTop: hp(-1.5),
    marginLeft: wp(3),
    fontFamily: 'Montserrat-semiBold',
    color: '#000',
  },

  withdrawalBox: {
    height: hp(10.6),
    marginHorizontal: wp(4),
    borderWidth: 0.5,
    borderRadius: wp(4),
    borderColor: '#D1CACA',
    flexDirection: 'row',
    marginTop: hp(2),
  },

  withdrawalText: {
    fontSize: wp(4),
    color: '#272727',
    fontFamily: 'Montserrat-SemiBold',
  },

  yousentText: {
    fontSize: wp(3),
    color: '#9A9999',
    width: wp(50),
  },

  withdrawalBoxIcon: {
    height: hp(4),
    width: wp(10),
    marginLeft: wp(2),
    marginTop: hp(3),
  },

  setText: {
    fontSize: wp(3),
    color: '#000',
    fontFamily: 'Montserrat-Regular',
    textAlign: 'right',
    marginTop: hp(-3.5),
    marginRight: wp(-16),
  },

  sendText: {
    fontSize: wp(3),
    color: '#31C337',
    fontFamily: 'Montserrat-Regular',
    textAlign: 'right',
  },

  moneyText: {
    fontSize: wp(3),
    color: '#353535',
    width: wp(50),
    fontFamily: 'Montserrat-Regular',
  },

  footerMainBox: {
    height: hp(10),
    marginHorizontal: wp(6),
    borderTopRightRadius: wp(4),
    borderTopLeftRadius: wp(4),
    backgroundColor: '#FFF7F1',
    marginTop: hp(2),
  },

  planIcon: {
    height: hp(5),
    width: wp(20),
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: wp(4),
    height: hp(6),
  },

  menuIcon: {
    height: hp(3),
    width: wp(6),
    marginTop: hp(1),
  },

  headerText: {
    fontSize: wp(5),
    fontFamily: 'Montserrat-Medium',
    color: '#000',
    marginLeft: wp(4),
    marginTop: hp(0.5),
  },

  bellImage: {
    height: hp(3),
    width: wp(6),
    marginTop: hp(1),
    marginRight: wp(5),
  },

  bannerImage: {
    height: hp(20),
    width: wp(88),
    alignSelf: 'center',
    borderRadius: wp(3),
    marginTop: hp(4),
  },

  dotMainBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: wp(4),
    alignSelf: 'center',
  },

  dotinnerBox: {
    height: hp(1.5),
    width: wp(3),
    marginTop: hp(2),
    borderRadius: wp(4),
    backgroundColor: '#ed802b',
  },

  dotBox: {
    height: hp(1.5),
    width: wp(3),
    marginTop: hp(2),
    borderRadius: wp(6),
    borderWidth: 0.5,
    marginLeft: wp(1),
  },

  dot: {
    height: hp(1.5),
    width: wp(3),
    marginTop: hp(2),
    borderRadius: wp(5),
    borderWidth: 0.5,
    marginLeft: wp(1),
  },

  bottomNavigatorBox: {
    marginBottom: hp(-2),
    backgroundColor: '#fff',
  },

  // slider Style
  horizontalContainer: {},

  auctionCircleFirst: {
    height: hp(10),
    width: wp(20),
    backgroundColor: '#FBE9DB',
    alignSelf: 'flex-end',
    borderBottomLeftRadius: wp(15),
    borderTopLeftRadius: wp(5),
    borderBottomRightRadius: wp(15),
  },
  innerCircleBox: {
    height: hp(9),
    width: wp(20),
    backgroundColor: '#FAE2CE',
    alignSelf: 'flex-end',
    borderBottomLeftRadius: wp(5),
    borderTopLeftRadius: wp(6),
  },

  auctionImage: {
    height: hp(10),
    width: wp(30),
    alignSelf: 'flex-end',
  },

  emiImage: {
    height: hp(10),
    width: wp(25),
    alignSelf: 'flex-end',
    marginRight: wp(0.5),
  },

  hello: {
    marginTop: hp(5),
    marginBottom: hp(5),
    alignSelf: 'center',
  },

  noDataText: {
    fontSize: wp(4),
    color: '#000',
    fontFamily: 'Montserrat-Regular',
  },
});
