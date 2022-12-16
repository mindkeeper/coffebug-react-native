import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Image,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';

import styles from './styles';
import Input from '../../../components/Input';
import google from '../../../assets/images/google.png';
import {useDispatch, useSelector} from 'react-redux';
import authAction from '../../../redux/actions/auth';
import {useNavigation} from '@react-navigation/native';
import userAction from '../../../redux/actions/user';

const Login = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const auth = useSelector(state => state.auth);
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const onChangeHandler = (text, type) => {
    setForm(form => ({...form, [type]: text}));
  };

  const handleSubmit = e => {
    e.preventDefault();

    const loginSuccess = token => {
      ToastAndroid.showWithGravity(
        `Welcome ${form.email}, login successfully`,
        ToastAndroid.SHORT,
        ToastAndroid.TOP,
      );
      dispatch(userAction.getUserThunk(token));
      navigation.navigate('Home');
    };
    const loginError = error => {
      ToastAndroid.showWithGravity(
        `${error}`,
        ToastAndroid.SHORT,
        ToastAndroid.TOP,
      );
    };
    dispatch(authAction.loginThunk(form, loginSuccess, loginError));
  };
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../../assets/images/bgLogin.png')}
        resizeMode="cover"
        style={styles.bg}>
        <View style={styles.content}>
          <Text style={styles.title}>Login</Text>
          <Input
            value={form.email}
            handler={onChangeHandler}
            placeholder="Enter your email address"
            isPassword={false}
            type={'email-address'}
            text={'email'}
          />
          <Input
            value={form.password}
            handler={onChangeHandler}
            placeholder="Enter your password"
            isPassword={true}
            text={'password'}
          />
          <Text
            style={styles.forgot}
            onPress={() => {
              navigation.navigate('Forgot');
            }}>
            Forgot Password?
          </Text>
          <TouchableOpacity style={styles.createBtn} onPress={handleSubmit}>
            {auth.isLoading ? (
              <View style={styles.btnLoading}>
                <ActivityIndicator size="large" color="black" />
              </View>
            ) : (
              <Text style={styles.textCreate}>Login</Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity style={styles.googleBtn}>
            <View style={styles.googleContainer}>
              <Image source={google} />
              <Text style={styles.textGoogle}>Login with Google</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};
export default Login;
