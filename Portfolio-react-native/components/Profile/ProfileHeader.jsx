import React from 'react';
import { View, Text, StyleSheet, Image, useColorScheme, Pressable } from 'react-native';
import { Avatar, Card } from 'react-native-paper';
import { FONT, SIZES } from '../../constants';

const ProfileHeader = ({ user, profilePic, bannerPic }) => {
  const isLight = useColorScheme() === 'light';
  return (
    <View>
      <View style={[{marginBottom:25},isLight ? {backgroundColor:'#fff'} : {backgroundColor:'#000'}]}>
          <Image  
            style={{height: 150}} 
            source={{ uri: user.backgroundpicpath !== null ? `data:image/jpeg;base64,${bannerPic}` : 'https://mahala.co.uk/wp-content/uploads/2014/12/img_banner-thin_mountains.jpg' }} />
          <View style={[styles.backImage, isLight ? {backgroundColor:'#fff'} : {backgroundColor:'#000'}]} />
          {user.profilepicpath !== null ? 
          <Avatar.Image
            size={120}
            source = {{uri: `data:image/jpeg;base64,${profilePic}` }}
            style={styles.profileImage}
            /> :
            <Image style={[styles.profileImage,{width:120,height:120}]} source={require("../../assets/images/anonyme.png")}/>
          }
          <Text style={[styles.name, isLight ? {color:'#000'} : {color:'#fff'}]}>{user.firstName} {user.lastName}</Text>
          <Text style={[styles.headline, isLight ? {color:'#000'} : {color:'#fff'}]}>{user.headline !== null ? user.headline : 'no headline'}</Text>
      </View>
      <View style={[styles.container, isLight ? {backgroundColor:'#fff'}:{backgroundColor:'#000'}]}> 
          <Text style={styles.title}>About</Text>
          <Text style={styles.about}>{user.about !== null ? user.about : '(about section has not been set)'}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    padding:20,
  },
  profileImage: {
    position: 'absolute',
    top: 80,
    alignSelf: 'center',
  },
  name: {
    fontSize: SIZES.xLarge,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: 50,
  },
  headline: {
    fontSize: SIZES.medium,
    alignSelf: 'center',
    marginBottom: 25,
  },
  backImage:{
    height:80,
    width:140,
    borderTopLeftRadius:100,
    borderTopRightRadius:100,
    position:'absolute',
    top:70,
    alignSelf:'center'
  },
  title: {
    fontSize: SIZES.large,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  about:{
    fontFamily:FONT.regular,
    fontSize:14
  }
});

export default ProfileHeader;
