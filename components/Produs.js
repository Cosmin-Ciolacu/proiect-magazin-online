import React from 'react';
import {View, Text} from 'react-native';

const Produs = ({item}) => {
  return (
    <View>
      <Text>{item.denumire}</Text>
      <Text>{item.pret}</Text>
    </View>
  );
};

export default Produs;
