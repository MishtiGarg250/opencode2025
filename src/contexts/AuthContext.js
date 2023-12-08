// AuthContext.js
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setLoggedIn] = useState(false);

  const check_login = () => {
    
    //alert("I'm called")
    if (localStorage.getItem('GithubData') !== null && localStorage.getItem('token')) {
      setLoggedIn(true);
     // alert("I'm set to true");
    }

  };

  const logout = () => {
    // Perform your logout logic here
    localStorage.removeItem('token');
    localStorage.removeItem('GithubData');
    setLoggedIn(false);
  };

  useEffect(() => {
    check_login();
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, check_login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
