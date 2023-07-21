import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInUsername, setLoggedInUsername] = useState(null); // 사용자 이름 상태 추가

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, loggedInUsername, setLoggedInUsername}}>
      {children}
    </AuthContext.Provider>
  );
};
