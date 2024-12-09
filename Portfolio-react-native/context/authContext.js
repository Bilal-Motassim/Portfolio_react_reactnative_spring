import { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import axios from "axios";
import {API_URL} from '@env'
export const AuthContext = createContext();
const BASE_URL = API_URL;

export const AuthContextProvider = ({children})=>{
    const [user, setUser] = useState(null);
    const [profilePic, setProfilePic] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [userToken, setUserToken] = useState(null);

    useEffect(()=>{
        isLoggedIn()
    },[])

    const login = async (email, password) => {  
        try {
            setIsLoading(true);
            const response = await axios.post(`${BASE_URL}/api/auth/login`, {
                email,
                password
            });

            const response2 = await axios.get(`${BASE_URL}/api/users/${response.data.id}`,
                { headers: {"Authorization" : `Bearer ${response.data.authToken}`} }
            )
            setUser(response2.data)
            AsyncStorage.setItem('user',JSON.stringify(response2.data))

            let imageResponse =  await axios.get(`${API_URL}/api/users/profilepicbase64/${response.data.id}`, {
                headers: {
                  'Content-Type': 'multipart/form-data',
                  "Authorization" : `Bearer ${response.data.authToken}`
                },
              });
            setProfilePic(imageResponse.data.base64);
            AsyncStorage.setItem('profilePic', JSON.stringify(imageResponse.data.base64))

            setUserToken(response.data.authToken)
            AsyncStorage.setItem('userToken',response.data.authToken)
           
            setIsLoading(false);
            return { success: true, data: response.data };
       
        } catch (error) {
            setIsLoading(false);
            return { success: false, data: 'Incorrect email or password' };
        }
    };

    const refreshUser = async ()=>{
        const response2 = await axios.get(`${BASE_URL}/api/users/${user.id}`,
                { headers: {"Authorization" : `Bearer ${userToken}`} })
        
        setUser(response2.data)
        AsyncStorage.setItem('user',JSON.stringify(response2.data))
    }

    const isLoggedIn = async ()=>{
        try {
            setIsLoading(true);
            let userTk = await AsyncStorage.getItem('userToken');
            let userData = await AsyncStorage.getItem('user');
            let imageData = await AsyncStorage.getItem('profilePic');
            
            setUser(JSON.parse(userData));
            setUserToken(userTk);
            setProfilePic(JSON.parse(imageData));
            
            setIsLoading(false);
        } catch (error) {
            console.log("Error :",error);
        }
    }

    const register = async (email, password, firstName, lastName) => {
        try {
            setIsLoading(true);
            const response = await axios.post(`${BASE_URL}/api/auth/register`, {
                email,
                password,
                firstName,
                lastName
            });
            setIsLoading(false);
            return { success: true, data: response.data };
        } catch (error) {
            console.log('error: ', error);
            setIsLoading(false);
            return { success: false, data: 'Registration failed' };
        }
    };

    const verifyEmail = async (code)=>{
        try {
            setIsLoading(true);
            const response = await axios.post(`${BASE_URL}/api/auth/verify`,{
                "email": user.email,
                "code": code
            })
            refreshUser();
            setIsLoading(false);
            return { success: true, data: response.data };
        } catch (error) {
            return { success: false, data: 'Code invalide !!' };
        }
    }

    const logout = async ()=>{
        try {
            setIsLoading(true);
            setUserToken(null);
            await AsyncStorage.removeItem('userToken');
            await AsyncStorage.removeItem('user');
            setIsLoading(false);
        } catch (error) {
            console.log('Error :',error)
        }
    }

    return(
        <AuthContext.Provider value={{user,profilePic, setProfilePic, userToken, isLoading, verifyEmail ,login, register, logout}} >
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = ()=>{
    const value = useContext(AuthContext);

    if(!value){
        throw new Error('useAuth must be wraped inside authContextProvider');
    }

    return value;
}