import React, {useState, useEffect} from 'react';

import logo from '../../assets/images/logo.png';
// import AnimatedLoader from 'react-native-animated-loader';
import {useNavigation} from '@react-navigation/native';
import {StackActions} from '@react-navigation/native';

import {Image, View, StyleSheet} from 'react-native';

import {useDispatch, useSelector} from 'react-redux';
import userAction from '../../redux/actions/user';
import {clearState} from '../../modules/helper/clearState';

function Splashscreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const token = useSelector(state => state.auth.userData.token);
  // const [visible, setVisible] = useState(true);
  const navigateStarted = () => {
    clearState(dispatch);
    navigation.dispatch(StackActions.replace('Welcome'));
  };
  const navigateHome = () => navigation.dispatch(StackActions.replace('Home'));

  useEffect(() => {
    dispatch(userAction.getUserThunk(token, navigateHome, navigateStarted));
  });
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#F3F3F3',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Image source={logo} style={{width: 300, height: 300}} />
    </View>
  );
}

const styles = StyleSheet.create({
  lottie: {
    paddingTop: 150,
    width: 100,
    height: 100,
  },
});

export default Splashscreen;
