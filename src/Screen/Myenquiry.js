import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
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
import ic_calendar from '../assets/icon/calendar.png';
import ic_clock from '../assets/icon/clock.png';

import {async_keys, getData} from '../api/UserPreference';
import {BASE_URL} from '../api/ApiInfo';
import {FlatList} from 'react-native-gesture-handler';
import {ActivityIndicator} from 'react-native';
import BottomNavigator from '../Navigation/BottomNavigator';
import SubPlanDetailModals from './SubPlanDetailModals';

const Myenquiry = props => {
  const {navigation} = props;
  const [loader, setLoader] = useState('');
  const [planData, setPlanData] = useState('');
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const pass = async () => {
      const visiterId = await getData(async_keys.visitor_id);
      const subscriberId = await getData(async_keys.sub_id);
      console.log('visiterd id $$$$$', visiterId);
      const get_typeData = await getData(async_keys.type);

      if (get_typeData === 'visitor') {
        await fetchData(visiterId, 'visitor_id');
      } else if (get_typeData === 'subscriber') {
        await fetchData(subscriberId, 'sub_id');
      }
    };
    pass();
  }, []);

  const fetchData = async (id, type) => {
    console.log('type sub <..>', type);
    try {
      setLoader(true);
      const response = await fetch(`${BASE_URL}get_enquiries?${type}=${id}`);
      console.log('response dddd', response);
      const newResponse = await response.json();
      console.log('newResponse pppp', newResponse);
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

  const toggleModal = item => {
    setSelectedPlan(item);
    setModalVisible(!isModalVisible);
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
      <View style={[styles.MainBox, {marginBottom: hp(2)}]}>
        <View style={styles.testPlanBox}>
          <Text style={styles.testPlanText}> {`${item.plan_name}`}</Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: hp(0.5),
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginLeft: wp(4),
            }}>
            <Image
              source={ic_calendar}
              style={{height: hp(2.5), width: wp(5), marginRight: wp(0)}}
            />

            <Text style={styles.myChitText}>{formattedDate}</Text>
          </View>

          <View style={{flexDirection: 'row'}}>
            <Image
              source={ic_clock}
              style={{height: hp(2.5), width: wp(5), marginRight: wp(2)}}
            />
            <Text
              style={styles.discountText}>{`${item.total_month} Months`}</Text>
          </View>
        </View>

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

          <View style={[styles.myChitBox]}>
            <Image
              source={ic_community}
              style={[styles.myChitsIcon, {marginTop: hp(1)}]}
            />
            <Text style={[styles.auctionText, {marginTop: hp(-1)}]}>
              {`${item.gst} Person`}
            </Text>
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
        <Text style={styles.TransactionsText}>My enquiry</Text>
      </View>

      <View style={styles.homeContainer}>
        <View>
          <FlatList
            data={planData}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
          />
          <SubPlanDetailModals
            isVisible={isModalVisible}
            onClose={() => setModalVisible(false)}
            planData={selectedPlan}
          />
        </View>
      </View>
      <View style={styles.bottomNavigatorBox}>
        <BottomNavigator
          navigation={props.navigation}
          //   parent="Myenquiry"
        />
      </View>
    </View>
  );
};

export default Myenquiry;
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
    marginLeft: wp(6),
    marginTop: hp(2),
    marginBottom: hp(2),
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
    height: hp(23),
    marginHorizontal: wp(6),
    borderRadius: wp(3),
    backgroundColor: '#ED802B',
    elevation: 3,
  },

  testPlanText: {
    fontSize: wp(5),
    color: '#fff',
    fontFamily: 'Montserrat-Bold',
  },

  testPlanBox: {
    marginHorizontal: wp(3),
    marginTop: hp(1),
  },

  discountText: {
    marginRight: wp(4),
    // marginTop: hp(0.5),
    fontFamily: 'Montserrat-SemiBold',
    color: '#fff',
  },

  myChitText: {
    marginLeft: wp(1),
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
    elevation: 5,
  },
  ViewDetailsText: {
    fontSize: wp(3.7),
    color: '#000',
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
});

// import {View, Text} from 'react-native';
// import React from 'react';

// const Myenquiry = () => {
//   return (
//     <View>
//       <Text>Myenquiry</Text>
//     </View>
//   );
// };

// export default Myenquiry;
