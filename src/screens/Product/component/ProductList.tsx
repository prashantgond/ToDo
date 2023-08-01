import {useNavigation} from '@react-navigation/native';
import React, {useContext} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
  Button,
} from 'react-native';
import {CartContext} from '../../../context/CartContext';

interface TaskListProps {
  products: any;
  changeProdcutStatus?: any;
}

const ProductList: React.FC<TaskListProps> = ({
  products,
  changeProdcutStatus,
}) => {
  const navigation = useNavigation<any>();
  const {cartItems, addToCart} = useContext<any>(CartContext);

  const getCartItemQuantity = (itemId: any) => {
    const cartItem = cartItems.find((item: {id: any}) => item.id === itemId);
    return cartItem ? cartItem.quantity : 0;
  };

  const renderProdcutItem = ({item, index}: {item: any; index: number}) => {
    return (
      <TouchableOpacity
        style={styles.taskItem}
        onPress={() =>
          navigation.navigate('ProductDetail', {
            productData: item,
          })
        }>
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

        {item?.status ? (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              alignSelf: 'flex-end',
            }}>
            <Button
              title="-"
              onPress={() => {
                addToCart({...item, quantity: -1});
              }}
            />
            <Text style={{marginHorizontal: 10, color: '#000'}}>
              {getCartItemQuantity(item.id)}
            </Text>
            <Button
              title="+"
              onPress={() => {
                addToCart({...item, quantity: 1});
              }}
            />
          </View>
        ) : (
          <TouchableOpacity
            style={{
              height: 40,
              width: 100,
              justifyContent: 'center',
              alignItems: 'center',
              alignSelf: 'flex-end',
              backgroundColor: '#2AB5DA',
            }}
            onPress={() => {
              addToCart({...item, quantity: 1, status: true});
              changeProdcutStatus(item);
            }}>
            <Text style={{fontSize: 15, color: '#fff'}}>{'Add To Cart'}</Text>
          </TouchableOpacity>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.listContainer}>
      <FlatList
        data={products}
        showsVerticalScrollIndicator={false}
        renderItem={renderProdcutItem}
        keyExtractor={item => item.id.toString()}
      />
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

export default ProductList;
