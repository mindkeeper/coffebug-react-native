import {View, TextInput} from 'react-native';
import React from 'react';
import styles from './styles';

const Input = props => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={props.value}
        placeholder={props.placeholder}
        onChangeText={text => props.handler(text, props.text)}
        placeholderTextColor="white"
        secureTextEntry={props.isPassword}
        keyboardType={props.type}
      />
    </View>
  );
};
export default Input;
