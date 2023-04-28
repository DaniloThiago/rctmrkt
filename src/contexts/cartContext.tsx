import { createContext, useState, ReactNode, FC } from "react";

export interface CartItem {
  id: number;
  title: string;
  description: string;
  price: number;
  images: string[];
  quantity?: number;
}

export interface CartContextProps {
  cartItems: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (item: CartItem) => void;
  deleteItem: (item: CartItem) => void;
  clearCart: () => void;
  getCount: () => number;
  getTotal: () => number;
}

export const CartContext = createContext<CartContextProps>({
  cartItems: [],
  addItem: () => {},
  removeItem: () => {},
  deleteItem: () => {},
  clearCart: () => {},
  getCount: () => 0,
  getTotal: () => 0,
});

export const CartProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addItem = (item: CartItem) => {
    const existingItemIndex = cartItems.findIndex((cartItem) => cartItem.id === item.id);
    if (existingItemIndex !== -1) {
      const updatedCartItems = [...cartItems];
      const existingCartItem = updatedCartItems[existingItemIndex];
      if (existingCartItem.quantity !== undefined) {
        existingCartItem.quantity += 1;
      } else {
        existingCartItem.quantity = 1;
      }
      setCartItems(updatedCartItems);
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
  };

  const removeItem = (item: CartItem) => {
    const existingItemIndex = cartItems.findIndex((cartItem) => cartItem.id === item.id);
    if (existingItemIndex !== -1) {
      const existingItem = cartItems[existingItemIndex];
      if (existingItem.quantity === 1) {
        const newCartItems = cartItems.filter((cartItem) => cartItem.id !== item.id);
        setCartItems(newCartItems);
      } else {
        const updatedCartItems = [...cartItems];
        const existingCartItem = updatedCartItems[existingItemIndex];
        if (existingCartItem.quantity !== undefined) {
          existingCartItem.quantity -= 1;
        }
        setCartItems(updatedCartItems);
      }
    }
  };
  

  const clearCart = () => {
    setCartItems([]);
  };

  const deleteItem = (item: CartItem) => {
    const existingItemIndex = cartItems.findIndex((cartItem) => cartItem.id === item.id);
    if (existingItemIndex !== -1) {
      const newCartItems = cartItems.filter((cartItem) => cartItem.id !== item.id);
      setCartItems(newCartItems);
    }
  }

  const getCount = (): number => cartItems.reduce((total, item) => total + (item.quantity || 0), 0);
  const getTotal = (): number => cartItems.reduce((total, item) => total + item.price*(item.quantity || 0), 0);

  return (
    <CartContext.Provider value={{ cartItems, addItem, removeItem, deleteItem, clearCart, getCount, getTotal }} >
      {children}
    </CartContext.Provider>
  );
};
