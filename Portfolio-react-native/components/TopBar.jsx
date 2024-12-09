import React, { useState } from 'react';
import {Text, View, TextInput, StyleSheet, useColorScheme, Image, StatusBar, Platform } from 'react-native';
import { Feather as Icon } from '@expo/vector-icons';
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
  } from 'react-native-popup-menu';
import { useAuth } from '../context/authContext';
import { COLORS, SIZES } from '../constants';
import { router } from 'expo-router';
import { Button } from 'react-native-paper';


const Item = ({ isLight, text, action, iconName, value }) => (
    <MenuOption
        onSelect={() => action(value)}
        customStyles={{
            optionWrapper: {
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingHorizontal:12,
                paddingVertical:10,
                backgroundColor: isLight=="light" ? "white" : "black",
            }
        }}
    >
        <Text style={{color:isLight=="light" ? "#000000" :"white",
            fontSize:SIZES.medium,fontWeight:'bold'
            }}>{text}</Text>
        <Icon name={iconName} size={28} color={isLight=="light" ? "#000000" :"white"}/>
    </MenuOption>
);

const Divider = () => <View style={styles.divider} />;

const TopBar = () => {
    const isLight = useColorScheme();
    const statusBarHeight = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;
    const {logout, user, profilePic} = useAuth();
    const handleLogout = async () =>{
      await logout();
    }
    const handleProfile = ()=>{
      router.push(`/user/${user.id}`);
    }
  return (
    <View style={[styles.container, isLight=="light" ? {} : {backgroundColor:'black',borderColor:'black', borderTopColor:'black',marginTop:statusBarHeight}]}>
        <View style={styles.iconContainer}>
            <Menu>
                <MenuTrigger>
                    {user.profilepicpath !== null ? 
                      <Image
                        style={{height:45,aspectRatio:1,borderRadius:100}}
                        source = {{uri: `data:image/jpeg;base64,${profilePic}` }}
                        /> :
                        <Image style={{height:45,aspectRatio:1,borderRadius:100}} source={require("../assets/images/anonyme.png")}/>
                    }
                </MenuTrigger>
                <MenuOptions 
                    customStyles={{
                        optionsContainer:{
                            marginTop:45,
                            borderRadius:10,
                            borderCurve:'continuous',
                            shadowOpacity:0.2,
                            shadowOffset:{width:0,height:0}
                        }
                }}>
                    <Item isLight={isLight} text={"Profile"} iconName={'user'} action={handleProfile} />
                    <Divider />
                    <Item isLight={isLight} text={"Log Out"} iconName={'log-out'} action={handleLogout} />
                </MenuOptions>
            </Menu>
        </View>
            
      <View style={[styles.searchContainer,isLight=='dark'? {backgroundColor:COLORS.gray}:{}]}>
        <Icon name="search" size={20} color={isLight=="light" ?"#A0A0A0":"white"} />
        <TextInput
          placeholder="Search"
          style={[styles.searchInput,isLight=='light' ?
            {color:'black'}: 
            {backgroundColor:COLORS.gray,color:'white'}]}
          placeholderTextColor={isLight=="light"? "#A0A0A0":"white"}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop:50,
    height:50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 12,
    backgroundColor: '#FFFFFF', // Adjust color as needed
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0', // Adjust color as needed
  },
  iconContainer: {
    marginRight: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F0F0', // Adjust color as needed
    borderRadius: 8,
    flex: 1,
    paddingHorizontal: 12,
  },
  searchInput: {
    paddingLeft:10,
    flex: 1,
    height:35,
    fontSize: 16,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "#7F8487",
  },
});

export default TopBar;
