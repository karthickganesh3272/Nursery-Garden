import React, { createContext, useReducer, useContext, useEffect } from 'react';

// Create the context
const AppContext = createContext();

// Initial state
const initialState = {
  cart: JSON.parse(localStorage.getItem('cart')) || []
};

// Reducer function
const appReducer = (state, action) => {
  // Inside your reducer function
switch (action.type) {
    case 'ADD_TO_CART':
      // Add to cart logic
      return {
        ...state,
        cart: [...state.cart, { ...action.item, quantity: 1 }],
      };
  
    case 'REMOVE_FROM_CART':
      // Remove from cart logic
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.id),
      };
  
    case 'INCREMENT_ITEM':
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      };
  
    case 'DECREMENT_ITEM':
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.id
            ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 }
            : item
        ),
      };
  
    default:
      return state;
  }
  };

// AppProvider component
export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.cart));
  }, [state.cart]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use context
export const useAppContext = () => useContext(AppContext);
