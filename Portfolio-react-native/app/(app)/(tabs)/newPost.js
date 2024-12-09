import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet, ToastAndroid } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import CustomButton from '../../../components/CustomButton';
import { useAuth } from '../../../context/authContext';
import axios from 'axios';
import {API_URL} from "@env";

const newPost = () => {
  const [postTitle, setPostTitle] = useState('');
  const [postContent, setPostContent] = useState('');
  const [imageUri, setImageUri] = useState(null);
  const {user, userToken} = useAuth();

  const handleChooseImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const handlePost = async () => {
    try {
      const formData = new FormData();
      formData.append('file', {
        uri: imageUri,
        type: 'image/jpeg',
        name: 'image.jpg',
      });
      formData.append('title',postTitle);
      formData.append('description',postContent);

      const response = await axios.post(`${API_URL}/api/posts/${user.id}`,formData,{
        headers: {
          'Content-Type': 'multipart/form-data',
          "Authorization" : `Bearer ${userToken}`
        },
      })
      if(response.status === 200){
        ToastAndroid.showWithGravity(
          'Poste addes successfully !',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
        );
        setPostContent('');
        setPostTitle('');
        setImageUri(null);
      }
    } catch (error) {
      console.log('error in creating post',error);
    }
  };

  return (
    <View style={styles.container}>
        <TextInput
            value={postTitle}
            onChangeText={setPostTitle}
            placeholder="Write your title here..."
            multiline
            style={styles.input}
        />
        <TextInput
            value={postContent}
            onChangeText={setPostContent}
            placeholder="Write your post here..."
            multiline
            style={styles.input}
        />
        <CustomButton 
            title="Choose Image" 
            style={{marginBottom:20, alignSelf:'center'}}
            onPress={handleChooseImage}
        />
        {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
        <CustomButton
            style={{alignSelf:'center'}}
            title="Post" 
            onPress={handlePost} 
            disabled={!postContent || !postTitle}
        />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
    maxHeight: 250,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginBottom: 20,
  },
});

export default newPost;
