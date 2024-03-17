import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// Icon
import ic_menu from '../assets/icon/ic_menu.png';
import ic_costs from '../assets/icon/costs.png';
import ic_community from '../assets/icon/community.png';
import ic_rightArrow from '../assets/icon/rightArrow.png';

import ic_clock from '../assets/icon/clock.png';
import calendar from '../assets/icon/calendar.png';
import ic_myChits from '../assets/icon/myChits.png';

import {BASE_URL} from '../api/ApiInfo';
import {FlatList} from 'react-native-gesture-handler';
import PlanDetailsModal from './PlanDetailsModal';
import {async_keys, getData} from '../api/UserPreference';
import {useDispatch, useSelector} from 'react-redux';
import {getVisitorData} from '../ComponentsRedux/Action';

const HomeScreenRegister = ({navigation}) => {
  const [loader, setLoader] = useState('');
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [homeData, setHomeData] = useState([]);
  const [storeData, setStoreData] = useState([]);

  // use redux
  const dispatch = useDispatch();
  const data = useSelector(state => state.visitorTypeReducer);

  useEffect(() => {
    const pass = async () => {
      const visiterId = await getData(async_keys.visitor_id);
      const get_typeData = await getData(async_keys.type);
      fetchData();

      if (get_typeData === 'visitor') {
        fetchHomeData(visiterId);
      }
    };
    pass();
  }, []);

  const fetchData = async () => {
    try {
      setLoader(true);
      const response = await fetch(`${BASE_URL}get_visitors_plans`);
      console.log('response get visitor paln**', response);

      const newResponse = await response.json();
      console.log('newResponse get visitor kkkkkkkkkkkkk**', newResponse);
      const {Status, Data} = newResponse;
      if (Status === true) {
        setHomeData(Data);
        setLoader(false);
      } else {
        setLoader(false);
        Alert.alert('', 'Unauthrized user');
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const fetchHomeData = async vgtr_ID => {
    try {
      setLoader(true);
      const response = await fetch(
        `${BASE_URL}get_profile?visitor_id=${vgtr_ID}`,
      );

      console.log('response get_profile &&', response);

      const newResponse = await response.json();
      console.log('newResponse get_profile', newResponse);
      const {Status, Data, Message} = newResponse;

      if (Status === true) {
        setStoreData(Data.name);
        dispatch(getVisitorData(Data));
        setLoader(false);
      } else {
        setLoader(false);
        alert(Message);
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

    const toggleModal = item => {
      setSelectedPlan(item);
      setModalVisible(!isModalVisible);
    };

    return (
      <View style={styles.plansBox}>
        <Text style={styles.dimandPlanText}>{item.plan_name}</Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginTop: hp(0.5),
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginLeft: wp(-3),
            }}>
            <Image
              source={calendar}
              style={[styles.clockIcon, {marginLeft: wp(0)}]}
            />
            <Text style={[styles.dateText, {marginLeft: wp(1)}]}>
              {formattedDate}
            </Text>
          </View>

          <View style={styles.clockMonthBox}>
            <Image
              source={ic_clock}
              style={[styles.clockIcon, {marginRight: wp(1)}]}
            />
            <Text style={[styles.dateText, {marginRight: wp(0)}]}>
              {` ${item.total_month} Months`}
            </Text>
          </View>
        </View>

        <View style={styles.constMainBox}>
          <View style={styles.dimondPlanName}>
            <View style={{alignItems: 'center'}}>
              <Image source={ic_myChits} style={[styles.productIcon]} />
              <View>
                <Text style={[styles.emiText, {fontSize: wp(4)}]}>₹10000/</Text>
                <Text
                  style={{
                    fontSize: wp(3.5),
                    fontFamily: 'Roboto-Regular',
                    color: '#fff',
                  }}>
                  month
                </Text>
              </View>
            </View>
            <View style={{alignItems: 'center'}}>
              <Image source={ic_costs} style={styles.productIcon} />
              <Text style={styles.emiText}>₹1,20000</Text>
            </View>

            <View style={{alignItems: 'center'}}>
              <Image
                source={ic_community}
                style={[styles.productIcon, {marginTop: hp(1)}]}
              />
              <Text style={[styles.emiText, {marginTop: hp(-1)}]}>
                12 Person
              </Text>
            </View>
          </View>
        </View>
        <TouchableOpacity
          style={styles.rightarrowBox}
          onPress={() => toggleModal(item)}>
          <Text style={styles.ViewDetailsText}>View Details</Text>
          <Image source={ic_rightArrow} style={styles.rightArrowIcon} />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Image source={ic_menu} style={styles.menuIcon} />
          </TouchableOpacity>
          <Text style={styles.headerText}>{storeData}</Text>
        </View>
      </View>

      <View style={{marginTop: hp(2), marginBottom: hp(4)}}>
        <FlatList
          data={homeData}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
        />
        <PlanDetailsModal
          isVisible={isModalVisible}
          onClose={() => setModalVisible(false)}
          planData={selectedPlan}
        />
      </View>
    </View>
  );
};

export default HomeScreenRegister;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },

  homeContainer: {
    flex: 1,
    height: hp(100),
  },

  plansText: {
    fontSize: wp(4),
    color: '#000',
    fontFamily: 'Montserrat-Regular',
  },

  ViewAllText: {
    fontSize: wp(4),
    color: '#ed802b',
    borderBottomWidth: 1,
    justifyContent: 'flex-start',
    alignSelf: 'flex-end',
    borderColor: '#ed802b',
    fontFamily: 'Montserrat-Regular',
  },

  plansViewHome: {
    marginHorizontal: wp(6),
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp(4),
    marginBottom: hp(2),
  },

  plansBox: {
    height: hp(26),
    marginHorizontal: wp(6),
    borderRadius: wp(3),
    backgroundColor: '#ED802B',
    elevation: 3,
    marginBottom: hp(2),
  },

  dimandPlanText: {
    fontSize: wp(5),
    color: '#fff',
    marginLeft: wp(6),
    marginTop: wp(4),
    fontFamily: 'Montserrat-Bold',
  },

  dateText: {
    fontSize: wp(4),
    color: '#fff',
    fontFamily: 'Montserrat-SemiBold',
  },

  clockIcon: {
    height: hp(2.5),
    width: wp(5),
    // marginRight: wp(2),
  },

  clockMonthBox: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },

  productIcon: {
    height: hp(4),
    width: wp(8),
  },

  emiText: {
    fontSize: wp(3.5),
    color: '#fff',
    fontFamily: 'Roboto-Regular',
  },

  constMainBox: {
    marginTop: hp(3),
  },

  dimondPlanName: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: wp(6),
  },

  rightArrowIcon: {
    height: hp(2),
    width: wp(4),
    marginTop: hp(0.2),
    marginLeft: wp(0.5),
  },

  planImageBox: {
    height: hp(12),
    width: wp(43),
    borderRadius: wp(4),
    backgroundColor: '#faf6f2',
    elevation: 1,
  },

  planAuctionmainBox: {
    flexDirection: 'row',
    marginHorizontal: wp(6),
    justifyContent: 'space-between',
    marginTop: hp(2),
    // marginBottom: hp(2),
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
    color: '#714940',
  },

  withdrawalBox: {
    height: hp(10.6),
    // width: wp(10),
    marginHorizontal: wp(6),
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
    height: hp(6),
    width: wp(15),
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
    // marginTop: hp(-3.5),
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
    marginLeft: wp(6),
  },

  menuIcon: {
    height: hp(3),
    width: wp(6),
    marginTop: hp(2),
  },

  headerText: {
    fontSize: wp(5),
    fontFamily: 'Montserrat-Medium',
    marginTop: hp(1.5),
    marginLeft: wp(3),
    color: '#000',
  },

  bellImage: {
    height: hp(3.5),
    width: wp(7),
    marginTop: hp(2),
    marginRight: wp(6),
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
    // marginLeft: wp(2),
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
  },

  auctionImage: {
    height: hp(10),
    width: wp(30),
    alignSelf: 'flex-end',
  },
  emiImage: {
    height: hp(12),
    width: wp(25),
    alignSelf: 'flex-end',
    marginRight: wp(0.5),
    marginTop: hp(-2),
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
  bannerBox: {
    marginBottom: hp(-1),
  },
});
