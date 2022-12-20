import {
  View,
  Text,
  Image,
  useWindowDimensions,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import styles from './styles';

const CardAllPromo = ({image, promoCode, promoName}) => {
  const {width} = useWindowDimensions();

  return (
    <TouchableOpacity
      style={{
        display: 'flex',
        paddingLeft: 25,
        paddingRight: 25,
        marginVertical: 10,
      }}>
      <View
        style={{
          backgroundColor: '#873e23',
          width: width / 1.15,
          display: 'flex',
          borderRadius: 20,
          flexDirection: 'row',
          padding: 15,
        }}>
        <View>
          <Image source={{uri: image}} style={styles.imageCard} />
        </View>
        <View style={{paddingLeft: 15, justifyContent: 'center'}}>
          <Text style={styles.cardTitle}>{promoCode}</Text>
          <Text style={styles.cardStatus}>{promoName}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CardAllPromo;
