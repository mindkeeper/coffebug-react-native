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
import Cart from './src/screens/Cart';
import Delivery from './src/screens/Delivery';
import Payment from './src/screens/Payment';
import History from './src/screens/History';
import Profile from './src/screens/Profile';
import Splashscreen from './src/screens/Splash';
import EditProfile from './src/screens/EditProfile';
import Search from './src/screens/Search';
import Promo from './src/screens/Promo';
import NewProduct from './src/screens/Admin/NewProduct';

function App() {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={'SplashScreen'}>
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

        <Stack.Screen
          component={Splashscreen}
          name="SplashScreen"
          options={{headerShown: false}}
        />
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

        <Stack.Screen
          component={Delivery}
          name="Delivery"
          options={{headerShown: false}}
        />

        <Stack.Screen
          component={Payment}
          name="Payment"
          options={{headerShown: false}}
        />
        <Stack.Screen
          component={History}
          name="History"
          options={{headerShown: false}}
        />
        <Stack.Screen
          component={Profile}
          name="Profile"
          options={{headerShown: false}}
        />
        <Stack.Screen
          component={EditProfile}
          name="EditProfile"
          options={{headerShown: false}}
        />
        <Stack.Screen
          component={Search}
          name="Search"
          options={{headerShown: false}}
        />
        <Stack.Screen
          component={Promo}
          name="Promo"
          options={{headerShown: false}}
        />
        <Stack.Screen
          component={NewProduct}
          name="NewProduct"
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;
