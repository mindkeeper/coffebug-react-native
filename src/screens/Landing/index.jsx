import {ImageBackground, View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import bg from '../../assets/images/bgWelcome.png';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';

const Landing = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <ImageBackground source={bg} resizeMode="cover" style={styles.bg}>
        <View style={styles.content}>
          <Text style={styles.title}>Coffee for Everyone</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.navigate('Welcome');
            }}>
            <Text style={styles.text}>Get Started</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Landing;
