import React, {useEffect} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// icon
import ic_vector from '../assets/icon/vector.png';
import ic_right from '../assets/icon/ic_right.png';

const SuccessDocumentScreen = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.reset({
        index: 0, // Index of the screen to reset to (first screen in the stack)
        routes: [{name: 'loggedIn'}], // Array of screens to replace the stack with
      });
    }, 1000);
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image source={ic_vector} style={styles.vectorIcon} />
      </TouchableOpacity>
      <View style={styles.imageBox}>
        <Text style={styles.successHeaderText}>Success!</Text>
        <Image source={ic_right} style={styles.rightIcon} />
        <Text style={styles.yourDocumentText}>Your document has</Text>

        <Text style={styles.beenText}>been saved.</Text>

        {/* <TouchableOpacity style={styles.continueButton}>
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity> */}
      </View>
    </View>
  );
};

export default SuccessDocumentScreen;
const styles = StyleSheet.create({
  imageBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },

  vectorIcon: {
    height: hp(3),
    width: wp(6),
    marginTop: hp(2),
    marginLeft: wp(4),
  },

  rightIcon: {
    height: hp(16),
    aspectRatio: 1 / 1,
    marginTop: hp(2),
  },

  yourDocumentText: {
    fontSize: wp(4),
    color: '#27ae60',
    fontFamily: 'Montserrat-Regular',
    marginTop: hp(2),
  },

  beenText: {
    fontSize: wp(4),
    color: '#27ae60',
    fontFamily: 'Montserrat-Regular',
  },

  successText: {
    fontSize: wp(6),
    color: '#000',
    fontFamily: 'Montserrat-Bold',
  },
  successHeaderText: {
    fontSize: wp(6),
    color: '#27ae60',
    fontWeight: '500',
    marginTop: hp(-5),
  },

  continueButton: {
    width: wp(45),
    backgroundColor: '#27ae60',
    padding: 7,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: wp(2),
    marginTop: hp(2),
  },

  continueButtonText: {
    fontSize: wp(5),
    color: '#fff',
    fontFamily: 'Montserrat-Regular',
  },
});
