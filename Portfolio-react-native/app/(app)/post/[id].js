import { View, Text, ActivityIndicator, StyleSheet, TouchableOpacity, Image, ScrollView, KeyboardAvoidingView, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { router, useLocalSearchParams } from 'expo-router';
import axios from 'axios';
import moment from 'moment';
import { useAuth } from '../../../context/authContext';
import {API_URL} from "@env";
import { AntDesign } from '@expo/vector-icons';
import Comment from '../../../components/Comment';
import { COLORS } from '../../../constants';

const post = () => {
  const { id } = useLocalSearchParams();
  const [post, setPost] = useState(null);
  const {userToken, user} = useAuth();
  const [loading, setLoading] = useState(true);
  const [formattedDate, setformatedData] = useState(null)
  const [likesCount, setLikesCount] = useState(0);
  const [liked, setLiked] = useState(false);
  const [comments, setComments]= useState([]);
  const [mycomment, setMyComment] = useState('');

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

  const getPostsDetail = async ()=>{
    try {
      const response = await axios.get(`${API_URL}/api/posts/${id}`,{
        headers: {
          "Authorization" : `Bearer ${userToken}`
        }
      })
      setPost(response.data[0]);
      const fd = moment(response.data[0].createdAt).format('DD MMMM YYYY');
      setLiked(response.data[0].userlikes.includes(+user.id))
      setLikesCount(+response.data[0].likes);
      setformatedData(fd);
      getComments()
      setLoading(false);
    } catch (error) {
      console.log('error fetching post', error);
    }
  }

  const getComments = async ()=>{
    try {
      const response = await axios.get(`${API_URL}/api/posts/${id}/comments`,{
        headers: {
            "Authorization" : `Bearer ${userToken}`
        }
      })
      setComments(response.data);
    } catch (error) {
      console.log('error fetching comments', error);
    }
  }

  useEffect(()=>{
    getPostsDetail();
  },[id])

  const handlePostComment = async()=>{
    if(mycomment){
      try {
        await axios.post(`${API_URL}/api/posts/comments/${id}/${user.id}`,{
          "content":mycomment
        },
          {headers: {"Authorization" : `Bearer ${userToken}`} }
        )
        setMyComment('');
        getComments();
      } catch (error) {
        console.log('error adding comment ',error);
      }
    }
  }

  
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
}

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.card}>
          <TouchableOpacity style={styles.header} onPress={()=> router.push(`/user/${post.userid}`)}>
            <Image source={{uri:`data:${post.mediatype};base64,${post.profilebase64}`}} style={styles.profileImage} />
            <View>
              <Text style={styles.username}>{post.firstname + " " + post.lastname}</Text>
              <Text style={styles.subtitle}>{post.headline}</Text>
              <Text style={styles.subtitle}>{formattedDate}</Text>
            </View>
          </TouchableOpacity>
          <Text style={{fontWeight:'bold',fontSize:16}}>{post.title}</Text>
          <Text style={styles.content}>{post.description}</Text>
          {post.base64 &&  <Image source={{uri:`data:${post.mediatype};base64,${post.base64}`}} style={styles.contentImage} />}
          <View style={styles.likesContainer}>
            <TouchableOpacity style={{marginRight:5}} onPress={handleLike}>
                <AntDesign name={liked ? "like1" : "like2"} size={24} color={liked ? 'blue' : 'black'}  />
            </TouchableOpacity>
            <Text style={styles.likesText}>{likesCount} Likes</Text>
          </View>
        </View>

        <View style={{paddingHorizontal:20}}>
          <Text style={{fontWeight:'bold',fontSize:16, marginBottom:15}}>Comments</Text>
          {comments.length > 0 &&
            <View>
                {comments.map((com, index) => <Comment key={index} prop={com}/>)}
            </View>}
        </View>
      </ScrollView>
    
    
      <View style={styles.commentInputContainer}>
        <TextInput
          style={styles.commentInput}
          placeholder="Write a comment..."
          value={mycomment}
          onChangeText={setMyComment}
          multiline
        />
        <TouchableOpacity onPress={handlePostComment}>
          <Text style={styles.postButton}>Post</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

export default post

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 20,
    marginBottom: 20,
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
  likesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom:20
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
  commentInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#000',
    backgroundColor:'#fff'
  },
  commentInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 8,
    paddingHorizontal: 8,
    marginRight: 8,
    height:50,
    maxHeight: 100,
  },
  postButton: {
    paddingHorizontal:5,
    paddingVertical:10,
    backgroundColor:COLORS.primary,
    color: 'white',
  },
});