import React, {useEffect, useState} from 'react';

import styles from './styles';
import IconComunity from 'react-native-vector-icons/MaterialCommunityIcons';

import {
  Text,
  View,
  TouchableOpacity,
  Image,
  useWindowDimensions,
} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import productAction from '../../redux/actions/product';
import {currencyFormatter} from '../../modules/helper/currencyFormatter';
// import axios from 'axios';

function ProductDetail(props) {
  const {height, width} = useWindowDimensions();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const productId = props.route.params;
  const detail = useSelector(state => state.products.productDetail);

  useEffect(() => {
    dispatch(productAction.getProductDetailsThunk(productId));
  }, [dispatch]);
  console.log(productId, detail);
  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
        <IconComunity
          name="chevron-left"
          size={22}
          style={styles.icon}
          onPress={() => {
            navigation.goBack();
          }}
        />
        <IconComunity name="cart-outline" size={22} style={styles.icon} />
      </View>
      <View style={styles.main}>
        <View style={styles.price}>
          {detail && detail.price && (
            <Text style={styles.priceText}>
              {currencyFormatter(detail.price)}
            </Text>
          )}
        </View>
        <View style={styles.top}>
          {detail && detail.image && (
            <Image source={{uri: detail.image}} style={styles.product} />
          )}
          {detail && detail.product_name && (
            <Text style={styles.Title}>{detail.product_name}</Text>
          )}
        </View>
        <View style={styles.bottom}>
          <Text style={styles.firstText}>
            Delivery only on{' '}
            <Text style={{color: '#6A4029', fontFamily: 'Poppins-Bold'}}>
              Monday to friday{' '}
            </Text>{' '}
            at{' '}
            <Text style={{color: '#6A4029', fontFamily: 'Poppins-Bold'}}>
              1 - 7 pm
            </Text>
          </Text>
          {detail && detail.description && (
            <Text style={styles.description}>{detail.description}</Text>
          )}
          <Text style={styles.sizeText}> Choose a size</Text>
          <View
            style={{
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'row',
            }}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>R</Text>
            </View>
            <View style={styles.button}>
              <Text style={styles.buttonText}>L</Text>
            </View>
            <View style={styles.button}>
              <Text style={styles.buttonText}>XL</Text>
            </View>
          </View>
          <View style={{width: width, paddingBottom: 30}}>
            {/* <ButtonCustom text={"Add to cart"} textColor={"white"} color={"#6A4029"}/> */}
            <TouchableOpacity activeOpacity={0.8}>
              <View
                style={{
                  backgroundColor: '#6A4029',
                  height: 70,
                  width: width / 1.2,
                  borderRadius: 20,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    color: 'white',
                    fontFamily: 'Poppins-Bold',
                    fontSize: 17,
                  }}>
                  Add to cart
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

export default ProductDetail;
