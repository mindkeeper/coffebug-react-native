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
  TouchableOpacity,
  Modal,
  Pressable,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import authAction from '../../redux/actions/auth';
import {clearState} from '../../modules/helper/clearState';

function Navbar({children}) {
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const user = useSelector(state => state.profile.profile);
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
      clearState(dispatch);
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

  const renderDrawer = () => {
    return (
      <View>
        <Pressable
          style={styles.continerSwipe}
          onPress={() => navigation.navigate('Profile')}>
          <Image source={{uri: user.image}} style={styles.imageDrawer} />
          <Text style={styles.username}>
            {user.display_name ? `${user.display_name}` : 'Your username here'}
          </Text>
          <Text style={styles.email}>{user.email}</Text>
        </Pressable>
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
            <Pressable
              style={styles.containerBottom}
              onPress={() => navigation.navigate('EditProfile')}>
              <AntIcons name="user" size={20} style={styles.imageBottom} />
              <Text style={styles.textBottom}>Edit Profile</Text>
            </Pressable>
            <Divider style={{width: '90%', margin: 3}} />
            <View style={styles.containerBottom}>
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
            <Pressable
              onPress={() => navigation.navigate('History')}
              style={styles.containerBottom}>
              <Icons
                name={'sticky-note'}
                size={20}
                style={styles.imageBottom}
              />
              <Text style={styles.textBottom}>History</Text>
            </Pressable>
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
