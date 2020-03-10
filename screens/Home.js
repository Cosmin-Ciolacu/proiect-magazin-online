import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  FlatList,
} from 'react-native';
import Produs from '../components/Produs';
import globalStyles from '../styles/globalStyles';

const Home = ({navigation}) => {
  const [produse, setProduse] = useState([]);
  useEffect(() => {
    fetch('http://192.168.0.157/mo-api/public/items')
      .then(res => res.json())
      .then(data => {
        if (data) {
          setProduse(data);
        }
        console.log(data);
      })
      .catch(err => console.log(err));
  }, []);
  return (
    <View style={globalStyles.flexContainer}>
      <FlatList
        data={produse}
        renderItem={({item}) => <Produs item={item} />}
        keyExtractor={item => item.id}
      />
      <View style={styles.cartBtn}>
        <TouchableOpacity
          style={styles.cos}
          onPress={() => navigation.navigate('Cart')}>
          <Text style={{color: 'white', fontSize: 18}}>
            Vezi cosul de cumparaturi
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cartBtn: {
    width: Dimensions.get('screen').width,
    position: 'absolute',
    bottom: 15,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cos: {
    width: 0.8 * Dimensions.get('screen').width,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightblue',
  },
});

export default Home;
