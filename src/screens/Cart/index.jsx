import React, {useEffect, useState} from 'react';

import {
  View,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  Pressable,
  ToastAndroid,
} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import styles from './styles';
import IconComunity from 'react-native-vector-icons/MaterialCommunityIcons';
import Icons from 'react-native-vector-icons/FontAwesome5';
import {Divider} from '@rneui/themed';

import {useDispatch, useSelector} from 'react-redux';
import transactionActions from '../../redux/actions/transaction';
import {currencyFormatter} from '../../modules/helper/currencyFormatter';

function Cart() {
  const [quantity, setQuantity] = useState(1);
  const [totalPayment, setTotalPayment] = useState(0);
  const [tax, setTax] = useState(0);
  const dispatch = useDispatch();
  const cart = useSelector(state => state.transaction.cart);
  const navigation = useNavigation();
  const {width} = useWindowDimensions();

  useEffect(() => {
    setTotalPayment(cart.subtotal * quantity);
  }, [quantity]);
  useEffect(() => {
    setTax(totalPayment * 0.1);
  }, [totalPayment]);

  const checkOutHandler = (cart, quantity, totalPayment) => {
    console.log(cart);
    const body = {
      ...cart,
      subtotal: totalPayment,
      qty: quantity,
    };
    dispatch(transactionActions.dataTransaction(body));
    navigation.navigate('Delivery');
    return ToastAndroid.showWithGravity(
      `Product added to cart`,
      ToastAndroid.SHORT,
      ToastAndroid.TOP,
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.navbar}>
        <IconComunity
          name={'chevron-left'}
          size={20}
          style={styles.icons}
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Text style={styles.titleNavbar}>
          My <Text style={{fontFamily: 'Poppins-Black'}}>Cart</Text>
        </Text>
      </View>
      {Object.keys(cart).length > 0 && (
        <>
          <View style={{paddingTop: 40}}>
            <View style={{minHeight: 250}}>
              <View style={styles.card}>
                <View
                  style={{
                    marginRight: 20,
                    backgroundColor: 'white',
                    width: width / 3,
                    padding: 10,
                    borderRadius: 30,
                  }}>
                  <Image source={{uri: cart.image}} style={styles.cardImage} />
                  <Text style={styles.cardPrice}>
                    IDR {currencyFormatter(cart.subtotal)}
                  </Text>
                </View>
                <View>
                  <Text style={styles.cardTitle}>{cart.productName}</Text>
                  <View style={styles.quantity}>
                    <Pressable
                      style={styles.quantityBtn}
                      onPress={() => {
                        quantity !== 1 && setQuantity(quantity - 1);
                      }}>
                      <IconComunity name={'window-minimize'} size={15} />
                    </Pressable>
                    <Text style={styles.qtyText}>{quantity}</Text>
                    <Pressable
                      style={styles.quantityBtn}
                      onPress={() => {
                        setQuantity(quantity + 1);
                      }}>
                      <Icons name={'plus'} size={10} />
                    </Pressable>
                  </View>
                </View>
              </View>
            </View>
            <Divider width={1} style={{width: '100%', marginTop: 15}} />
            <View style={{paddingTop: 30}}>
              <View style={styles.containerTotal}>
                <Text style={styles.textTotal}>Subtitak</Text>
                <Text style={styles.textPrice}>
                  IDR {currencyFormatter(totalPayment)}
                </Text>
              </View>
              <View style={styles.containerTotal}>
                <Text style={styles.textTotal}>Tax</Text>
                <Text style={styles.textPrice}>
                  IDR {currencyFormatter(tax)}
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                paddingTop: 20,
                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  fontFamily: 'Poppins-Bold',
                  fontSize: 20,
                  color: 'black',
                }}>
                Total :
              </Text>
              <Text
                style={{
                  fontFamily: 'Poppins-Bold',
                  fontSize: 20,
                  color: 'black',
                }}>
                IDR {currencyFormatter(totalPayment + tax)}
              </Text>
            </View>
            <View style={{paddingTop: 20, paddingBottom: 30}}>
              <TouchableOpacity
                onPress={() => checkOutHandler(cart, quantity, totalPayment)}
                activeOpacity={0.8}>
                <View
                  style={{
                    marginVertical: 15,
                    backgroundColor: '#FFBA33',
                    height: 70,
                    borderRadius: 20,
                    paddingLeft: 30,
                    alignItems: 'center',
                    display: 'flex',
                    flexDirection: 'row',
                    alignContent: 'center',
                  }}>
                  <IconComunity
                    name={'chevron-right'}
                    size={25}
                    style={{color: 'black'}}
                  />
                  <Text
                    style={{
                      paddingLeft: 55,
                      color: 'black',
                      fontFamily: 'Poppins-Bold',
                      fontSize: 16,
                    }}>
                    CHECKOUT
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </>
      )}
    </ScrollView>
  );
}

export default Cart;
