import React, {useEffect} from 'react';

import styles from './styles';
import IconComunity from 'react-native-vector-icons/MaterialCommunityIcons';
import {Divider} from '@rneui/themed';
import ButtonCustom from '../../components/Button/FancyButton';

import {View, Image, ScrollView, Text, Pressable} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import transactionActions from '../../redux/actions/transaction';

function Profile() {
  const navigation = useNavigation();
  const profile = useSelector(state => state.profile.profile);
  const auth = useSelector(state => state.auth.userData);
  const history = useSelector(state => state.transaction.history);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(transactionActions.getHistoryThunk(auth.token));
  }, [dispatch]);
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
        <Text style={styles.titleNavbar}>My profile</Text>
      </View>
      <View style={styles.userinfo}>
        <Image source={{uri: profile.image}} style={styles.image} />
        <Text style={styles.username}>{profile.display_name}</Text>
        <Pressable style={styles.conPencl}>
          <IconComunity
            name={'pencil'}
            style={styles.pencil}
            size={20}
            onPress={() => {
              navigation.navigate('EditProfile');
            }}
          />
        </Pressable>
        <Text style={styles.descritption}>{profile.email}</Text>
        <Text style={styles.descritption}>{profile.phone}</Text>
        <Text style={styles.descritption}>{profile.address}</Text>
      </View>
      <Divider width={8} style={{width: '100%', marginTop: 15}} />
      <View style={{flexDirection: 'column', paddingTop: 20}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingRight: 20,
            paddingLeft: 20,
          }}>
          <Text style={styles.history}>Order History</Text>
          <Pressable onPress={() => navigation.navigate('History')}>
            <Text style={styles.seemore}>See more</Text>
          </Pressable>
        </View>
        <View style={{paddingRight: 0}}>
          <ScrollView
            style={styles.slider}
            horizontal={true}
            showsHorizontalScrollIndicator={false}>
            {history && history.length !== 0 ? (
              history.map((data, index) => {
                return (
                  <Image
                    source={{uri: data.image}}
                    style={styles.imageHistory}
                    key={index}
                  />
                );
              })
            ) : (
              <Text>No Transaction History</Text>
            )}
          </ScrollView>
        </View>
      </View>
      <Divider width={8} style={{width: '100%', marginTop: 15}} />
      <View style={styles.containerNavigation}>
        <Pressable style={styles.button}>
          <Text style={styles.textButton}>Edit Password</Text>
          <IconComunity
            name={'chevron-right'}
            size={20}
            style={styles.arrowButton}
          />
        </Pressable>
      </View>
      <View style={styles.containerNavigation}>
        <Pressable style={styles.button}>
          <Text style={styles.textButton}>FAQ</Text>
          <IconComunity
            name={'chevron-right'}
            size={20}
            style={styles.arrowButton}
          />
        </Pressable>
      </View>
      <View style={styles.containerNavigation}>
        <Pressable style={styles.button}>
          <Text style={styles.textButton}>Help</Text>
          <IconComunity
            name={'chevron-right'}
            size={20}
            style={styles.arrowButton}
          />
        </Pressable>
      </View>
      <View
        style={{
          paddingLeft: 20,
          paddingRight: 20,
          paddingTop: 30,
          paddingBottom: 30,
        }}>
        <ButtonCustom text={'Save'} textColor={'white'} color={'#6A4029'} />
      </View>
    </ScrollView>
  );
}

export default Profile;
