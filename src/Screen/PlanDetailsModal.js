import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

//Icon
import ic_cancel from '../assets/icon/cancel.png';
import {async_keys, getData} from '../api/UserPreference';
import {BASE_URL} from '../api/ApiInfo';
import {useNavigation} from '@react-navigation/native';

const PlanDetailsModal = ({isVisible, onClose, planData}) => {
  const navigation = useNavigation();
  const [visiterIdData, setVisiterIdData] = useState(false);
  const [loader, setLoader] = useState(false);
  const plan_Data = planData?.plan_id || '';

  useEffect(() => {
    const adhar_Data = async () => {
      const get_visiterId = await getData(async_keys.visitor_id);
      setVisiterIdData(get_visiterId);
    };
    adhar_Data();
  }, []);

  const PlanEnquiryData = async () => {
    try {
      setLoader(true);
      const params = {
        visitor_id: visiterIdData,
        plan_id: plan_Data,
      };

      const formdata = new FormData();
      for (let key in params) {
        formdata.append(key, params[key]);
      }

      var info = {};
      info.method = 'POST';
      info.body = formdata;

      const response = await fetch(`${BASE_URL}plan_enquiry`, info);
      if (response) {
        const newResponse = await response.json();
        const {Status, Message} = newResponse;
        if (Status === true) {
          navigation.navigate('SuccessScreen');
          // navigation.navigate('SignUp');

          setLoader(false);
        } else {
          setLoader(false);
          Alert.alert('', 'Validation errors');
        }
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
  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isVisible}
        onRequestClose={onClose}
        navigation={navigation}>
        <View style={styles.modalContainer}>
          <TouchableOpacity onPress={onClose}>
            <Image source={ic_cancel} style={styles.cancelImage} />
          </TouchableOpacity>
          <Text style={[styles.PlanDetailsHeaderText]}>Plan Details</Text>
          <View style={styles.planNameBox}>
            <Text style={styles.planText}>Plan - </Text>
            <Text style={styles.planNameText}>
              {`${planData?.plan_name || ''}`}
            </Text>
          </View>
          <View style={styles.planNameBox}>
            <Text style={styles.planText}>Amount - </Text>
            <Text style={styles.planNameText}>
              {`${planData?.plan_amount || ''}`}
            </Text>
          </View>

          <View style={styles.planNameBox}>
            <Text style={styles.planText}>Auction - </Text>
            <Text style={styles.planNameText}>{`${
              planData?.auction_type || ''
            }`}</Text>
          </View>

          <View style={styles.planNameBox}>
            <Text style={styles.planText}>Foreman - </Text>
            <Text style={styles.planNameText}>{`${
              planData?.foreman_fees || ''
            }`}</Text>
          </View>

          <View style={styles.planNameBox}>
            <Text style={styles.planText}>Total - </Text>
            <Text style={styles.planNameText}>{`${
              planData?.total_subscription || ''
            }`}</Text>
          </View>

          <View style={styles.planNameBox}>
            <Text style={styles.planText}>Fractions - </Text>
            <Text style={styles.planNameText}>{`${
              planData?.tenure || ''
            }`}</Text>
          </View>

          <View style={styles.planNameBox}>
            <Text style={styles.planText}>Max - </Text>
            <Text style={styles.planNameText}>{`${
              planData?.tenure || ''
            }`}</Text>
          </View>

          <View style={styles.planNameBox}>
            <Text style={styles.planText}>Admission - </Text>
            <Text style={styles.planNameText}>{`${
              planData?.admission_fee || ''
            }`}</Text>
          </View>

          <View style={styles.planNameBox}>
            <Text style={styles.planText}>Start Month - </Text>
            <Text style={styles.planNameText}>{`${
              planData?.start_month || ''
            }`}</Text>
          </View>

          <View style={styles.planNameBox}>
            <Text style={styles.planText}>End Month - </Text>
            <Text style={styles.planNameText}>{`${
              planData?.end_month || ''
            }`}</Text>
          </View>

          <TouchableOpacity
            style={styles.enquiryButton}
            onPress={() => {
              PlanEnquiryData(), onClose();
            }}>
            <Text style={styles.enquiryText}>Enquiry</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
    marginHorizontal: wp(6),
    borderRadius: wp(4),
    marginVertical: hp(16),
    padding: wp(2),
    // borderWidth: 0.1,
  },

  detailsBox: {
    marginTop: hp(2),
  },
  detailsText: {
    fontSize: wp(4),
    fontFamily: 'Montserrat-Regular',
    color: '#000',
    marginBottom: hp(1),
  },
  modalCloseText: {
    fontSize: wp(4),
    fontFamily: 'Montserrat-Regular',
    marginTop: hp(2),
    color: '#ed802b',
    alignSelf: 'flex-end',
  },
  ////////////////////
  PlanDetailsHeaderText: {
    fontSize: wp(5),
    color: '#000',
    fontFamily: 'Montserrat-Bold',
    marginTop: hp(-2),
    marginLeft: wp(6),
    marginBottom: hp(2),
  },

  planNameText: {
    fontSize: wp(4),
    fontFamily: 'Montserrat-Regular',
    marginTop: hp(1.5),
    color: '#000',
    marginLeft: wp(1),
  },
  planText: {
    fontSize: wp(4),
    fontFamily: 'Montserrat-SemiBold',
    marginTop: hp(1.5),
    color: '#000',
    marginLeft: wp(6),
  },

  planNameBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  cancelImage: {
    height: hp(4),
    width: wp(8),
    alignSelf: 'flex-end',
    marginTop: hp(-4),
    marginRight: wp(4),
  },

  enquiryButton: {
    height: hp(5.5),
    width: wp(40),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: wp(3),
    backgroundColor: '#ED802B',
    alignSelf: 'flex-end',
    marginTop: hp(4),
    marginRight: wp(6),
  },

  enquiryText: {
    fontSize: wp(4.5),
    color: '#fff',
    fontFamily: 'Montrast-Regular',
  },
});

export default PlanDetailsModal;
