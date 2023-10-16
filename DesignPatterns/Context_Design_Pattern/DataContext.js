// DataContext.js
import React, { createContext, useContext, useReducer } from 'react';

// Create a context and provide a default value
const DataContext = createContext();

// Create a custom provider component that will wrap your app
const DataProvider = ({ children }) => {
  const [data, dispatch] = useReducer(dataReducer, initialData);

  return (
    <DataContext.Provider value={{ data, dispatch }}>
      {children}
    </DataContext.Provider>
  );
};

const dataReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_DATA':
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

const initialData = {
  name: 'John Doe',
  age: 30,
};

export { DataContext, DataProvider };
