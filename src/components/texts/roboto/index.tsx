/* eslint-disable react-native/no-inline-styles */
import {Text, TextProps} from 'react-native';
import React from 'react';
import {CONSTANTS} from '../../../utils/constants';

interface IRobotoText extends TextProps {
  fontType?: keyof typeof CONSTANTS.weights;
  size?: number;
  color?: string;
}

const RobotoText = (props: IRobotoText) => {
  const {
    children,
    style,
    fontType = CONSTANTS.weights.regular,
    size,
    color,
  } = props;

  const onRenderFont = () => {
    switch (fontType) {
      case CONSTANTS.weights.bold:
        return 'Roboto-Bold';
      case CONSTANTS.weights.medium:
        return 'Roboto-Medium';
      case CONSTANTS.weights.light:
        return 'Roboto-Light';
      case CONSTANTS.weights.thin:
        return 'Roboto-Thin';
      default:
        return 'Roboto-Regular';
    }
  };

  return (
    <Text
      {...props}
      style={[
        {
          fontFamily: onRenderFont(),

          color: color ? color : 'black',
          fontSize: size,
        },
        style,
      ]}>
      {children}
    </Text>
  );
};

export default RobotoText;
