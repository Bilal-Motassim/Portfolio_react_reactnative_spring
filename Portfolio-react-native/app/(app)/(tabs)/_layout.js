import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import TopBar from "../../../components/TopBar";
import { COLORS, FONT } from '../../../constants';
import { Feather } from '@expo/vector-icons';
import { View } from 'react-native';

const AddIcon = ({color}) =>{
    return (
        <View>
            <Feather name="plus-circle" size={24} color={color} />
        </View>
    )
}

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ 
        tabBarActiveTintColor: COLORS.primary, tabBarStyle: {height: 65},
        tabBarLabelStyle:{fontFamily:FONT.bold,fontSize:12,marginBottom:8},
        tabBarIconStyle:{marginBottom:-10}, }}
        >
        <Tabs.Screen
            name="home"
            options={{
                header:()=> <TopBar/>,
                headerShadowVisible:false,
                title: 'Home',
                tabBarIcon: ({ color }) => <FontAwesome size={32} name="home" color={color} />,
            }}
        />
        <Tabs.Screen
            name="newPost"
            options={{
                headerShadowVisible:false,
                title: 'New post',
                tabBarIcon: ({ color }) => <AddIcon color={color} />,
            }}
        />
    </Tabs>
  );
}
