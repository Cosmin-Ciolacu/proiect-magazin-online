import React from 'react';
import {View, Text, Button} from 'react-native';
import styles from '../styles/globalStyles';

const Home = ({navigation}) => {
  return (
    <View style={styles.flexContainer}>
      <Text>Home</Text>
      <Button title="Vezi cosul" onPress={() => navigation.navigate('Cart')} />
    </View>
  );
};

export default Home;
