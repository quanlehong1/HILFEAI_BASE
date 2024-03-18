import React, {Fragment} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import colors from '../utils/colors';
import Toast from 'react-native-toast-message';
import {toastConfig} from '../utils/common';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {SplashScreen, HomeScreen, ProfileScreen} from '../screens';
import BottomTabBar from '../components/bottomTabBar/BottomTabBar';
import {Loading} from 'components';
import {screenNames} from 'utils/screenName';

const screenOptions = {
  cardStyle: {backgroundColor: colors.white},
  headerShown: false,
};

const Stack = createNativeStackNavigator<ApplicationStackParamList>();
const BottomTab = createBottomTabNavigator();
const Home = createStackNavigator();
const Profile = createStackNavigator();

export type ApplicationStackParamList = {
  [screenNames.SPLASH_SCREEN]: undefined;
  [screenNames.HOME_SCREEN]: undefined;
  [screenNames.BOTTOM_TAB_STACK]: undefined;
};

export const RootStack = () => {
  return (
    <Fragment>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          contentStyle: {backgroundColor: colors.white},
        }}>
        <Stack.Screen
          name={screenNames.SPLASH_SCREEN}
          component={SplashScreen}
        />
        <Stack.Screen name={screenNames.HOME_SCREEN} component={HomeScreen} />
        <Stack.Screen
          name={screenNames.BOTTOM_TAB_STACK}
          component={BottomTabStack}
        />
      </Stack.Navigator>
      <Toast config={toastConfig} />
      <Loading />
    </Fragment>
  );
};

const HomeStack = () => {
  return (
    <Home.Navigator screenOptions={screenOptions}>
      <Home.Screen name={screenNames.HOME_SCREEN} component={HomeScreen} />
    </Home.Navigator>
  );
};

const ProfileStack = () => {
  return (
    <Profile.Navigator screenOptions={screenOptions}>
      <Profile.Screen
        name={screenNames.PROFILE_SCREEN}
        component={ProfileScreen}
      />
    </Profile.Navigator>
  );
};

const botNavbar = (props: any) => {
  return <BottomTabBar {...props} />;
};

const BottomTabStack = () => {
  return (
    <BottomTab.Navigator
      tabBar={botNavbar}
      screenOptions={{headerShown: false}}>
      <BottomTab.Screen name={screenNames.HOME_STACK} component={HomeStack} />
      <BottomTab.Screen
        name={screenNames.PROFILE_STACK}
        component={ProfileStack}
      />
    </BottomTab.Navigator>
  );
};
