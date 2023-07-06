import React,{useState, useEffect} from "react";
import { StyleSheet,View,Text,TouchableOpacity,ScrollView,Image} from 'react-native';
import { globalStyles  } from '../styles/global';
import { StatusBar } from "react-native";
import firebase from '../firebase';
import { SearchBar } from "react-native-elements";

export default function Home({ navigation }) {
    const [userData, setUserData] = useState([]);
    const handleReservation = () => {
        navigation.navigate('Reservation');
    };
    const handleDiscoverMenu = () => {
        navigation.navigate('Menu');
    };
    const user = firebase.auth().currentUser;
    //retrouver les infomations de l'utilisateur
    useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
          if (user) {
            // User is logged in, fetch user-specific data from Firestore
            const userRef = firebase.firestore().collection('utilisateur');
            userRef.where('email', '==', user.email)
              .get()
              .then((querySnapshot) => {
                const data = [];
                querySnapshot.forEach((doc) => {
                  data.push(doc.data());
                });
                setUserData(data);
              })
              .catch((error) => {
                console.log('Error fetching user data:', error);
              });
          } else {
            // User is not logged in, handle this case if needed
            console.log('User is not logged in');
          }
        });
      
        return unsubscribe; 
      }, []);

    return (
        <View style={styles.container}>
            <StatusBar barStyle='dark-content' backgroundColor='#fffcf2'/>
            <ScrollView>
            <View style={styles.hello}>
                {userData.map((user, index) => (
                    <React.Fragment key={index} >
                        <Text style={styles.titre}>Hello, {user.nom}!</Text>
                    </React.Fragment>
                ))}
                <Text style={styles.txt}>What do you want to eat today ?</Text>
            </View>
                <SearchBar  
                placeholder="Search here" 
                containerStyle={{backgroundColor: 'transparent', borderBottomWidth:0,borderTopWidth:0 }}
                inputContainerStyle={{backgroundColor: '#008080'}}
                placeholderTextColor={'#fffcf2'}
                round/>
                <View style={styles.icons}> 
                    <View style={styles.icon}>
                    <View style={styles.img}><Image source={require('../assets/1.png')} style={{width:25,height:25}} /></View>
                    <Text style={styles.iconText}>Entré</Text>
                    </View>

                    <View style={styles.icon}>
                    <View style={styles.img}><Image source={require('../assets/2.png')} style={{width:25,height:25}} /></View>
                    <Text style={styles.iconText}>Plat</Text>
                    </View>

                    <View style={styles.icon}>
                    <View style={styles.img}><Image source={require('../assets/3.png')} style={{width:25,height:25}} /></View>
                    <Text style={styles.iconText}>Dessert</Text>
                    </View>

                    <View style={styles.icon}>
                    <View style={styles.img}><Image source={require('../assets/4.png')} style={{width:29,height:25}} /></View>
                    <Text style={styles.iconText}>Boisson</Text>
                    </View>
                </View>
                <View style={styles.container2}>
                <View style={styles.grid}>
                <Text style={[styles.text,{alignSelf:'center',marginBottom:16,fontSize:18}]}>Check our most popular dishes!</Text>
                <View style={styles.row}>
                    <View style={[styles.item, styles.largeItem]}><Image source={require('../assets/d1.png')} style={{width:'100%',height:'100%',borderRadius:16}} /></View>
                </View>
                <View style={styles.row}>
                    <View style={styles.item}><Image source={require('../assets/d2.jpg')} style={{width:'100%',height:'100%',borderRadius:16}} /></View>
                    <View style={styles.item}><Image source={require('../assets/d3.png')} style={{width:'100%',height:'100%',borderRadius:16}} /></View>
                    <View style={styles.item}><Image source={require('../assets/d4.jpg')} style={{width:'100%',height:'100%',borderRadius:16}} /></View>
                </View>
                <View style={styles.row}>
                    <View style={styles.item}><Image source={require('../assets/d5.jpg')} style={{width:'100%',height:'100%',borderRadius:16}} /></View>
                    <View style={styles.item}><Image source={require('../assets/d6.png')} style={{width:'100%',height:'100%',borderRadius:16}} /></View>
                    <View style={styles.item}><Image source={require('../assets/d7.png')} style={{width:'100%',height:'100%',borderRadius:16}} /></View>
                </View>
            </View>
            <View style={styles.reserver}>
                <Text style={styles.titre2}>Réservez votre table en un instant!</Text>
                <Text style={styles.text}>Prenez une table facilement dans notre restaurant , un service exceptionnel vous attends.</Text>
                <TouchableOpacity style={styles.button} onPress={handleReservation}>
                    <Text style={globalStyles.buttonText}>Passer a l'action</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.menu}>
                    <Text style={styles.titre2}>Découvrez notre menu!</Text> 
                    <Text style={styles.text}>Jetez un coup d'oeil sur nos divers plats et bien plus..</Text>                       
                    <TouchableOpacity style={styles.button} onPress={handleDiscoverMenu}>
                        <Text style={globalStyles.buttonText}>Découvrir</Text>                     
                    </TouchableOpacity>
            </View>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'#d59f21',
    },
    container2: {
        flex:1,
        backgroundColor:'#fffcf2',
        width:'100%',
        height:'100%',
        marginTop:50,
        borderTopLeftRadius:60,
        borderTopRightRadius:60,
    },
    titre: {
        fontFamily: 'Bol',
        fontSize:26,
        color:'#fffcf2'
    },
    titre2:{
        fontFamily: 'Bol',
        fontSize:26,
        color:'black'  
    },
    text: {
      fontFamily: 'Reg',
       fontSize: 16,
      marginTop:20
    },
    button: {
        width: '100%',
        height: 48,
        marginVertical: 16,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#008080',
        borderRadius: 4,
        marginTop:25
    },
    reserver: {
        borderRadius:16,
        borderWidth: 1,
        borderColor: '#eed687',
        padding: 15,
        margin: 15,
        marginTop:30
    },
    menu: {
        borderRadius:16,
        borderWidth: 1,
        borderColor: '#eed687',
        padding: 15,
        margin: 15,
        marginTop:30,
    },
    hello: {
        margin:15,
        flex:1,
        alignItems:"flex-start",
        justifyContent:"flex-start"
    },
    txt:{
        fontFamily: 'Reg',
        fontSize: 15,
       marginTop:10,
       marginLeft:10,
       color:'#fffcf2'
    },
    icons:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        flexDirection:"row",
        marginTop:15
    },
    icon:{
        margin:15,
        alignContent:'center',
        justifyContent:'center',
    },
    img:{
        alignSelf:'center',
        borderWidth:1,
        borderRadius:10,
        borderColor:'#008080',
        padding:18,
        backgroundColor:'#008080',

    },
    iconText:{
        alignSelf:'center',
        fontFamily:'Reg',
        marginTop:8
    },
    grid: {
        flex: 1,
        padding: 16,
    },
    row: {
        flexDirection: 'row',
        marginBottom: 16,
      },
      item: {
        flex: 1,
        aspectRatio: 1,
        backgroundColor: '#ccc',
        marginRight: 16,
        borderRadius:16
      },
      largeItem: {
        flex: 2,
      },
})