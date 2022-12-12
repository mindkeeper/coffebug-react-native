import {View, Text, Pressable, Image} from 'react-native';
import React from 'react';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';
import {currencyFormatter} from '../../../modules/helper/currencyFormatter';

const ProductCard = ({image, productName, id, price}) => {
  const navigation = useNavigation();
  return (
    <Pressable
      style={styles.card}
      onPress={() => {
        navigation.navigate('ProductDetail', id);
      }}>
      <View style={styles.containerImage}>
        <Image source={{uri: image}} style={styles.imageCard} />
      </View>
      <View style={styles.containerTitle}>
        <Text numberOfLines={1} style={styles.cardTitle}>
          {productName}
        </Text>
        <Text style={styles.cardPrice}>{`IDR. ${currencyFormatter(
          price,
        )}`}</Text>
      </View>
    </Pressable>
  );
};

export default ProductCard;
