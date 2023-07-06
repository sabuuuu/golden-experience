import React from "react";
import { StyleSheet,View,Text,ScrollView,Image} from 'react-native';
import MapView,{Marker} from "react-native-maps"; 
import { StatusBar } from "react-native";
    
export default function About() {
    return (
        <View style={styles.container}>
            <StatusBar barStyle='dark-content' backgroundColor='#d59f21'/>
            <ScrollView>
            <Text style={styles.title}>A Propos de nous!</Text>
            <View style={styles.container2}>
            <MapView style={styles.map}
                initialRegion={{
                    latitude: 36.75040495074807, 
                    longitude: 5.040788450890531,
                    latitudeDelta: 0.02,
                    longitudeDelta: 0.02,
                }}>
                <Marker
                    coordinate={{ latitude: 36.75040495074807, longitude: 5.040788450890531 }}
                    title="Ou on se situe"
                    description="Restaurant Golden Experience,Bejaia"
                />
            </MapView>
            {/* <View   >
            <Image source={require('../assets/map.png')} style={{width:'100%',height:'100%'}} />
            </View> */}
            <Text style={styles.sousTitle}>Adresse</Text>
            <Text style={styles.text}>Q22R+486, Route 667,Restaurant Golden Experience.</Text>
                
            <Text style={styles.sousTitle}>Téléphone</Text>
            <Text style={styles.text}>0774 23 20 55 / 0680 65 90 06</Text>

            <Text style={styles.sousTitle}>Détails sur notre Restaurant</Text>
            
            <Text style={styles.text}>Bienvenue au restaurant Golden Experience, où l'excellence culinaire rencontre un service exceptionnel. 
        Nous sommes fiers d'offrir à nos clients une expérience gastronomique unique et inoubliable.</Text>
            <Text style={styles.description}>Notre talentueuse équipe de chefs cuisiniers prépare des plats alléchants en utilisant les ingrédients les plus frais et les plus raffinés,
        pour que chaque assiette soit un chef-d'œuvre de saveurs. Des entrées savoureuses aux plats principaux délicieux et aux desserts délectables, notre menu est conçu pour satisfaire les palais les plus exigeants.</Text>
            <Text style={styles.descr}>Au restaurant Golden Experience, nous pensons que le repas n'est pas qu'une question de nourriture , il s'agit de créer des souvenirs durables. 
       Notre ambiance chaleureuse et accueillante, notre personnel attentif et notre souci du détail font de chaque visite une occasion spéciale. </Text>                
            </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'#d59f21',
    },
    container2:{
        flex:1,
        alignItems:'flex-start',
        justifyContent:'center',
        backgroundColor:'#fffcf2',
        width:'100%',
        height:'100%',
        marginTop:30,
        borderTopLeftRadius:60,
        borderTopRightRadius:60,
    },
    title: {
        fontFamily: 'Bol',
        fontSize: 26,
        marginTop:30,
        color:'#fffcf2',
        alignSelf:'center',
        paddingBottom:20
    },
    map: {
        width:'80%',
        height: 300,
        margin:20,
        borderRadius:50,
        alignSelf:'center'
    },
    sousTitle: {
        fontFamily: 'Bol',
        fontSize: 18,
        marginLeft:20
    },
    text: {
        fontFamily: 'Reg',
        marginLeft:20,
        marginTop: 15,
        marginBottom:20
    },
    description: {
        fontFamily: 'Reg',
        marginLeft: 20,
        marginTop:5
    },
    descr: {
        fontFamily: 'Reg',
        marginLeft: 20,
        marginTop: 5,
        marginBottom:20
    }
});