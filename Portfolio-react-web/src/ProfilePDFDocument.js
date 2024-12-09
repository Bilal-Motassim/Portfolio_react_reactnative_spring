import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  container: {
    padding: 50,
    backgroundColor: '#f5f5f5'
  },
  header: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  headerContainer: {
    marginLeft: 45,
    flexGrow: 1,
  },
  name: {
    fontSize: 36,
    color: '#5a64ff',
  },
  image: {
    width: 130,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  section: {
    flexDirection: 'column',
    borderTop: '5 solid #5a64ff',
    paddingTop: 5,
    marginBottom: 10,
  },
  contentContainer: {
    marginLeft: 40, // Adjust this value to set the margin from the section header
  },
  educationItem: {
    marginBottom: 10,
  },
  educationContainer: {
    flexDirection: 'column',
  },
  educationContent: {
    width: '80%',
  },
  listItem: {
    marginBottom: 10,
  },
  boldText: {
    fontWeight: 'bold',
  }
});

const ProfilePDFDocument = ({ userData, profileImage, educations, experiences, skills }) => (
  <Document>
    <Page size="A4" style={styles.container}>
      <View style={styles.header}>
        <Image style={styles.image} src={profileImage} />
        <View style={styles.headerContainer}>
          <Text style={styles.name}>{userData.firstName} {userData.lastName}</Text>
          <Text>Email: {userData.email}</Text>
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionHeader}>About</Text>
        <View style={styles.contentContainer}>
          <Text>{userData.about}</Text>
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Skills</Text>
        <View style={styles.contentContainer}>
          {skills.map(skill => (
            <Text key={skill.id} style={styles.listItem}>• {skill.skill}</Text>
          ))}
        </View>
    </View>
      <View style={styles.section}>
        <Text style={styles.sectionHeader}>EDUCATION</Text>
        <View style={styles.contentContainer}>
        <View style={styles.educationContent}>
          {educations.map(edu => (
            <View key={edu.id} style={styles.educationItem}>
              <Text style={styles.boldText}>{edu.school}</Text>
              <Text>{edu.studyfield} {edu.startyear}-{edu.endyear}</Text>
            </View>
          ))}
        </View>
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionHeader}>WORK EXPERIENCE</Text>
        <View style={styles.educationContent}>
        <View style={styles.contentContainer}>
          {experiences.map(exp => (
            <View key={exp.id}>
              <Text style={styles.boldText}>{exp.title}</Text>
              <Text>{exp.company}</Text>
              <Text>{exp.startyear}- {exp.endmonth} {exp.endyear}</Text>
              <Text>{exp.description}</Text>
            </View>
          ))}
        </View>
        </View>
      </View>
    </Page>
  </Document>
);

export default ProfilePDFDocument;
