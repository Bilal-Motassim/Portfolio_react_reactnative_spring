import React from 'react';
import { TouchableOpacity, Text, StyleSheet} from 'react-native';
import { COLORS, FONT, SIZES } from '../constants';

const CustomButton = ({ title, onPress, style, disabled }) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress} 
      style={[styles.button,style,disabled?{backgroundColor:COLORS.gray}:{}]}
      >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width:'85%',
    maxWidth:350,
    backgroundColor:COLORS.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: SIZES.medium,
    fontFamily: FONT.bold,
    textAlign: 'center',
  },
});

export default CustomButton;