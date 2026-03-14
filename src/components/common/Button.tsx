import React from 'react';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacityProps,
} from 'react-native';
import { COLORS } from '../../theme/colors';

interface ButtonProps extends TouchableOpacityProps {
  text: string;
  isLoading?: boolean;
}

export const Button = ({ text, isLoading, style, ...props }: ButtonProps) => {
  return (
    <TouchableOpacity
      style={[styles.button, style]}
      activeOpacity={0.8}
      disabled={isLoading}
      {...props}>
      {isLoading ? (
        <ActivityIndicator color={COLORS.text.inverse} />
      ) : (
        <Text style={styles.buttonText}>{text}</Text>
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
