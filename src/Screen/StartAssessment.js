import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  ScrollView,
} from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// image
import ic_swipe_baseIma from '../assets/icons/swipe_baseIma.png';
import ic_leftarrow from '../assets/icons/leftarrow.png';
import ic_question from '../assets/icons/question.png';
import ic_solarSolt from '../assets/icons/solarSolt.png';
import {TouchableOpacity} from 'react-native-gesture-handler';

const StartAssessment = ({navigation}) => {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.assessmentHeaderBox}>
        <ImageBackground source={ic_swipe_baseIma} style={styles.heaimag}>
          <View
            style={{flexDirection: 'row', marginLeft: wp(4), marginTop: hp(8)}}>
            <Image source={ic_leftarrow} style={styles.leftArrowIma} />
          </View>
          <Text style={styles.assessmentText}>Swipe Base Assessment</Text>
          <Text style={[styles.earnText]}>Earn 60 Total Points</Text>
        </ImageBackground>
      </View>

      <View style={styles.startAssessmentMainBox}>
        <View style={styles.quesimaMainBox}>
          <Image source={ic_question} style={[styles.questionima]} />
          <Image source={ic_solarSolt} style={[styles.solarSoltIma]} />
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginHorizontal: wp(4),
            justifyContent: 'space-between',
            marginTop: hp(2),
          }}>
          <View>
            <Text style={styles.questionText}>11 Questions</Text>
            <Text style={styles.pointText}>02 points for a correct answer</Text>
          </View>

          <View>
            <Text style={styles.questionText}>11 Questions</Text>
            <Text style={styles.pointText}>Swipe right, left, or up</Text>
          </View>
        </View>
        <View
          style={{
            height: hp(0.2),
            borderWidth: 0,
            backgroundColor: '#CCCCCC',
            marginVertical: hp(3),
          }}
        />
        <Text style={styles.instructionText}>Instructions</Text>

        <View style={styles.swipeMainBox}>
          <View style={styles.circleBox} />
          <Text style={styles.swipeText}>
            Swipe the card “Right” if you agree with the question
          </Text>
        </View>

        <View style={styles.swipeMainBox}>
          <View style={styles.circleBox} />
          <Text style={styles.swipeText}>
            Swipe the card “Left” if you agree with the question
          </Text>
        </View>

        <View style={styles.swipeMainBox}>
          <View style={styles.circleBox} />
          <Text style={styles.swipeText}>
            Swipe the card “Up” if you agree with the question
          </Text>
        </View>

        <TouchableOpacity style={styles.assessmentButton}>
          <Text style={styles.startAssessmentText}>Start Assessment</Text>
        </TouchableOpacity>

        <View
          style={{
            height: hp(1),
            width: wp(45),
            borderWidth: 0,
            backgroundColor: '#000',
            borderRadius: wp(4),
            marginVertical: hp(3),
            alignSelf: 'center',
          }}
        />
      </View>
    </ScrollView>
  );
};

export default StartAssessment;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f4f2',
  },

  homeContainer: {
    flex: 1,
    backgroundColor: '#f7f4f2',
  },

  assessmentHeaderBox: {
    height: hp(29),
    backgroundColor: '#5383E6',
  },

  heaimag: {
    height: hp(75),
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
    marginTop: hp(2),
  },

  earnText: {
    fontSize: wp(4.5),
    color: '#fff',
    fontFamily: 'Roboto-Regular',
    marginLeft: wp(3),
    marginTop: hp(0.5),
  },

  leftArrowIma: {
    height: hp(5),
    width: wp(10),
  },

  startAssessmentMainBox: {
    height: hp(80),
    backgroundColor: '#fff',
    marginTop: hp(-3),
    borderTopRightRadius: wp(8),
    borderTopLeftRadius: wp(8),
  },

  questionima: {
    height: hp(4),
    width: wp(8),
  },
  solarSoltIma: {
    height: hp(6),
    width: wp(12),
    marginRight: wp(20),
  },

  quesimaMainBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: wp(4),
    alignItems: 'center',
    marginTop: hp(4),
  },

  questionText: {
    fontSize: wp(4.5),
    color: '#3c3c3c',
    fontFamily: 'Roboto-Bold',
  },

  pointText: {
    fontSize: wp(3),
    color: '#ABABAB',
    fontFamily: 'Roboto-Medium',
  },

  instructionText: {
    fontSize: wp(5),
    color: '#3C3C3C',
    fontFamily: 'Roboto-Bold',
    marginLeft: wp(4),
  },

  circleBox: {
    height: hp(1.5),
    width: wp(3),
    borderRadius: wp(8),
    backgroundColor: '#2965E2',
    marginLeft: wp(4),
    marginTop: hp(1),
  },

  swipeText: {
    fontSize: wp(4),
    color: '#3c3c3c',
    fontFamily: 'Roboto-Regular',
    width: wp(75),
    marginLeft: wp(4),
  },

  swipeMainBox: {
    flexDirection: 'row',
    marginTop: hp(1.5),
  },

  assessmentButton: {
    height: hp(7),
    backgroundColor: '#2965E2',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: wp(8),
    marginRight: wp(6),
    marginHorizontal: wp(4),
    marginTop: hp(15),
  },

  startAssessmentText: {
    fontSize: wp(4.5),
    color: '#fff',
    fontFamily: 'Roboto-semiBold',
    marginLeft: wp(4),
  },
});
