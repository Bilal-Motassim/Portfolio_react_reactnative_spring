import React, { useState } from 'react';
import { View, Text, StyleSheet, useColorScheme, Pressable, Alert } from 'react-native';
import { SIZES } from '../../constants';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';
import {API_URL} from "@env";

const Experiences = ({ currentUserId, id, experiences, openModal, onSave, token }) => {
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
      await axios.delete(
        `${API_URL}/api/experience/${id}`,
        { headers: {"Authorization" : `Bearer ${token}`}})
      onSave();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={[styles.container, isLight ? {backgroundColor:'#fff'}:{backgroundColor:'#000'}]}>
      <View style={styles.header}>
        <Text style={[styles.title,isLight ? {color:'#000'} : {color:'#fff'}]}>Experiences</Text>
        {id == currentUserId && 
          <Pressable onPress={()=> openModal()} style={{marginRight:10}}>
            <Entypo name="plus" size={24} color="black" />
          </Pressable>
        }
        
      </View>
      {experiences.map((experience, index) => (
        <View key={index} style={[styles.item,styles.header]}>
          <View>
            <Text style={[styles.role,isLight ? {color:'#000'} : {color:'#fff'}]}>{experience.title}</Text>
            <Text style={[styles.company,isLight ? {color:'#666'} : {color:'#bbb'}]}>{experience.company}</Text>
            {experience.location !== null && <Text style={[styles.company,isLight ? {color:'#666'} : {color:'#bbb'}]}>{experience.location}</Text>}
            <Text style={[styles.date,isLight ? {color:'#666'} : {color:'#bbb'}]}>
              {experience.startmonth} {experience.startyear} - {experience.currentwork ? 'Present':`${experience.endmonth} ${experience.endyear}`}
            </Text>
          </View>
          <Pressable onPress={()=>handleDelete(experience.id)}>
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
    padding:20,
  },
  title: {
    fontSize: SIZES.large,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  item: {
    marginBottom: 10,
  },
  role: {
    fontWeight: 'bold',
    fontSize:SIZES.medium
  },
  company: {
    color: '#666',
  },
  date: {
    color: '#666',
  },
  header:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
  }
});

export default Experiences;
