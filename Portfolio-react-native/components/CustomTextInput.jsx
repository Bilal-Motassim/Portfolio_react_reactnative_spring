import React from 'react';
import { TextInput, StyleSheet, useColorScheme} from 'react-native';
import { COLORS } from '../constants';

const CustomTextInput = ({ placeholder, value, onChangeText, style }) => {
  const isLight = useColorScheme();
  return (
    <TextInput
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      style={[styles.input, style,isLight=="light" ? {}:styles.darkInput]}
      placeholderTextColor="#aaa"
    />
  );
};

const styles = StyleSheet.create({
  input: {
    width: '100%',
    height: 40,
    borderBottomColor: '#000',
    borderWidth: 0,
    borderBottomWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  darkInput:{
    borderBottomColor: '#aaa',
    color:COLORS.white
  }
});

export default CustomTextInput;
