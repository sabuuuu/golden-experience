import React ,{useState} from "react";
import { StyleSheet,View,Text,TouchableOpacity,ScrollView,Image,StatusBar,TextInput,Alert} from 'react-native';
import firebase from '../firebase';
import * as ImagePicker from 'expo-image-picker'; 
import { globalStyles } from '../styles/global';


export default function Admin({ navigation }) {
    const [selectImage,setSelectImage]=useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const menuItemsRef = firebase.firestore().collection('menu');
  
    const [day1, setDay1] = useState('');
    const [day2, setDay2] = useState('');
    const [day3, setDay3] = useState('');
    const [day4, setDay4] = useState('');

    const imagePicker = async ()=>{
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      console.log(result);
      if (!result.canceled) {
        setSelectImage(result.assets[0].uri);
      }
    }
    const modifier=()=>{
        navigation.navigate('Modifier')
    }
    const uploadImage = async () => {
            const response = await fetch(selectImage);
            const blob = await response.blob();
            const filename = name;
            var ref = firebase.storage().ref().child(`menu/${filename}`).put(blob);
            try{
                await ref;
            }catch(e){
                console.log(e)
            }

            const storageRef = firebase.storage().ref();
            const imageRef = storageRef.child(`menu/${filename}`);
            imageRef.getDownloadURL()
                    .then((url) => {console.log('Download URL:', url);})
                    .catch((error) => {
                        console.error('Error getting download URL:', error);
                    });
            setSelectImage('');
    } 
    const handleAddItem = async() => {
        try {
            uploadImage();
          // Create the menu item object
          const newItem = {
            name: name,
            price: price,
            imageUri: imageUrl,
          };
          // Upload the menu item object to Firestore
          await menuItemsRef.add(newItem);
          Alert.alert('item ajouté avec succée');
          setName('');
          setPrice('');
        } catch (error) {
          console.error('Error adding menu item:', error);
          Alert.alert(error);
        }
      };

      const dates = {
        day1,
        day2,
        day3,
        day4
      }
        const handleSaveToFirebase = () => {
            firebase.firestore().collection('date').add(dates).then(() => {
                console.log('jour moidifiées', dates);
                Alert.alert('dates modifiées avec succés');
                setDay1('')
                setDay2('')
                setDay3('')
                setDay4('')
            }).catch((error) => {
                console.log('erreur lors de lajout');
                setErrorMessage("Une erreur est parvenu lors de l'ajout");
                Alert.alert(error)
            });
        }; 

    return (
        <View style={styles.container}>
            <StatusBar barStyle='dark-content' backgroundColor='#fffcf2'/>
            <ScrollView>
                <View style={styles.modi}>
                   <Text style={styles.title}>Modifier le menu</Text>
                   <View style={styles.ajouter}>
                   <Text style={styles.text}>ajouter un item au menu :</Text>
                   <TouchableOpacity style={styles.btn} onPress={imagePicker}>
                        <Text style={styles.btnText}>choisir une image</Text>
                    </TouchableOpacity>
                    {selectImage && <Image source={{ uri: selectImage }} style={{ width: 200, height: 200,borderRadius:16 }} />}
                    <TextInput style={globalStyles.input} placeholder="nom du produit" onChangeText={setName} value={name}/>
                    <TextInput style={globalStyles.input} placeholder="prix" onChangeText={setPrice} value={price} keyboardType="numeric" />
                    <TouchableOpacity style={globalStyles.button} onPress={handleAddItem}>
                        <Text style={globalStyles.buttonText}>ajouter</Text>
                    </TouchableOpacity>   
                    <TouchableOpacity style={globalStyles.button}  onPress={modifier}>
                        <Text style={globalStyles.buttonText}>modifer/supprimer</Text>
                    </TouchableOpacity>
                    </View>                 
                </View>
                <View style={styles.modi}>
                    <Text style={styles.title}>Modifier les réservations</Text>
                    <View style={styles.ajouter}>
                    <Text style={styles.text}>modifier les dates :</Text>                        
                    <TextInput style={globalStyles.input} placeholder="jour 1 : JJ-MM" value={day1} onChangeText={setDay1} keyboardType="numeric" />
                    <TextInput style={globalStyles.input} placeholder="jour 2 : JJ-MM" value={day2} onChangeText={setDay2} keyboardType="numeric" />
                    <TextInput style={globalStyles.input} placeholder="jour 3 : JJ-MM" value={day3} onChangeText={setDay3} keyboardType="numeric" />
                    <TextInput style={globalStyles.input} placeholder="jour 4 : JJ-MM" value={day4} onChangeText={setDay4} keyboardType="numeric" />
                    <TouchableOpacity style={globalStyles.button} onPress={handleSaveToFirebase}>
                        <Text style={globalStyles.buttonText}>enregistrer</Text>
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
        justifyContent:'center',
        backgroundColor:'#fffcf2'
    },
    title:{
        fontFamily: 'Bol',
        textAlign: 'center',
        margin: 25,
        fontSize: 24,
        borderWidth: 1,
        borderColor:'#c69214',
        borderRadius: 10,
        padding:10
    },
    ajouter:{
        width: '100%',
        marginVertical: 16,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#D5A021',
        borderWidth:2,
        borderLeftWidth:0,
        borderRightWidth:0,
        borderRadius: 4,
    },
    btn:{
        width: '80%',
        height: 48,
        marginVertical: 16,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#D5A021',
        borderWidth:2,
        borderRadius: 4,
    },
    btnText:{
        color: '#D5A021',
        fontFamily: 'Bol',
        fontSize: 16,
    },
    modi:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    },
    text:{
        fontFamily: 'Bol',
        fontSize: 18,
        marginTop:10
    }
    
})