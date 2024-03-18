import {SafeAreaView, Text, View} from 'react-native';
import React from 'react';
import I18n from '../../../utils/language/i18n';

const HomeContainer = () => {
  return (
    <SafeAreaView>
      <View>
        <Text>{I18n.t('HOME')}</Text>
      </View>
    </SafeAreaView>
  );
};

export default HomeContainer;
