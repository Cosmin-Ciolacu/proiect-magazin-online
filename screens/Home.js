import React, {useEffect, useState, useLayoutEffect} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';

import Produs from '../components/Produs';
import globalStyles from '../styles/globalStyles';

const Home = ({navigation}) => {
  const [produse, setProduse] = useState([]);
  const [produseInCos, setProduseInCos] = useState([]);
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Produse',
      headerRight: () => (
        <TouchableOpacity
          style={styles.right}
          onPress={() => navigation.navigate('Cart')}>
          {produseInCos.length > 0 ? (
            <Text style={styles.nr}>{produseInCos.length + 1}</Text>
          ) : null}
          <Image source={require('../img/cart.png')} style={styles.img} />
        </TouchableOpacity>
      ),
    });
  }, [navigation, produseInCos]);

  useEffect(() => {
    fetch('http://192.168.0.157/mo-api/public/items')
      .then(res => res.json())
      .then(data => {
        if (data) {
          setProduse(data);
        }
        //console.log(data);
      })
      .catch(err => console.log(err));
  }, []);
  const adaugareInCos = id => {
    const item = produse.find(produs => produs.id === id);
    setProduseInCos([...produseInCos, item]);
  };
  console.log(produseInCos);
  return (
    <View style={globalStyles.flexContainer}>
      <ScrollView>
        {produse.map(produs => (
          <Produs
            produs={produs}
            adaugareInCos={adaugareInCos}
            key={produs.id}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  right: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  nr: {
    marginRight: 5,
  },
  img: {
    width: 30,
    height: 30,
  },
});

export default Home;
