import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "./context/AuthContext";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(""); // State for error messages
  const { register } = useAuth();
  const router = useRouter();

  const handleRegister = () => {
    // Clear previous error messages
    setError("");

    // Check if any field is empty
    if (username.trim() === "" || password.trim() === "" || confirmPassword.trim() === "") {
      setError("All fields are required!");
      return;
    }

    // Check username length
    if (username.trim().length < 5) {
      setError("Username must be at least 5 characters long.");
      return;
    }

    // Check if password and confirm password match
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    // Check password length
    if (password.trim().length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    

    // Proceed with registration if validation passes
    register(username, password);
    alert("Registration successful! Please log in.");
    router.replace("/login");
  };

  const navigateToLogin = () => {
    router.push("/login"); // Navigate to the login page
  };

  return (
    <ImageBackground
      source={require("./assets/background2.jpg")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>Register</Text>

        {/* Display error message */}
        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <TextInput
          style={styles.input}
          placeholder="Enter your username"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm your password"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={navigateToLogin}>
          <Text style={styles.linkText}>Already have an account? Log In</Text>
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
  overlay: {
    padding: 30,
    backgroundColor: "#7ccfff",
    borderRadius: 15,
    width: "90%",
    elevation: 15,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: "white",
  },
  input: {
    width: "100%",
    padding: 12,
    marginBottom: 20,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 6,
  },
  button: {
    backgroundColor: "#008dfb",
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
    color: "white",
    fontSize: 18,
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginBottom: 10,
  },
});

export default Register;
