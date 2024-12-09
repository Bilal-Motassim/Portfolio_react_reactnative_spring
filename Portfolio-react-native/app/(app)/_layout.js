import React from "react";
import { Stack } from "expo-router";

export default function layout (){
    return(
        <Stack>
            <Stack.Screen 
                name="(tabs)" 
                options={{ headerShown: false }} 
            />
            <Stack.Screen
                name="user"
                options={{headerShown:false}}
             />
            <Stack.Screen
                name="post"
                options={{headerShown:false}}
             />
        </Stack>
    )
}