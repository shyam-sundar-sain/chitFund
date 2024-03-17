import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
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

const EmiScreen = ({navigation}) => {
  const [loader, setLoader] = useState('');
  const [emiData, setEmiData] = useState('');
  const [selectedTab, setSelectedTab] = useState(emiData.declared);

  useEffect(() => {
    // Update selectedTab when emiData changes
    if (emiData) {
      setSelectedTab(emiData.due);
    }
  }, [emiData]);

  // Tab Functionality
  const handleChangePadding = () => {
    setSelectedTab(emiData.pending);
  };

  const handleChangeDue = () => setSelectedTab(emiData.due);

  const handleChangeCurrent = () => {
    setSelectedTab(emiData.paid);
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

      const response = await fetch(`${BASE_URL}emis`, requestOptions);
      const newResponse = await response.json();
      const {Status, Data, Message} = newResponse;
      if (Status === true) {
        setEmiData(Data);
        console.log('Data.pending.length', Data.pending.length);
        setLoader(false);
      } else {
        setLoader(false);
        Alert.alert('', Message);
      }
    } catch (error) {
      7;
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
    <View style={styles.MainBox}>
      <View style={styles.testPlanBox}>
        <Text style={styles.testPlanText}>{`${item.plan_name}`}</Text>
        <View style={styles.statusBox}>
          <Text style={styles.paddingText}>{`${item.status}`}</Text>
        </View>
      </View>

      <Text
        style={styles.discountText}>{`Slot Number - ${item.slot_number}`}</Text>
      <Text style={styles.myChitText}>{`${item.month}`}</Text>

      <View style={styles.dueBox}>
        <Text style={styles.dueText}>Emi - </Text>
        <Text style={styles.montText}>{`₹${item.due_amount}/month`}</Text>
      </View>

      <View style={styles.dueBox}>
        <Text style={styles.dueText}>Due Amount - </Text>
        <Text style={styles.montText}>{`₹${item.due_amount}/month`}</Text>
      </View>
    </View>
  );

  const dueItem = ({item}) => (
    <View style={styles.MainBox}>
      <View style={styles.testPlanBox}>
        <Text style={styles.testPlanText}>{`${item.plan_name}`}</Text>
        <View style={[styles.statusBox, {width: wp(15)}]}>
          <Text style={styles.paddingText}>{`${item.status}`}</Text>
        </View>
      </View>

      <Text
        style={styles.discountText}>{`Slot Number - ${item.slot_number}`}</Text>
      <Text style={styles.myChitText}>{`${item.month}`}</Text>

      <View style={styles.dueBox}>
        <Text style={styles.dueText}>Emi - </Text>
        <Text style={styles.montText}>{`₹${item.due_amount}/month`}</Text>
      </View>

      <View style={styles.dueBox}>
        <Text style={styles.dueText}>Due Amount - </Text>
        <Text style={styles.montText}>{`₹${item.due_amount}/month`}</Text>
      </View>
    </View>
  );

  const currentItem = ({item}) => (
    <View style={styles.MainBox}>
      <View style={styles.testPlanBox}>
        <Text style={styles.testPlanText}>{`${item.plan_name}`}</Text>
        <View style={[styles.statusBox, {width: wp(15)}]}>
          <Text style={styles.paddingText}>{`${item.status}`}</Text>
        </View>
      </View>

      <Text
        style={styles.discountText}>{`Slot Number - ${item.slot_number}`}</Text>
      <Text style={styles.myChitText}>{`${item.month}`}</Text>

      <View style={styles.dueBox}>
        <Text style={styles.dueText}>Emi - </Text>
        <Text style={styles.montText}>{`₹${item.emi}/month`}</Text>
      </View>

      <View style={styles.dueBox}>
        <Text style={styles.dueText}>Due Amount - </Text>
        <Text style={styles.montText}>{`₹${item.due_amount}/month`}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerBox}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={ic_vector} style={styles.vectorIcon} />
        </TouchableOpacity>
        <Text style={styles.TransactionsText}>EMI's</Text>
      </View>

      <View style={styles.tabButtonBox}>
        <TouchableOpacity
          style={[
            styles.upComingButton,
            {
              backgroundColor:
                selectedTab === emiData.pending ? '#FF2F00' : '#fff',
            },
          ]}
          onPress={handleChangePadding}>
          <Text
            style={[
              styles.upComingText,
              {color: selectedTab === emiData.pending ? '#fff' : '#000'},
            ]}>
            Upcoming
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.upComingButton,
            {
              backgroundColor: selectedTab === emiData.due ? '#FF2F00' : '#fff',
              width: wp(20),
            },
          ]}
          onPress={handleChangeDue}>
          <Text
            style={[
              styles.upComingText,
              {color: selectedTab === emiData.due ? '#fff' : '#000'},
            ]}>
            Due
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.upComingButton,
            {
              backgroundColor:
                selectedTab === emiData.paid ? '#FF2F00' : '#fff',
            },
          ]}
          onPress={handleChangeCurrent}>
          <Text
            style={[
              styles.upComingText,
              {color: selectedTab === emiData.paid ? '#fff' : '#000'},
            ]}>
            Complete
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.homeContainer}>
        {selectedTab === emiData.pending ? (
          emiData?.pending?.length ? (
            <FlatList data={emiData.pending} renderItem={renderItem} />
          ) : (
            <View style={styles.noTransactionBox}>
              <Text style={styles.noTransactionData}>No data found</Text>
            </View>
          )
        ) : selectedTab === emiData.due ? (
          emiData?.due?.length ? (
            <FlatList data={emiData.due} renderItem={dueItem} />
          ) : (
            <View style={styles.noTransactionBox}>
              <Text style={styles.noTransactionData}>No data found</Text>
            </View>
          )
        ) : selectedTab === emiData.paid ? (
          emiData?.paid?.length ? (
            <FlatList data={emiData.paid} renderItem={currentItem} />
          ) : (
            <View style={styles.noTransactionBox}>
              <Text style={styles.noTransactionData}>No data found</Text>
            </View>
          )
        ) : null}
      </View>
    </View>
  );
};

export default EmiScreen;
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
  MainBox: {
    height: hp(20),
    marginHorizontal: wp(4),
    borderRadius: wp(3),
    backgroundColor: '#ED802B',
    elevation: 3,
    marginTop: hp(2),
  },

  testPlanText: {
    fontSize: wp(5),
    color: '#fff',
    fontFamily: 'Montserrat-Bold',
  },

  testPlanBox: {
    marginHorizontal: wp(4),
    marginTop: hp(2),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  discountText: {
    marginLeft: wp(3.5),
    marginTop: hp(0.5),
    fontFamily: 'Montserrat-SemiBold',
    color: '#fff',
    fontSize: wp(4),
  },

  myChitText: {
    marginLeft: wp(4),
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

  montText: {
    fontSize: wp(4),
    color: '#fff',
    fontFamily: 'Roboto-Regular',
  },

  dueText: {
    fontFamily: 'Montserrat-SemiBold',
    color: '#fff',
  },

  dueBox: {
    flexDirection: 'row',
    marginLeft: wp(4),
    marginTop: hp(0.5),
  },

  rightArrowIcon: {
    height: hp(3),
    width: wp(6),
    marginTop: hp(-1),
    marginLeft: wp(82),
  },

  paddingText: {
    fontSize: wp(4),
    color: '#FF2F00',
    fontFamily: 'Montserrat-SemiBold',
  },

  upComingButton: {
    height: hp(4.5),
    width: wp(32),
    borderWidth: 0.1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: wp(4),
  },

  tabButtonBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: wp(4),
    marginTop: hp(2),
  },

  upComingText: {
    fontSize: wp(4),
    fontFamily: 'Montserrat-Regular',
  },

  statusBox: {
    height: hp(3),
    width: wp(20),
    backgroundColor: '#fff',
    borderColor: '#fff',
    borderRadius: wp(1),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: hp(0.4),
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
