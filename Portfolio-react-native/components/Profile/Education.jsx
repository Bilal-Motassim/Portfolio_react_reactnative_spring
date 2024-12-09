import React from 'react';
import { View, Text, StyleSheet ,useColorScheme, Pressable, Alert} from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';
import {API_URL} from "@env";

const Education = ({onSave,id, currentUserId, education, openModal, token }) => {
  const isLight = useColorScheme() === 'light';

  const handleDelete = async (id)=>{
    Alert.alert(
      'Confirm Deletion',
      'Are you sure you want to delete?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => {
            deleteItem(id);
          },
          style: 'destructive',
        },
      ],
      { cancelable: false }
    );
  }

  const deleteItem = async (id)=>{
    try {
      let response = await axios.delete(
        `${API_URL}/api/education/${id}`,
        { headers: {"Authorization" : `Bearer ${token}`}})
      onSave();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={[styles.container,isLight ? {backgroundColor:'#fff'}:{backgroundColor:'#000'}]}>
      <View style={styles.header}>
        <Text style={[styles.title,isLight ? {color:'#000'} : {color:'#fff'}]}>Education</Text>
        {id == currentUserId && 
          <Pressable onPress={()=> openModal()} style={{marginRight:10}}>
            <Entypo name="plus" size={24} color="black" />
          </Pressable>
        }
      </View>
      {education.length==0 &&<Text>No education</Text>}
      {education?.map((edu, index) => (
        <View key={index} style={styles.header}>
          <View style={styles.item}>
            <Text style={[styles.degree,isLight ? {color:'#000'} : {color:'#fff'}]}>{edu.school}</Text>
            {edu.degree !== null && <Text style={[styles.institution,isLight ? {color:'#000'} : {color:'#fff'}]}>{edu.degree}</Text>}
            {edu.grade !== null && <Text style={[styles.institution,isLight ? {color:'#000'} : {color:'#fff'}]}>{edu.grade}</Text>}
            {edu.studyfield !== null && <Text style={[styles.institution,isLight ? {color:'#666'} : {color:'#bbb'}]}>{edu.studyfield}</Text>}
            <Text style={[styles.date,isLight ? {color:'#666'} : {color:'#bbb'}]}>{edu.startmonth} {edu.startyear} - {edu.endmonth !== null ? `${edu.endmonth} ${edu.endyear}` :'Present'}</Text>
          </View>
          <Pressable onPress={()=>handleDelete(edu.id)}>
            <MaterialIcons name="cancel" size={24} color="black" style={{marginRight:10}}/>
          </Pressable>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    backgroundColor:'#fff',
    padding:20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  item: {
    marginBottom: 10,
  },
  degree: {
    fontWeight: 'bold',
  },
  header:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
  }
});

export default Education;
