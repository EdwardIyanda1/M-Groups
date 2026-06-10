import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('bank_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('bank_user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('bank_user');
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, API_BASE: "https://m-groups.onrender.com/api" }}>
      {children}
    </AuthContext.Provider>
  );
};