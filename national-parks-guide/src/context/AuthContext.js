import React, { useContext, useState, useEffect } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, auth } from '../firebase'; 
const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [authenticated, setAuthenticated] = useState(false);
  
    const signup = async (email, password) => {
      await createUserWithEmailAndPassword(auth, email, password);
      //await auth.createUserWithEmailAndPassword(email, password);
      const user = auth.currentUser;
      setCurrentUser(user);
      setAuthenticated(true);
    };
  
    const login = async (email, password) => {
      await signInWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      console.log(user)
      setCurrentUser(user);
      setAuthenticated(true);
    };
  
    const logout = async () => {
      await auth.signOut();
      setAuthenticated(false);
    };
  
    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged((user) => {
        setCurrentUser(user);
        setAuthenticated(!!user); 
      });
  
      return unsubscribe;
    }, []);
  
    const value = {
      currentUser,
      signup,
      login,
      logout,
      authenticated,
    };
  
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
  };

const useAuth = () => {
  return useContext(AuthContext);
};

export { AuthProvider, useAuth };
