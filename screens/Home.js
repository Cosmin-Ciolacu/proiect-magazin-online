import React, {useEffect, useState, useLayoutEffect} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Picker,
  ScrollView,
  ToastAndroid,
  Platform,
} from 'react-native';

import Produs from '../components/Produs';
import globalStyles from '../styles/globalStyles';

const Home = ({navigation}) => {
  const [produse, setProduse] = useState([]);
  const [produseInCos, setProduseInCos] = useState([]);
  const [categorie, setCategorie] = useState('');
  const [produseFiltrate, setProduseFiltrate] = useState([]);
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Produse',
      headerRight: () => (
        <TouchableOpacity
          style={styles.right}
          onPress={() =>
            navigation.navigate('Cart', {
              produseInCos,
            })
          }>
          {produseInCos.length !== 0 ? (
            <Text style={styles.nr}>{produseInCos.length}</Text>
          ) : null}
          <Image source={require('../img/cart.png')} style={styles.img} />
        </TouchableOpacity>
      ),
    });
  }, [navigation, produseInCos]);

  useEffect(() => {
    fetch('http://churchmap.co.ro/mo-api/public/items')
      .then(res => res.json())
      .then(data => {
        if (data) {
          setProduse(data);
        }
        //console.log(data);
      })
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    //console.log(produseInCos);
    const pf = produse.filter(produs => produs.categorie === categorie);
    console.log(pf);
    setProduseFiltrate(pf);
  }, [categorie, produse]);
  const adaugareInCos = id => {
    const item = produse.find(produs => produs.id === id);
    setProduseInCos([...produseInCos, item]);
    if (Platform.OS === 'android') {
      ToastAndroid.show('Produsul a fost adaugat in cos', ToastAndroid.LONG);
    }
  };

  const output =
    categorie !== '' ? (
      produseFiltrate.map(produs => (
        <Produs produs={produs} adaugareInCos={adaugareInCos} key={produs.id} />
      ))
    ) : (
      <ScrollView>
        {produse.map(produs => (
          <Produs
            produs={produs}
            adaugareInCos={adaugareInCos}
            key={produs.id}
          />
        ))}
      </ScrollView>
    );

  return (
    <View style={globalStyles.flexContainer}>
      <View style={styles.filtru}>
        <Text style={styles.txt}>FILTREAZA CATEGORIA</Text>
        <Picker
          style={styles.picker}
          selectedValue={categorie}
          onValueChange={value => {
            console.log(value);
            setCategorie(value);
          }}>
          <Picker.Item label="alege o categorie de produse" value="" />
          <Picker.Item label="electronice" value="electronice" />
          <Picker.Item label="imbracaminte" value="imbracaminte" />
          <Picker.Item label="altele" value="altele" />
        </Picker>
      </View>
      {output}
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
  filtru: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
  },
  txt: {
    fontSize: 16,
  },
  picker: {
    width: 300,
  },
});

export default Home;
