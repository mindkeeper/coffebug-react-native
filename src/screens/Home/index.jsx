import React, {useEffect, useState} from 'react';

import styles from './styles';
import Navbar from '../../components/Navbar';
import IconIon from 'react-native-vector-icons/Ionicons';

import {
  Text,
  View,
  Pressable,
  ScrollView,
  useWindowDimensions,
  ActivityIndicator,
  Modal,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import productActions from '../../redux/actions/product';
import ProductCard from '../../components/Cards/ProductCard';
import promoActions from '../../redux/actions/promo';
import PromoCard from '../../components/Cards/Promo';

const Home = () => {
  const navigation = useNavigation();
  const {height} = useWindowDimensions();
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const role = useSelector(state => state.auth.userData.role);
  console.log(role);
  const [query, setQuery] = useState({
    sort: 'popular',
    categories: '',
    page: 1,
  });
  const products = useSelector(state => state.products.products);
  const isLoading = useSelector(state => state.products.isLoading);
  const promos = useSelector(state => state.promos.promos);
  const promoLoading = useSelector(state => state.promos.isLoading);

  useEffect(() => {
    dispatch(productActions.getProductsThunk(query));
  }, [query]);

  useEffect(() => {
    dispatch(promoActions.getPromoThunk());
  }, [dispatch]);

  useEffect(() => {
    let refresh = false;
    const focusEvent = navigation.addListener('focus', e => {
      if (refresh) {
        dispatch(productActions.getProductsThunk(query));
        dispatch(promoActions.getPromoThunk());
      }
    });
    const blurEvent = navigation.addListener('blur', e => {
      refresh = true;
    });
    return () => {
      focusEvent();
      blurEvent();
    };
  }, [query, navigation]);

  console.log(products);
  return (
    <View style={styles.sectionContainer}>
      <Navbar>
        <ScrollView style={styles.container}>
          <Text style={styles.title}>A good coffee is a good day</Text>
          <Text
            style={styles.category}
            onPress={() => {
              navigation.navigate('ProductDetail');
            }}>
            Favorite Products
          </Text>
          <Text
            style={styles.see}
            onPress={() => {
              navigation.navigate('Search', 'popular');
            }}>
            See more
          </Text>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            keyboardShouldPersistTaps={'always'}
            style={{height: height / 2}}>
            {isLoading ? (
              <View style={styles.loading}>
                <ActivityIndicator size="large" color="black" />
              </View>
            ) : products && products.length > 0 ? (
              products.map(item => {
                return (
                  <ProductCard
                    key={item.id}
                    id={item.id}
                    image={item.image}
                    price={item.price}
                    productName={item.product_name}
                  />
                );
              })
            ) : (
              <Text>We can't find anything</Text>
            )}
          </ScrollView>
          <Text style={styles.category}>Promo for you</Text>
          <Text
            style={styles.see}
            onPress={() => {
              navigation.navigate('Promo');
            }}>
            See more
          </Text>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            style={{height: height / 2}}>
            {promoLoading ? (
              <View style={styles.loading}>
                <ActivityIndicator size="large" color="black" />
              </View>
            ) : promos && promos.length === 0 ? (
              <Text>We can't find anything</Text>
            ) : (
              promos.map(item => {
                return (
                  <PromoCard
                    key={item.id}
                    img={item.image}
                    name={item.promo_name}
                    code={item.code}
                  />
                );
              })
            )}
          </ScrollView>
          {role === 'Admin' && (
            <Pressable onPress={() => setModalVisible(true)}>
              <IconIon name={'add-circle'} style={styles.addCircle} />
            </Pressable>
          )}
        </ScrollView>

        <Modal
          visible={modalVisible}
          transparent={true}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={{flexDirection: 'row'}}>
                <Pressable
                  style={[styles.buttonCircle]}
                  onPress={() => setModalVisible(!modalVisible)}>
                  <IconIon
                    name={'close-circle-sharp'}
                    style={styles.removeCircle}
                  />
                </Pressable>
                <View>
                  <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => {
                      setModalVisible(!modalVisible);
                      navigation.navigate('NewProduct');
                    }}>
                    <Text style={styles.textStyle}>New Product</Text>
                  </Pressable>
                  <Pressable style={[styles.button, styles.buttonClose]}>
                    <Text style={styles.textStyle}>New Promo</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </View>
        </Modal>
      </Navbar>
    </View>
  );
};

export default Home;
