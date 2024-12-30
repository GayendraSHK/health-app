import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [registeredUsers, setRegisteredUsers] = useState({});
  const navigation = useNavigation();

  useEffect(() => {
    const loadStorageData = async () => {
      const storedUsers = await AsyncStorage.getItem("registeredUsers");
      const storedUser = await AsyncStorage.getItem("currentUser");

      if (storedUsers) setRegisteredUsers(JSON.parse(storedUsers));
      if (storedUser) setUser(JSON.parse(storedUser));
    };
    loadStorageData();
  }, []);

  const register = async (username, password) => {
    const updatedUsers = { ...registeredUsers, [username]: password };
    setRegisteredUsers(updatedUsers);
    await AsyncStorage.setItem("registeredUsers", JSON.stringify(updatedUsers));
  };

  const login = async (username, password) => {
    if (registeredUsers[username] && registeredUsers[username] === password) {
      setUser({ username });
      alert("Successfully logged in as " + username + "!");
      await AsyncStorage.setItem("currentUser", JSON.stringify({ username }));
      return true; 
    } else {
      alert("Invalid Username or Password!");
      return false;
    }
  };

  const logout = async () => {
    setUser(null);
    await AsyncStorage.removeItem("currentUser");
    navigation.navigate("login");
  };

  const isLoggedIn = !!user;

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
