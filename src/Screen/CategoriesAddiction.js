import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// image
import ic_hea_ima from '../assets/icons/hea_ima.png';
import ic_leftarrow from '../assets/icons/leftarrow.png';
import ic_search from '../assets/icons/search.png';
import ic_ass_Relationship from '../assets/icons/ass_Relationship.png';
import ic_ass_Relationship2 from '../assets/icons/ass_Relationship2.png';
import ic_ass_Relationship3 from '../assets/icons/ass_Relationship3.png';
import ic_circle from '../assets/icons/circle.png';
import ic_clock from '../assets/icons/clock.png';

const CategoriesAddiction = ({navigation}) => {
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
        <Text style={styles.assessmentHeadingText}>Addiction</Text>

        <View style={styles.asseRelationshipBox}>
          <Image
            source={ic_ass_Relationship}
            style={styles.ass_RelationshipIma}
          />
          <View style={{marginLeft: wp(2)}}>
            <Text style={styles.assessmentforText}>
              Assessment For Relationship
            </Text>

            <Text style={styles.loremText}>
              Lorem ipsum dolor sit amet consectetur. Cras feugiat risus nulla
              ullamcorper sem orci et adipiscing. Vulputate risus sit cras massa
              eget smit mauris.
            </Text>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: hp(1.5),
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Image source={ic_circle} style={styles.circleima} />
                <Text style={styles.circleText}> 10 </Text>
                <Image source={ic_clock} style={styles.circleima} />
                <Text style={styles.circleText}> 3 mine </Text>
              </View>

              <TouchableOpacity style={styles.startButton}>
                <Text style={styles.startText}>Start</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={[styles.asseRelationshipBox, {marginTop: hp(2)}]}>
          <Image
            source={ic_ass_Relationship2}
            style={styles.ass_RelationshipIma}
          />
          <View style={{marginLeft: wp(2)}}>
            <Text style={styles.assessmentforText}>
              Assessment For Relationship
            </Text>

            <Text style={styles.loremText}>
              Lorem ipsum dolor sit amet consectetur. Cras feugiat risus nulla
              ullamcorper sem orci et adipiscing. Vulputate risus sit cras massa
              eget smit mauris.
            </Text>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: hp(1.5),
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Image source={ic_circle} style={styles.circleima} />
                <Text style={styles.circleText}> 10 </Text>
                <Image source={ic_clock} style={styles.circleima} />
                <Text style={styles.circleText}> 3 mine </Text>
              </View>

              <TouchableOpacity style={styles.startButton}>
                <Text style={styles.startText}>Start</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={[styles.asseRelationshipBox, {marginTop: hp(2)}]}>
          <Image
            source={ic_ass_Relationship3}
            style={styles.ass_RelationshipIma}
          />
          <View style={{marginLeft: wp(2)}}>
            <Text style={styles.assessmentforText}>
              Assessment For Relationship
            </Text>

            <Text style={styles.loremText}>
              Lorem ipsum dolor sit amet consectetur. Cras feugiat risus nulla
              ullamcorper sem orci et adipiscing. Vulputate risus sit cras massa
              eget smit mauris.
            </Text>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: hp(1.5),
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Image source={ic_circle} style={styles.circleima} />
                <Text style={styles.circleText}> 10 </Text>
                <Image source={ic_clock} style={styles.circleima} />
                <Text style={styles.circleText}> 3 mine </Text>
              </View>

              <TouchableOpacity style={styles.startButton}>
                <Text style={styles.startText}>Start</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.asseRelationshipBox}>
          <Image
            source={ic_ass_Relationship}
            style={styles.ass_RelationshipIma}
          />
          <View style={{marginLeft: wp(2)}}>
            <Text style={styles.assessmentforText}>
              Assessment For Relationship
            </Text>

            <Text style={styles.loremText}>
              Lorem ipsum dolor sit amet consectetur. Cras feugiat risus nulla
              ullamcorper sem orci et adipiscing. Vulputate risus sit cras massa
              eget smit mauris.
            </Text>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: hp(1.5),
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Image source={ic_circle} style={styles.circleima} />
                <Text style={styles.circleText}> 10 </Text>
                <Image source={ic_clock} style={styles.circleima} />
                <Text style={styles.circleText}> 3 mine </Text>
              </View>

              <TouchableOpacity style={styles.startButton}>
                <Text style={styles.startText}>Start</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default CategoriesAddiction;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f4f2',
  },

  homeContainer: {
    // flex: 1,
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

  asseRelationshipBox: {
    height: hp(20.6),
    backgroundColor: '#fff',
    elevation: 1,
    marginHorizontal: wp(4),
    borderRadius: wp(4),
    flexDirection: 'row',
    paddingHorizontal: wp(2),
    paddingVertical: hp(2),
  },

  ass_RelationshipIma: {
    height: hp(17),
    width: wp(24),
    borderRadius: wp(4),
  },

  assessmentforText: {
    fontSize: wp(4),
    color: '#3C3C3C',
    fontFamily: 'Roboto-Medium',
    marginTop: hp(-0.5),
  },

  loremText: {
    fontSize: wp(3),
    color: '#3C3C3C',
    fontFamily: 'Roboto-Regular',
    width: wp(68),
    marginTop: hp(1),
  },

  circleima: {
    height: hp(2.5),
    width: wp(5),
  },

  circleText: {
    fontSize: wp(4),
    color: '#3C3C3C',
    fontFamily: 'Roboto-Regular',
  },

  startButton: {
    height: hp(5),
    width: wp(25),
    backgroundColor: '#3C3C3C',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: wp(8),
    marginRight: wp(6),
  },

  startText: {
    fontSize: wp(3.5),
    color: '#fff',
    fontFamily: 'Roboto-Medium',
  },
});
