// import React, {useEffect, useRef, useState} from 'react';
// import {View, Text, StyleSheet, Image, Dimensions} from 'react-native';
// import {FlatList} from 'react-native-gesture-handler';
// import {
//   widthPercentageToDP as wp,
//   heightPercentageToDP as hp,
// } from 'react-native-responsive-screen';

// const HomeBan = () => {
//   const flatlistRef = useRef();

//   // get dimesnions
//   const screenWidth = Dimensions.get('window').width;
//   const [activeIndex, setActiveIndex] = useState(0);
//   // console.log('activeIndexx', activeIndex);

//   // auto scroll
//   useEffect(() => {
//     // if activeIndex === last index =>>>> jump back to the first index
//     // else activeIndex + 1
//     let intervall = setInterval(() => {
//       if (activeIndex === imageItemData.length - 1) {
//         flatlistRef.current.scrollToIndex({
//           index: 0,
//           animation: true,
//         });
//       } else {
//         flatlistRef.current.scrollToIndex({
//           index: activeIndex + 1,
//           animation: true,
//         });
//       }
//     }, 2000);

//     return () => clearInterval(intervall);
//   });

//   const getItemLayout = (data, index) => ({
//     length: screenWidth,
//     offset: screenWidth * index, // for first image - 300 * 0 = 0px,
//     index: index,
//   });

//   const imageItemData = [
//     // {source: require('../assets/icon/chitIma.png')},
//     {id: 1, image: require('../assets/icon/chit.png')},
//     {id: 2, image: require('../assets/icon/Chit_Fund.webp')},
//     {id: 3, image: require('../assets/icon/chit.png')},
//   ];

//   // handle Scroll
//   const handleScroll = event => {
//     // get the scroll position
//     const scrollPossition = event.nativeEvent.contentOffset.x;
//     // console.log({scrollPossition});
//     // get the index of current active item
//     const index = scrollPossition / screenWidth;
//     // console.log({index});
//     // update the index
//     setActiveIndex(index);
//   };

//   // display image // ui
//   const renderItem = ({item}) => {
//     return (
//       <View>
//         <Image
//           source={item.image}
//           style={{
//             height: hp(27),
//             width: screenWidth,
//             marginTop: hp(2),
//           }}
//         />
//       </View>
//     );
//   };

//   const renderDotIndicators = () => {
//     return imageItemData.map((dot, index) => {
//       // if the active index === index
//       if (activeIndex === index) {
//         return (
//           <View
//             key={index}
//             style={{
//               backgroundColor: 'green',
//               height: hp(1),
//               width: wp(2),
//               borderRadius: wp(4),
//               marginHorizontal: wp(0.5),
//             }}></View>
//         );
//       } else {
//         return (
//           <View
//             key={index}
//             style={{
//               backgroundColor: 'red',
//               height: hp(1),
//               width: wp(2),
//               borderRadius: wp(4),
//               marginHorizontal: wp(0.5),
//             }}></View>
//         );
//       }
//     });
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.hometext}>HomeBan</Text>
//       <FlatList
//         data={imageItemData}
//         getItemLayout={getItemLayout}
//         ref={flatlistRef}
//         renderItem={renderItem}
//         horizontal={true}
//         pagingEnabled={true}
//         onScroll={handleScroll}
//         keyExtractor={item => item.id}
//       />
//       <View
//         style={{
//           flexDirection: 'row',
//           justifyContent: 'center',
//           marginTop: hp(1),
//         }}>
//         {renderDotIndicators()}
//       </View>
//     </View>
//   );
// };

// export default HomeBan;
// const styles = StyleSheet.create({
//   hometext: {
//     fontSize: wp(4),
//     color: '#000',
//   },
// });

import {View, Text} from 'react-native';
import React from 'react';

const HomeBan = () => {
  return (
    <View>
      <Text>HomeBan</Text>
    </View>
  );
};

export default HomeBan;
