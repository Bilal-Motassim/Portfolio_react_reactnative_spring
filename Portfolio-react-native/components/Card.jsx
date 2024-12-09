import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import moment from 'moment';
import axios from 'axios';
import {API_URL} from "@env";
import { useAuth } from '../context/authContext';
import { router } from 'expo-router';

const Card = ({ username,id , userId, userList,subtitle, userProfileImage, 
                contentImage, content, likes,date, title }) => {
    const [expanded, setExpanded] = useState(false);
    const {user,userToken} = useAuth();
    const [liked, setLiked] = useState(userList.includes(+user.id));
    const [likesCount, setLikesCount] = useState(+likes);
    
    const toggleExpanded = () => {
        setExpanded(!expanded);
    };

    const formattedDate = moment(date).format('DD MMMM YYYY');

    const handleLike = async () => {
      try {
        await axios.post(`${API_URL}/api/posts/${id}/like/${user.id}`,{},{
          headers: {
            "Authorization" : `Bearer ${userToken}`
          }
        })
        setLiked(!liked);
        setLikesCount(liked ? likesCount-1 : likesCount+1);
      } catch (error) {
        console.log("error like poste" , error)
      }
    };
  return (
    <View style={styles.card}>
        <TouchableOpacity style={styles.header} onPress={()=> router.push(`/user/${userId}`)}>
            <Image source={{uri:userProfileImage}} style={styles.profileImage} />
            <View>
                <Text style={styles.username}>{username}</Text>
                <Text style={styles.subtitle}>{subtitle}</Text>
                <Text style={styles.subtitle}>{formattedDate}</Text>
            </View>
        </TouchableOpacity>
        <Text style={{fontWeight:'bold',fontSize:16}}>{title}</Text>
        <Text style={styles.content}>
            {expanded ? content : `${content.substring(0, 100)}${content.length > 100 ? '...' : ''}`}
            {expanded && 
              <TouchableOpacity onPress={toggleExpanded} style={styles.readMore}>
                  <Text style={styles.readMore}>Show lees</Text>
              </TouchableOpacity> 
            }
            {content.length > 100 && !expanded && (
            <TouchableOpacity onPress={toggleExpanded} >
                <Text style={styles.readMore}>Read more</Text>
            </TouchableOpacity>
            )}
        </Text>
        {contentImage &&  <Image source={{uri:contentImage}} style={styles.contentImage} />}
        <View style={styles.likesContainer}>
            <TouchableOpacity style={{marginRight:5}} onPress={handleLike}>
                <AntDesign name={liked ? "like1" : "like2"} size={24} color={liked ? 'blue' : 'black'}  />
            </TouchableOpacity>
            <Text style={styles.likesText}>{likesCount} Likes</Text>
            <TouchableOpacity onPress={()=> router.push(`/post/${id}`)}>
              <FontAwesome name="comment-o" size={24} color="black" />
            </TouchableOpacity>
        </View>
    </View>
  )
}

export default Card

const styles = StyleSheet.create({
    card: {
      backgroundColor: '#fff',
      borderRadius: 8,
      padding: 15,
      marginBottom: 20,
      elevation: 3,
      width:'100%'
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
    },
    profileImage: {
      width: 50,
      height: 50,
      borderRadius: 100,
      marginRight: 10,
    },
    username: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    subtitle: {
      fontSize: 14,
      color: '#888',
    },
    content: {
      fontSize: 16,
      lineHeight: 24,
      marginBottom: 10,
    },
    contentImage: {
      width: '100%',
      height: 200,
      marginBottom: 10,
      borderRadius: 8,
    },
    actions: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    readMore: {
      color: 'blue',
    },
    likesContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    likesText: {
      marginRight: 10,
    },
    likeButton: {
      paddingVertical: 5,
      paddingHorizontal: 10,
      backgroundColor: '#e0e0e0',
      borderRadius: 5,
    },
    likeButtonText: {
      color: '#333',
    },
  });