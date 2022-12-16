import React, {useState, useCallback} from 'react';

import {
  View,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  ToastAndroid,
  ActivityIndicator,
  Pressable,
} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import styles from './styles';
import IconComunity from 'react-native-vector-icons/MaterialCommunityIcons';
import {Divider} from '@rneui/themed';

import {useDispatch, useSelector} from 'react-redux';
import transactionActions from '../../redux/actions/transaction';
import {currencyFormatter} from '../../modules/helper/currencyFormatter';

function Payment() {
  const [Payment, setPayment] = useState();
  const [isLoading, setLoading] = useState(false);

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const cart = useSelector(state => state.transaction.cart);
  const token = useSelector(state => state.auth.userData.token);

  const size = () => {
    let size = 'Reguler';
    if ((cart.sizeId = '2')) size = 'Large';
    if ((cart.sizeId = '3')) size = 'XL';
    return size;
  };

  const handlePress = () => {
    if (isLoading) return;
    if (!Payment)
      return ToastAndroid.showWithGravityAndOffset(
        `Select Payment Method !`,
        ToastAndroid.SHORT,
        ToastAndroid.TOP,
        25,
        50,
      );
    setLoading(true);

    const body = {
      product_id: cart.productId,
      size_id: cart.sizeId.toString(),
      qty: cart.qty,
      promo_id: '1',
      subtotal: cart.subtotal,
      delivery_id: cart.deliveryId,
      payment_id: Payment,
    };
    dispatch(transactionActions.createTransactionThunk(body, token));
    setLoading(false);
  };

  console.log(Payment);
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
        <Text style={styles.titleNavbar}>Payment</Text>
      </View>
      <View style={{paddingTop: 30}}>
        <Text style={styles.TitleProduct}>Products</Text>
        <View style={styles.Containercard}>
          <View style={styles.card}>
            <View>
              <Image source={{uri: cart.image}} style={styles.imageCard} />
            </View>
            <View style={{marginHorizontal: 15, minWidth: 100, maxWidth: 80}}>
              <Text style={styles.Title}>{cart.productName}</Text>
              <Text style={styles.Title}>x {cart.qty}</Text>
              <Text style={styles.Title}>{size()}</Text>
            </View>
            <View style={{marginHorizontal: 5}}>
              <Text style={styles.price}>
                IDR {currencyFormatter(cart.price)}
              </Text>
            </View>
          </View>
        </View>
        <Text style={styles.TitleProduct}>Payment method</Text>
        <View style={styles.CardMethods}>
          <View>
            <View style={styles.radio}>
              <Pressable
                style={
                  Payment === '1' ? styles.checkedOuter : styles.unchekedOuter
                }
                onPress={() => {
                  setPayment('1');
                }}>
                <View
                  style={
                    Payment === '1' ? styles.checkedInner : undefined
                  }></View>
              </Pressable>
            </View>
            <View style={styles.radio}>
              <Pressable
                style={
                  Payment === '2' ? styles.checkedOuter : styles.unchekedOuter
                }
                onPress={() => {
                  setPayment('2');
                }}>
                <View
                  style={
                    Payment === '2' ? styles.checkedInner : undefined
                  }></View>
              </Pressable>
            </View>
            <View style={styles.radio}>
              <Pressable
                style={
                  Payment === '3' ? styles.checkedOuter : styles.unchekedOuter
                }
                onPress={() => {
                  setPayment('3');
                }}>
                <View
                  style={
                    Payment === '3' ? styles.checkedInner : undefined
                  }></View>
              </Pressable>
            </View>
          </View>
          <View>
            <View style={styles.methodList}>
              <View style={styles.methodCard}>
                <IconComunity
                  name={'card-bulleted-outline'}
                  style={styles.cardIcon}
                  size={20}
                />
              </View>
              <Text
                style={styles.textMethod}
                onPress={() => {
                  setPayment('1');
                }}>
                Card
              </Text>
            </View>
            <Divider
              width={1}
              style={{width: '100%', marginTop: 5, marginBottom: 3.5}}
            />
            <View style={styles.methodList}>
              <View style={styles.methodBank}>
                <IconComunity name={'bank'} style={styles.cardIcon} size={20} />
              </View>
              <Text
                style={styles.textMethod}
                onPress={() => {
                  setPayment('2');
                }}>
                Bank account
              </Text>
            </View>
            <Divider
              width={1}
              style={{width: '100%', marginTop: 5, marginBottom: 3.5}}
            />
            <View style={styles.methodList}>
              <View style={styles.methodCod}>
                <IconComunity
                  name={'truck-fast'}
                  style={{color: 'black'}}
                  size={20}
                />
              </View>
              <Text
                style={styles.textMethod}
                onPress={() => {
                  setPayment('3');
                }}>
                Cash on delivery
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingTop: 10,
            paddingBottom: 20,
            alignItems: 'center',
          }}>
          <Text style={styles.totals}>Total</Text>
          <Text style={styles.prices}>
            IDR {currencyFormatter(cart.subtotal)}
          </Text>
        </View>
        <View style={{paddingBottom: 30}}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              handlePress();
            }}>
            <View
              style={{
                marginBottom: 20,
                backgroundColor: '#6A4029',
                height: 70,
                borderRadius: 20,
                paddingLeft: 30,
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'row',
                alignContent: 'center',
              }}>
              {isLoading ? (
                <ActivityIndicator size="large" color="white" />
              ) : (
                <Text
                  style={{
                    color: 'white',
                    fontFamily: 'Poppins-Bold',
                    fontSize: 16,
                    paddingLeft: 35,
                  }}>
                  Proceed payment
                </Text>
              )}
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

export default Payment;
