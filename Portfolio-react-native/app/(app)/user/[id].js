import { Stack, useLocalSearchParams, Link } from 'expo-router';
import { Text, View, StyleSheet, ScrollView, Button, useColorScheme, ActivityIndicator, Pressable  } from 'react-native';
import ProfileHeader from '../../../components/Profile/ProfileHeader';
import Experiences from '../../../components/Profile/Experiences';
import Education from '../../../components/Profile/Education';
import Skills from '../../../components/Profile/Skills';
import RecentPosts from '../../../components/Profile/RecentPosts';
import {COLORS, FONT } from '../../../constants';
import { useEffect, useState } from 'react';
import EditProfileModal from '../../../components/Profile/EditProfileModal';
import EditExperiencesModal from '../../../components/Profile/EditExperiencesModal';
import EditEducationModal from '../../../components/Profile/EditEducationModal';
import EditSkillsModal from '../../../components/Profile/EditSkillsModal';
import axios from 'axios';
import { useAuth } from '../../../context/authContext';
import {API_URL} from "@env";
import { Feather } from '@expo/vector-icons';
import GenerateCV from '../../../components/GenerateCV';

export default function Page() {
  const { id } = useLocalSearchParams();
  const isLight = useColorScheme() === 'light';
  const {userToken, user} = useAuth();
  const [userPi, setUser] = useState(null);
  const [profilePic, setProfilePic] = useState(null);
  const [bannerPic, setBannerPic] = useState(null);
  const [loading, setLoading] = useState(true);

  const [isEditProfileModalVisible, setEditProfileModalVisible] = useState(false);
  const [isEditExperienceModalVisible, setEditExperiencModalVisible] = useState(false);
  const [isEditEducationModalVisible, setEditEducationModalVisible] = useState(false);
  const [isEditSkillsModalVisible, setEditSkillsModalVisible] = useState(false);
  
  useEffect(()=>{
    fetchUserDetails();
  },[id])

  const fetchUserDetails = async () => {
    try {
      //*get userPi information
      let response = await axios.get(
        `${API_URL}/api/users/${id}`,
        { headers: {"Authorization" : `Bearer ${userToken}`}})
      setUser(response.data)
      //*get userPi profile picture
      let imageResponse =  await axios.get(`${API_URL}/api/users/profilepicbase64/${id}`, {
        headers: {
          'Content-Type': 'multipart/form-data',
          "Authorization" : `Bearer ${userToken}`
        },
      });
      setProfilePic(imageResponse.data.base64);

      //*get userPi banner picture
      let bannerResponse =  await axios.get(`${API_URL}/api/users/backgroundpicbase64/${id}`, {
        headers: {
          'Content-Type': 'multipart/form-data',
          "Authorization" : `Bearer ${userToken}`
        },
      });
      setBannerPic(bannerResponse.data.base64);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching userPi details:', error);
    }
  }
  
  const handleEditProfile = () => {
    setEditProfileModalVisible(true);
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={[styles.container, isLight ? {backgroundColor: "#efefef"}:{backgroundColor:COLORS.dark}]}>
      <Stack.Screen
            options={{
                title: 'Profile Info',
                headerStyle: isLight ? { backgroundColor: '#fff' } : {backgroundColor:'#000'},
                headerTintColor: isLight ? '#000' : '#fff',
                headerTitleStyle: {fontWeight: 'bold',},
                headerRight:() => id == user.id && <Pressable onPress={handleEditProfile} style={{marginRight:10}}><Feather name="edit-2" size={24} color="black" /></Pressable>
            }}
        />
      <ScrollView 
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        
        <ProfileHeader handleEditProfile={handleEditProfile} bannerPic={bannerPic} profilePic={profilePic} user={userPi} />
        <Experiences
          id={id}
          currentUserId={user.id}
          openModal={()=> setEditExperiencModalVisible(true)} 
          experiences={userPi.experienceList}
          onSave={()=> fetchUserDetails()} 
          token={userToken}
        />
        <Education
          id={id}
          currentUserId={user.id}
          token={userToken} 
          onSave={()=> fetchUserDetails()} 
          openModal={()=> setEditEducationModalVisible(true)} 
          education={userPi.educationSet}
        />
        <Skills 
          id={id}
          currentUserId={user.id} 
          openModal={()=> setEditSkillsModalVisible(true)} 
          skills={userPi.skillList} 
        />
        {/*<RecentPosts posts={userPi.recentPosts} />*/}
        <GenerateCV pic={profilePic} data={userPi}/>
        <EditProfileModal
          token={userToken}
          bannerPic={bannerPic} 
          profilePic={profilePic}
          visible={isEditProfileModalVisible}
          onClose={()=> setEditProfileModalVisible(false)}
          user={userPi}
          onSave={()=> fetchUserDetails()}
        />
        <EditExperiencesModal
            token={userToken}
            user={userPi}
            visible={isEditExperienceModalVisible}
            onSave={()=> fetchUserDetails()}
            onClose={()=> setEditExperiencModalVisible(false)}
          />
        <EditEducationModal
            token={userToken}
            user={userPi}
            visible={isEditEducationModalVisible}
            onSave={()=> fetchUserDetails()}
            onClose={()=> setEditEducationModalVisible(false)}
          />
        <EditSkillsModal
          token={userToken}
          userSkills={userPi.skillList}
          id={userPi.id}
          visible={isEditSkillsModalVisible}
          onSave={()=> fetchUserDetails()}
          onClose={()=> setEditSkillsModalVisible(false)}
        />
      </ScrollView>
    </View>
 );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: 50,
    height: 50,
  },
});