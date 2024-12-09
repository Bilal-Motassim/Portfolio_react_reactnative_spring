import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet,SafeAreaView, useColorScheme, TouchableOpacity, Alert} from 'react-native';
import { Stack, useRouter, Link } from "expo-router"
import {COLORS, FONT, SIZES} from "../constants"
import CustomTextInput from '../components/CustomTextInput';
import CustomPasswordInput from '../components/CustomPasswordInput';
import CustomButton from '../components/CustomButton'
import CustomEmailInput from '../components/CustomEmailInput';
import {validateEmail} from "../utils"
import LoadingAnimation from"../components/LoadingAnimation";
import { useAuth } from '../context/authContext';

const SignUpScreen = () => {
  const router = useRouter();
  const isLight = useColorScheme();
  const {register} = useAuth();

  const firstName = useRef('');
  const lastName = useRef('');
  const email = useRef('');
  const password = useRef('');
  const confirmPassword = useRef('');

  const [isEmailValid, setIsEmailValid] = useState(true);
  const [loading, setLoading] = useState(false);

  const checkEmail = () => setIsEmailValid(validateEmail(email.current))

  const handleSignUp = async () => {
    if(firstName.current=='' || lastName.current==''||email.current==''||password.current==''||confirmPassword.current==''){
      Alert.alert('Sign Up', 'Please fill all the fields !');
      return
    }

    if(password.current != confirmPassword.current){
      Alert.alert('Sign Up', 'Password doesn\'t match !');
      return
    }
    setLoading(true);
    const response = await register(email.current, password.current, firstName.current, lastName.current);    
    setLoading(false);
    if(!response.success){
      Alert.alert('Sign In',response.data);
      return
    }
    router.replace('login');
  };

  return (
    <SafeAreaView 
      style={[{flex:1},isLight=='light' ? {backgroundColor:COLORS.white}:{backgroundColor:COLORS.dark}]}>
        <Stack.Screen
            options={{
              headerTitle:'',
              headerShadowVisible:false, 
              headerStyle:{backgroundColor:isLight=='light'? COLORS.white:COLORS.dark}
            }}
        />
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={[styles.title,isLight=='light' ? {}:{color:"white"}]}>Sign Up</Text>
                <Text style={[{fontFamily:FONT.regular},isLight=='light' ? {}:{color:"white"}]}>Fist creat your account</Text>
            </View>
            <View style={styles.inputContainer}>
                <CustomTextInput
                    placeholder="First Name"
                    onChangeText={text => firstName.current=text}
                    style={{width:'48%'}}
                />
                <CustomTextInput
                    placeholder="Last Name"
                    onChangeText={text => lastName.current=text}
                    style={{width:'48%'}}
                />
            </View>
        
            <CustomEmailInput
                placeholder="Email"
                onChangeText={value => {
                  checkEmail()
                  email.current=value
              }}
            />
            {!isEmailValid && <Text style={{color:'red',fontSize:SIZES.xSmall}}>Invalide E-mail !</Text>}
            <CustomPasswordInput
                placeholder="Password"
                onChangeText={text => password.current =text}
                style={{marginBottom:30}}
            />
            <CustomPasswordInput
                placeholder="Confirm Password"
                onChangeText={text => confirmPassword.current = text}
            />
            <View style={{marginVertical:30,width:'100%',justifyContent: 'center',alignItems: 'center'}}>
                    {loading ? 
                        <LoadingAnimation size={70} /> :
                        <CustomButton disabled={!isEmailValid} title={"SIGN UP"} onPress={handleSignUp}/>
                    }
            </View>
            
            <View style={{flexDirection:'row', marginBottom:25}}>
                <Text style={[{marginRight:5},isLight=="light" ? {}:{color:COLORS.white}]}>
                    Already have an account ?
                </Text>
                
                <TouchableOpacity onPress={()=> router.replace('login')} style={styles.link}>
                  <Text style={styles.link}>Login</Text>
                </TouchableOpacity>
            </View>
            <Text style={[{fontSize:SIZES.small,textAlign:'center'}, isLight=="light" ? {}:{color:COLORS.white}]}>
                Use the application according to policy rules. 
                Any kinds of violations will be subject to sanctions.
            </Text>
        </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  title: {
    fontSize: SIZES.xxLarge,
    marginBottom: SIZES.large,
    fontFamily: FONT.bold
  },
  inputContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titleContainer:{
    justifyContent:'center',
    alignItems:'center',
    marginBottom:50
  },
  link:{
    color:'#34a0ff',
    textDecorationLine:'underline',
  }
});

export default SignUpScreen;
