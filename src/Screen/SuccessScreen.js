import {View, Text, Image, StyleSheet} from 'react-native';
import React, {useEffect, version} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import ic_vector from '../assets/icon/vector.png';
import {TouchableOpacity} from 'react-native-gesture-handler';
// Image

import ic_right from '../assets/icon/ic_right.png';

const SuccessScreen = ({navigation}) => {

  // useEffect(() => {
    
  // })
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image source={ic_vector} style={styles.vectorIcon} />
      </TouchableOpacity>
      <View style={styles.homeContainer}>
        <Image source={ic_right} style={styles.rightIcon} />
        <Text
          style={{
            fontSize: wp(4),
            color: '#000',
            fontFamily: 'Montserrat-Regular',
          }}>
          Thank you for reaching out and inquiring.
        </Text>

        <Text
          style={{
            fontSize: wp(4),
            color: '#000',
            fontFamily: 'Montserrat-Regular',
          }}>
          I appreciate your interest.
        </Text>
      </View>
    </View>
  );
};

export default SuccessScreen;
const styles = StyleSheet.create({
  vectorIcon: {
    height: hp(2.5),
    width: wp(5),
    marginTop: hp(2),
    marginLeft: wp(4),
  },

  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  homeContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  rightIcon: {
    height: hp(16),
    aspectRatio: 1 / 1,
    marginBottom: hp(2),
  },
});
