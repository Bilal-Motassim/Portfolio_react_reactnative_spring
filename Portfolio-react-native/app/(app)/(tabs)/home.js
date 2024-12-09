import { View, StyleSheet, Text, SafeAreaView, useColorScheme, ScrollView, ActivityIndicator, RefreshControl} from "react-native";
import React,{useEffect, useState} from "react";
import { useAuth } from "../../../context/authContext";
import Card from "../../../components/Card";
import { COLORS } from "../../../constants";
import { StatusBar } from "expo-status-bar";
import axios from "axios";
import {API_URL} from "@env";

export default function home(){
    const {logout, userToken} = useAuth();
    const isLight = useColorScheme() === 'light';
    const [posts, setPosts] = useState(null);
    const [loading, setLoading] = useState(true);
    const [likes, setLikes] = useState(0);
    const [expanded, setExpanded] = useState(false);

    const handleLike = () => {
        setLikes(likes + 1);
    };

    const toggleExpanded = () => {
        setExpanded(!expanded);
    };

    const getPosts = async ()=>{
        try {
            const response = await axios.get(`${API_URL}/api/posts/`,{
                headers: {
                    "Authorization" : `Bearer ${userToken}`
                },
            });
            setPosts(response.data);
            setLoading(false)
        } catch (error) {
            console.log("error getPosts",error);
        }
    }

    useEffect(()=>{
        getPosts()
    },[])

    const onRefresh = () => {
        setLoading(true);
        getPosts();
    };

    if (loading) {
        return (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        );
    }

    return(
        <SafeAreaView style={[{flex:1},isLight ? {backgroundColor:COLORS.white}:{backgroundColor:COLORS.dark}]}>
            <StatusBar style={ isLight ? "dark": "light"} backgroundColor={ isLight ? "white" : "black"} />
            <ScrollView 
                contentContainerStyle={styles.scrollViewContent}
                refreshControl={<RefreshControl refreshing={loading} onRefresh={onRefresh} />}
                >
                <View style={styles.container}>
                    {posts.map(post=>{
                        return(
                            <Card
                                userId={post.userid}
                                userList={post.userlikes}
                                id={post.postid}
                                title={post.title}
                                username={post.firstname+" "+post.lastname}
                                date={post.createdAt}
                                subtitle={post.headline}
                                userProfileImage={`data:${post.mediatype};base64,${post.profilebase64}`}
                                contentImage={`data:${post.mediatype};base64,${post.base64}`}
                                content={post.description}
                                likes={post.likes}
                            />
                        )
                    })}
                    
                </View>
            </ScrollView>
            
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        alignItems:'center'
    },
    card: {
        marginVertical: 10,
        width: '100%',
    },
    date: {
     textAlign: 'right',
    },
        image: {
        marginTop: 10,
    },
    likeContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginTop: 10,
    },
    readMore: {
        color: 'blue',
        marginTop: 5,
        textDecorationLine: 'underline',
        alignSelf: 'flex-end',
    },
})