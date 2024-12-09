import React, { useState } from 'react';
import { Modal, View, Text, TextInput, StyleSheet, useColorScheme, Alert, ActivityIndicator } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { Checkbox } from 'react-native-paper';
import { COLORS, FONT, SIZES } from '../../constants';
import CustomButton from '../CustomButton';
import axios from 'axios';
import {API_URL} from "@env";

const EditEducationModal = ({ visible, onClose,onSave, user, token }) => {
    const isLight = useColorScheme() === 'light';
    const [school, setSchool] = useState(null);
    const [loading, setLoading] = useState(false);
    const [degree, setDegree] = useState(null);
    const [studyfield, setStudyfield] = useState(null);
    const [grade, setGrade] = useState(null);
    const [startDateMonth, setStartDateMonth] = useState(null);
    const [startDateYear, setStartDateYear] = useState(null);
    const [isCurrentEducation, setIsCurrentEducation] = useState(true);
    const [endDateMonth, setEndDateMonth] = useState(null);
    const [endDateYear, setEndDateYear] = useState(null);

    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const educationYears = [
      '2024', '2023','2022', '2021', '2020', '2019', '2018', '2017', '2016', '2015', '2014', '2013',
      '2012', '2011', '2010', '2009', '2008', '2007', '2006', '2005', '2004', '2003',
      '2002', '2001'
    ];

    const handleSave = async () => {
      try {
        if(school == null || startDateMonth == null || startDateYear == null){
          Alert.alert("School , start month, start year are required !!")
          return
        }
        if (!isCurrentEducation && endDateYear < startDateYear || (endDateYear === startDateYear && endDateMonth < startDateMonth)) {
          Alert.alert('End date is earlier than start date.');
          return
        }
        setLoading(true);
        const response = await axios.post(
          `${API_URL}/api/education/${user.id}`,
          {
            "school": school,
            "degree": degree,
            "studyfield": studyfield,
            "startmonth": startDateMonth,
            "startyear": startDateYear,
            "endmonth": endDateMonth,
            "endyear": endDateYear,
            "grade": grade
          },
          { headers: {"Authorization" : `Bearer ${token}`}});
          setLoading(false);
          onSave();
          onClose();
      } catch (error) {
        console.log(error);
      }
    };
  
    const clearFields =() =>{
      setSchool(null);
      setDegree(null)
      setStudyfield(null);
      setStartDateMonth(null)
      setStartDateYear(null);
      setEndDateMonth(null);
      setEndDateYear(null);
      setIsCurrentEducation(true);
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
            <View style={styles.container}>
                <Text style={{fontFamily:FONT.bold,fontSize:SIZES.xLarge,color:isLight? '#000' :'#fff'}}>Add Education</Text>
                <TextInput
                    value={school}
                    onChangeText={setSchool}
                    placeholder="School Name *"
                    style={styles.input}
                />
                <TextInput
                    value={degree}
                    onChangeText={setDegree}
                    placeholder="Degree"
                    style={styles.input}
                />
                <TextInput
                    value={studyfield}
                    onChangeText={setStudyfield}
                    placeholder="Study field"
                    style={styles.input}
                />
                <TextInput
                    value={grade}
                    onChangeText={setGrade}
                    placeholder="Grade"
                    style={styles.input}
                />
                <Text style={styles.label}>Start Date:</Text>
                <View style={styles.pickerContainer}>
                    <Picker
                        selectedValue={startDateMonth}
                        onValueChange={(itemValue) => setStartDateMonth(itemValue)}
                        style={styles.picker}
                    >
                    <Picker.Item key={0} label='Month' value={null} />
                    {months.map((month, index) => (
                        <Picker.Item key={index} label={month} value={month} />
                    ))}
                    </Picker>
                    <Picker
                        selectedValue={startDateYear}
                        onValueChange={(itemValue) => setStartDateYear(itemValue)}
                        style={styles.picker}
                    >
                      <Picker.Item key={0} label='Year' value={null} />
                    {educationYears.map((year, index) => (
                        <Picker.Item key={index} label={year} value={year} />
                    ))}
                    </Picker>
                </View>
                <View style={styles.checkboxContainer}>
                    <Checkbox
                        color={COLORS.primary}
                        status={isCurrentEducation ? 'checked' : 'unchecked'}
                        onPress={()=>setIsCurrentEducation(!isCurrentEducation)}
                    />
                    <Text style={styles.checkboxLabel}>Currently Pursuing</Text>
                </View>
                {!isCurrentEducation && (
                    <View>
                    <Text style={styles.label}>End Date:</Text>
                    <View style={styles.pickerContainer}>
                        <Picker
                            selectedValue={endDateMonth}
                            onValueChange={(itemValue) => setEndDateMonth(itemValue)}
                            style={styles.picker}
                        >
                        <Picker.Item key={0} label='Month' value={null} />
                        {months.map((month, index) => (
                            <Picker.Item key={index} label={month} value={month} />
                        ))}
                        </Picker>
                        <Picker
                            selectedValue={endDateYear}
                            onValueChange={(itemValue) => setEndDateYear(itemValue)}
                            style={styles.picker}
                        >
                        <Picker.Item key={0} label='Year' value={null} />
                        {educationYears.map((year, index) => (
                            <Picker.Item key={index} label={year} value={year} />
                        ))}
                        </Picker>
                    </View>
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
  endDateLabel: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default EditEducationModal;
