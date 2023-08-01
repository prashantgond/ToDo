import React, {useEffect} from 'react';
import {View, Text, FlatList} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../redux/reducer/combineReducer';
import {fetchProducts} from '../../redux/actions/product.actions';
import ProductList from '../../components/productList/ProductList';
import styles from './home.styles';
import {
  addToCart,
  decreaseQuantity,
  increaseQuantity,
} from '../../redux/actions/cart.actions';
import {Product} from '../../types/type';
import {useNavigation} from '@react-navigation/native';

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<any>();
  const {loading, products, error} = useSelector(
    (state: RootState) => state.products,
  );
  const cartItems = useSelector((state: RootState) => state.cart.items);

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  const handleAddToCart = (item: Product) => {
    const cartItem = {
      ...item,
      quantity: 1,
    };
    const existingItem = cartItems.find(cartItem => cartItem.id === item.id);

    if (existingItem) {
      dispatch(increaseQuantity(item.id));
    } else {
      dispatch(addToCart(cartItem));
    }
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  const productsWithQuantity = products.map(product => ({
    ...product,
    quantity:
      cartItems.find(cartItem => cartItem.id === product.id)?.quantity || 0,
  }));

  // console.log('products', products);

  return (
    <View>
      {cartItems && cartItems?.length > 0 && (
        <Text
          style={styles.cartTextStyle}
          onPress={() => {
            navigation.navigate('Cart');
          }}>
          {'Go To Cart'}
        </Text>
      )}

      <FlatList
        data={productsWithQuantity}
        keyExtractor={item => item.id.toString()}
        renderItem={({item, index}) => (
          <ProductList
            items={item}
            index={index}
            type={'Home'}
            addToCart={(item: Product) => handleAddToCart(item)}
            handleDecreaseQuantity={(itemId: any) =>
              dispatch(decreaseQuantity(itemId))
            }
            handleIncreaseQuantity={(itemId: any) =>
              dispatch(increaseQuantity(itemId))
            }
          />
        )}
      />
    </View>
  );
};

export default Home;
