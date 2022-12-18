import React, {useCallback, useEffect, useMemo, useState} from 'react';
import IconComunity from 'react-native-vector-icons/MaterialCommunityIcons';
import {Divider} from '@rneui/themed';
import {useRoute} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import productActions from '../../redux/actions/product';
import debounce from 'lodash.debounce';
import styles from './styles';
import {
  View,
  Image,
  Text,
  Pressable,
  TextInput,
  Modal,
  ActivityIndicator,
} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import Navbar from '../../components/Navbar';
const Search = () => {
  const router = useRoute();
  const dispatch = useDispatch();
  const products = useSelector(state => state.products.products);
  const pagination = useSelector(state => state.products.pagination);
  const isLoading = useSelector(state => state.products.isLoading);
  const [modalVisible, setModalVisible] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [query, setQuery] = useState({
    search: '',
    page: 1,
    categories: '',
    sort: '',
  });

  const nextItems = () => {
    if (query.page == pagination.totalPage) return;
    return setQuery({...query, page: query.page + 1});
  };

  const debounceHandler = useCallback(
    debounce(text => {
      console.log(text);
      setQuery({...query, search: text});
    }, 500),
    [],
  );
  const searchHandler = text => {
    if (!text) return;
    debounceHandler(text);
  };
  useEffect(() => {
    dispatch(productActions.getProductsThunk(query));
  }, [query]);

  // useEffect(() => {
  //   return () => {
  //     debounceHandler.cancel();
  //   };
  // });

  const renderFooter = () => {
    return (
      <View
        style={{
          flex: 1,
          paddingVertical: 20,
          justifyContent: 'center',
          paddingBottom: 10,
        }}>
        {isLoading ? (
          <ActivityIndicator size="large" color="black" />
        ) : (
          pagination.totalPage == query.page && (
            <Text
              style={{
                textAlign: 'center',
                color: 'black',
                fontFamily: 'Poppins-Regular',
              }}>
              Coming Soon
            </Text>
          )
        )}
      </View>
    );
  };
  return (
    <Navbar>
      <View style={{flex: 1}}>
        <View style={styles.scrolles}>
          <View>
            <View style={styles.inputContainer}>
              <Text style={styles.filter} onPress={() => setModalVisible(true)}>
                {!query.categories && !query.sort
                  ? 'FILTER'
                  : query.categories || query.sort}
              </Text>
              <View style={styles.boxInput}>
                <TextInput
                  placeholder="Input Search Here..."
                  placeholderTextColor={'#9F9F9F'}
                  style={styles.input}
                  onChangeText={text => searchHandler(text)}
                />
                <Divider orientation="vertical" width={1} subHeader />
                <IconComunity
                  name={showSearch ? 'magnify' : 'window-close'}
                  size={20}
                  style={styles.icons}
                  onPress={() => {
                    setShowSearch(!showSearch);
                  }}
                />
              </View>
            </View>
            <Text style={styles.category}>All Products</Text>

            {isLoading ? (
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  flex: 1,
                  paddingTop: 200,
                }}>
                <ActivityIndicator size={'large'} />
              </View>
            ) : products && products.length == 0 ? (
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingTop: 200,
                }}>
                <Text style={{fontFamily: 'Poppins-Bold'}}>
                  PRODUCT NOT FOUND
                </Text>
              </View>
            ) : (
              <FlatList
                data={products}
                renderItem={({item}) => {
                  return (
                    <>
                      <Pressable
                        style={styles.card}
                        key={item.id}
                        onPress={() => {
                          navigation.navigate('ProductDetail', item.id);
                        }}>
                        <Image
                          source={{uri: item.image}}
                          style={styles.imgProduct}
                        />
                        <View>
                          <Text style={styles.titleFood}>
                            {item.product_name}
                          </Text>
                          <Text style={styles.priceFood}>{item.price}</Text>
                        </View>
                      </Pressable>
                    </>
                  );
                }}
                onEndReached={nextItems}
                contentContainerStyle={styles.containerCard}
                numColumns={2}
                ListFooterComponent={renderFooter}
              />
            )}
          </View>
          <Modal
            visible={modalVisible}
            transparent={true}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <View style={{position: 'absolute', right: 15, top: 15}}>
                  <IconComunity
                    name={'window-close'}
                    size={20}
                    style={{color: '#6f6f6f'}}
                    onPress={() => setModalVisible(false)}
                  />
                </View>
                <Text style={styles.titleFilter}>Category :</Text>
                <View
                  style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    width: 180,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 10,
                  }}>
                  <Text
                    style={
                      query.categories === 'foods'
                        ? styles.buttonFilter
                        : styles.button
                    }
                    onPress={() => {
                      setQuery({categories: 'foods'});
                    }}>
                    Food
                  </Text>
                  <Text
                    style={
                      query.categories === 'coffee'
                        ? styles.buttonFilter
                        : styles.button
                    }
                    onPress={() => {
                      setQuery({categories: 'coffee'});
                    }}>
                    Coffee
                  </Text>
                  <Text
                    style={
                      query.categories === 'non-coffee'
                        ? styles.buttonFilter
                        : styles.button
                    }
                    onPress={() => {
                      setQuery({categories: 'non-coffee'});
                    }}>
                    Non Coffee
                  </Text>
                </View>
                <Text style={styles.titleFilter}>Sort :</Text>
                <View style={{flexDirection: 'row', marginBottom: 10}}>
                  <Text
                    style={
                      query.sort === 'newest'
                        ? styles.buttonFilter
                        : styles.button
                    }
                    onPress={() => {
                      setQuery({...query, sort: 'newest'});
                    }}>
                    Latest
                  </Text>
                  <Text
                    style={
                      query.sort === 'oldest'
                        ? styles.buttonFilter
                        : styles.button
                    }
                    onPress={() => {
                      setQuery({...query, sort: 'oldest'});
                    }}>
                    Oldest
                  </Text>
                </View>
                <Text style={styles.titleFilter}>Price :</Text>
                <View style={{flexDirection: 'row'}}>
                  <Text
                    style={
                      query.sort === 'cheapest'
                        ? styles.buttonFilter
                        : styles.button
                    }
                    onPress={() => {
                      setQuery({...query, sort: 'cheapest'});
                    }}>
                    Cheapest
                  </Text>
                  <Text
                    style={
                      query.sort === 'priciest'
                        ? styles.buttonFilter
                        : styles.button
                    }
                    onPress={() => {
                      setQuery({...query, sort: 'priciest'});
                    }}>
                    Priciest
                  </Text>
                </View>
              </View>
            </View>
          </Modal>
        </View>
      </View>
    </Navbar>
  );
};

export default Search;
