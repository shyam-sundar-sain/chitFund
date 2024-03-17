import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// Icon
import ic_vector from '../assets/icon/vector.png';
import ic_notifications from '../assets/icon/notifications.png';

import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import {async_keys, getData} from '../api/UserPreference';
import {BASE_URL} from '../api/ApiInfo';

const NotificationScreen = ({navigation}) => {
  const [loader, setLoader] = useState(false);
  const [notification, setNotificationData] = useState('');

  useEffect(() => {
    const data = async () => {
      const subIdData = await getData(async_keys.sub_id);
      fetchData(subIdData);
    };
    data();
  }, []);

  const fetchData = async subIdData => {
    try {
      setLoader(true);
      const response = await fetch(
        `${BASE_URL}get_notifications?sub_id=${subIdData}`,
      );
      if (response) {
        const newResponse = await response.json();
        const {Status, Data} = newResponse;

        if (Status === true) {
          setNotificationData(Data);
          setLoader(false);
        } else {
          setLoader(false);
          Alert.alert('', 'Validation errors');
        }
      }
    } catch (error) {
      console.log(error, 'error');
    }
  };

  const renderNotifucationItem = ({item, index}) => {
    return (
      <TouchableOpacity
        style={styles.notificationBox}
        onPress={() =>
          navigation.navigate('NotificationDetails', {
            params: item.description,
          })
        }>
        <View style={styles.notificationImaBox}>
          <Image source={ic_notifications} style={styles.notificationIma} />
        </View>
        <Text style={styles.notificationText}>{item?.title}</Text>
      </TouchableOpacity>
    );
  };

  if (loader) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignSelf: 'center'}}>
        <ActivityIndicator size="large" color="green" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerBox}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={ic_vector} style={styles.vectorIcon} />
        </TouchableOpacity>
        <Text style={styles.TransactionsText}>Notifications</Text>
      </View>

      <View style={styles.homeContainer}>
        {notification.length === 0 ? (
          <View
            style={{flex: 1, alignSelf: 'center', justifyContent: 'center'}}>
            <View style={styles.NonotificationImaBox}>
              <Image
                source={ic_notifications}
                style={{height: hp(4), width: wp(8), alignSelf: 'center'}}
              />
            </View>
            <Text style={styles.noNotificationText}>No notification</Text>
          </View>
        ) : (
          <FlatList data={notification} renderItem={renderNotifucationItem} />
        )}
      </View>
    </View>
  );
};

export default NotificationScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  headerBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp(2),
    marginLeft: wp(4),
    marginBottom: hp(1),
  },

  vectorIcon: {
    height: hp(2.5),
    width: wp(5),
  },

  homeContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },

  TransactionsText: {
    fontSize: wp(5),
    color: '#000',
    fontFamily: 'Montserrat-Medium',
    marginLeft: wp(4),
  },

  notificationBox: {
    height: hp(8),
    borderRadius: wp(1),
    backgroundColor: '#fff',
    borderWidth: 0.2,
    marginHorizontal: wp(4),
    marginTop: hp(2),
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: wp(4),
  },
  notificationIma: {
    height: hp(3),
    width: wp(6),
  },
  notificationText: {
    fontSize: wp(4),
    color: '#000',
    fontFamily: 'Montserrat-Bold',
    marginLeft: wp(4),
  },
  notificationImaBox: {
    height: hp(5),
    width: wp(10),
    borderRadius: wp(6),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f2f2f2',
  },
  noNotificationText: {
    fontSize: wp(5),
    color: '#000',
    marginTop: hp(1),
    fontFamily: 'Montserrat-Regular',
  },
  NonotificationImaBox: {
    backgroundColor: '#f2f2f2',
    height: hp(7),
    width: wp(14),
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: wp(8),
  },
});
