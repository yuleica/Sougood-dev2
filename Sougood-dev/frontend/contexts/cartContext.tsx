import React, { createContext, useState, useEffect, useContext } from 'react';
import ICartItem from '../types/cart';

type ICartItemsContext = {
  cartItems: ICartItem[],
  getTotalItems: (items: ICartItem[]) => number,
  addToCart: (newItem: ICartItem) => void,
  removeFromCart: (id: string) => void,
} | null;

export const CartItemsContext = createContext<ICartItemsContext>(null);

type Props = {
  children: JSX.Element,
};

export const CartProvider: React.FC<Props>= ({ children }) => {
  const [cartItems, setCartItems] = useState<ICartItem[]>([]);

  useEffect(() => {
    if (localStorage.getItem('cartItems')) setCartItems(JSON.parse(localStorage.getItem('cartItems')!));
  }, []);

  useEffect(() => {
    if (cartItems.length > 0) localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const getTotalItems = (items: ICartItem[]) => items.reduce((acc: number, item) => acc + item.amount, 0);

  const addToCart = (newItem: ICartItem) => {
    setCartItems(prev => {
      const isItemInCart = prev.find(item => item._id === newItem._id);
      
      if (isItemInCart) {
        return prev.map(item => item._id === newItem._id ? { ...item, amount: item.amount + 1 } : item)
      }
      
      return [...prev, { ...newItem, amount: 1 }];
    });

  };

  const removeFromCart = (id: string) => {
    if (cartItems.length === 1) localStorage.setItem('cartItems', '');
    setCartItems((prev: ICartItem[]) => {
      return prev.reduce((acc, item) => {
        if (item._id === id) {
          if (item.amount === 1) return acc;
          return [...acc, { ...item, amount: item.amount - 1 }];
        }

        return [...acc, item];

      }, [] as ICartItem[])
    });
  };

  return (
    <CartItemsContext.Provider value={{ cartItems, getTotalItems, addToCart, removeFromCart }}>
      {children}
    </CartItemsContext.Provider>
  );
};


export function useCartItemsContext() {
  const context = useContext(CartItemsContext);
  if (!context)
    throw new Error('useCartItemContext must be used whitin a AppContextProvider');
  return context;
}