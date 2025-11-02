// AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import { auth } from '../firebase'; // Імпортуйте ваш Firebase конфігурацію

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(setUser);
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
