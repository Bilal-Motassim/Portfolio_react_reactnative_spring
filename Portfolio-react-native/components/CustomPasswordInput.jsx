import React, { useState } from 'react';
import { TextInput, StyleSheet, View, useColorScheme } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS } from '../constants';

const CustomPasswordInput = ({ placeholder, value, onChangeText, style }) => {
    const [showPassword, setShowPassword] = useState(false);
    const isLight = useColorScheme();
    const toggleShowPassword = () => { 
        setShowPassword(!showPassword); 
    };

  return (
    <View style={styles.container}>
        <TextInput
            secureTextEntry={!showPassword} 
            value={value} 
            onChangeText={onChangeText} 
            style={[styles.input, style,style,isLight=="light" ? {}:styles.darkInput]} 
            placeholder={placeholder}
            placeholderTextColor="#aaa"
        />
        <MaterialCommunityIcons 
            name={showPassword ? 'eye-off' : 'eye'} 
            size={24} 
            color={COLORS.primary}
            style={styles.icon} 
            onPress={toggleShowPassword} 
        />
    </View>
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
    },
    container: { 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'center',
        borderRadius: 8, 
    },
    icon: {
        position:'absolute',
        top:5,
        right:5, 
    },
    darkInput:{
        borderBottomColor: '#aaa',
        color:COLORS.white
    }
});

export default CustomPasswordInput;
