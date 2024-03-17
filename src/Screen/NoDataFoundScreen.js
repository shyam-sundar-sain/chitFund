import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';
import {color} from '@rneui/base';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import ic_vector from '../assets/icon/vector.png';
import {TouchableOpacity} from 'react-native-gesture-handler';

const NoDataFoundScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{
          marginLeft: wp(6),
          alignSelf: 'flex-start',
          marginTop: hp(2),
          marginBottom: hp(1),
        }}>
        <Image source={ic_vector} style={styles.vectorIcon} />
      </TouchableOpacity>

      <View style={styles.homeContainer}>
        <Text
          style={{
            fontSize: wp(5),
            color: '#000',
            marginTop: hp(1),
            fontFamily: 'Montserrat-Regular',
          }}>
          No Data Found
        </Text>
      </View>
    </View>
  );
};

export default NoDataFoundScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  homeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  vectorIcon: {
    height: hp(2.5),
    width: wp(5),
    // marginLeft: wp(4),
    // marginTop: hp(2),
  },
});
