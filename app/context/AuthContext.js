import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native"; // Importing useNavigation hook

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [registeredUsers, setRegisteredUsers] = useState({});
  const navigation = useNavigation(); // Using navigation hook

  useEffect(() => {
    const loadStorageData = async () => {
      const storedUsers = await AsyncStorage.getItem("registeredUsers");
      const storedUser = await AsyncStorage.getItem("currentUser");

      if (storedUsers) setRegisteredUsers(JSON.parse(storedUsers));
      if (storedUser) setUser(JSON.parse(storedUser)); // Fixed typo: 'parsye' -> 'parse'
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
      alert("Successfully logged as " + username + "!");

      await AsyncStorage.setItem("currentUser", JSON.stringify({ username }));
    } else {
      alert("Invalid Username or Password!");
    }
  };

  const logout = async () => {
    setUser(null);
    await AsyncStorage.removeItem("currentUser");

    // Navigate to the login page after logging out
    navigation.navigate("login"); // Ensure "Login" is the name of your login screen in the navigator
  };

  const isLoggedIn = !!user;

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
