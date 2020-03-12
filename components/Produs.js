import React from 'react';
import {View, Text, Image, Button, StyleSheet, Dimensions} from 'react-native';

const {width} = Dimensions.get('screen');

const Produs = ({produs, adaugareInCos}) => {
  return (
    <View>
      <View style={styles.container}>
        <Image
          source={{uri: produs && produs.pozaUrl}}
          style={{width: 100, height: 100}}
        />
        <View style={styles.detalii}>
          <Text style={styles.denumire}>{produs.denumire}</Text>
          <Text style={styles.pret}>{produs.pret}</Text>
        </View>
      </View>
      <Button title="adauga in cos" onPress={() => adaugareInCos(produs.id)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 0.8 * width,
    height: 150,
    backgroundColor: 'white',
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,

    elevation: 14,
  },
  detalii: {
    paddingLeft: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  denumire: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Produs;
