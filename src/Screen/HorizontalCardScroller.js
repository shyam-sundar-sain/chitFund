import React, {useState, useEffect, useRef, Image} from 'react';
import {View, FlatList, Text, StyleSheet, TouchableOpacity} from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import ic_mentalHealth from '../assets/icons/mentalHealth.png';
import ic_views from '../assets/icons/views.png';

// import AuctionName from '../asserts/Image/AuctionName.png';

const data = [
  {
    // key: '1',
    text: 'Item 1',
  },
  {
    // key: '2',
    text: 'Item 2',
  },
  {
    // key: '3',
    text: 'Item 3',
  },

  // Add more items as needed
];

const renderItem = ({item}) => {
  return (
    <View style={styles.item}>
      <View style={{marginRight: wp(0)}}>
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
    </View>
  );
};

const HorizontalCardScroller = props => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);

  useEffect(() => {
    const automaticSlide = setInterval(() => {
      if (currentIndex < data.length - 1) {
        scrollToIndex(currentIndex + 1);
      } else {
        scrollToIndex(0);
      }
    }, 3000); // Change the interval as needed (3 seconds in this example)

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

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={data}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        snapToInterval={300} // item width
        decelerationRate="fast"
        contentContainerStyle={{paddingHorizontal: 10}} // Add some padding to center items
        renderItem={renderItem}
        // keyExtractor={item => item.key}
        onScroll={event => handleScroll(event)}
      />
      <View style={styles.sliderDots}>
        {/* {data.map((item, index) => (
          <TouchableOpacity
            key={item.key}
            style={[
              styles.dot,
              {backgroundColor: currentIndex === index ? 'blue' : 'gray'},
            ]}
            onPress={() => scrollToIndex(index)}
          />
        ))} */}
        {data.map((item, index) => (
          <TouchableOpacity
            key={item.key}
            style={[
              styles.dot,
              {backgroundColor: currentIndex === index ? 'blue' : 'gray'},
            ]}
            onPress={() => scrollToIndex(index)}
          />
        ))}
      </View>
    </View>
  );
};

export default HorizontalCardScroller;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    // justifyContent: 'center',
    // alignItems: 'center',
    // borderWidth: 1,
    borderColor: 'gray',
    height: hp(30),
    // width: wp(40),
    marginBottom: hp(4),
    marginTop: hp(2),
    width: 320, // Adjust the width of each item as needed
    // width: wp(90),
    marginLeft: wp(-4),
  },

  sliderDots: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    // marginTop: hp(-10),
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    margin: 5,
    marginTop: hp(-15),
  },

  ////
  AuctionNameBox: {
    height: hp(23),
    marginHorizontal: wp(4),
    borderRadius: wp(4),
    backgroundColor: '#fff',
    elevation: 5,
    // marginTop: hp(1),
    // justifyContent: 'flex-end',
    // textAlign: 'right',
  },
  AuctionNameImage: {
    height: hp(4),
    width: wp(8),
    marginLeft: wp(4),
    marginTop: hp(1.8),
  },

  AuctionNameHeaderText: {
    fontSize: wp(3.5),
    color: '#000',
    fontWeight: '400',
  },

  AuctionNameText: {
    // fontSize: wp(3.5),
    // color: '#000',
    // fontWeight: 'bold',
    fontSize: wp(4),
    color: '#3222E4',
    fontWeight: 'bold',
    // marginLeft: wp(2),
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
    marginTop: hp(1),
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

  //
  AuctionHeaderNameBox: {
    marginLeft: wp(10),
    marginTop: hp(1),
  },

  //
  smallCardImage: {
    marginTop: hp(1),
    marginLeft: wp(-2),
    shadowColor: '#7F7F7F',
    justifyContent: 'center',
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
});
