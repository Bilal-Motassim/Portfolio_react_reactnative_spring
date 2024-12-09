import React, {useRef, useState } from 'react';
import { Text, StyleSheet, View, SafeAreaView, Image, useColorScheme,TouchableOpacity, Alert} from "react-native";
import { Stack, useRouter} from "expo-router"
import { COLORS, FONT, SIZES, icons } from "../constants";
import CustomButton from "../components/CustomButton";
import CustomTextInput from '../components/CustomTextInput';
import LoadingAnimation from"../components/LoadingAnimation";
import { useAuth } from '../context/authContext';

const EmailVerificationScreen = ()=>{
    const router = useRouter();
    const isLight = useColorScheme();
    const {verifyEmail} = useAuth();
    const [loading, setLoading] = useState(false);

    const code = useRef('');


    const handlepress = async ()=>{
        if(code.current !== ''){
            setLoading(true)
            const response = await verifyEmail(code.current)
            setLoading(false)
            if(!response.success){
                Alert.alert('Verification',response.data);
            }
            router.replace('home');
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
                    <Text style={[styles.title,isLight=='light' ? {}:{color:"white"}]}>Email Verification</Text>
                    <Text style={[{fontFamily:FONT.regular},isLight=='light' ? {}:{color:"white"}]}>Check the code in your email</Text>
                </View>
                <CustomTextInput
                    placeholder="Verification Code"
                    onChangeText={text => code.current=text}
                    
                />
                <View style={{marginVertical:30,width:'100%',justifyContent: 'center',alignItems: 'center'}}>
                    {loading ? 
                        <LoadingAnimation size={70} /> : 
                        <CustomButton title={"Verify"} onPress={handlepress}/>
                    }
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
      fontSize: SIZES.xLarge,
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

export default EmailVerificationScreen;