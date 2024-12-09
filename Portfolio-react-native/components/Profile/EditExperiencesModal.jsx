import React, { useState } from 'react';
import { Modal, View, Text, TextInput, Button, StyleSheet, useColorScheme, Alert, ActivityIndicator } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { Checkbox } from 'react-native-paper';
import { COLORS, FONT, SIZES } from '../../constants';
import CustomButton from '../CustomButton';
import axios from 'axios';
import {API_URL} from "@env";

const EditExperiencesModal = ({ visible, onClose, onSave, user, token }) => {
  const [title, setTitle] = useState(null);
  const [loading, setLoading] = useState(false);
  const [company, setCompany] = useState(null);
  const [location, setLocation] = useState(null);
  const [isCurrentlyWorking, setIsCurrentlyWorking] = useState(true);
  const [startMonth, setStartMonth] = useState(null);
  const [startYear, setStartYear] = useState(null);
  const [endMonth, setEndMonth] = useState(null);
  const [endYear, setEndYear] = useState(null);
  const isLight = useColorScheme() === 'light';

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const years = [
    '2024', '2023', '2022', '2021', '2020', '2019', '2018', '2017', '2016', '2015',
    '2014', '2013', '2012', '2011', '2010', '2009', '2008', '2007', '2006', '2005',
    '2004', '2003', '2002', '2001'
  ];

  const handleSave = async () => {
    if(title == null || company == null || startMonth == null || startYear == null){
      Alert.alert("the title, company, start month and start year are required !!");
      return
    }
    if (!isCurrentlyWorking && endYear < startYear || (endYear === startYear && endMonth < startMonth)) {
      Alert.alert('End date is earlier than start date.');
      return
    }
    try {
      setLoading(true);
      await axios.post(
        `${API_URL}/api/experience/${user.id}`,
        {
          "title": title,
          "company": company,
          "location": location,
          "startmonth": startMonth,
          "startyear": startYear,
          "endmonth": endMonth,
          "endyear": endYear,
          "currentwork": isCurrentlyWorking
        },
        { headers: {"Authorization" : `Bearer ${token}`}});
      setLoading(false);
      clearFields();
      onSave();
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  const clearFields = ()=>{
    setTitle(null);
    setCompany(null);
    setStartMonth(null);
    setStartYear(null);
    setEndMonth(null);
    setEndYear(null);
    setIsCurrentlyWorking(true);
    setLocation(null);
  }

  const handleCancel = ()=>{
    clearFields();
    onClose();
  }

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalContainer}>
      {loading ? 
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View> :
        <View style={[styles.modalContent, isLight ? {backgroundColor: 'white'}:{backgroundColor:COLORS.dark}]}>
          <Text style={{fontFamily:FONT.bold,fontSize:SIZES.xLarge,color:isLight? '#000' :'#fff'}}>Add Experience</Text>
          <TextInput
            style={[styles.input, isLight ? 
              {borderColor: '#ccc',color:'black'}:{borderColor:'#fff',color:'white'}]}
            value={title}
            onChangeText={setTitle}
            placeholder="Title *"
          />
          <TextInput
            style={[styles.input, isLight ? 
              {borderColor: '#ccc',color:'black'}:{borderColor:'#fff',color:'white'}]}
            value={company}
            onChangeText={setCompany}
            placeholder="Company *"
          />
          <TextInput
            style={[styles.input, isLight ? 
              {borderColor: '#ccc',color:'black'}:{borderColor:'#fff',color:'white'}]}
            value={location}
            onChangeText={setLocation}
            placeholder="Location"
          />
          <View style={styles.container}>
            <Text style={styles.label}>Select Month and Year:</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={startMonth}
                onValueChange={item => setStartMonth(item)}
                style={styles.picker}
              >
                <Picker.Item key={0} label='Month' value={null} />
                {months.map((month, index) => (
                  <Picker.Item key={index} label={month} value={month} />
                ))}
              </Picker>
              <Picker
                selectedValue={startYear}
                onValueChange={item => setStartYear(item)}
                style={styles.picker}
              >
                <Picker.Item key={0} label='Year' value={null} />
                {years.map((year, index) => (
                  <Picker.Item key={index} label={year} value={year} />
                ))}
              </Picker>
            </View>
            <View style={styles.checkboxContainer}>
              <Checkbox
                color={COLORS.primary}
                status={isCurrentlyWorking ? 'checked' : 'unchecked'}
                onPress={()=> setIsCurrentlyWorking(!isCurrentlyWorking)}
              />
              <Text style={styles.checkboxLabel}>Currently Working</Text>
            </View>
            {!isCurrentlyWorking && (
              <View style={styles.pickerContainer}>
                <Text style={styles.label}>End Date:</Text>
                <Picker
                  selectedValue={endMonth}
                  onValueChange={(itemValue) => setEndMonth(itemValue)}
                  style={styles.picker}
                >
                  <Picker.Item label='Month' value={null} />
                  {months.map((month, index) => (
                    <Picker.Item key={index} label={month} value={month} />
                  ))}
                </Picker>
                <Picker
                  selectedValue={endYear}
                  onValueChange={(itemValue) => setEndYear(itemValue)}
                  style={styles.picker}
                >
                  <Picker.Item key={0} label='Year' value={null} />
                  {years.map((year, index) => (
                    <Picker.Item key={index} label={year} value={year} />
                  ))}
                </Picker>
              </View>
            )}
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
              onPress={handleCancel}
            />
          </View>
        </View>}
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
  label: {
    fontSize: 16,
    fontFamily:FONT.regular,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginVertical: 10,
  },
  pickerContainer: {
    flexDirection: 'row',
  },
  picker: {
    flex: 1,
    height: 50,
    marginBottom: 20,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkboxLabel: {
    marginLeft: 8,
    fontSize: 16,
    fontFamily:FONT.regular
  },
  endDateContainer: {
    alignItems: 'center',
  },
  endDateLabel: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default EditExperiencesModal;
