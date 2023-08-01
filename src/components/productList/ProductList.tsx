import React from 'react';
import {View, Button, Image} from 'react-native';
import styles from './productList.styles';
import Text from '../text/text';
import {Product} from '../../types/type';

interface TaskListProps {
  items: Product;
  index?: number;
  addToCart?: any;
  removeItemFromCart?: any;
  handleDecreaseQuantity?: any;
  handleIncreaseQuantity?: any;
  type?: string;
}

const ProductList: React.FC<TaskListProps> = ({
  items,
  index,
  addToCart,
  removeItemFromCart,
  handleDecreaseQuantity,
  handleIncreaseQuantity,
  type,
}) => {
  return (
    <View key={index} style={styles.listContainer}>
      <View style={styles.innerConatiner}>
        <View style={styles.imgContainer}>
          <Image
            source={{uri: items?.img}}
            style={styles.imgStyle}
            resizeMode={'contain'}
          />
        </View>
        <View style={styles.itemConatiner}>
          <Text style={styles.headerStyle}>{items?.name}</Text>
          <Text style={styles.priceStyle}>{items?.price}</Text>
        </View>
      </View>

      <View style={styles.buttonStyle}>
        {type === 'Cart' && (
          <Button
            title="Remove Item"
            color="red"
            onPress={() => removeItemFromCart(items?.id)}
          />
        )}

        {items?.quantity === 0 && (
          <Button title="Add To Cart" onPress={() => addToCart(items)} />
        )}
      </View>

      {items?.quantity > 0 ? (
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Button title="-" onPress={() => handleDecreaseQuantity(items?.id)} />
          <Text style={{marginHorizontal: 10, color: '#000'}}>
            {items?.quantity}
          </Text>
          <Button title="+" onPress={() => handleIncreaseQuantity(items?.id)} />
        </View>
      ) : null}
    </View>
  );
};

export default ProductList;
