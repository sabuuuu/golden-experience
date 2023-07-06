import React , { useState,useEffect  }from "react";
import { StyleSheet, View, Text, TextInput, Image,TouchableOpacity ,Alert} from 'react-native';
import firebase from '../firebase';
import { globalStyles } from '../styles/global';
import { StatusBar } from "react-native";

export default function Inscription({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [num, setNum] = useState('');

    useEffect(() => {
      const unsubscribe = firebase.auth().onAuthStateChanged(user => {
        if (user) {
          navigation.replace('Home');
        }
      });
    
      return unsubscribe;
    }, [firebase, navigation]);

    const handleSignUp = async () => {
        if (password !== confirmPassword) {
          setError('Passwords do not match');
          return;
        }
        
      if (email === '' || password === '' || confirmPassword === '' || nom === '' || prenom === '' || num === '') {
        setError('veuillez remplire tout le formulaire avant de continuer');
      } else {
        try {
          await firebase.auth().createUserWithEmailAndPassword(email, password);

          const utilisateur = {
            nom,
            prenom,
            num: parseInt(num),
            email,
            password,
        }

        //mettre l'objet créé dans la base de données (firebase)
        firebase.firestore().collection('utilisateur').add(utilisateur).then(() => {
            console.log('booking ajouté', utilisateur);
            Alert.alert('Inscription réussi!');
        }).catch((error) => {
            console.log('erreur lors de lajout');
            setError("Une erreur est parvenu lors de votre inscription");
        });
          navigation.goBack()
        } catch (error) {
          setError(error.message);
        }
      }
    };
  return (
    <View style={styles.container}>
                  <StatusBar barStyle='dark-content' backgroundColor='#fffcf2'/>
        <Image source={require('../assets/logo.png')} style={{width:'30%',height:'10%',marginBottom:20}} />
      <Text style={globalStyles.titleText}>Inscription</Text>
      
        <Text style={globalStyles.text}>Nom:</Text>
        <TextInput placeholder="Nom" value={nom} onChangeText={setNom}  style={globalStyles.input} />
        <Text style={globalStyles.text}>Prenom:</Text>
        <TextInput placeholder="Prenom" value={prenom} onChangeText={setPrenom} style={globalStyles.input} />
        <Text style={globalStyles.text}>Numéro de tel:</Text>      
        <TextInput placeholder="Tél" value={num} onChangeText={setNum} keyboardType="numeric" style={globalStyles.input} />      
        <Text style={globalStyles.text}>Email:</Text>      
        <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={globalStyles.input} />
        <Text style={globalStyles.text}>Password:</Text>
        <TextInput placeholder="Password" secureTextEntry={true} value={password} onChangeText={setPassword} style={globalStyles.input}/>
        <Text style={globalStyles.text}>Confirm Password:</Text>
        <TextInput placeholder="Confirm password" secureTextEntry={true} value={confirmPassword} onChangeText={setConfirmPassword} style={globalStyles.input}/>
        {error !== '' && <Text style={styles.errorText}>{error}</Text>}
        <TouchableOpacity style={globalStyles.button} onPress={handleSignUp}>
            <Text style={globalStyles.buttonText}>S'inscrire</Text>
      </TouchableOpacity>
      </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#fffcf2'
    },
  errorText: {
    fontFamily: 'Bol',
    fontSize: 12,
    marginTop: 10,
    color :'red'
  }
});