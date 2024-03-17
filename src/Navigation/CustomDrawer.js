import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image, Alert, ScrollView} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {async_keys, clearData, getData} from '../api/UserPreference';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';

// Image
import ic_right from '../assets/icon/right.png';
import ic_profile from '../assets/icon/profile.png';

const CustomDrawer = props => {
  const {navigation} = props;

  // using redux
  const [typeData, setTypeData] = useState('');
  const profile_Data = useSelector(state => state.ApiReducer);
  const visiterProfileData = useSelector(state => state.visitorTypeReducer);

  useEffect(() => {
    const data = async () => {
      const get = await getData(async_keys.type);
      setTypeData(get);
    };

    data();
  }, []);

  const onLogout = async () => {
    try {
      Alert.alert(
        'Logout',
        'Are you sure, you want to logout?',
        [
          {text: 'NO', style: 'cancel'},
          {
            text: 'YES',
            onPress: async () => {
              navigation.navigate('logged_Out');
              // navigation.navigate('LoginScreen');
              await clearData();
            },
          },
        ],
        {
          cancelable: false,
        },
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  if (typeData === 'subscriber') {
    return (
      <View style={styles.container}>
        <View style={styles.profileMainBox}>
          <Image source={ic_profile} style={styles.profileIcon} />
          <View>
            <Text style={styles.nameText}>{profile_Data.data?.first_name}</Text>
            <Text style={styles.nameText}>{`${profile_Data.data?.email}`}</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.editProfileButton}
          onPress={() => navigation.navigate('MyprofileScreen')}>
          <Text style={styles.editProfileText}>Edit profile</Text>
        </TouchableOpacity>

        <View style={styles.lineBox} />

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.homeContainer}>
            <TouchableOpacity
              style={[styles.mainBox, {marginTop: hp(2)}]}
              onPress={() => navigation.navigate('HomeScreenSubscriber')}>
              <View style={styles.IconTextBox}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <View style={styles.logOutImageBox}>
                    <Image
                      source={require('../assets/icon/home.png')}
                      style={{width: wp(6), height: hp(3)}}
                    />
                  </View>
                  <Text style={styles.emiText}>Home </Text>
                </View>
                <View>
                  <Image source={ic_right} style={styles.rightIcon} />
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.mainBox]}
              onPress={() => navigation.navigate('Notification')}>
              <View style={styles.IconTextBox}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <View style={styles.logOutImageBox}>
                    <Image
                      source={require('../assets/icon/notification.png')}
                      style={{width: wp(6), height: hp(3)}}
                    />
                  </View>
                  <Text style={styles.emiText}>Notification</Text>
                </View>
                <View>
                  <Image source={ic_right} style={styles.rightIcon} />
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.mainBox}
              onPress={() => navigation.navigate('Transaction')}>
              <View style={styles.IconTextBox}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <View style={styles.logOutImageBox}>
                    <Image
                      source={require('../assets/icon/transaction.png')}
                      style={{width: wp(6), height: hp(3)}}
                    />
                  </View>
                  <Text style={styles.emiText}>Transaction</Text>
                </View>
                <View>
                  <Image source={ic_right} style={styles.rightIcon} />
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.mainBox}
              onPress={() => navigation.navigate('Auction')}>
              <View style={styles.IconTextBox}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <View style={styles.logOutImageBox}>
                    <Image
                      source={require('../assets/icon/auctions.png')}
                      style={{width: wp(6), height: hp(3)}}
                    />
                  </View>
                  <Text style={styles.emiText}>Auction</Text>
                </View>
                <View>
                  <Image source={ic_right} style={styles.rightIcon} />
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.mainBox}
              onPress={() => navigation.navigate('SubscriberPlans')}>
              <View style={styles.IconTextBox}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <View style={styles.logOutImageBox}>
                    <Image
                      source={require('../assets/icon/plan.png')}
                      style={{width: wp(6), height: hp(3)}}
                    />
                  </View>
                  <Text style={styles.emiText}>My plans</Text>
                </View>
                <View>
                  <Image source={ic_right} style={styles.rightIcon} />
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.mainBox}
              onPress={() => navigation.navigate('Settings')}>
              <View style={styles.IconTextBox}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <View style={styles.logOutImageBox}>
                    <Image
                      source={require('../assets/icon/setting.png')}
                      style={{width: wp(6), height: hp(3)}}
                    />
                  </View>
                  <Text style={styles.emiText}>Settings</Text>
                </View>
                <View>
                  <Image source={ic_right} style={styles.rightIcon} />
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.mainBox}
              onPress={() => navigation.navigate('MyChitScreen')}>
              <View style={styles.IconTextBox}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <View style={styles.logOutImageBox}>
                    <Image
                      source={require('../assets/icon/currect.png')}
                      style={{width: wp(7), height: hp(3.5)}}
                    />
                  </View>
                  <Text style={[styles.emiText, {marginLeft: wp(3)}]}>
                    My chits
                  </Text>
                </View>
                <View>
                  <Image source={ic_right} style={styles.rightIcon} />
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.mainBox}
              onPress={() => navigation.navigate('Myenquiry')}>
              <View style={styles.IconTextBox}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <View style={styles.logOutImageBox}>
                    <Image
                      source={require('../assets/icon/plan.png')}
                      style={{width: wp(6), height: hp(3)}}
                    />
                  </View>
                  <Text style={styles.emiText}>My enquiry</Text>
                </View>
                <View>
                  <Image source={ic_right} style={styles.rightIcon} />
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.mainBox}
              onPress={() => navigation.navigate('SubscriptionScreen')}>
              <View style={styles.IconTextBox}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <View style={styles.logOutImageBox}>
                    <Image
                      source={require('../assets/icon/mySubscriber.png')}
                      style={{width: wp(6), height: hp(3)}}
                    />
                  </View>
                  <Text style={[styles.emiText, {marginLeft: wp(4)}]}>
                    My subscriptions
                  </Text>
                </View>
                <View>
                  <Image source={ic_right} style={styles.rightIcon} />
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.mainBox}
              onPress={() => navigation.navigate('InvoicesScreen')}>
              <View style={styles.IconTextBox}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <View style={styles.logOutImageBox}>
                    <Image
                      source={require('../assets/icon/mySubscriber.png')}
                      style={{width: wp(6), height: hp(3)}}
                    />
                  </View>
                  <Text style={[styles.emiText, {marginLeft: wp(4)}]}>
                    Invoices
                  </Text>
                </View>
                <View>
                  <Image source={ic_right} style={styles.rightIcon} />
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.mainBox} onPress={onLogout}>
              <View style={styles.IconTextBox}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <View style={styles.logOutImageBox}>
                    <Image
                      source={require('../assets/icon/log_Out.png')}
                      style={{width: wp(6), height: hp(3)}}
                    />
                  </View>

                  <Text style={[styles.emiText, {marginLeft: wp(4)}]}>
                    LogOut
                  </Text>
                </View>
                <View>
                  <Image source={ic_right} style={styles.rightIcon} />
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <View style={styles.profileMainBox}>
          <Image source={ic_profile} style={styles.profileIcon} />
          <View>
            <Text style={styles.nameText}>
              {visiterProfileData?.data?.name}
            </Text>
            <Text style={styles.nameText}>
              {visiterProfileData?.data?.email}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.editProfileButton}
          onPress={() => navigation.navigate('MyprofileScreen')}>
          <Text style={styles.editProfileText}>Edit profile</Text>
        </TouchableOpacity>

        <View style={styles.lineBox} />

        <View style={styles.homeContainer}>
          <TouchableOpacity
            style={[styles.mainBox]}
            onPress={() => navigation.navigate('Home')}>
            <View style={styles.IconTextBox}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View style={styles.logOutImageBox}>
                  <Image
                    source={require('../assets/icon/home.png')}
                    style={{width: wp(6), height: hp(3)}}
                  />
                </View>
                <Text style={styles.emiText}>Home</Text>
              </View>
              <View>
                <Image source={ic_right} style={styles.rightIcon} />
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.mainBox}
            onPress={() => navigation.navigate('Myenquiry')}>
            <View style={styles.IconTextBox}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View style={styles.logOutImageBox}>
                  <Image
                    source={require('../assets/icon/plan.png')}
                    style={{width: wp(6), height: hp(3)}}
                  />
                </View>
                <Text style={styles.emiText}>My enquiry</Text>
              </View>
              <View>
                <Image source={ic_right} style={styles.rightIcon} />
              </View>
            </View>
          </TouchableOpacity>

          {/* <TouchableOpacity
            style={[styles.mainBox]}
            onPress={() => navigation.navigate('NoDataFoundScreen')}>
            <View style={styles.IconTextBox}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View style={styles.logOutImageBox}>
                  <Image
                    source={require('../assets/icon/notification.png')}
                    style={{width: wp(6), height: hp(3)}}
                  />
                </View>
                <Text style={styles.emiText}>Notification</Text>
              </View>
              <View>
                <Image source={ic_right} style={styles.rightIcon} />
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.mainBox}
            onPress={() => navigation.navigate('NoDataFoundScreen')}>
            <View style={styles.IconTextBox}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View style={styles.logOutImageBox}>
                  <Image
                    source={require('../assets/icon/transaction.png')}
                    style={{width: wp(6), height: hp(3)}}
                  />
                </View>
                <Text style={styles.emiText}>Transaction</Text>
              </View>
              <View>
                <Image source={ic_right} style={styles.rightIcon} />
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.mainBox}
            onPress={() => navigation.navigate('NoDataFoundScreen')}>
            <View style={styles.IconTextBox}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View style={styles.logOutImageBox}>
                  <Image
                    source={require('../assets/icon/auctions.png')}
                    style={{width: wp(6), height: hp(3)}}
                  />
                </View>
                <Text style={styles.emiText}>Auction</Text>
              </View>
              <View>
                <Image source={ic_right} style={styles.rightIcon} />
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.mainBox}
            onPress={() => navigation.navigate('NoDataFoundScreen')}>
            <View style={styles.IconTextBox}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View style={styles.logOutImageBox}>
                  <Image
                    source={require('../assets/icon/plan.png')}
                    style={{width: wp(6), height: hp(3)}}
                  />
                </View>
                <Text style={styles.emiText}>Plans</Text>
              </View>
              <View>
                <Image source={ic_right} style={styles.rightIcon} />
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.mainBox}
            onPress={() => navigation.navigate('NoDataFoundScreen')}>
            <View style={styles.IconTextBox}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View style={styles.logOutImageBox}>
                  <Image
                    source={require('../assets/icon/setting.png')}
                    style={{width: wp(6), height: hp(3)}}
                  />
                </View>
                <Text style={styles.emiText}>Settings</Text>
              </View>
              <View>
                <Image source={ic_right} style={styles.rightIcon} />
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.mainBox}
            onPress={() => navigation.navigate('NoDataFoundScreen')}>
            <View style={styles.IconTextBox}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View style={styles.logOutImageBox}>
                  <Image
                    source={require('../assets/icon/currect.png')}
                    style={{width: wp(7), height: hp(3.5)}}
                  />
                </View>
                <Text style={styles.emiText}>My chits</Text>
              </View>
              <View>
                <Image source={ic_right} style={styles.rightIcon} />
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.mainBox}
            onPress={() => navigation.navigate('NoDataFoundScreen')}>
            <View style={styles.IconTextBox}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View style={styles.logOutImageBox}>
                  <Image
                    source={require('../assets/icon/mySubscriber.png')}
                    style={{width: wp(6), height: hp(3)}}
                  />
                </View>
                <Text style={styles.emiText}> My subscriptions</Text>
              </View>
              <View>
                <Image source={ic_right} style={styles.rightIcon} />
              </View>
            </View>
          </TouchableOpacity> */}

          <TouchableOpacity style={styles.mainBox} onPress={onLogout}>
            <View style={styles.IconTextBox}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View style={styles.logOutImageBox}>
                  <Image
                    source={require('../assets/icon/log_Out.png')}
                    style={{width: wp(6), height: hp(3)}}
                  />
                </View>
                <Text style={[styles.emiText, {marginLeft: wp(5)}]}>
                  LogOut
                </Text>
              </View>
              <View>
                <Image source={ic_right} style={styles.rightIcon} />
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
};

export default CustomDrawer;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  homeContainer: {
    flex: 1,
  },

  lllImage: {
    height: hp(10),
    width: wp(20),
    borderRadius: wp(10),
    marginLeft: wp(4),
  },

  rakeshText: {
    fontSize: wp(4),
    fontWeight: '800',
    color: '#000',
    marginLeft: wp(4),
  },

  rakeshEmail: {
    fontSize: wp(3.5),
    fontWeight: '500',
    color: '#000',
    marginLeft: wp(4),
  },

  ImageBackgroundBox: {
    backgroundColor: '#b9b9b9',
    height: hp(10),
    width: wp(100),
  },

  profileBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#b9b9b9',
    height: hp(80),
    marginTop: hp(-1),
  },

  IconTextBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: wp(4),
    marginTop: hp(2),
  },

  homeIcon: {
    height: hp(5),
    width: wp(10),
  },

  rightIcon: {
    height: hp(3),
    width: wp(6),
  },

  mainBox: {
    height: hp(8),
    borderColor: '#D1CACA',
    borderRadius: wp(1),
  },

  emiText: {
    color: '#000',
    marginLeft: wp(4),
    fontSize: wp(4.5),
    fontFamily: 'Montserrat-Regular',
  },

  ////'''''''''''''''''''''''''' EditProfile
  profileMainBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp(3.5),
    marginLeft: wp(4),
  },

  profileIcon: {
    height: hp(8.1),
    width: wp(16.5),
  },

  nameText: {
    fontSize: wp(3.5),
    color: '#000',
    fontFamily: 'Montserrat-Regular',
    marginLeft: wp(2),
  },

  editProfileButton: {
    height: hp(3.5),
    width: wp(28),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: wp(0.3),
    backgroundColor: '#FFF7F1',
    alignSelf: 'flex-end',
    marginTop: hp(-1),
    borderWidth: 0.1,
    marginRight: wp(4),
  },

  lineBox: {
    borderWidth: 0.2,
    backgroundColor: '#000',
    marginHorizontal: wp(4),
    marginTop: hp(1),
  },

  editProfileText: {
    fontSize: wp(3),
    color: '#000',
    fontFamily: 'Montserrat-Medium',
    paddingTop: hp(-1),
  },

  logOutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: wp(4),
  },
  logOutText: {
    color: '#000',
    marginLeft: wp(4),
    fontSize: wp(4.5),
    fontFamily: 'Montserrat-Regular',
  },

  log_Out: {
    height: hp(3.5),
    width: wp(7),
  },
  logOutImageBox: {
    height: hp(5),
    width: wp(10),
    borderRadius: wp(5),
    backgroundColor: '#FFF7F1',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: wp(-2),
  },
});
