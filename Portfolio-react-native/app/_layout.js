import { useFonts } from "expo-font";
import { Slot, useRouter, useSegments } from "expo-router";
import { AuthContextProvider, useAuth } from "../context/authContext";
import React,{ useEffect,useState, useContext } from "react";
import { Menu, MenuProvider } from 'react-native-popup-menu';
import { ActivityIndicator, View } from "react-native";

const MainLayout = ()=>{
    const {userToken, user, isLoading} = useAuth();
    const segments = useSegments();
    const router = useRouter();
    //*! FIX THE LOADING BUG
    useEffect(() => {  
      const inApp = segments[0] === "(app)";
  
      if (user !== null && !user.active) {
        router.replace("emailVerification");
      } else if (userToken != null && !inApp) {
        router.replace("home");
      } else if (userToken == null) {
        router.replace("login");
      }
    }, [userToken, user, router]);
    return(
      <Slot/>
    )
  }

const Layout = () => {
    const [fontsLoaded] = useFonts({
        DMBold: require("../assets/fonts/DMSans-Bold.ttf"),
        DMMedium: require("../assets/fonts/DMSans-Medium.ttf"),
        DMRegular: require("../assets/fonts/DMSans-Regular.ttf"),
    });

    if (!fontsLoaded) {
        return null;
    }

    return (
      <MenuProvider>
        <AuthContextProvider>
            <MainLayout />
        </AuthContextProvider>
      </MenuProvider>
    );
}

export default Layout;