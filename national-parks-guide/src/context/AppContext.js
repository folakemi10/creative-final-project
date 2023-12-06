import React, { useContext, createContext } from 'react';
import { AuthProvider } from './AuthContext';

const AppContext = createContext();

const AppProvider = ({ children }) => {
  return (
    <AppContext.Provider>
      <AuthProvider>{children}</AuthProvider>
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, useAppContext };
