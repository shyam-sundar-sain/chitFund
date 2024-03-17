import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// Icon
import ic_menu from '../assets/icon/ic_menu.png';
import ic_bell from '../assets/icon/ic_bell.png';
import ima_chitFund from '../assets/icon/ima_chitFund.png';
import ic_calendar from '../assets/icon/ic_calendar.png';
import ic_clock from '../assets/icon/clock.png';
import ic_product from '../assets/icon/product.png';
import ic_costs from '../assets/icon/costs.png';
import ic_community from '../assets/icon/community.png';
import ic_rightArrow from '../assets/icon/rightArrow.png';
import ic_plans from '../assets/icon/plans.png';
import ic_withdrawal from '../assets/icon/withdrawel.png';
import ic_receive from '../assets/icon/receive.png';
import ic_plan from '../assets/icon/plan.png';
import ic_auction from '../assets/icon/ic_auction.png';
import ic_home from '../assets/icon/ic_home.png';
import ic_transaction from '../assets/icon/transaction.png';
import ic_account from '../assets/icon/account.png';
import BottomScreen from '../../src/Screen/BottomScreen';

// navigation
// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import SettingScreen from './SettingScreen';
// const Bottom = createBottomTabNavigator();

const HomeScreenRegister = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Image source={ic_menu} style={styles.menuIcon} />
          </TouchableOpacity>
          <Text style={styles.headerText}>Hi, Arpit</Text>
        </View>

        <View>
          <Image source={ic_bell} style={styles.bellImage} />
        </View>
      </View>

      <ScrollView>
        <View style={styles.homeContainer}>
          <Image source={ima_chitFund} style={styles.bannerImage} />

          <View style={[styles.dotMainBox, {marginTop: hp(-1)}]}>
            <View style={styles.dotinnerBox} />
            <View style={styles.dotBox} />
            <View style={styles.dot} />
          </View>

          <View style={styles.plansViewHome}>
            <Text style={styles.plansText}>Plans</Text>
            <TouchableOpacity>
              <Text style={styles.ViewAllText}>View all</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.plansBox}>
            <Text style={styles.dimandPlanText}>Diamond plan</Text>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-around'}}>
              <Text style={[styles.dateText, {marginLeft: wp(6)}]}>
                24 dec, 2024
              </Text>

              <View style={styles.clockMonthBox}>
                <Image source={ic_clock} style={styles.clockIcon} />
                <Text style={[styles.dateText, {marginRight: wp(3)}]}>
                  12 Months
                </Text>
              </View>
            </View>

            <View style={styles.constMainBox}>
              <View style={styles.dimondPlanName}>
                <View>
                  <Image source={ic_product} style={styles.productIcon} />
                  <Text style={[styles.emiText, {fontSize: wp(4)}]}>
                    ₹10000/
                    <Text
                      style={{fontSize: wp(3.5), fontFamily: 'Roboto-Regular'}}>
                      month
                    </Text>
                  </Text>
                </View>
                <View style={{marginLeft: wp(3)}}>
                  <Image source={ic_costs} style={styles.productIcon} />
                  <Text style={styles.emiText}>₹1,20000</Text>
                </View>
                <View style={{marginLeft: wp(3)}}>
                  <Image source={ic_community} style={styles.productIcon} />
                  <Text style={styles.emiText}>12 Person</Text>
                </View>
              </View>
            </View>
            <Image source={ic_rightArrow} style={styles.rightArrowIcon} />
          </View>

          <View style={[styles.dotMainBox, {marginTop: hp(0)}]}>
            <View style={styles.dotinnerBox} />
            <View style={styles.dotBox} />
            <View style={styles.dot} />
          </View>

          <View style={styles.planAuctionmainBox}>
            <View style={styles.planImageBox}>
              <Image source={ic_plans} style={styles.plansIcon} />
              <Text style={styles.planText}>Plans</Text>
            </View>

            <View style={styles.planImageBox}>
              <Image source={ic_plans} style={styles.plansIcon} />
              <Text style={styles.planText}>Auction</Text>
            </View>
          </View>

          <View style={styles.planAuctionmainBox}>
            <View style={styles.planImageBox}>
              <Image source={ic_plans} style={styles.plansIcon} />
              <Text style={styles.planText}>EMI</Text>
            </View>

            <View style={styles.planImageBox}>
              <Image source={ic_plans} style={styles.plansIcon} />
              <Text style={styles.planText}>Chits</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreenRegister;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
    marginTop: hp(3),
    marginHorizontal: wp(6),
  },

  dimondPlanName: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  rightArrowIcon: {
    height: hp(3),
    width: wp(6),
    alignSelf: 'flex-end',
    marginRight: wp(6),
    marginTop: hp(1),
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
    marginTop: hp(5),
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
    fontFamily: 'Montserrat-Bold',
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
    fontSize: wp(6),
    fontFamily: 'Montserrat-Regular',
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
});
