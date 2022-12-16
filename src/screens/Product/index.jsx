import React, {useEffect, useState} from 'react';

import styles from './styles';
import IconComunity from 'react-native-vector-icons/MaterialCommunityIcons';

import {
  Text,
  View,
  TouchableOpacity,
  Image,
  useWindowDimensions,
  Pressable,
  Modal,
  ToastAndroid,
} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import productAction from '../../redux/actions/product';
import {currencyFormatter} from '../../modules/helper/currencyFormatter';
import transactionActions from '../../redux/actions/transaction';

function ProductDetail(props) {
  const {height, width} = useWindowDimensions();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const productId = props.route.params;
  const detail = useSelector(state => state.products.productDetail);
  const [size, setSize] = useState('1');
  const [modalVisible, setModalVisible] = useState(false);
  const cart = useSelector(state => state.transaction.cart);

  const addToChartHandler = (detail, size) => {
    const upSizeCost = size == 1 ? 0 : size == 2 ? 2000 : 4000;
    console.log(upSizeCost);
    const body = {
      ...cart,
      productId: detail.id,
      productName: detail.product_name,
      price: parseInt(detail.price),
      sizeId: size,
      image: detail.image,
      subtotal: parseInt(detail.price) + upSizeCost,
    };
    dispatch(transactionActions.dataTransaction(body));
    setModalVisible(false);
    navigation.navigate('Cart');
    return ToastAndroid.showWithGravity(
      `Product added to cart`,
      ToastAndroid.SHORT,
      ToastAndroid.TOP,
    );
  };
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
            <Text
              style={{
                color: '#6A4029',
                fontFamily: 'Poppins-Bold',
                fontWeight: 'bold',
              }}>
              Monday to friday{' '}
            </Text>{' '}
            at{' '}
            <Text
              style={{
                color: '#6A4029',
                fontFamily: 'Poppins-Bold',
                fontWeight: 'bold',
              }}>
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
            <Pressable
              style={size === '1' ? styles.selected : styles.button}
              onPress={() => {
                setSize('1');
              }}>
              <Text
                style={size === '1' ? styles.selectedText : styles.buttonText}>
                R
              </Text>
            </Pressable>
            <Pressable
              style={size === '2' ? styles.selected : styles.button}
              onPress={() => {
                setSize('2');
              }}>
              <Text
                style={size === '2' ? styles.selectedText : styles.buttonText}>
                L
              </Text>
            </Pressable>
            <Pressable
              style={size === '3' ? styles.selected : styles.button}
              onPress={() => {
                setSize('3');
              }}>
              <Text
                style={size === '3' ? styles.selectedText : styles.buttonText}>
                XL
              </Text>
            </Pressable>
          </View>
          <View style={{width: width, paddingBottom: 30}}>
            <TouchableOpacity
              onPress={() => setModalVisible(!modalVisible)}
              activeOpacity={0.8}>
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
          <Modal
            visible={modalVisible}
            transparent={true}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>
                  Are you want to continue transaction?
                </Text>
                <View style={{display: 'flex', flexDirection: 'row'}}>
                  <Pressable
                    onPress={() => {
                      addToChartHandler(detail, size);
                      setModalVisible(false);
                    }}
                    style={[styles.buttonModal, styles.buttonClose]}>
                    <Text style={styles.textStyle}>Continue</Text>
                  </Pressable>
                  <Pressable
                    style={[styles.buttonModal, styles.buttonClose]}
                    onPress={() => setModalVisible(!modalVisible)}>
                    <Text style={styles.textStyle}>Cancel</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </Modal>
        </View>
      </View>
    </View>
  );
}

export default ProductDetail;
