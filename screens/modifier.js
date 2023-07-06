import React ,{useState} from "react";
import { StyleSheet,View,Text,TouchableOpacity,ScrollView,Image,StatusBar,TextInput} from 'react-native';
import firebase from '../firebase';

export default function Modifier({ navigation }) {

    return (
        <View style={styles.container}>
            <StatusBar barStyle='dark-content' backgroundColor='#fffcf2'/>
            <ScrollView>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex:1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    });