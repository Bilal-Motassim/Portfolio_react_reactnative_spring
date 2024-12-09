import { View, Text, StyleSheet, TouchableOpacity , Image} from 'react-native'
import React from 'react'
import { router } from 'expo-router'

const Comment = ({prop}) => {
  return (
    <View style={styles.card}>
        <TouchableOpacity style={styles.header} onPress={()=> router.push(`/user/${prop.userid}`)}>
            <Image source={{uri:`data:${prop.icontype};base64,${prop.iconBase64}`}} style={styles.profileImage} />
            <View>
                <Text style={styles.username}>{prop.firstname + " " + prop.lastname}</Text>
            </View>
        </TouchableOpacity>
        <Text style={styles.content}>{prop.content}</Text>
    </View>
  )
}

export default Comment

const styles = StyleSheet.create({
    card: {
      backgroundColor: '#fff',
      borderRadius: 8,
      padding: 20,
      marginBottom: 20,
      width:'100%'
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    profileImage: {
      width: 40,
      height: 40,
      borderRadius: 100,
      marginRight: 10,
    },
    username: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    content: {
        paddingLeft:35,
        fontSize: 16,
        lineHeight: 24,
        marginBottom: 10,
    }
  });