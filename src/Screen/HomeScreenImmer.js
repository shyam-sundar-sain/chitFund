import React from 'react';
import {Image, TouchableOpacity} from 'react-native';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  ScrollView,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// icon
import ic_homeBurger from '../assets/icons/homeBurger.png';
import ic_search from '../assets/icons/search.png';
import ic_search_filter from '../assets/icons/search_filter.png';
import ic_favouriteCarton1 from '../assets/icons/favouriteCarton1.png';
import ic_favouriteCartoon2 from '../assets/icons/favouriteCartoon2.png';
import ic_mentalHealth from '../assets/icons/mentalHealth.png';
import ic_views from '../assets/icons/views.png';
import ic_Profile from '../assets/icons/Profile.png';

const HomeScreenImmer = () => {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.homeContainer}>
        <View style={{marginLeft: wp(4), marginTop: hp(2)}}>
          <TouchableOpacity>
            <Image source={ic_homeBurger} style={styles.homeBurger} />
          </TouchableOpacity>
          <Text style={styles.welcomeText}>Welcome</Text>
          <Text style={styles.helloText}>Hello,Vaishnavi 🐥</Text>
        </View>
        <View style={styles.searchInputBox}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image source={ic_search} style={styles.searchIma} />
            <TextInput
              style={styles.searchInputText}
              placeholder="Search here"
              placeholderTextColor={'#444444'}
            />
          </View>
          <TouchableOpacity>
            <Image source={ic_search_filter} style={styles.search_filterIma} />
          </TouchableOpacity>
        </View>
        <View style={styles.assessmentsAndSellBox}>
          <Text style={styles.assessmentsText}>Assessments</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>See all</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          style={styles.favouriteCartimagMainBox}
          horizontal
          showsHorizontalScrollIndicator={false}>
          <View>
            <Image
              source={ic_favouriteCarton1}
              style={styles.favouriteCartimag}
            />
            <Text style={styles.favouriteCartonText}>Favourite Cartoon</Text>
            <Text style={styles.lorenText}>
              Lorem ipsum dolor sit amet consectetur.
            </Text>
          </View>

          <View>
            <Image
              source={ic_favouriteCartoon2}
              style={styles.favouriteCartimag}
            />

            <Text style={styles.favouriteCartonText}>Favourite Cartoon</Text>
            <Text style={styles.lorenText}>
              Lorem ipsum dolor sit amet consectetur.
            </Text>
          </View>

          <View>
            <Image
              source={ic_favouriteCarton1}
              style={styles.favouriteCartimag}
            />
            <Text style={styles.favouriteCartonText}>Favourite Cartoon</Text>
            <Text style={styles.lorenText}>
              Lorem ipsum dolor sit amet consectetur.
            </Text>
          </View>

          <View>
            <Image
              source={ic_favouriteCartoon2}
              style={styles.favouriteCartimag}
            />

            <Text style={styles.favouriteCartonText}>Favourite Cartoon</Text>
            <Text style={styles.lorenText}>
              Lorem ipsum dolor sit amet consectetur.
            </Text>
          </View>
        </ScrollView>

        <View style={styles.blogBox}>
          <Text style={styles.assessmentsText}>Blogs</Text>
          <Text style={styles.seeAllText}>See all</Text>
        </View>

        <View style={{flexDirection: 'row', marginTop: hp(1)}}>
          <View style={styles.mentailHealthMainBox}>
            <Image source={ic_mentalHealth} style={styles.mentalHealthimag} />
            <View style={styles.mentalhealthBox}>
              <Text style={styles.mentalHealthText}>MENTAL HEALTH</Text>
            </View>

            <Text style={styles.willMeditationText}>
              Will meditation help you get out from the rat race?
            </Text>

            <View style={styles.viewMainBox}>
              <Image source={ic_views} style={styles.viewsIma} />
              <Text style={styles.viewsText}>5k views</Text>
            </View>
          </View>

          <View style={styles.mentailHealthMainBox}>
            <Image source={ic_mentalHealth} style={styles.mentalHealthimag} />
            <View style={styles.mentalhealthBox}>
              <Text style={styles.mentalHealthText}>MENTAL HEALTH</Text>
            </View>

            <Text style={styles.willMeditationText}>
              Will meditation help you get out from the rat race?
            </Text>

            <View style={styles.viewMainBox}>
              <Image source={ic_views} style={styles.viewsIma} />
              <Text style={styles.viewsText}>5k views</Text>
            </View>
          </View>
        </View>

        <View style={styles.assessmentsAndSellBox}>
          <Text style={styles.assessmentsText}>Consultant</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>See all</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{marginTop: hp(1)}}>
          {/* <View > */}
          <View style={styles.viewProfileBox}>
            <View style={{flexDirection: 'row'}}>
              <View>
                <Image source={ic_Profile} style={styles.ProfileIma} />
              </View>

              <View style={{marginLeft: wp(4)}}>
                <Text style={styles.nameText}>Panikhuri Garg</Text>
                <Text style={styles.CardiologistsText}>
                  Cardiologists, 12y exp
                </Text>
                <Text style={styles.LangText}>Lang: English, Hindi, Urdu</Text>
              </View>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: hp(3),
              }}>
              <Text style={styles.sessionText}>30 min session</Text>

              <TouchableOpacity style={styles.viewProfileButton}>
                <Text style={styles.viewProfileText}>View Profile</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.viewProfileBox}>
            <View style={{flexDirection: 'row'}}>
              <View>
                <Image source={ic_Profile} style={styles.ProfileIma} />
              </View>

              <View style={{marginLeft: wp(4)}}>
                <Text style={styles.nameText}>Panikhuri Garg</Text>
                <Text style={styles.CardiologistsText}>
                  Cardiologists, 12y exp
                </Text>
                <Text style={styles.LangText}>Lang: English, Hindi, Urdu</Text>
              </View>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: hp(3),
              }}>
              <Text style={styles.sessionText}>30 min session</Text>

              <TouchableOpacity style={styles.viewProfileButton}>
                <Text style={styles.viewProfileText}>View Profile</Text>
              </TouchableOpacity>
            </View>
          </View>
          {/* </View> */}
        </ScrollView>
      </View>
    </ScrollView>
  );
};

export default HomeScreenImmer;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f4f2',
  },

  homeContainer: {
    flex: 1,
    backgroundColor: '#FCFCF7',
  },
  welcomeText: {
    fontSize: wp(3.5),
    fontFamily: 'Roboto-Medium',
    color: '#313131',
    marginTop: hp(2),
  },
  helloText: {
    fontFamily: 'Roboto-Bold',
    color: '#313131',
    fontSize: wp(5),
  },

  homeBurger: {
    height: hp(5),
    width: wp(10),
  },

  searchInputBox: {
    height: hp(7),
    backgroundColor: '#F2F2F2',
    marginHorizontal: wp(4),
    borderRadius: wp(7),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp(4),
    marginTop: hp(4),
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
    // marginLeft: wp(4),
  },

  search_filterIma: {
    height: hp(4),
    width: wp(5),
  },

  assessmentsText: {
    fontSize: wp(5),
    color: '#000',
    fontFamily: 'Roboto-Bold',
  },

  seeAllText: {
    fontSize: wp(4),
    color: '#8D90A1',
    fontFamily: 'Roboto-Regular',
  },

  assessmentsAndSellBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: wp(4),
    marginTop: hp(4),
  },

  favouriteCartimag: {
    height: hp(25),
    width: wp(50),
    marginRight: wp(-2),
  },

  favouriteCartimagMainBox: {
    flexDirection: 'row',
    paddingHorizontal: wp(-5),
  },

  favouriteCartonText: {
    fontSize: wp(4.5),
    fontFamily: 'Roboto-Medium',
    color: '#313131',
    marginLeft: wp(4),
  },

  lorenText: {
    fontSize: wp(4),
    color: '#5A5A5A',
    width: wp(40),
    marginLeft: wp(4),
    fontFamily: 'Poppins-Medium',
  },

  blogBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: wp(4),
    marginTop: hp(4),
  },

  mentalHealthimag: {
    height: hp(10),
    width: wp(20),
    marginLeft: wp(4),
    marginTop: hp(2),
  },

  mentalhealthBox: {
    height: hp(4),
    width: wp(32),
    backgroundColor: '#D0DDF9',
    borderRadius: wp(4),
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: wp(4),
    marginTop: hp(1),
  },

  mentalHealthText: {
    fontSize: wp(3),
    color: '#2965E2',
    fontFamily: 'Lato-Bold',
  },

  mentailHealthMainBox: {
    height: hp(28),
    width: wp(60),
    // borderWidth: 0.5,
    elevation: 1,
    marginLeft: wp(4),
    borderRadius: wp(4),
    backgroundColor: '#fff',
    marginBottom: hp(2),
  },

  willMeditationText: {
    fontSize: wp(4),
    color: '#313131',
    width: wp(48),
    marginLeft: wp(4),
    marginTop: hp(2),
  },

  viewsIma: {
    height: hp(3),
    width: wp(6),
    marginLeft: wp(4),
    marginTop: hp(1),
  },

  viewsText: {
    fontSize: wp(3.5),
    color: '#313131',
    marginLeft: wp(3),
  },

  viewMainBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  viewProfileBox: {
    height: hp(25),
    width: wp(85),
    elevation: 1,
    marginLeft: wp(4),
    borderRadius: wp(4),
    backgroundColor: '#3ACC9B',
    marginBottom: hp(2),

    paddingVertical: hp(3),
    paddingLeft: wp(4),
  },

  ProfileIma: {
    height: hp(10),
    width: wp(20),
    borderRadius: wp(3),
  },

  nameText: {
    fontSize: wp(5),
    color: '#fff',
    fontFamily: 'Roboto-semiBold',
    marginTop: hp(-0.5),
  },

  CardiologistsText: {
    fontSize: wp(4),
    color: '#fff',
    fontFamily: 'Roboto-Regular',
    // marginTop: hp(0.5),
  },

  LangText: {
    fontSize: wp(4),
    color: '#fff',
    fontFamily: 'Roboto-Regular',
    marginTop: hp(1.2),
  },

  sessionText: {
    fontSize: wp(4),
    color: '#fff',
    // fontFamily:''2965E2
  },

  viewProfileText: {
    fontSize: wp(4),
    color: '#2965E2',
    // fontFamily:''
  },

  viewProfileButton: {
    height: hp(5.5),
    width: wp(30),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: wp(2),
    backgroundColor: '#fff',
    marginRight: wp(4),
  },
});
