import React, {useRef, useState } from 'react';
import { Text, StyleSheet, View, SafeAreaView, Image, useColorScheme,TouchableOpacity, Alert} from "react-native";
import { Stack, useRouter} from "expo-router"
import { COLORS, FONT, SIZES, icons } from "../constants";
import CustomButton from "../components/CustomButton";
import CustomEmailInput from '../components/CustomEmailInput';
import CustomPasswordInput from "../components/CustomPasswordInput";
import LoadingAnimation from"../components/LoadingAnimation";
import {validateEmail} from "../utils"
import { useAuth } from '../context/authContext';

const LoginScreen = ()=>{
    const router = useRouter();
    const {login} = useAuth();
    const isLight = useColorScheme();
    
    const [isEmailValid, setIsEmailValid] = useState(true);
    const [loading, setLoading] = useState(false);

    const emailRef = useRef('');
    const passwordRef = useRef('');

    const checkEmail = () => setIsEmailValid(validateEmail(emailRef.current))

    const handlepress = async ()=>{
        if(emailRef.current=='' || passwordRef.current==''){
            Alert.alert('Sign In', 'Please fill all the fields !');
            return
        }
        try {
            setLoading(true)
            const response = await login(emailRef.current, passwordRef.current)
            setLoading(false)
            // if(!response.success){
            //     Alert.alert('Sign In',response.data);
            // }r
        } catch (error) {
            console.log(error)
        }
    }

    return(
        <SafeAreaView style={[{flex:1},isLight=='light' ? {backgroundColor:COLORS.white}:{backgroundColor:COLORS.dark}]}>
            <Stack.Screen
                options={{
                    headerTitle:'',
                    headerShadowVisible:false, 
                    headerStyle:{backgroundColor:isLight=='light'? COLORS.white:COLORS.dark}
                }}
            />
            <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <Text style={[styles.title,isLight=='light' ? {}:{color:"white"}]}>Sign In</Text>
                    <Text style={[{fontFamily:FONT.regular},isLight=='light' ? {}:{color:"white"}]}>Enter your email and password</Text>
                </View>
            
                <CustomEmailInput
                    onChangeText={value => {
                        checkEmail()
                        emailRef.current=value
                    }}
                    style={[{marginBottom:25}, !isEmailValid ? styles.errorInput : {}]}
                />
                {!isEmailValid && <Text style={{color:'red',fontSize:SIZES.xSmall}}>Invalide E-mail !</Text>}
                <CustomPasswordInput
                    placeholder="Password"
                    onChangeText={text => passwordRef.current=text}
                />
                <View style={{marginVertical:30,width:'100%',justifyContent: 'center',alignItems: 'center'}}>
                    {loading ? 
                        <LoadingAnimation size={70} /> : 
                        <CustomButton disabled={!isEmailValid}  title={"SIGN IN"} onPress={handlepress}/>
                    }
                </View>
                <View style={{flexDirection:'row', marginBottom:20}}>
                    <Text style={[{marginRight:5},isLight=='light' ? {}:{color:"white"}]}>
                        Dont have an account ?
                    </Text>
                    <TouchableOpacity onPress={()=> router.replace('signup')} style={styles.link}>
                        <Text style={styles.link}>Sign up</Text>
                    </TouchableOpacity>
                </View>
                <Text style={[isLight=='light'? {}:{color:'white'},{marginBottom:20}]}>Or</Text>
                <View style={{width:'100%',alignItems:'center'}}>
                    <View style={{flexDirection:'row',alignItems:'baseline'}}>
                        <View
                            style={[styles.border,
                                isLight=='light' ? {borderBottomColor:'black'}:{borderBottomColor:'white'}]}
                        />
                        <Text style={[styles.iconHeader,
                                isLight=='light' ? {}:{color:"white"}]}>Sign In with </Text>
                        <View 
                            style={[styles.border, 
                                isLight=='light' ? {borderBottomColor:'black'}:{borderBottomColor:'white'}]}
                        />
                    </View>
                    <View style={styles.iconContainer}>
                        <Image 
                            resizeMode='contain' 
                            style={[styles.icons,{width:45}]}  
                            source={icons.google} 
                        />
                        <Image
                            source={icons.linkedin} 
                            style={[styles.icons,{width:55}]} 
                            resizeMode='contain' 
                        />
                        <Image
                            source={icons.facebook} 
                            style={[styles.icons,{width:40}]} 
                            resizeMode='contain' 
                        />
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

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
      color:'blue',
      textDecorationLine:'underline',
    },
    icons:{
        width:50,
    },
    iconContainer:{
        width:'65%',
        flexDirection:'row',
        justifyContent:'space-between',
    },
    iconHeader:{
        fontFamily:FONT.regular,
        fontSize:SIZES.medium,
        textAlign:'center',
        marginBottom:20,
        marginHorizontal:25
    },
    errorInput:{
        borderBottomColor: 'red',
    },
    border:{
        borderBottomWidth:1,
        width:'25%',
    },
  });

export default LoginScreen;