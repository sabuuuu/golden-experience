import React from "react";
import { StyleSheet, View,Image,Text,ScrollView} from 'react-native';
import { MenuList } from './menuList';
import { StatusBar } from "react-native";

function Appetizers() {
  const entree = MenuList.filter((item) => item.category === "Entree");
  
  const renderMenuItems = () => {
    const gridItems = [];
    for (let i = 0; i < entree.length; i += 3) {
      const rowItems = [];
      for (let j = i; j < i + 3; j++) {
        if (j < entree.length) {
          rowItems.push(
            <View style={styles.gridItem} key={j}>
              <MenuItem
                image={entree[j].image}
                name={entree[j].name}
                price={entree[j].price}
              />
            </View>
          );
        }
      }
      gridItems.push(
        <View style={styles.gridRow} key={i}>
          {rowItems}
        </View>
      );
    }
    return gridItems;
  };
  return (
    <View>
      <Text style={styles.bigTitle}>Nos Entrées</Text>
      <View style={styles.gridContainer}>{renderMenuItems()}</View>
    </View>
  );
}

function PlatMenu() {
  const PlatItems = MenuList.filter((item) => item.category === "Plat");
  const renderMenuItems = () => {
    const gridItems = [];
    for (let i = 0; i < PlatItems.length; i += 3) {
      const rowItems = [];
      for (let j = i; j < i + 3; j++) {
        if (j < PlatItems.length) {
          rowItems.push(
            <View style={styles.gridItem} key={j}>
              <MenuItem
                image={PlatItems[j].image}
                name={PlatItems[j].name}
                price={PlatItems[j].price}
              />
            </View>
          );
        }
      }
      gridItems.push(
        <View style={styles.gridRow} key={i}>
          {rowItems}
        </View>
      );
    }
    return gridItems;
  }
  return (
    <View>
      <Text style={styles.bigTitle}>Nos Plats</Text>
      <View style={styles.gridContainer}>{renderMenuItems()}</View>
    </View>
  );
}

function DrinksMenu() {
    const drinksItems = MenuList.filter((item) => item.category === "Drinks");
  
    const renderMenuItems = () => {
      const gridItems = [];
      for (let i = 0; i < drinksItems.length; i += 3) {
        const rowItems = [];
        for (let j = i; j < i + 3; j++) {
          if (j < drinksItems.length) {
            rowItems.push(
              <View style={styles.gridItem} key={j}>
                <MenuItem
                  image={drinksItems[j].image}
                  name={drinksItems[j].name}
                  price={drinksItems[j].price}
                />
              </View>
            );
          }
        }
        gridItems.push(
          <View style={styles.gridRow} key={i}>
            {rowItems}
          </View>
        );
      }
      return gridItems;
    };
  
    return (
      <View>
        <Text style={styles.bigTitle}>Nos Boissons</Text>
        <View style={styles.gridContainer}>{renderMenuItems()}</View>
      </View>
    );
}

function DessertMenu() {
  const DessertItems = MenuList.filter((item) => item.category === "Dessert");
  const renderMenuItems = () => {
    const gridItems = [];
    for (let i = 0; i < DessertItems.length; i += 3) {
      const rowItems = [];
      for (let j = i; j < i + 3; j++) {
        if (j < DessertItems.length) {
          rowItems.push(
            <View style={styles.gridItem} key={j}>
              <MenuItem
                image={DessertItems[j].image}
                name={DessertItems[j].name}
                price={DessertItems[j].price}
              />
            </View>
          );
        }
      }
      gridItems.push(
        <View style={styles.gridRow} key={i}>
          {rowItems}
        </View>
      );
    }
    return gridItems;
  };

  return (
    <View>
      <Text style={styles.bigTitle}>Nos Desserts</Text>
      <View style={styles.gridContainer}>{renderMenuItems()}</View>
    </View>
  );
}

const MenuItem = ({ name, image, price }) => {
    return (
      <View style={styles.card}>
        <Image source={image} style={styles.image} />
        <Text style={styles.cardTitle}>{name}</Text>
        <Text style={styles.smallTitle}>{price}</Text>
      </View>
    );
};

export default function Menu () {
    return (
        <View style={styles.menu}>
          <Text style={styles.titre}>Notre menu</Text>
          <StatusBar barStyle='dark-content' backgroundColor='#d59f21'/>          
          <ScrollView>
            <View style={styles.container}>
            <Appetizers />
            <PlatMenu />
            <DessertMenu/>
            <DrinksMenu />
            </View>
          </ScrollView>
        </View>
    );
};
 
const styles = StyleSheet.create({
  menu: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'#d59f21',
  },
  container:{
        flex:1,
        backgroundColor:'#fffcf2',
        width:'100%',
        height:'100%',
        marginTop:50,
        borderTopLeftRadius:60,
        borderTopRightRadius:60,
        paddingLeft:20
  },
  card: {
    flex:1,
    alignItems: 'center',
    borderRadius: 10,
    borderColor: '#c69214',
    borderWidth:1,
    width: '100%',
    height:'100%',
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    marginBottom: 8,
    borderRadius:10
  },
  cardTitle: {
    fontFamily: 'Bol',
    textAlign: 'center',
    marginBottom:5
  },
  text: {
    fontFamily:'Reg'
  },
  bigTitle: {
    fontFamily: 'Bol',
    textAlign: 'center',
    margin: 25,
    fontSize: 18,
    borderWidth: 1,
    borderColor:'#c69214',
    borderRadius: 10,
    padding:10,
  },
  smallTitle: {
    fontFamily:'Reg'
  },
  gridContainer: {
    flexDirection: 'column',
    flexWrap: 'wrap',
  },
  gridRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  gridItem: {
    flexBasis: '28%',
    margin: 10,
  },
  titre: {
    fontFamily: 'Bol',
    fontSize: 26,
    marginTop:30,
    color:'#fffcf2'
},
});
