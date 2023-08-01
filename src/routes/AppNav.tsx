import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Product from '../screens/Product/Product';
import ProductDetail from '../screens/ProductDetail/ProductDetail';
import ProductCart from '../screens/ProductCart/ProductCart';
import {CartProvider} from '../context/CartContext';

const Stack = createNativeStackNavigator();

const AppNav = () => {
  return (
    <CartProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Product" component={Product} />
          <Stack.Screen name="ProductDetail" component={ProductDetail} />
          <Stack.Screen name="ProductCart" component={ProductCart} />
        </Stack.Navigator>
      </NavigationContainer>
    </CartProvider>
  );
};

export default AppNav;
