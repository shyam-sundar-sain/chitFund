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
import ic_menu from '../assets/icon/ic_menu.png';
import ic_vector from '../assets/icon/vector.png';
import ic_clock from '../assets/icon/clock.png';
import calendar from '../assets/icon/calendar.png';
import ic_product from '../assets/icon/product.png';
import ic_costs from '../assets/icon/costs.png';
import ic_community from '../assets/icon/community.png';
import ic_rightArrow from '../assets/icon/rightArrow.png';
import ic_switch from '../assets/icon/switch.png';
import BottomNavigator from '../Navigation/BottomNavigator';
import {BASE_URL} from '../api/ApiInfo';
import {async_keys, getData} from '../api/UserPreference';
import {FlatList} from 'react-native-gesture-handler';
import {Button} from '@rneui/base';

const ChosePlans = props => {
  const {navigation} = props;
  const [planData, setPlanData] = useState('');
  const [loader, setLoader] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoader(true);
      const response = await fetch(`${BASE_URL}get_visitors_plans`);
      const newResponse = await response.json();
      console.log('newResponse', newResponse);
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

  if (loader) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator color="green" size="large" />
      </View>
    );
  }

  const renderBox = ({item}) => {
    const dateData = item.start_month;
    console.log('dateData', dateData);
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
      <View style={styles.plansBox}>
        <View style={styles.dimondBox}>
          <Text style={styles.dimandPlanText}>{`${item.plan_name}`}</Text>
          <View style={styles.switchActiveaBox}>
            <Text style={styles.activeText}>Active </Text>
            <Image source={ic_switch} style={styles.switchIcon} />
          </View>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          <View style={styles.yearText}>
            <Image source={calendar} style={styles.clockIcon} />
            <Text style={[styles.dateText]}>{formattedDate}</Text>
          </View>

          <View style={styles.clockMonthBox}>
            <Text style={[styles.dateText, {marginRight: wp(3)}]}>
              {`${item.total_month} Months`}
            </Text>
          </View>
        </View>

        <View style={styles.constMainBox}>
          <View>
            <Image source={ic_product} style={styles.productIcon} />
            <Text style={[styles.emiText, {fontSize: wp(4)}]}>
              {`₹${item.emi}/`}
              <Text style={{fontSize: wp(3.5), fontFamily: 'Roboto-Regular'}}>
                month
              </Text>
            </Text>
          </View>
          <View style={{marginLeft: wp(3)}}>
            <Image source={ic_costs} style={styles.productIcon} />
            <Text style={styles.emiText}>{`₹${item.plan_amount}`}</Text>
          </View>

          <View style={{marginLeft: wp(3)}}>
            <Image source={ic_community} style={styles.productIcon} />
            <Text style={styles.emiText}> {`${item.gst}Person`}</Text>
          </View>

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
      <View style={styles.homeContainer}>
        <View style={styles.headerMainBox}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={ic_vector} style={styles.vectorIcon} />
          </TouchableOpacity>
          <Text style={styles.headerText}>Choose your plan</Text>
        </View>
        <View style={styles.homeContainer}>
          <FlatList
            data={planData}
            renderItem={renderBox}
            containerStyle={{borderWidth: 1}}
          />
        </View>
      </View>

      <View style={styles.bottomNavigatorBox}>
        <BottomNavigator navigation={props.navigation} />
      </View>
    </View>
  );
};

export default ChosePlans;
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
    height: hp(3),
    width: wp(6),
  },

  headerText: {
    fontSize: wp(6),
    marginLeft: wp(4),
    fontFamily: 'Montserrat-Regular',
    color: '#000',
  },

  headerMainBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp(2),
    marginLeft: wp(4),
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
  clockMonthBox: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },

  clockIcon: {
    height: hp(2.5),
    width: wp(5),
    marginRight: wp(2),
  },

  constMainBox: {
    flexDirection: 'row',
    marginTop: hp(3),
    marginLeft: wp(6),
    alignItems: 'center',
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

  plansBox: {
    height: hp(23),
    marginHorizontal: wp(4),
    borderRadius: wp(3),
    backgroundColor: '#FFF7F1',
    elevation: 1,
    marginTop: hp(2),
  },

  activeText: {
    fontSize: wp(4),
    color: '#9A9999',
  },

  switchIcon: {
    height: hp(3),
    width: wp(6),
    marginLeft: wp(1),
  },

  switchActiveaBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp(-1.5),
    marginLeft: wp(20),
  },

  dimondBox: {
    flexDirection: 'row',
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

  rightArrowIcon: {
    height: hp(4),
    width: wp(8),
    marginLeft: wp(8),
    marginTop: hp(-1),
  },

  bottomNavigatorBox: {
    marginBottom: hp(-2),
  },

  yearText: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: wp(-4),
  },
});
