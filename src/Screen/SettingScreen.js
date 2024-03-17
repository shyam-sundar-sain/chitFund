import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// Icon
import ic_vector from '../assets/icon/vector.png';
import ic_rightArrow from '../assets/icon/rightArrow.png';

const SettingScreen = ({navigation}) => {
  return (
    <View>
      <View style={styles.headerBox}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={ic_vector} style={styles.vectorIcon} />
        </TouchableOpacity>
        <Text style={styles.TransactionsText}>Settings</Text>
      </View>

      <TouchableOpacity
        style={styles.passwordResetBox}
        onPress={() => navigation.navigate('ResetPasswordScreen')}>
        <Text style={styles.passwordResetText}>Password Reset</Text>
        <Image source={ic_rightArrow} style={styles.rightArrowIcon} />
      </TouchableOpacity>
    </View>
  );
};

export default SettingScreen;
const styles = StyleSheet.create({
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

  passwordResetText: {
    fontSize: wp(4.5),
    color: '#000',
    fontFamily: 'Montserrat-Medium',
  },

  passwordResetBox: {
    height: hp(7),
    marginHorizontal: wp(4),
    borderWidth: 0.5,
    borderRadius: wp(2),
    borderColor: '#D1CACA',
    marginTop: hp(3),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp(4),
  },

  rightArrowIcon: {
    height: hp(2.5),
    width: wp(5),
  },
});
