import React, {createContext, useContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext({
  isLogin: false,
  handleLogout: () => {},
  setIsLogin: () => {},
});

const useAuthContext = () => useContext(AuthContext);

const AuthProvider = ({children}) => {
  const [isLogin, setIsLogin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Retrieve the login state from AsyncStorage when the app loads
    const checkLoginStatus = async () => {
      try {
        const loginState = await AsyncStorage.getItem('keepLoggedIn');
        if (loginState === 'true') {
          setIsLogin(true);
        }
      } catch (error) {
        console.error('Error fetching login state:', error);
      } finally {
        setLoading(false)
      }
    };
    checkLoginStatus();
  }, []);

  const handleLogout = async () => {
    setIsLogin(false);
    await AsyncStorage.removeItem('keepLoggedIn'); // Remove login state when logging out
  };

  return (
    <AuthContext.Provider
      value={{
        isLogin,
        handleLogout,
        setIsLogin,
        loading, 
        setLoading
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export {AuthProvider, useAuthContext};
