import React, {useEffect, useState} from 'react';

import styles from './styles';
import Navbar from '../../components/Navbar';
import Sample from '../../assets/images/product.png';

import {
  Image,
  Text,
  View,
  Pressable,
  ScrollView,
  useWindowDimensions,
  ActivityIndicator,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import productActions from '../../redux/actions/product';
import ProductCard from '../../components/Cards/ProductCard';

const Home = () => {
  const navigation = useNavigation();
  const {height} = useWindowDimensions();
  const dispatch = useDispatch();
  const [query, setQuery] = useState({
    sort: 'popular',
    categories: '',
    page: 1,
  });
  const products = useSelector(state => state.products.products);
  const isLoading = useSelector(state => state.products.isLoading);

  useEffect(() => {
    dispatch(productActions.getProductsThunk(query));
  }, [query]);

  useEffect(() => {
    let refresh = false;
    const focusEvent = navigation.addListener('focus', e => {
      if (refresh) dispatch(productActions.getProductsThunk(query));
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
              navigation.navigate('ScreenFavorite');
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
              navigation.navigate('ScreenPromo');
            }}>
            See more
          </Text>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            style={{height: height / 2}}>
            <Pressable style={styles.card}>
              <View style={styles.containerImage}>
                <Image source={Sample} style={styles.imageCard} />
              </View>
              <View style={styles.containerTitle}>
                <Text style={styles.cardTitle}>Hazelnut Latte</Text>
                <Text style={styles.cardPrice}>IDR 25.000</Text>
              </View>
            </Pressable>
            <Pressable style={styles.card}>
              <View style={styles.containerImage}>
                <Image source={Sample} style={styles.imageCard} />
              </View>
              <View style={styles.containerTitle}>
                <Text style={styles.cardTitle}>Hazelnut Latte</Text>
                <Text style={styles.cardPrice}>IDR 25.000</Text>
              </View>
            </Pressable>
            <Pressable style={styles.card}>
              <View style={styles.containerImage}>
                <Image source={Sample} style={styles.imageCard} />
              </View>
              <View style={styles.containerTitle}>
                <Text style={styles.cardTitle}>Hazelnut Latte</Text>
                <Text style={styles.cardPrice}>IDR 25.000</Text>
              </View>
            </Pressable>
            <Pressable style={styles.card}>
              <View style={styles.containerImage}>
                <Image source={Sample} style={styles.imageCard} />
              </View>
              <View style={styles.containerTitle}>
                <Text style={styles.cardTitle}>Hazelnut Latte</Text>
                <Text style={styles.cardPrice}>IDR 25.000</Text>
              </View>
            </Pressable>
            <Pressable style={styles.card}>
              <View style={styles.containerImage}>
                <Image source={Sample} style={styles.imageCard} />
              </View>
              <View style={styles.containerTitle}>
                <Text style={styles.cardTitle}>Hazelnut Latte</Text>
                <Text style={styles.cardPrice}>IDR 25.000</Text>
              </View>
            </Pressable>
          </ScrollView>
        </ScrollView>
      </Navbar>
    </View>
  );
};

export default Home;
