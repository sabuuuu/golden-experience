import React from "react";
import { StyleSheet,View,Text,Image} from 'react-native';

export default function Header() {
    return (
            <View style={styles.header}>

            </View>
    )
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: 20,
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        backgroundColor:'#d59f21'
    },
    headerText: {
        fontFamily:'Bol',
        fontSize: 16,
        color: 'black',
        marginBottom: 20,
        marginLeft:45,
    },
    image: {
        height:50,
        width:80,
        margin:10
    }
})