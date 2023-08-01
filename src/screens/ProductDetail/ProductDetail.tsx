import React, {useContext} from 'react';
import {
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {CartContext} from '../../context/CartContext';

const ProductDetail = props => {
  const navigation = useNavigation<any>();
  const {productData} = props.route.params;
  const {cartItems, addToCart} = useContext<any>(CartContext);
  console.log('navigation', productData);
  console.log('cartItems', cartItems);

  const isItemInCart = cartItems.some((item: { id: any; }) => item.id === productData.id);

  return (
    <View style={{flex: 1, paddingHorizontal: 10}}>
      <View style={{flex: 8}}>
        <Image
          source={{uri: productData?.thumbnail}}
          style={{height: '40%', width: '100%'}}
          resizeMode="contain"
        />
        <Text style={styles.headerStyle}>{productData.title}</Text>
        <Text style={styles.textStyle}>{productData.description}</Text>
      </View>

      <View
        style={{
          flex: 2,
          justifyContent: 'flex-end',
          marginBottom: 10,
        }}>
        <TouchableOpacity
          onPress={() =>
            isItemInCart
              ? navigation.navigate('ProductCart')
              : addToCart({...productData, quantity: 1})
          }
          style={{
            height: 50,
            width: '90%',
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            backgroundColor: '#2AB5DA',
          }}>
          <Text style={{fontSize: 15, color: '#fff'}}>
            {isItemInCart ? 'Go To Cart' : 'Add To Cart'}
          </Text>
        </TouchableOpacity>
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
    flexDirection: 'row',
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

export default ProductDetail;
