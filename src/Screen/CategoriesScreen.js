import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// image
import ic_hea_ima from '../assets/icons/hea_ima.png';
import ic_leftarrow from '../assets/icons/leftarrow.png';
import {TextInput} from 'react-native-gesture-handler';
import ic_search from '../assets/icons/search.png';
import ic_favouriteCarton1 from '../assets/icons/favouriteCarton1.png';
import ic_favouriteCartoon2 from '../assets/icons/favouriteCartoon2.png';
import ic_addication from '../assets/icons/addication.png';
import ic_addication2 from '../assets/icons/addication2.png';
import ic_well_being from '../assets/icons/well_being.png';
import ic_well_being2 from '../assets/icons/well_being2.png';

const CategoriesScreen = ({navigation}) => {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.assessmentHeaderBox}>
        <ImageBackground source={ic_hea_ima} style={styles.heaimag}>
          <View
            style={{flexDirection: 'row', marginLeft: wp(4), marginTop: hp(8)}}>
            <Image source={ic_leftarrow} style={styles.leftArrowIma} />
            <Text style={styles.assessmentText}>Categories</Text>
          </View>

          <View style={styles.searchInputBox}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image source={ic_search} style={styles.searchIma} />
              <TextInput
                style={styles.searchInputText}
                placeholder="Search categories here..."
                placeholderTextColor={'#444444'}
              />
            </View>
          </View>
        </ImageBackground>
      </View>

      <View style={styles.homeContainer}>
        <Text style={styles.assessmentHeadingText}>
          Swiped based Categories
        </Text>

        <View style={styles.addicationMainBox}>
          <View style={styles.addictionBox}>
            <Image source={ic_addication} style={styles.well_beingIma} />
            <Text style={styles.addicationText}>Addiction</Text>
            <Text style={styles.addicationText2}>20 Assessments</Text>
          </View>

          <View style={styles.addictionBox}>
            <Image source={ic_well_being} style={styles.well_beingIma} />
            <Text style={styles.addicationText}>Well-being</Text>
            <Text style={styles.addicationText2}>20 Assessments</Text>
          </View>
        </View>

        <View style={[styles.addicationMainBox, {marginTop: hp(2)}]}>
          <View style={styles.addictionBox}>
            <Image source={ic_addication2} style={styles.well_beingIma} />
            <Text style={styles.addicationText}>Addiction</Text>
            <Text style={styles.addicationText2}>20 Assessments</Text>
          </View>

          <View style={styles.addictionBox}>
            <Image source={ic_well_being2} style={styles.well_beingIma} />
            <Text style={styles.addicationText}>Addiction</Text>
            <Text style={styles.addicationText2}>20 Assessments</Text>
          </View>
        </View>

        <View style={styles.addicationMainBox}>
          <View style={styles.addictionBox}>
            <Image source={ic_well_being} style={styles.well_beingIma} />
            <Text style={styles.addicationText}>Addiction</Text>
            <Text style={styles.addicationText2}>20 Assessments</Text>
          </View>

          <View style={styles.addictionBox}>
            <Image source={ic_addication} style={styles.well_beingIma} />
            <Text style={styles.addicationText}>Well-being</Text>
            <Text style={styles.addicationText2}>20 Assessments</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default CategoriesScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f4f2',
  },

  homeContainer: {
    backgroundColor: '#f7f4f2',
  },

  assessmentHeaderBox: {
    height: hp(29),
    backgroundColor: '#5383E6',
    borderBottomRightRadius: wp(10),
    borderBottomLeftRadius: wp(10),
  },

  heaimag: {
    height: hp(28),
    width: wp(100),
    borderBottomRightRadius: wp(10),
    overflow: 'hidden',
    marginTop: hp(1),
  },

  assessmentText: {
    fontSize: wp(5),
    color: '#fff',
    // fontFamily:''
    marginLeft: wp(3),
  },

  leftArrowIma: {
    height: hp(5),
    width: wp(10),
  },

  searchInputBox: {
    height: hp(6),
    backgroundColor: '#fff',
    marginTop: hp(7),
    borderRadius: wp(8),
    marginHorizontal: wp(4),
  },

  searchInputText: {
    fontSize: wp(4),
    fontFamily: 'Roboto-Regular',
    color: '#000',
    marginLeft: wp(2),
  },

  searchIma: {
    height: hp(3),
    width: wp(6),
    marginLeft: wp(4),
  },

  assessmentHeadingText: {
    fontSize: wp(5),
    color: '#3C3C3C',
    marginLeft: wp(4),
    marginTop: hp(3),
    fontFamily: 'Roboto-Bold',
    marginBottom: hp(2),
  },
  blogBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: wp(4),
    marginTop: hp(4),
  },

  assessmentsText: {
    fontSize: wp(4.5),
    color: '#3C3C3C',
    fontFamily: 'Roboto-Medium',
  },

  seeAllText: {
    fontSize: wp(4),
    color: '#8D90A1',
    fontFamily: 'Roboto-Regular',
  },
  favouriteCartimagMainBox: {
    flexDirection: 'row',
    // paddingHorizontal: wp(30),
    // justifyContent
  },

  favouriteCartimag: {
    height: hp(25),
    width: wp(52),
  },

  favouriteCartonText: {
    fontSize: wp(4),
    fontFamily: 'Roboto-Medium',
    color: '#3C3C3C',
    marginLeft: wp(4),
  },

  lorenText: {
    fontSize: wp(3.5),
    color: '#3C3C3C',
    width: wp(50),
    marginLeft: wp(4),
    fontFamily: 'Roboto-Regular',
  },

  well_beingIma: {
    height: hp(25),
    width: wp(45),
  },

  addicationText: {
    fontSize: wp(4),
    color: '#3C3C3C',
    fontFamily: 'Roboto-Medium',
    marginTop: hp(2),
  },

  addicationText2: {
    fontSize: wp(3.5),
    color: '#3C3C3C',
    fontFamily: 'Roboto-Regular',
    marginTop: hp(0.5),
  },

  addicationMainBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp(1),
    marginHorizontal: wp(4),
  },

  addictionBox: {
    // marginRight: wp(2),
  },
});
