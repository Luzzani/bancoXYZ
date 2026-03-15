import React from 'react';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacityProps,
  StyleProp,
  TextStyle,
} from 'react-native';
import { COLORS } from '../../theme/colors';

interface ButtonProps extends TouchableOpacityProps {
  text: string;
  isLoading?: boolean;
  disabled?: boolean;
  textStyle?: StyleProp<TextStyle>;
}

export const Button = ({ text, isLoading, disabled, style, textStyle, ...props }: ButtonProps) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        (disabled || isLoading) && {
          backgroundColor: COLORS.status.disabled,
          elevation: 0,
          shadowOpacity: 0,
        },
        style,
      ]}
      activeOpacity={0.8}
      disabled={disabled || isLoading}
      {...props}>
      {isLoading ? (
        <ActivityIndicator color={COLORS.text.inverse} />
      ) : (
        <Text
          style={[
            styles.buttonText,
            (disabled || isLoading) && {
              color: COLORS.text.disabled,
            },
            textStyle,
          ]}>
          {text}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.primary,
    height: 56,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  buttonText: {
    color: COLORS.text.inverse,
    fontSize: 18,
    fontWeight: '700',
  },
});
