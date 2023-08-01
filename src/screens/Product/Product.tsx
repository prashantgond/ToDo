import React, {useContext, useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import ProductList from './component/ProductList';
import {useNavigation} from '@react-navigation/native';
import {CartContext} from '../../context/CartContext';

const Product = ({}) => {
  const navigation = useNavigation();
  const [products, setProducts] = useState<any>([]);
  const [initialProducts, setInitialProducts] = useState<any>([]);
  const [sortOrder, setSortOrder] = useState('default');
  const {cartItems} = useContext<any>(CartContext);

  useEffect(() => {
    fetchProductData();
  }, []);

  const fetchProductData = () => {
    const endPointUrl = `https://dummyjson.com/products`;

    fetch(endPointUrl)
      .then(response => response.json())
      .then(data => {
        console.log('data', data);
        setProducts(data?.products);
        setInitialProducts(data?.products);
      })
      .catch(error => {
        setProducts([]);
        setInitialProducts([]);
      });
  };

  const sortProducts = (order: any) => {
    switch (order) {
      case 'priceAscending':
        setProducts([...products].sort((a, b) => a.price - b.price));
        break;
      case 'priceDescending':
        setProducts([...products].sort((a, b) => b.price - a.price));
        break;
      case 'ratingAscending':
        setProducts([...products].sort((a, b) => a.rating - b.rating));
        break;
      case 'ratingDescending':
        setProducts([...products].sort((a, b) => b.rating - a.rating));
        break;
      default:
        setProducts([...products]);
        break;
    }
    setSortOrder(order);
  };

  const filterProducts = (slectedItem: any) => {
    switch (slectedItem) {
      case 'All Brands':
        setProducts(
          [...initialProducts].filter(item => item.brand !== 'All Brands'),
        );
        break;
      case 'All Categories':
        setProducts(
          [...initialProducts].filter(item => item.brand !== 'All Categories'),
        );
        break;
      case 'laptops':
        setProducts(
          [...initialProducts].filter(item => item.category === 'laptops'),
        );
        break;
      case 'Apple':
        setProducts(
          [...initialProducts].filter(item => item.brand !== 'Apple'),
        );
        break;
      default:
        setProducts([...initialProducts]);
        break;
    }
  };

  const changeProdcutStatus = (item: {id: any}) => {
    const existingItemIndex = products.findIndex(
      (products: {id: any}) => products.id === item.id,
    );

    if (existingItemIndex !== -1) {
      const updatedCartItems = [...products];
      updatedCartItems[existingItemIndex] = {...item, status: true};
      setProducts(updatedCartItems);
    } else {
      setProducts((prevCartItems: any) => [...prevCartItems, {...item}]);
    }
  };

  console.log('products', products);

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          marginHorizontal: 20,
        }}>
        <View style={{flex: 1}}>
          <Text style={styles.listHeader}>{'List of Products'}</Text>
        </View>

        <View style={{flex: 1, alignItems: 'flex-end'}}>
          {cartItems && cartItems?.length > 0 && (
            <Text
              onPress={() => navigation.navigate('ProductCart')}
              style={[styles.listHeader, {color: 'green'}]}>
              {'Go To Cart'}
            </Text>
          )}
        </View>
      </View>

      <View style={styles.filterContainer}>
        {/* Sorting Buttons */}
        <TouchableOpacity
          style={[
            styles.filterButton,
            sortOrder === 'priceAscending' && styles.activeFilter,
          ]}
          onPress={() => sortProducts('priceAscending')}>
          <Text style={{color: '#000'}}>Price (Low to High)</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterButton,
            sortOrder === 'priceDescending' && styles.activeFilter,
          ]}
          onPress={() => sortProducts('priceDescending')}>
          <Text style={{color: '#000'}}>Price (High to Low)</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[
            styles.filterButton,
            sortOrder === 'ratingAscending' && styles.activeFilter,
          ]}
          onPress={() => sortProducts('ratingAscending')}>
          <Text style={{color: '#000'}}>Rating (Low to High)</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterButton,
            sortOrder === 'ratingDescending' && styles.activeFilter,
          ]}
          onPress={() => sortProducts('ratingDescending')}>
          <Text style={{color: '#000'}}>Rating (High to Low)</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.filterContainer}>
        {/* Filter by Brand */}
        <TouchableOpacity
          style={[styles.filterButton]}
          onPress={() => filterProducts('All Brands')}>
          <Text style={{color: '#000'}}>All Brands</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton]}
          onPress={() => filterProducts('Apple')}>
          <Text style={{color: '#000'}}>Apple</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.filterContainer}>
        {/* Filter by Category */}
        <TouchableOpacity
          style={[styles.filterButton]}
          onPress={() => filterProducts('All Categories')}>
          <Text style={{color: '#000'}}>All Categories</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton]}
          onPress={() => filterProducts('laptops')}>
          <Text style={{color: '#000'}}>Laptops</Text>
        </TouchableOpacity>
      </View>

      {products && products?.length > 0 && (
        <ProductList
          products={products}
          changeProdcutStatus={changeProdcutStatus}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerStyle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
  },
  listHeader: {
    fontSize: 18,
    fontWeight: '500',
    color: '#000',
    paddingVertical: 10,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  filterButton: {
    width: '48%',
    padding: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  activeFilter: {
    backgroundColor: '#ddd',
  },
  applyFilterButton: {
    backgroundColor: 'blue',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    alignSelf: 'center',
    marginVertical: 10,
  },
});

export default Product;
