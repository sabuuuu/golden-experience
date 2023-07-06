import React,{useEffect,useState} from 'react';
import { useFonts } from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import firebase from './firebase';
import { Ionicons } from '@expo/vector-icons';

//importer les ecrans
import Home from './screens/home';
import About from './screens/about';
import Menu from './screens/menu';
import Reservation from './screens/reservation';
import Profile from './screens/profile';
//authentification screens
import Login from './screens/login';
import Inscription from './screens/inscription';
import Admin from './screens/admin';
import Modifier from './screens/modifier';
import ModifierPro from './screens/modifierPro';
//custom header
import Header from './header'; 

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function Dashboard (){
  return(
    <NavigationContainer >
      <Stack.Navigator >
        <Stack.Screen name='Main' component={Admin} options={{
          title:'Admin Dashboard',
          headerStyle:{
            backgroundColor:'#D5A021',
          },
          headerTitleStyle:{fontFamily:'Bol'},
          headerTitleAlign:'center'
        }}/>
        <Stack.Screen name='Modifier' component={Modifier} options={{
          title:'Modifier/Supprimer',
          headerStyle:{
            backgroundColor:'#D5A021',
          },
          headerTitleStyle:{fontFamily:'Bol'},
          headerTitleAlign:'center'}} />
    </Stack.Navigator>
    </NavigationContainer>
  )
}

function MainStack () {
  return (
  <Stack.Navigator>
    <Stack.Screen name='Home' component={Home} options={{headerShown:false }}/>
    <Stack.Screen name='Menu' component={Menu} options={{headerShown:false }}/>
    <Stack.Screen name='Reservation' component={Reservation} options={{headerShown:false }}/>
    <Stack.Screen name='About' component={About} options={{ headerShown: false }} />
    <Stack.Screen name='Profile' component={Profile} options={{headerShown:false }}/>
    <Stack.Screen name='ModifierPro' component={ModifierPro} options={{headerShown:false }}/>            
  </Stack.Navigator>
  )
}

const AppNav = () => (
  <NavigationContainer>
    <Tab.Navigator
      screenOptions={({ route }) => ({
      header: () => <Header />,
      tabBarStyle: { backgroundColor: '#d59f21' },
      tabBarLabelStyle:{color:'#d59f21',fontFamily:'Bol',fontSize:0},
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        if (route.name === 'Acceuil') {
          iconName = focused ? 'home' : 'home-outline'
        } else if (route.name === 'Menu') {
          iconName = focused ? 'restaurant' : 'restaurant-outline';          
        } else if (route.name === 'Reservation') {
          iconName = focused ? 'calendar' : 'calendar-outline';          
        } else if (route.name === 'A propos') {
          iconName = focused ? 'information-circle' : 'information-circle-outline';
        } else if (route.name === 'Profile') {
          iconName = focused ? 'person' : "person-outline"
        }
        return <Ionicons name={iconName} size={size} color='#fffcf2' />;
      },
    })}
    >
      <Tab.Screen name='Acceuil' component={MainStack}  />
      <Tab.Screen name='Menu' component={Menu} />
      <Tab.Screen name='Reservation' component={Reservation}/>
      <Tab.Screen name='A propos' component={About} />
      <Tab.Screen name='Profile' component={Profile}  />      
    </Tab.Navigator>
  </NavigationContainer>
)

const AuthNav = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name='Login' component={Login} options={{headerShown: false}} />
      <Stack.Screen name='Inscription' component={Inscription} options={{headerShown: false}}/>
    </Stack.Navigator>
  </NavigationContainer>
)

export default function App() {

  const [isAuth, setIsAuth] = useState(false);
  const [isAdmin, setAdmin] = useState(false);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        setIsAuth(true); // set isAuth to true if user is authenticated

        if(user.email === 'admin@gmail.com'){
          setAdmin(true);
        }
      }
    });

    return unsubscribe;
  }, []);
  const [loaded] = useFonts({
    Reg: require("./assets/fonts/fregular.ttf"),
    Bol: require("./assets/fonts/fbold.ttf"),
  })
  if (!loaded) {
    return null;
  }

  return (
    isAuth ? (isAdmin ? <Dashboard/> : <AppNav/>) : <AuthNav/>
  );
}