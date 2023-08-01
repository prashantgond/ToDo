import React, {useContext, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  Button,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import {CartContext} from '../../context/CartContext';
import {useNavigation} from '@react-navigation/native';

const ProductCart = () => {
  const navigation = useNavigation<any>();
  const {cartItems, removeFromCart, addToCart} = useContext<any>(CartContext);

  useEffect(() => {
    if (cartItems && cartItems.length === 0) {
      navigation.popToTop();
    }
  }, [cartItems]);

  const getTotalCost = () => {
    return cartItems.reduce(
      (total: number, item: {price: number; quantity: number}) =>
        total + item.price * item.quantity,
      0,
    );
  };

  const renderItem = ({item, index}) => (
    <TouchableOpacity style={styles.taskItem} key={index}>
      <View style={{flexDirection: 'row'}}>
        <View style={{flex: 3}}>
          <Image
            source={{uri: item?.thumbnail}}
            style={{height: 100, width: '80%'}}
          />
        </View>
        <View style={styles.itemConatiner}>
          <Text style={styles.headerStyle}>{item.title}</Text>
          <Text style={styles.textStyle}>{item.description}</Text>
        </View>
      </View>

      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Button title="-" onPress={() => addToCart({...item, quantity: -1})} />
        <Text style={{marginHorizontal: 10, color: '#000'}}>
          {item.quantity}
        </Text>
        <Button title="+" onPress={() => addToCart({...item, quantity: 1})} />
      </View>

      <TouchableOpacity
        style={{
          height: 40,
          width: 100,
          justifyContent: 'center',
          alignItems: 'center',
          alignSelf: 'flex-end',
          backgroundColor: 'red',
        }}
        onPress={() => removeFromCart(item.id)}>
        <Text style={{fontSize: 15, color: '#fff'}}>{'Remove'}</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  console.log('cartItems', cartItems);

  return (
    <View style={{flex: 1}}>
      <View style={{flex: 8}}>
        <FlatList
          data={cartItems}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </View>

      <View style={{margin: 20}}>
        <Text style={{color: '#000'}}>Total: ${getTotalCost()}</Text>
        <Button title="Checkout" onPress={() => console.log('Checkout')} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    padding: 10,
    backgroundColor: '#F7F4F4',
  },
  listHeader: {
    fontSize: 18,
    fontWeight: '500',
    color: '#000',
    paddingBottom: 10,
  },
  taskItem: {
    minHeight: 30,
    padding: 10,
    // flexDirection: 'row',
    borderColor: 'lightgray',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 8,
  },
  itemConatiner: {
    flex: 8,
  },
  headerStyle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
  },
  textStyle: {
    fontSize: 14,
    fontWeight: '400',
    color: '#000',
  },
  deleteButtonContainer: {
    flex: 2,
    alignItems: 'center',
  },
  deleteButton: {
    color: 'red',
  },
  sectionHeader: {
    backgroundColor: '#f9f9f9',
    paddingVertical: 5,
    paddingHorizontal: 10,
    fontWeight: 'bold',
  },
});

export default ProductCart;
