import React from "react";
import LottieView from "lottie-react-native";
import { View } from "react-native";

export default function LoadingAnimation({size}){
    return(
        <View style={{height: size, aspectRatio:1}}>
            <LottieView style={{flex:1}} source={require('../assets/loading-animation.json')} autoPlay loop />
        </View>
    )
}