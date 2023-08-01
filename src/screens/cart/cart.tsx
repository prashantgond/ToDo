import React, {useEffect} from 'react';
import {View, Text, FlatList, Button} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../redux/reducer/combineReducer';
import {
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from '../../redux/actions/cart.actions';
import ProductList from '../../components/productList/ProductList';
import {getTotalCost} from '../../utils/calculations';
import {useNavigation} from '@react-navigation/native';

const Cart: React.FC = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<any>();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  useEffect(() => {
    if (cartItems && cartItems.length === 0) {
      navigation.popToTop();
    }
  }, [cartItems]);

  const handleRemoveFromCart = (itemId: number) => {
    dispatch(removeFromCart(itemId));
  };

  console.log('cartItems', cartItems);

  return (
    <View>
      <FlatList
        data={cartItems}
        keyExtractor={item => item.id.toString()}
        renderItem={({item, index}) => (
          <ProductList
            items={item}
            index={index}
            type={'Cart'}
            removeItemFromCart={(itemId: any) => handleRemoveFromCart(itemId)}
            handleDecreaseQuantity={(itemId: any) =>
              dispatch(decreaseQuantity(itemId))
            }
            handleIncreaseQuantity={(itemId: any) =>
              dispatch(increaseQuantity(itemId))
            }
          />
        )}
      />

      <View style={{margin: 20}}>
        <Text style={{color: '#000'}}>Total: ${getTotalCost(cartItems)}</Text>
        <Button title="Checkout" onPress={() => console.log('Checkout')} />
      </View>
    </View>
  );
};

export default Cart;
