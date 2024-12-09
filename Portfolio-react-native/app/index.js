import React from "react";
import { ActivityIndicator, View } from "react-native";
import { useAuth } from "../context/authContext";

export default function Index() {
  return(
    <View style={{flex:1, justifyContent:'center', alignItems:'center'}} >
      <ActivityIndicator size={"large"} color={"gray"} />
    </View>
  )
}