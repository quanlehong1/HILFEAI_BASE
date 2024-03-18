import {SafeAreaView, Text, View} from 'react-native';
import React from 'react';
import I18n from '../../../utils/language/i18n';
import RobotoText from '../../../components/texts/roboto';

const HomeContainer = () => {
  return (
    <SafeAreaView>
      <View>
        <Text>{I18n.t('HOME')}</Text>
        <RobotoText size={30} fontType="bold">
          {I18n.t('HOME')}
        </RobotoText>
      </View>
    </SafeAreaView>
  );
};

export default HomeContainer;
