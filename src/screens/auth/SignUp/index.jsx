import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Image,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';

import bg from '../../../assets/images/bgSignup.png';
import google from '../../../assets/images/google.png';
import styles from './styles';
import Input from '../../../components/Input';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import authAction from '../../../redux/actions/auth';

const Signup = () => {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  const navigation = useNavigation();
  const [form, setForm] = useState({
    email: '',
    password: '',
    phone: '',
  });

  const onChangeHandler = (text, type) => {
    setForm(form => ({...form, [type]: text}));
  };

  const handleSubmit = e => {
    e.preventDefault();

    const registSuccess = () => {
      ToastAndroid.showWithGravity(
        `Congrats, register successfully!`,
        ToastAndroid.SHORT,
        ToastAndroid.TOP,
      );
      navigation.navigate('Login');
    };

    const registError = error => {
      ToastAndroid.showWithGravity(
        `${error}`,
        ToastAndroid.SHORT,
        ToastAndroid.TOP,
      );
    };

    dispatch(authAction.registerThunk(form, registSuccess, registError));
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={bg} resizeMode="cover" style={styles.bg}>
        <View style={styles.content}>
          <Text style={styles.title}>Sign Up</Text>
          <Input
            value={form.email}
            placeholder="Enter your email address"
            isPassword={false}
            type="email-address"
            handler={onChangeHandler}
            text={'email'}
          />
          <Input
            value={form.password_user}
            placeholder="Enter your password"
            isPassword={true}
            type="none"
            handler={onChangeHandler}
            text={'password'}
          />
          <Input
            value={form.phone_number}
            placeholder="Enter your phone number"
            isPassword={false}
            type="phone-pad"
            handler={onChangeHandler}
            text={'phone'}
          />
          <TouchableOpacity style={styles.createBtn} onPress={handleSubmit}>
            {/* {auth.isLoading ? (
              <View style={styles.btnLoading}>
                <ActivityIndicator size="large" color="white" />
              </View>
            ) : (
            )} */}
            <Text style={styles.textCreate}>Create Account</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.googleBtn}>
            <View style={styles.googleContainer}>
              <Image source={google} />
              <Text style={styles.textGoogle}>Create with Google</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Signup;
