import React, {useEffect, useState, useLayoutEffect} from 'react';
import {View, Text, Button, ScrollView, Alert} from 'react-native';
import globalStyles from '../styles/globalStyles';
import ProdusCos from '../components/ProdusCos';

const Cart = ({route, navigation}) => {
  const [produseInCos, setProduseInCos] = useState([]);
  const [total, setTotal] = useState(0);
  useEffect(() => {
    const {produseInCos} = route.params;
    if (produseInCos.length === 0) {
      console.log('nu exista');
    } else {
      let suma = 0;
      produseInCos.forEach(produs => (suma += produs.pret));
      //console.log(suma);
      setTotal(suma);
      setProduseInCos(produseInCos);
    }
  }, []);
  useLayoutEffect(() => {
    navigation.setOptions({
      title: `total plata: ${total}`,
    });
  }, [navigation, total]);

  const stergereProdus = id => {
    const produseRamase = produseInCos.filter(produs => produs.id !== id);
    //console.log(produseRamase);
    setProduseInCos(produseRamase);
  };

  const trimiteComanda = async () => {
    try {
      const fd = new FormData();
      fd.append('produse', produseInCos);
      const res = await fetch('http://churchmap.co.ro/mo-api/public/comanda', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({
          produse: produseInCos,
        }),
      });
      if (res.status !== 200) {
        Alert.alert('eroare', 'a intervenit o eroare\n incercati mai tarziu');
      }
      const data = await res.json();
      console.log(data);
      if (data.success) {
        Alert.alert(
          'Comada trimisa',
          'comanda a fost efectuata.va multumim ca ati comandat de la noi',
        );
        setProduseInCos([]);
        setTotal(0);
      } else {
        Alert.alert('eroare', 'a intervenit o eroare\n incercati mai tarziu');
      }
    } catch (error) {
      console.log(error);
      Alert.alert('eroare', 'a intervenit o eroare\n incercati mai tarziu');
    }
  };
  //setProduseInCos(route.params.produseInCos);
  //console.log(produseInCos);
  return (
    <View style={globalStyles.flexContainer}>
      <ScrollView>
        {produseInCos.length === 0 ? (
          <Text>Nu exista produse in cos</Text>
        ) : (
          produseInCos.map(produs => (
            <ProdusCos
              produs={produs}
              stergereProdus={stergereProdus}
              key={produs.id}
            />
          ))
        )}
      </ScrollView>
      {produseInCos.length !== 0 ? (
        <>
          <Button
            title="trimite comanda"
            style={{
              positon: 'absolute',
              marginBotton: 20,
              zIndex: 10,
            }}
            onPress={() => trimiteComanda()}
          />
        </>
      ) : null}
    </View>
  );
};

export default Cart;
