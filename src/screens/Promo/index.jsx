import React, {useCallback, useEffect, useState} from 'react';

import styles from './styles';
import IconComunity from 'react-native-vector-icons/MaterialCommunityIcons';
import Card from '../../components/Cards/AllPromo';
import IconIon from 'react-native-vector-icons/Ionicons';

import {View, Text, TextInput, FlatList, ActivityIndicator} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import debounce from 'lodash.debounce';
import promoActions from '../../redux/actions/promo';

function Promo() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const promos = useSelector(state => state.promos.promos);
  const isLoading = useSelector(state => state.promos.isLoading);
  const pagination = useSelector(state => state.promos.pagination);
  const [query, setQuery] = useState({
    code: '',
    page: 1,
  });

  const nextItems = () => {
    if (query.page == pagination.totalPage)
      return setQuery({...query, page: query.page + 1});
  };

  const debounceHandler = useCallback(
    debounce(text => {
      setQuery({...query, code: text});
    }, 500),
    [],
  );

  const searchHandler = text => {
    if (!text) return;
    debounceHandler(text);
  };

  const renderFooter = () => {
    return (
      <View
        style={{
          flex: 1,
          paddingVertical: 20,
          justifyContent: 'center',
          paddingBottom: 10,
        }}>
        {isLoading && <ActivityIndicator size="large" color="black" />}
        {pagination.totalPage == query.page && (
          <Text
            style={{
              textAlign: 'center',
              color: 'black',
              fontFamily: 'Poppins-Regular',
            }}>
            New Promo Coming Soon
          </Text>
        )}
      </View>
    );
  };

  useEffect(() => {
    dispatch(promoActions.getPromoThunk(query));
  }, [query]);

  return (
    <View style={styles.container}>
      <View style={{padding: 30}}>
        <IconComunity
          name={'chevron-left'}
          size={20}
          style={styles.icons}
          onPress={() => {
            navigation.goBack();
          }}
          onLongPress={() => {
            navigation.navigate('HomePage');
          }}
        />
        <Text style={styles.title}>Promo</Text>
        <View style={styles.wrapperSearch}>
          {/* <FontAwesome icon={SolidIcons.search} style={styles.iconSearch} /> */}
          <IconIon name={'search-outline'} style={styles.Icons} />
          <TextInput
            style={styles.textPlaceholder}
            placeholder="Search"
            placeholderTextColor="grey"
            onChangeText={text => searchHandler(text)}
            // onChangeText={handlersearch}
          />
        </View>
      </View>
      {isLoading ? (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
            paddingTop: 200,
          }}>
          <ActivityIndicator size={'large'} color={'#6A4029'} />
        </View>
      ) : (
        promos &&
        promos.length > 0 && (
          <FlatList
            data={promos}
            renderItem={({item}) => {
              return (
                <Card
                  image={item.image}
                  promoName={item.promo_name}
                  promoCode={item.code}
                />
              );
            }}
            onEndReachedThreshold={0.5}
            onEndReached={nextItems}
            ListFooterComponent={renderFooter}
          />
        )
      )}
    </View>
  );
}

export default Promo;
