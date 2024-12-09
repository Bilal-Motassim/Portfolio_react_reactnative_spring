import React, { useState } from 'react';
import { Modal, View, Text, TextInput, StyleSheet, useColorScheme,Button } from 'react-native';
import { COLORS, FONT, SIZES } from '../../constants';
import CustomButton from '../CustomButton';
import { Chip } from 'react-native-paper';
import axios from 'axios';
import {API_URL} from "@env";

const EditSkillsModal = ({ token, id, onSave, visible, onClose, userSkills }) => {
    const isLight = useColorScheme() === 'light';
    const [skillInput, setSkillInput] = useState('');
    const [skills, setSkills] = useState(userSkills);
  
    const handleAddSkill = async () => {
      if (skillInput.trim() !== '') {
        try {
          const response = await axios.post(
            `${API_URL}/api/skill/${id}`,
            {"skill":skillInput.trim()},
            { headers: {"Authorization" : `Bearer ${token}`}})
          let tempId = Math.random();
          setSkills([...skills, {"skill":skillInput ,"id":tempId}]);
          setSkillInput('');
        } catch (error) {
          console.log(error);
        }
      }
    };
  
    const handleRemoveSkill = async (id) => {
      await axios.delete(`${API_URL}/api/skill/${id}`,{ headers: {"Authorization" : `Bearer ${token}`}})
      console.log(id);
      const updatedSkills = skills.filter((s) => s.id !== id);
      setSkills(updatedSkills);
    };

    const handleSave = () => {
      onSave();
      onClose();
    }

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalContainer}>
        <View style={[styles.modalContent, isLight ? {backgroundColor: 'white'}:{backgroundColor:COLORS.dark}]}>
            <View>
                <Text style={styles.title}>Skills:</Text>
                <View style={styles.skillsContainer}>
                    {skills.map((sk) => (
                    <Chip key={sk.id} style={styles.chip} onClose={() => handleRemoveSkill(sk.id)}>
                        {sk.skill}
                    </Chip>
                    ))}
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                    value={skillInput}
                    onChangeText={setSkillInput}
                    placeholder="Add Skill"
                    style={styles.input}
                    />
                    <Button title="Add" onPress={handleAddSkill} />
                </View>
            </View>
            <View style={{display:'flex',flexDirection:'row',justifyContent:'center'}}>
                <CustomButton 
                style={{width:150,alignSelf:'center',marginBottom:20,marginRight:25}} 
                title="Save" 
                onPress={handleSave} 
                />
                <CustomButton 
                style={{width:150,alignSelf:'center',marginBottom:20}} 
                title="Cancel"
                onPress={onClose}
                />
            </View>
        </View>
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
  title: {
    fontSize: SIZES.xLarge,
    fontFamily: FONT.bold,
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginRight: 10,
  },
  skillsContainer: {
    marginBottom:20,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 4,
  },
});

export default EditSkillsModal;
