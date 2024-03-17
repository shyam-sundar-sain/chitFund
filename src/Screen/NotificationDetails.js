import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

//Image
import ic_vector from '../assets/icon/vector.png';

const NotificationDetails = props => {
  const {navigation} = props;
  console.log('props', props);
  const [description, setDescription] = useState('');

  console.log('descriptionnnnn', description);
  useEffect(() => {
    const params = props.route.params.params;
    console.log('paramsd', params);
    if (params) {
      const des = params;

      // replace for html tag
      setDescription(des.replace(/(<([^>]+)>)/gi, ''));
    }
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.headerBox}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={ic_vector} style={styles.vectorIcon} />
        </TouchableOpacity>
        <Text style={styles.TransactionsText}>Notifications</Text>
      </View>
      <Text style={styles.descriptionText}>{description}</Text>
    </View>
  );
};

export default NotificationDetails;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp(2),
    marginLeft: wp(4),
    marginBottom: hp(2),
  },

  vectorIcon: {
    height: hp(2.5),
    width: wp(5),
  },

  TransactionsText: {
    fontSize: wp(5),
    color: '#000',
    fontFamily: 'Montserrat-Medium',
    marginLeft: wp(4),
  },

  descriptionText: {
    fontSize: wp(4),
    color: '#000',
    fontFamily: 'Montserrat-Regular',
    marginLeft: wp(4),
  },
});
