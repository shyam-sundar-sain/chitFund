import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, View, Text, Icon} from 'react-native';

import CustomDrawer from '../../src/Navigation/CustomDrawer';

// Navigation
import {createDrawerNavigator} from '@react-navigation/drawer';
import HomeScreenRegister from '../../src/Screen/HomeScreenRegister';
import TransactionsScreen from '../../src/Screen/TransactionsScreen';
import NotificationScreen from '../../src/Screen/NotificationScreen';
import EmiScreen from '../../src/Screen/EmiScreen';
import AuctionScreen from '../Screen/AuctionScreen';
import ChosePlans from '../Screen/ChosePlans';
import MyChitScreen from '../../src/Screen/MyChitScreen';
import HomeScreenSubscriber from '../Screen/HomeScreenSubscriber';
import {async_keys, getData} from '../api/UserPreference';
import ResetPasswordScreen from '../Screen/ResetPasswordScreen';
import MyprofileScreen from '../Screen/MyprofileScreen';
import LoginScreen from '../Screen/LoginScreen';
import NoDataFoundScreen from '../Screen/NoDataFoundScreen';
import PlanDetailScreen from '../Screen/PlanDetailsModal';
import SubscriberPlans from '../../src/Screen/SubscriberPlans';
import SubscriptionScreen from '../Screen/SubscriptionScreen';
import SignUp from '../Screen/SignUp';
import SuccessScreen from '../Screen/SuccessScreen';
import SettingScreen from '../Screen/SettingScreen';
import NotificationDetails from '../Screen/NotificationDetails';
import HomeBan from '../Screen/HomeBan';
import InvoicesScreen from '../Screen/InvoicesScreen';
import Myenquiry from '../Screen/Myenquiry';
import HomeScreenImmer from '../Screen/HomeScreenImmer';
import AssessmentScreen from '../Screen/AssessmentScreen';
import CategoriesScreen from '../Screen/CategoriesScreen';
import CategoriesAddiction from '../Screen/CategoriesAddiction';
import StartAssessment from '../Screen/StartAssessment';

const Drawer = createDrawerNavigator();

const DarowerNavigator = () => {
  const [typeData, setTypeData] = useState('');
  console.log('typeData', typeData);

  useEffect(() => {
    const data = async () => {
      const get = await getData(async_keys.type);
      setTypeData(get);
    };

    data();
  }, []);

  if (typeData === 'subscriber') {
    return (
      <Drawer.Navigator
        drawerContent={props => <CustomDrawer {...props} />}
        screenOptions={{
          headerShown: false,
        }}>
        <Drawer.Screen
          name="HomeScreenSubscriber"
          component={HomeScreenSubscriber}
          options={{unmountOnBlur: true}}
        />

        <Drawer.Screen
          name="NotificationDetails"
          component={NotificationDetails}
        />

        <Drawer.Screen name="Notification" component={NotificationScreen} />

        <Drawer.Screen name="Transaction" component={TransactionsScreen} />

        <Drawer.Screen component={EmiScreen} name="EMI" />

        <Drawer.Screen name="Auction" component={AuctionScreen} />

        <Drawer.Screen name="Plans" component={ChosePlans} />

        <Drawer.Screen name="MyChitScreen" component={MyChitScreen} />

        <Drawer.Screen name="AuctionScreen" component={AuctionScreen} />

        <Drawer.Screen name="Settings" component={SettingScreen} />

        <Drawer.Screen
          name="ResetPasswordScreen"
          component={ResetPasswordScreen}
        />

        <Drawer.Screen name="SubscriberPlans" component={SubscriberPlans} />

        <Drawer.Screen
          name="SubscriptionScreen"
          component={SubscriptionScreen}
        />
        <Drawer.Screen name="MyprofileScreen" component={MyprofileScreen} />

        <Drawer.Screen name="LoginScreen" component={LoginScreen} />

        <Drawer.Screen name="SignUp" component={SignUp} />

        <Drawer.Screen name="SuccessScreen" component={SuccessScreen} />
        <Drawer.Screen name="HomeBan" component={HomeBan} />
        <Drawer.Screen name="InvoicesScreen" component={InvoicesScreen} />
        <Drawer.Screen name="HomeScreenImmer" component={HomeScreenImmer} />
        <Drawer.Screen name="AssessmentScreen" component={AssessmentScreen} />
        <Drawer.Screen name="CategoriesScreen" component={CategoriesScreen} />
        <Drawer.Screen name="StartAssessment" component={StartAssessment} />
        <Drawer.Screen
          name="CategoriesAddiction"
          component={CategoriesAddiction}
        />
        <Drawer.Screen
          name="Myenquiry"
          component={Myenquiry}
          options={{unmountOnBlur: true}}
        />
      </Drawer.Navigator>
    );
  } else {
    return (
      <Drawer.Navigator
        drawerContent={props => <CustomDrawer {...props} />}
        screenOptions={{
          headerShown: false,
        }}>
        <Drawer.Screen
          name="Home"
          component={HomeScreenRegister}
          options={{unmountOnBlur: true}}
        />

        <Drawer.Screen name="Notification" component={NotificationScreen} />

        <Drawer.Screen name="Transaction" component={TransactionsScreen} />

        <Drawer.Screen component={EmiScreen} name="EMI" />

        <Drawer.Screen name="Auction" component={AuctionScreen} />

        <Drawer.Screen name="Plans" component={ChosePlans} />

        <Drawer.Screen name="Settings" component={SettingScreen} />

        <Drawer.Screen name="MyChitScreen" component={MyChitScreen} />

        <Drawer.Screen name="MyprofileScreen" component={MyprofileScreen} />

        <Drawer.Screen name="NoDataFoundScreen" component={NoDataFoundScreen} />

        <Drawer.Screen name="PlanDetailScreen" component={PlanDetailScreen} />

        <Drawer.Screen name="SignUp" component={SignUp} />

        <Drawer.Screen name="SuccessScreen" component={SuccessScreen} />
        <Drawer.Screen
          name="Myenquiry"
          component={Myenquiry}
          options={{unmountOnBlur: true}}
        />
      </Drawer.Navigator>
    );
  }
};

export default DarowerNavigator;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
