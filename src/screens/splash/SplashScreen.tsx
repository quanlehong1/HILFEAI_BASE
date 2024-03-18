import {StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import screenNames from '../../utils/screenName';
import {navigateAndClearStack} from '../../navigation/service';

const SplashScreen = () => {
  useEffect(() => {
    setTimeout(() => {
      navigateAndClearStack(screenNames.BOTTOM_TAB_STACK);
    }, 200);
  }, []);

  return <></>;
};

export default SplashScreen;

StyleSheet.create({});
