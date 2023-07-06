import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet ,Image,TouchableOpacity,ScrollView} from 'react-native';
import firebase from '../firebase';
import { StatusBar } from 'react-native';
import { globalStyles } from '../styles/global';

export default function Profile({navigation}) {
  const [userData, setUserData] = useState([]);
  const [userBooking, setUserBooking] = useState([]);
  const [isAuth, setIsAuth] = useState(true);
  const user = firebase.auth().currentUser;

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

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is logged in, fetch user-specific data from Firestore
        const userRef = firebase.firestore().collection('bookings');
        const query = userRef.where('email', '==', user.email);
  
        const unsubscribeSnapshot = query.onSnapshot((snapshot) => {
          const data = [];
          snapshot.forEach((doc) => {
            data.push(doc.data());
          });
          setUserBooking(data);
        });
  
        return () => {
          // Clean up the listener when the component unmounts
          unsubscribeSnapshot();
        };
      } else {
        // User is not logged in, handle this case if needed
        console.log('User is not logged in');
      }
    });
  
    return unsubscribe;
  }, []);

  const modifierPro = () => {
    navigation.navigate('ModifierPro');
};

  const handleLogout = () => {
    firebase.auth().signOut().then(() => {
      // User has been logged out successfully
      console.log('User logged out successfully');
      navigation.replace('Home')
    }).catch((error) => {
      // An error occurred while logging out
      console.log('Error logging out:', error);
    });
}
  return (
  <View style={styles.container}>
    <StatusBar barStyle='dark-content' backgroundColor='#d59f21'/>   
    <Text style={styles.title}>Profile</Text> 
    <ScrollView>
    <View style={styles.container2}>
    <View>
      <Image source={require('../assets/profile.jpg')} style={{width:130,height:130,marginBottom:15, borderRadius:70,alignSelf:'center'}} />
      {userData.map((user, index) => (
    <React.Fragment key={index} >
      <Text style={styles.username}>{user.nom} {user.prenom}</Text>
    </React.Fragment>
      ))}
            <TouchableOpacity style={styles.bookButton} onPress={modifierPro}>
                    <Text style={[globalStyles.buttonText,{fontSize:10}]}>modifier votre profile</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.Button} onPress={handleLogout}>
                    <Text style={[globalStyles.buttonText,{fontSize:10}]}>Log out</Text>
                </TouchableOpacity>
    </View>

    <View style={styles.booking}>
      <Text style={styles.sousTitre}>Mes réservations</Text>
      <View style={styles.book}>
      {userBooking.map((user, index) => (
    <React.Fragment key={index} >
      <Text style={styles.bookings}>Day: {user.date} Hour: {user.time} Guests: {user.guests}</Text>
    </React.Fragment>
      ))}
      </View>
    </View>
    </View>
    </ScrollView>
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor:'#d59f21',
  },
  container2:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'#fffcf2',
    width:'93%',
    height:'110%',
    marginTop:50,
    borderTopLeftRadius:60,
    borderTopRightRadius:60,
    padding:20,
  },
  username:{
    fontFamily: 'Bol',
    fontSize: 24,
    alignSelf:'center'
  },
  title:{
    fontFamily: 'Bol',
    fontSize: 26,
    marginTop:30,
    color:'#fffcf2'
  },
  booking:{
    borderRadius:60,
    borderWidth: 1,
    borderColor: '#c69214',
    padding: 15,
    margin: 15,
    marginTop:30,
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width:'110%',
    borderBottomWidth:0,
    borderBottomEndRadius:1,
    borderBottomLeftRadius:1,
  },
  sousTitre:{
    fontFamily: 'Bol',
    fontSize:24,
    marginBottom:40
  },
  bookings:{
    fontFamily: 'Reg',
    fontSize: 20,
    marginBottom:15,
    borderBottomColor:16,
    borderWidth:1,
    padding:15,
    borderRadius:10,
    borderColor:'#d59f21',
    borderBottomWidth:2
  },
  bookButton: {
    width: 180,
    height: 38,
    marginVertical: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#008080',
    borderRadius: 16,
    marginBottom:10
},
book:{
  flex:1,
},
Button:{
  width: 180,
  height: 38,
  marginVertical: 16,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#e05624',
  borderRadius: 16,
  marginBottom:20
}
});