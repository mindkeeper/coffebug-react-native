import React, {useEffect, useState} from 'react';

import DrawerLayout from 'react-native-gesture-handler/DrawerLayout';
import IconFW from 'react-native-vector-icons/FontAwesome';
import Icons from 'react-native-vector-icons/FontAwesome5';
import IconIon from 'react-native-vector-icons/Ionicons';
import IconComunity from 'react-native-vector-icons/MaterialCommunityIcons';
import AntIcons from 'react-native-vector-icons/AntDesign';

import {Divider} from '@rneui/themed';

import styles from './styles';

import {
  View,
  Image,
  Text,
  useWindowDimensions,
  TouchableOpacity,
  Modal,
  Pressable,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import userAction from '../../redux/actions/user';
import authAction from '../../redux/actions/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Navbar({children}) {
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();
  const {height, width} = useWindowDimensions();
  const dispatch = useDispatch();
  const user = useSelector(state => state.profile.profile);
  //   const email = useSelector(state => state.auth.userData.email);
  const auth = useSelector(state => state.auth);

  const logoutHandler = () => {
    const LogoutSuccess = () => {
      ToastAndroid.showWithGravity(
        'Logout successfully',
        ToastAndroid.SHORT,
        ToastAndroid.TOP,
      );
      setModalVisible(false);
      navigation.navigate('Welcome');
      AsyncStorage.clear();
    };
    const LogoutError = error => {
      ToastAndroid.showWithGravityAndOffset(
        `${error}`,
        ToastAndroid.SHORT,
        ToastAndroid.TOP,
        25,
        50,
      );
    };
    dispatch(
      authAction.logoutThunk(auth.userData.token, LogoutSuccess, LogoutError),
    );
  };

  useEffect(() => {
    dispatch(userAction.getUserThunk(auth.userData.token));
  }, [dispatch]);

  const renderDrawer = () => {
    return (
      <View>
        <View style={styles.continerSwipe}>
          <Image source={{uri: user.image}} style={styles.imageDrawer} />
          <Text style={styles.username}>{user.username}</Text>
          <Text style={styles.email}>{user.email}</Text>
        </View>
        <View
          style={{
            paddingLeft: 35,
            paddingRight: 35,
            paddingTop: 20,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}>
          <View>
            <View style={styles.containerBottom}>
              {/* <Icons
                name={'user-circle'}
                size={20}
                style={styles.imageBottom}
              /> */}
              <AntIcons name="user" size={20} style={styles.imageBottom} />
              <Text style={styles.textBottom}>Edit Profile</Text>
            </View>
            <Divider style={{width: '90%', margin: 3}} />
            <View style={styles.containerBottom}>
              {/* <IconComunity
                name={'cart-arrow-down'}
                size={20}
                style={styles.imageBottom}
              /> */}
              <IconComunity
                name="cart-arrow-down"
                size={20}
                style={styles.imageBottom}
              />
              <Text style={styles.textBottom}>Orders</Text>
            </View>
            <Divider style={{width: '90%', margin: 3}} />
            <View style={styles.containerBottom}>
              <IconComunity
                name={'food-outline'}
                size={20}
                style={styles.imageBottom}
              />
              <Text style={styles.textBottom}>All menu</Text>
            </View>
            <Divider style={{width: '90%', margin: 3}} />
            <View style={styles.containerBottom}>
              <Icons
                name={'sticky-note'}
                size={20}
                style={styles.imageBottom}
              />
              <Text style={styles.textBottom}>Privacy policy</Text>
            </View>
            <Divider style={{width: '90%', margin: 3}} />
            <View style={styles.containerBottom}>
              {/* <Image source={IconUser} style={styles.imageBottom}/> */}
              <IconComunity
                name={'shield-half-full'}
                size={20}
                style={styles.imageBottom}
              />
              <Text style={styles.textBottom}>Security</Text>
            </View>
          </View>
          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.containerLogout}
            onPress={() => setModalVisible(true)}>
            <IconFW
              name={'long-arrow-right'}
              size={20}
              style={styles.imageBottom}
            />
            <Text style={styles.textBottom}>Sign-out</Text>
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
              <Text style={styles.modalText}>Are you sure want to logout?</Text>
              <View style={{display: 'flex', flexDirection: 'row'}}>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={logoutHandler}>
                  {auth.isLoading ? (
                    <ActivityIndicator size="small" color="white" />
                  ) : (
                    <Text style={styles.textStyle}>YES</Text>
                  )}
                </Pressable>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}>
                  <Text style={styles.textStyle}>NO</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  };

  return (
    <>
      <DrawerLayout
        drawerWidth={300}
        drawerPosition={DrawerLayout.positions.Left}
        drawerType="front"
        drawerBackgroundColor="#F2F2F2"
        overlayColor="rgba(255, 255, 255, 0.8)"
        drawerContainerStyle={{borderTopRightRadius: 30}}
        renderNavigationView={renderDrawer}>
        <View style={styles.sectionContainer}>
          <View onPress={() => DrawerLayout.current.openDrawer()}>
            <IconComunity
              name={'chevron-double-right'}
              style={{fontSize: 40, color: '#6A4029'}}
            />
          </View>
          <View style={styles.left}>
            <Icons
              name={'rocketchat'}
              style={{
                transform: [{rotateY: '180deg'}],
                fontSize: 25,
                marginHorizontal: 7,
              }}
            />
            <IconIon name={'search-outline'} style={styles.Icons} />
            <IconIon name={'cart-outline'} style={styles.Icons} />
          </View>
        </View>
        {children}
      </DrawerLayout>
    </>
  );
}

export default Navbar;
