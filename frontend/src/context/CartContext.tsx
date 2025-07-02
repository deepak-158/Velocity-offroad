import React, { createContext, useState, useContext, useEffect } from 'react';

interface CartItem {
  _id: string;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
  size?: string;
  color?: string;
  discountPercentage?: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>, quantity?: number) => void;
  removeFromCart: (itemId: string, size?: string, color?: string) => void;
  updateQuantity: (itemId: string, quantity: number, size?: string, color?: string) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartTotal, setCartTotal] = useState<number>(0);
  const [cartCount, setCartCount] = useState<number>(0);

  // Load cart from localStorage on initial render
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        setCartItems(JSON.parse(savedCart));
      }
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
    }
  }, []);

  // Update localStorage whenever cart changes
  useEffect(() => {
    try {
      localStorage.setItem('cart', JSON.stringify(cartItems));
      
      // Calculate totals
      const total = cartItems.reduce((sum, item) => {
        const itemPrice = item.discountPercentage 
          ? item.price * (1 - item.discountPercentage / 100) 
          : item.price;
        return sum + (itemPrice * item.quantity);
      }, 0);
      
      const count = cartItems.reduce((sum, item) => sum + item.quantity, 0);
      
      setCartTotal(total);
      setCartCount(count);
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
    }
  }, [cartItems]);

  const addToCart = (item: Omit<CartItem, 'quantity'>, quantity: number = 1) => {
    setCartItems(prevItems => {
      // Check if item already exists with same size and color
      const existingItemIndex = prevItems.findIndex(
        cartItem => 
          cartItem._id === item._id && 
          cartItem.size === item.size && 
          cartItem.color === item.color
      );

      if (existingItemIndex !== -1) {
        // Update quantity of existing item
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += quantity;
        return updatedItems;
      } else {
        // Add new item
        return [...prevItems, { ...item, quantity }];
      }
    });
  };

  const removeFromCart = (itemId: string, size?: string, color?: string) => {
    setCartItems(prevItems => 
      prevItems.filter(item => 
        !(item._id === itemId && 
          item.size === size && 
          item.color === color)
      )
    );
  };

  const updateQuantity = (itemId: string, quantity: number, size?: string, color?: string) => {
    if (quantity <= 0) {
      removeFromCart(itemId, size, color);
      return;
    }

    setCartItems(prevItems => 
      prevItems.map(item => 
        item._id === itemId && 
        item.size === size && 
        item.color === color
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartTotal,
    cartCount
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}; 