import React, { useState } from 'react';
import { Modal, View, Text, TextInput, Button, StyleSheet, Image, useColorScheme, Pressable, ActivityIndicator } from 'react-native';
import { COLORS, FONT, SIZES } from '../../constants';
import CustomButton from '../CustomButton';
import * as ImagePicker from 'expo-image-picker';
import { Feather } from '@expo/vector-icons';
import axios from 'axios';
import {API_URL} from "@env";
import { useAuth } from '../../context/authContext';
import * as FileSystem from 'expo-file-system';

const EditProfileModal = ({ visible, onClose, user, token, onSave,bannerPic, profilePic }) => {
  //const [name, setName] = useState(user.name);
  const [headline, setHeadline] = useState(user.headline);
  const [loading, setLoading] = useState(false);
  const [about, setAbout] = useState(user.about);
  const [profileImage, setProfileImage] = useState(profilePic);
  const [isNewImage, setNewImage] = useState(false);
  const [isNewBannerImage, setNewBannerImage] = useState(false);
  const [bannerImage, setBannerImage] = useState(bannerPic);
  const isLight = useColorScheme() === 'light';
  const {setProfilePic} = useAuth();

  const handleSave = async () => {
    try {
      setLoading(true);      
      const response = await axios.put(
        `${API_URL}/api/users/about/${user.id}`,{"about":about},
        { headers: {"Authorization" : `Bearer ${token}`}})
      
      const response2 = await axios.put(
        `${API_URL}/api/users/headline/${user.id}`,{"headline":headline},
        { headers: {"Authorization" : `Bearer ${token}`}})

      if(isNewImage){
        await handleSaveProfileImage();
      }
      if(isNewBannerImage){
        await handleSaveBannerImage();
      }
      setLoading(false)
      if(response.status==201 && response2.status==201){
        onSave()
        onClose()
      }
    } catch (error) {
      console.log(error)
    }
  };

  const handleProfileImageUpload = async () => {
      let response = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          quality : 1
      })

      if(!response.canceled){
        setProfileImage(response.assets[0].uri);
        setNewImage(true);
      }
  };

  const handleSaveProfileImage = async ()=>{
    if(isNewImage){
      try {
        const formData = new FormData();
        formData.append('image', {
          uri: profileImage,
          type: 'image/jpeg',
          name: 'image.jpg',
        });
        const response = await axios.put(`${API_URL}/api/users/profilepic/${user.id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            "Authorization" : `Bearer ${token}`
          },
        });
        const base64 = await FileSystem.readAsStringAsync(profileImage, { encoding: 'base64' });
        setProfilePic(base64);
      } catch (error) {
        console.log(error);
      }
    }
  }
  
  const handleSaveBannerImage = async ()=>{
    if(isNewBannerImage){
      try {
        const formData = new FormData();
        formData.append('image', {
          uri: bannerImage,
          type: 'image/jpeg',
          name: 'image.jpg',
        });
        const response = await axios.put(`${API_URL}/api/users/backgroundpic/${user.id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            "Authorization" : `Bearer ${token}`
          },
        });
      } catch (error) {
        console.log("backgroudError:",error);
      }
    }
  }
  const handleBannerImageUpload = async () => {
      let response = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4,3],
          quality : 1
      })

      if(!response.canceled){
          setBannerImage(response.assets[0].uri);
          setNewBannerImage(true);
      }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalContainer}>
        {loading ? 
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View> :
        <View style={[styles.modalContent, isLight ? {backgroundColor: 'white'}:{backgroundColor:COLORS.dark}]}>
        <Text style={{fontFamily:FONT.bold,fontSize:SIZES.xLarge,color:isLight? '#000' :'#fff'}}>Edit Profile</Text>
        <View style={styles.imageContainer}>
          {profileImage !== null ? 
          <Image source={{uri: isNewImage ? profileImage : `data:image/jpeg;base64,${profileImage}`}} style={styles.profileImage} /> :
          <Image source={require("../../assets/images/anonyme.png")} style={styles.profileImage} />
          }
          <Pressable onPress={handleProfileImageUpload} style={styles.icon}>
            <Feather name="edit-2" size={24} color="white" />
          </Pressable>
        </View>
        <View style={{marginBottom:20}}>
          <Image  
              style={{height: 150}} 
              source={{ uri: bannerImage !== null ? isNewBannerImage ? bannerImage : 
                `data:image/jpeg;base64,${bannerImage}` : 
                'https://mahala.co.uk/wp-content/uploads/2014/12/img_banner-thin_mountains.jpg' }} 
            />
            <Pressable onPress={handleBannerImageUpload} style={styles.icon2}>
              <Feather name="edit-2" size={24} color="white" />
            </Pressable>
        </View>
        {/* <TextInput
          style={[styles.input, isLight ? 
            {borderColor: '#ccc',color:'black'}:{borderColor:'#fff',color:'white'}]}
          value={name}
          onChangeText={setName}
          placeholder="Name"
        /> */}
        <TextInput
          style={[styles.input,{marginBottom:30}, isLight ? 
            {borderColor: '#ccc',color:'black'}:{borderColor:'#fff',color:'white'}]}
          value={headline}
          onChangeText={setHeadline}
          placeholder="Headline"
        />
        <TextInput
          style={[styles.input,{marginBottom:30}, isLight ? 
            {borderColor: '#ccc',color:'black'}:{borderColor:'#fff',color:'white'}]}
          value={about}
          multiline
          onChangeText={setAbout}
          placeholder="About"
        />
        <View style={{display:'flex',flexDirection:'row',justifyContent:'center'}}>
          <CustomButton style={{width:150,alignSelf:'center',marginBottom:20,marginRight:25}} title="Save" onPress={handleSave} />
          <CustomButton style={{width:150,alignSelf:'center',marginBottom:20}} title="Cancel" onPress={onClose} />
        </View>
      </View> }
        
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  modalContent: {
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginVertical: 10,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 10,
  },
  icon:{
    position:'absolute',
    top:120,
    right:120,
    backgroundColor:COLORS.primary, 
    width:40,
    height:40,
    alignItems:'center',
    justifyContent:'center',
    borderRadius:100
  },
  icon2:{
    position:'absolute',
    top:120,
    right:20,
    backgroundColor:COLORS.primary, 
    width:40,
    height:40,
    alignItems:'center',
    justifyContent:'center',
    borderRadius:100
  }
});

export default EditProfileModal;
