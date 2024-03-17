import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';

// icon
import calendar from '../assets/icon/calendar.png';
import ic_costs from '../assets/icon/costs.png';
import ic_community from '../assets/icon/community.png';
import ic_rightArrow from '../assets/icon/rightArrow.png';
import ic_myChits from '../assets/icon/myChits.png';
import ic_clock from '../assets/icon/clock.png';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import SubPlanDetailModals from '../Screen/SubPlanDetailModals';

const HorizontalScroller = props => {
  const {home_Data} = props;
  const getData = home_Data?.plans || [];

  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);

  // modal functionlity
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  useEffect(() => {
    const automaticSlide = setInterval(() => {
      if (currentIndex < getData.length - 1) {
        scrollToIndex(currentIndex + 1);
      } else {
        scrollToIndex(0);
      }
    }, 2000);

    return () => {
      clearInterval(automaticSlide);
    };
  }, [currentIndex]);

  const scrollToIndex = index => {
    flatListRef.current.scrollToIndex({
      animated: true,
      index,
    });
    setCurrentIndex(index);
  };

  const handleScroll = event => {
    const contentOffset = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffset / 320); // Adjust this based on your item width
    setCurrentIndex(index);
  };

  const toggleModal = item => {
    setSelectedPlan(item);
    setModalVisible(!isModalVisible);
  };

  const renderItem = ({item}) => {
    const dateData = item?.start_month;
    const formatDate = dateString => {
      const options = {day: 'numeric', month: 'short', year: 'numeric'};
      const formattedDate = new Date(dateString).toLocaleDateString(
        undefined,
        options,
      );

      return formattedDate;
    };
    const formattedDate = formatDate(dateData);
    return (
      <View style={styles.plansBox}>
        <View style={styles.dimondBox}>
          <Text style={styles.dimandPlanText}>{`${item.plan_name}`}</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginTop: hp(1),
          }}>
          <View style={styles.yearText}>
            <Image
              source={calendar}
              style={[styles.clockIcon, {marginLeft: wp(-5)}]}
            />
            <Text style={[styles.dateText]}>{formattedDate}</Text>
          </View>

          <View style={styles.clockMonthBox}>
            <Image source={ic_clock} style={styles.clockIcon} />
            <Text style={[styles.dateText]}>
              {`${item.total_month} Months`}
            </Text>
          </View>
        </View>

        <View style={styles.constMainBox}>
          <View style={{alignItems: 'center'}}>
            <Image source={ic_myChits} style={styles.productIcon} />
            <View>
              <Text style={[styles.emiText]}>{`₹${item.emi}/`}</Text>
              <Text
                style={{
                  fontSize: wp(3),
                  color: '#fff',
                  fontFamily: 'Roboto-Regular',
                }}>
                month
              </Text>
            </View>
          </View>

          <View style={{alignItems: 'center'}}>
            <Image source={ic_costs} style={styles.productIcon} />
            <Text style={styles.emiText}>{`₹${item.plan_amount}`}</Text>
          </View>

          <View style={{}}>
            <Image
              source={ic_community}
              style={[
                styles.productIcon,
                {marginLeft: hp(3.2), marginTop: hp(1)},
              ]}
            />
            <Text style={[styles.emiText, {marginTop: hp(-1)}]}>
              {`${item.gst} Person`}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.rightarrowBox}
          onPress={() => toggleModal(item)}>
          <Text style={styles.ViewDetailsText}>View Details</Text>
          <Image source={ic_rightArrow} style={styles.rightArrowIcon} />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={getData}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        snapToInterval={300} // item width
        decelerationRate="fast"
        contentContainerStyle={{paddingHorizontal: 10}} // Add some padding to center items
        renderItem={renderItem}
        keyExtractor={item => item.plan_id}
        onScroll={event => handleScroll(event)}
      />

      <View style={styles.sliderDots}>
        {getData.map((item, index) => (
          <TouchableOpacity
            key={item.plan_id}
            style={[
              styles.dot,
              {
                backgroundColor: currentIndex === index ? '#Ed802d' : '#846159',
              },
            ]}
            onPress={() => scrollToIndex(index)}
          />
        ))}
      </View>

      <SubPlanDetailModals
        isVisible={isModalVisible}
        onClose={() => setModalVisible(false)}
        planData={selectedPlan}
      />
    </View>
  );
};

export default HorizontalScroller;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    borderColor: 'gray',
    height: hp(30),
    marginBottom: hp(4),
    marginTop: hp(2),
    width: 320, // Adjust the width of each item as needed
    marginLeft: wp(-4),
  },

  sliderDots: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp(1.5),
  },

  AuctionNameBox: {
    height: hp(23),
    marginHorizontal: wp(4),
    borderRadius: wp(4),
    backgroundColor: '#fff',
    elevation: 1,
  },
  AuctionNameImage: {
    height: hp(4),
    width: wp(8),
    marginLeft: wp(4),
  },

  AuctionNameHeaderText: {
    fontSize: wp(3.5),
    color: '#000',
    fontWeight: '400',
  },

  AuctionNameText: {
    fontSize: wp(4),
    color: '#3222E4',
    fontWeight: 'bold',
  },

  AuctionHeaderNameBox: {
    marginLeft: wp(10),
    marginTop: hp(1),
  },

  AuctionImageHeaderbox: {
    flexDirection: 'row',
  },

  duratioHeaderText: {
    fontSize: wp(3.5),
    color: '#000',
    fontWeight: '400',
  },

  durationText: {
    fontSize: wp(4),
    color: '#3222E4',
    fontWeight: 'bold',
  },

  duractionTotalAmmountTimeBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: wp(4),
    marginTop: hp(2.5),
  },

  lineBox: {
    height: hp(0.1),
    backgroundColor: '#000',
    marginTop: hp(2),
    marginHorizontal: wp(4),
  },

  subscriptionBox: {
    marginLeft: wp(4),
    marginTop: hp(-2),
  },

  subscriptionText: {
    fontSize: wp(3.5),
    color: '#000',
    fontWeight: '400',
  },

  subscriptionAmountText: {
    fontSize: wp(4),
    color: '#3222E4',
    fontWeight: 'bold',
  },

  AuctionHeaderNameBox: {
    marginLeft: wp(10),
    marginTop: hp(1),
  },

  smallCardImage: {
    marginTop: hp(1),
    marginLeft: wp(-2),
    shadowColor: '#7F7F7F',
    justifyContent: 'center',
  },

  headerMainBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp(2),
    marginLeft: wp(4),
  },

  dimandPlanText: {
    fontSize: wp(4.5),
    color: '#fff',
    marginLeft: wp(6),
    marginTop: wp(4),
    fontFamily: 'Montserrat-Bold',
  },

  dateText: {
    fontSize: wp(4),
    color: '#fff',
    fontFamily: 'Montserrat-SemiBold',
    marginLeft: wp(2),
  },
  clockMonthBox: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginRight: wp(-4),
  },

  clockIcon: {
    height: hp(2.5),
    width: wp(5),
    marginRight: wp(0),
  },

  constMainBox: {
    flexDirection: 'row',
    marginTop: hp(3),
    justifyContent: 'space-between',
    marginHorizontal: wp(6),
  },

  productIcon: {
    height: hp(3.5),
    width: wp(7),
    marginLeft: wp(0),
  },

  emiText: {
    fontSize: wp(4),
    color: '#fff',
    fontFamily: 'Roboto-Regular',
  },

  plansBox: {
    height: hp(26),
    marginHorizontal: wp(4),
    borderRadius: wp(3),
    backgroundColor: '#ED802B',
    elevation: 4,
    marginTop: hp(2),
    width: wp(92),
    borderColor: '#9A9999',
  },

  activeText: {
    fontSize: wp(4),
    color: '#9A9999',
  },

  switchIcon: {
    height: hp(3),
    width: wp(6),
    marginLeft: wp(1),
  },

  switchActiveaBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp(-1.5),
    marginLeft: wp(20),
  },

  dimondBox: {
    flexDirection: 'row',
  },

  dotMainBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: wp(4),
    alignSelf: 'center',
  },

  dotinnerBox: {
    height: hp(1.5),
    width: wp(3),
    marginTop: hp(2),
    borderRadius: wp(4),
    backgroundColor: '#ed802b',
  },

  dotBox: {
    height: hp(1.5),
    width: wp(3),
    marginTop: hp(2),
    borderRadius: wp(6),
    borderWidth: 0.5,
    marginLeft: wp(1),
  },

  dot: {
    height: hp(1),
    width: wp(2),
    marginTop: hp(0),
    borderRadius: wp(5),
    marginHorizontal: wp(1),
  },

  rightArrowIcon: {
    height: hp(2),
    width: wp(4),
    marginTop: hp(0.2),
    marginLeft: wp(0.5),
  },

  bottomNavigatorBox: {
    marginBottom: hp(-2),
  },

  yearText: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightarrowBox: {
    height: hp(4.5),
    width: wp(32),
    backgroundColor: '#FFF7F1',
    borderRadius: wp(6),
    marginRight: wp(4),
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: wp(4),
    alignSelf: 'flex-end',
  },

  ViewDetailsText: {
    fontSize: wp(3.7),
    color: '#000',
  },
});
