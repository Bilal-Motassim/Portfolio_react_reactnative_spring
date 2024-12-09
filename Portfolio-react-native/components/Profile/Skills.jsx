import React from 'react';
import { View, Text, StyleSheet, useColorScheme, Pressable } from 'react-native';
import { Entypo } from '@expo/vector-icons';

const Skills = ({ id, currentUserId, skills ,openModal }) => {
  const isLight = useColorScheme() === 'light';

  return (
    <View style={[styles.container,isLight ? {backgroundColor:'#fff'}:{backgroundColor:'#000'}]}>
      <View style={styles.header}>
        <Text style={[styles.title,isLight ? {color:'#000'} : {color:'#fff'}]}>Skills</Text>
        {id == currentUserId &&
          <Pressable Pressable onPress={()=> openModal()} style={{marginRight:10}}>
            <Entypo name="plus" size={24} color="black" />
          </Pressable>
        }
      </View>
      <View style={styles.skillList}>
        {skills?.map((skill) => (
          <Text key={skill.id}
            style={[styles.skillItem,
              isLight ? {color:'#000',backgroundColor: '#eee'} : {color:'#fff',backgroundColor: '#252525'}]}>
            {skill.skill}
          </Text>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    backgroundColor:'#fff',
    padding:20,
  },header:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  skillList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  skillItem: {
    padding: 5,
    marginRight: 10,
    marginBottom: 10,
  },
});

export default Skills;
