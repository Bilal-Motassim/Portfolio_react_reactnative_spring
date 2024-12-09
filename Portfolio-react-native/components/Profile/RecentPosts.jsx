import React from 'react';
import { View, Text, ScrollView, StyleSheet, Image, useColorScheme } from 'react-native';
import { COLORS } from '../../constants';

const RecentPosts = ({ posts }) => {
  const isLight = useColorScheme() === 'light';

  return (
    <View style={[styles.container,isLight ? {backgroundColor:'#fff'}:{backgroundColor:'#000'}]}>
      <Text style={[styles.title,isLight ? {color:'#000'} : {color:'#fff'}]}>Recent Posts</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {posts.map((post, index) => (
          <View key={index} style={[styles.postItem , !isLight && {backgroundColor:'#252525'}]}>
            <Image source={{ uri: post.image }} style={styles.postImage} />
            <View style={{paddingHorizontal:15, paddingVertical:10}}>
              <Text style={[styles.postTitle,isLight ? {color:'#000'} : {color:'#fff'}]}>{post.title}</Text>
              <Text style={isLight ? {color:'#666'} : {color:'#bbb'}}>{post.content}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    padding:20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  postItem: {
    marginRight: 10,
    width: 200, 
  },
  postImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
    marginBottom: 5,
  },
  postTitle: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
});

export default RecentPosts;
