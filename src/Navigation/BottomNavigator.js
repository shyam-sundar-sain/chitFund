import React, {useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

// const [selectedTab, setSelectedTab] = useState(0);
const BottomNavigator = ({navigation, parent}) => {
  return (
    // <View>
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('SubscriberPlans');
          // setSelectedTab(0);
        }}
        style={styles.footerButton}>
        {parent === 'SubscriberPlans' ? (
          <Image
            source={require('../assets/icon/plan2.png')}
            style={{width: 24, height: 24, marginLeft: wp(1.5)}}
          />
        ) : (
          <Image
            source={require('../assets/icon/plan.png')}
            style={{width: 24, height: 24}}
          />
        )}
        <Text
          style={[
            styles.footerText,
            parent === 'SubscriberPlans' && {
              fontFamily: 'Montserrat-SemiBold',
            },
          ]}>
          Plans
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Auction');
          // setSelectedTab(1);
        }}
        style={styles.footerButton}>
        {parent === 'AuctionScreen' ? (
          <Image
            source={require('../assets/icon/auction2.png')}
            style={{width: 24, height: 24}}
          />
        ) : (
          <Image
            source={require('../assets/icon/auctions.png')}
            style={{width: 24, height: 24}}
          />
        )}

        <Text
          style={[
            styles.footerText,
            parent === 'AuctionScreen' && {fontFamily: 'Montserrat-SemiBold'},
          ]}>
          Auction
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate('HomeScreenSubscriber');
          // setSelectedTab(2);
        }}
        style={styles.footerButton}>
        {parent === 'HomeScreenSubscriber' ? (
          <Image
            source={require('../assets/icon/home2.png')}
            style={{width: 24, height: 24}}
          />
        ) : (
          <Image
            source={require('../assets/icon/home.png')}
            style={{width: 24, height: 24}}
          />
        )}

        <Text
          style={[
            styles.footerText,
            parent === 'HomeScreenSubscriber' && {
              fontFamily: 'Montserrat-SemiBold',
            },
          ]}>
          Home
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Transaction');
          // setSelectedTab(3);
        }}
        style={styles.footerButton}>
        {parent === 'TransactionsScreen' ? (
          <Image
            source={require('../assets/icon/transaction2.png')}
            style={{width: 24, height: 24}}
          />
        ) : (
          <Image
            source={require('../assets/icon/transaction.png')}
            style={{width: 24, height: 24}}
          />
        )}

        <Text
          style={[
            styles.footerText,
            parent === 'TransactionsScreen' && {
              fontFamily: 'Montserrat-SemiBold',
            },
          ]}>
          Transaction
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate('MyprofileScreen');
          // setSelectedTab(4);
        }}
        style={styles.footerButton}>
        {parent === 'MyprofileScreen' ? (
          <Image
            source={require('../assets/icon/account1.png')}
            style={{width: 24, height: 24}}
          />
        ) : (
          <Image
            source={require('../assets/icon/user.png')}
            style={{width: 24, height: 24}}
          />
        )}

        <Text
          style={[
            styles.footerText,
            parent === 'MyprofileScreen' && {
              fontFamily: 'Montserrat-SemiBold',
            },
          ]}>
          Account
        </Text>
      </TouchableOpacity>
    </View>
    // </View>
  );
};

export default BottomNavigator;
const styles = StyleSheet.create({
  container: {
    height: hp(11),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFF7F1',
    borderTopRightRadius: wp(8),
    borderTopLeftRadius: wp(8),
    elevation: 80,
    shadowColor: '#000',
    marginLeft: wp(-2),
    // marginTop: 90,
  },

  footerButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: wp(20),
  },

  footerText: {
    color: '#888',
    marginBottom: hp(2),
    fontSize: hp(1.5),
  },

  planImaBox: {
    width: 24,
    height: 24,
    marginLeft: wp(1.5),
  },
});
