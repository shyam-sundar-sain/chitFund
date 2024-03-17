import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// DownLoad

// Icon
import ic_vector from '../assets/icon/vector.png';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {BASE_URL} from '../api/ApiInfo';
import {downloadImage} from './DownloadImage';

const InvoicesScreen = ({navigation}) => {
  const [loader, setLoader] = useState(false);
  const [invoiceData, setInvoiceData] = useState('');
  console.log('invoiceDatamm', invoiceData?.invoice);

  useEffect(() => {
    const pass = async () => {
      fetchData();
    };
    pass();
  }, []);

  const handleDownload = async () => {
    if (invoiceData && invoiceData.invoice) {
      const date = new Date();
      const h = date.getHours();
      const m = date.getMinutes();
      const s = date.getSeconds();
      const ms = date.getMilliseconds();
      const time = h.toString() + m.toString() + s.toString() + ms.toString();
      await downloadImage(invoiceData?.invoice, 'invoice' + time, setLoader);
    } else {
      Alert.alert('', 'No invoice available for download');
    }
  };

  const fetchData = async () => {
    try {
      setLoader(true);

      const response = await fetch(`${BASE_URL}get_invoice`);
      console.log('response pp', response);

      if (response) {
        const newResponse = await response.json();
        const {Status, Data} = newResponse;
        console.log('newResponse ll', newResponse);
        if (Status === true) {
          setInvoiceData(Data);
          setLoader(false);
        } else {
          setLoader(false);
          Alert.alert('', 'Invoice fetching issue');
        }
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  if (loader) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator color="green" size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerBox}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={ic_vector} style={styles.vectorIcon} />
        </TouchableOpacity>
        <Text style={styles.TransactionsText}>Invoices</Text>
      </View>

      <View style={styles.homeContainer}>
        {/* <Image
          source={{uri: invoiceData?.invoice}}
          style={styles.InvoicesIcon}
        /> */}
        {invoiceData && invoiceData.invoice ? (
          <Image
            source={{uri: invoiceData.invoice}}
            style={styles.InvoicesIcon}
          />
        ) : (
          <Text style={styles.noText}>No invoice available</Text>
        )}
      </View>

      <TouchableOpacity style={styles.downloadButton} onPress={handleDownload}>
        <Text style={styles.downLoadtext}>Download</Text>
      </TouchableOpacity>
    </View>
  );
};

export default InvoicesScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp(2),
    marginLeft: wp(6),
  },

  homeContainer: {
    flex: 1,
  },

  ic_leftIcon: {
    height: hp(2.5),
    width: wp(9),
  },
  TransactionsText: {
    fontSize: wp(5),
    color: '#000',
    fontFamily: 'Montserrat-Medium',
    marginLeft: wp(4),
  },

  InvoicesIcon: {
    height: hp(29),
    marginTop: hp(2),
    marginHorizontal: wp(4),
  },
  vectorIcon: {
    height: hp(2.5),
    width: wp(5),
  },

  downLoadtext: {
    fontSize: wp(6),
    color: '#fff',
    fontFamily: 'Montserrat-Regular',
  },

  downloadButton: {
    height: hp(6),
    marginHorizontal: wp(6),
    borderRadius: wp(4),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ed802b',
    // marginTop: hp(55),
    marginBottom: hp(2),
  },

  noText: {
    fontSize: wp(4),
    color: '#000',
  },
});
