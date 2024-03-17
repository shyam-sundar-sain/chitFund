import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  Alert,
  Text,
} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {BASE_URL} from '../api/ApiInfo';

const BannerSlider = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [loader, setLoader] = useState(false);
  const [bannerData, setBannerData] = useState(false);

  const imageData = bannerData
    ? bannerData.map((url, index) => ({
        id: index.toString(),
        imageUrl: url,
      }))
    : [];

  // console.log('imageData 99', imageData);

  useEffect(() => {
    fetchDataBanner();
  }, []);

  const fetchDataBanner = async () => {
    try {
      setLoader(true);
      const response = await fetch(`${BASE_URL}banner`);
      const newResponse = await response.json();
      console.log('newResponse kkkk', newResponse);
      if (newResponse) {
        const {Status, Data} = newResponse;
        if (Status === true) {
          setBannerData(Data);
          setLoader(false);
        } else {
          setLoader(false);
          Alert.alert('', 'Banner data not found ');
        }
      }
    } catch (error) {
      console.log(err);
    }
  };

  const renderImageItem = ({item, index}) => {
    // console.log('item.idd', item.id);
    return (
      <View>
        <Image
          key={item.id}
          source={{uri: item.imageUrl}}
          style={{
            width: wp(92),
            height: hp(25),
            marginTop: hp(4),
            borderRadius: wp(2),
            // marginHorizontal: wp(4),
            alignSelf: 'center',
          }}
        />
      </View>
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      let newIndex = activeSlide + 1;
      if (newIndex >= imageData.length) {
        newIndex = 0;
      } else {
        <Text style={{fontSize: wp(4), color: '#000'}}>
          No banner data found
        </Text>;
      }
      setActiveSlide(newIndex);
    }, 2000); // Change the interval duration as needed (3000ms = 3 seconds)

    return () => {
      clearInterval(interval);
    };
  }, [activeSlide]);

  if (loader) {
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator color="green" size="large" />
    </View>;
  }

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Carousel
        data={imageData}
        renderItem={renderImageItem}
        sliderWidth={Dimensions.get('window').width}
        // sliderWidth={Dimensions.get('window').width}
        itemWidth={Dimensions.get('window').width}
        // itemWidth={325}
        onSnapToItem={index => setActiveSlide(index)}
        loop={true}
        autoplay={true}
      />

      <Pagination
        dotsLength={imageData.length}
        activeDotIndex={activeSlide}
        containerStyle={{paddingTop: 10}}
        dotStyle={styles.dot}
      />
    </View>
  );
};

export default BannerSlider;

const styles = StyleSheet.create({
  dot: {
    height: hp(1.2),
    width: wp(2.4),
    backgroundColor: '#000',
    borderRadius: wp(2),
    marginHorizontal: wp(-3),
  },
});
