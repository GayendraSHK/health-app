import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import { useAuth } from "./context/AuthContext";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [error, setError] = useState(""); // State for holding error messages
  const { login } = useAuth(); // Assume login returns a boolean indicating success or failure
  const router = useRouter();

  const handleLogin = async () => {
    // Clear any previous errors
    setError("");

    // Check if fields are empty
    if (username.trim() === "" || password.trim() === "") {
      setError("Both username and password are required.");
      return;
    }

    // Check for username length
    if (username.trim().length < 3) {
      setError("Username must be at least 3 characters long.");
      return;
    }

    // Check for password length
    if (password.trim().length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    // Validate credentials with the login function
    const isLoginSuccessful = await login(username, password);

    if (isLoginSuccessful) {
      router.push("/home"); // Navigate to home on success
    } else {
      setError("Invalid username or password. Please try again."); // Display error on failure
    }
  };

  const navigateToRegister = () => {
    router.push("/register"); // Navigate to register
  };

  return (
    <ImageBackground
      source={require("./assets/background1.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>Login</Text>

        {/* Display error message if validation fails */}
        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <TextInput
          style={styles.input}
          placeholder="Enter Your Username"
          value={username}
          onChangeText={setUsername}
        />
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Enter Your Password"
            secureTextEntry={!showPassword} // Toggle secureTextEntry based on showPassword
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity
            onPress={() => setShowPassword((prev) => !prev)}
            style={styles.eyeIcon}
          >
            <Icon
              name={showPassword ? "visibility" : "visibility-off"} // Change icon based on state
              size={24}
              color="gray"
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={navigateToRegister}>
          <Text style={styles.linkText}>Don't have an account? Register</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: "004D40",
  },
  input: {
    width: "100%",
    padding: 10,
    marginBottom: 20,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 6,
  },
  overlay: {
    padding: 30,
    backgroundColor: "#79DCD5",
    borderRadius: 14,
    width: "90%",
    elevation: 15, // adds shadow
  },
  button: {
    backgroundColor: "#004D40",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 14,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  linkText: {
    color: "#004D40",
    fontSize: 18,
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginBottom: 10,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 6,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 10,
  },
  eyeIcon: {
    marginLeft: 10,
  },
});

export default Login;
