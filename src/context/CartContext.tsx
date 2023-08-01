import React, {createContext, useState} from 'react';

const CartContext = createContext();

const CartProvider = ({children}) => {
  const [cartItems, setCartItems] = useState<any>([]);

  const addToCart = (item: {id: any; quantity: any}) => {
    const existingItem = cartItems.find(
      (cartItem: {id: any}) => cartItem.id === item.id,
    );

    console.log('existingItem', existingItem);

    if (existingItem) {
      const updatedCartItems = cartItems.map(
        (cartItem: {id: any; quantity: any}) =>
          cartItem.id === item.id
            ? {...cartItem, quantity: cartItem.quantity + item.quantity}
            : cartItem,
      );
      console.log('updatedCartItems', updatedCartItems);

      setCartItems(
        updatedCartItems.filter(
          (item: {quantity: number}) => item.quantity > 0,
        ),
      );
    } else {
      setCartItems((prevCartItems: any) => [
        ...prevCartItems,
        {...item, quantity: item.quantity},
      ]);
    }
  };

  const removeFromCart = (itemId: any) => {
    setCartItems((prevCartItems: any[]) =>
      prevCartItems.filter(item => item.id !== itemId),
    );
  };

  return (
    <CartContext.Provider value={{cartItems, addToCart, removeFromCart}}>
      {children}
    </CartContext.Provider>
  );
};

export {CartContext, CartProvider};
