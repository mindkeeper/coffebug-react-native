import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import Forgot from './src/screens/auth/Forgot';
import Login from './src/screens/auth/Login';
import Reset from './src/screens/auth/Reset';
import Signup from './src/screens/auth/SignUp';
import Welcome from './src/screens/Welcome';
import Landing from './src/screens/Landing';
import Home from './src/screens/Home';
import ProductDetail from './src/screens/Product';
import {useSelector} from 'react-redux';
import Cart from './src/screens/Cart';

function App() {
  const Stack = createStackNavigator();
  const token = useSelector(state => state.auth.userData.token) || '';
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={token ? 'Home' : 'Landing'}>
        {!token ? (
          <>
            <Stack.Screen
              component={Welcome}
              name="Welcome"
              options={{headerShown: false}}
            />

            <Stack.Screen
              component={Landing}
              name="Landing"
              options={{headerShown: false}}
            />

            <Stack.Screen
              component={Login}
              name="Login"
              options={{headerShown: false}}
            />

            <Stack.Screen
              component={Signup}
              name="Signup"
              options={{headerShown: false}}
            />

            <Stack.Screen
              component={Forgot}
              name="Forgot"
              options={{headerShown: false}}
            />

            <Stack.Screen
              component={Reset}
              name="Reset"
              options={{headerShown: false}}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              component={Home}
              name="Home"
              options={{headerShown: false}}
            />

            <Stack.Screen
              component={ProductDetail}
              name="ProductDetail"
              options={{headerShown: false}}
            />

            <Stack.Screen
              component={Cart}
              name="Cart"
              options={{headerShown: false}}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;
