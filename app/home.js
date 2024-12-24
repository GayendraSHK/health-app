import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity, Image } from "react-native";
import axios from 'axios'; // Import axios to make API requests
import { useAuth } from "./context/AuthContext"; // Ensure you have this context set up

// Floating button to display the click count
const FloatingButton = ({ count }) => {
  return (
    <TouchableOpacity style={styles.floatingButton}>
      <Text style={styles.floatingButtonText}>{count}</Text>
    </TouchableOpacity>
  );
};

const Home = () => {
  const { user, logout } = useAuth();
  const [loading, setLoading] = useState(true);
  const [healthTips, setHealthTips] = useState([]);
  const [clickCount, setClickCount] = useState(0); // Track click count

  // Function to fetch health tips and random images
  const fetchHealthTips = async () => {
    setLoading(true); // Show loading indicator while fetching
    try {
      const tips = []; // To store multiple tips

      // Fetching 5 random health tips with a 1-second interval
      for (let i = 0; i < 5; i++) {
        // Introduce a 1-second delay between each API request
        await new Promise((resolve) => setTimeout(resolve, 1000));  // 1000 ms = 1 second
        const response = await axios.get('https://zenquotes.io/api/random');
        const imageResponse = await axios.get('https://picsum.photos/200'); // Fetch random image from Picsum API

        if (response.data && response.data.length > 0) {
          const randomTip = response.data[0]; // Get the first quote from the response
          tips.push({
            quote: randomTip.q,
            author: randomTip.a,
            imageUrl: imageResponse.request.responseURL // URL of the random image from Picsum
          }); // Add the fetched advice and image URL to the tips array
        }
      }

      setHealthTips(tips); // Update state with the fetched tips
      setLoading(false);
    } catch (error) {
      console.error("Error fetching health tips:", error);
      setLoading(false);
    }
  };

  // Fetch tips on initial load
  useEffect(() => {
    fetchHealthTips();
  }, []); // Empty dependency array to run only once when the component mounts

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome, {user?.username ?? 'Guest'}!</Text>

      {/* Main content container */}
      <View style={styles.contentContainer}>
        {loading ? (
          <ActivityIndicator size="large" color="#008dfb" />
        ) : (
          <FlatList
            keyExtractor={(item, index) => index.toString()}
            data={healthTips}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => setClickCount((prevCount) => prevCount + 1)} // Increment count on item click
              >
                <View style={styles.card}>
                  {/* Display the image */}
                  <Image source={{ uri: item.imageUrl }} style={styles.cardImage} />
                  <Text style={styles.cardTitle}>Health Tip</Text>
                  <Text style={styles.healthTip}>{item.quote ?? 'No advice available'}</Text>
                  <Text style={styles.author}>- {item.author ?? 'Unknown Author'}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        )}
      </View>

      {/* Floating button displaying click count */}
      <FloatingButton count={clickCount} />

      {/* Buttons row at the bottom */}
      <View style={styles.bottomButtons}>
        {/* More Tips Button */}
        <TouchableOpacity style={styles.moreTipsButton} onPress={fetchHealthTips}>
          <Text style={styles.moreTipsText}>Get New Tips</Text>
        </TouchableOpacity>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={() => logout()}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  contentContainer: {
    flex: 1,
  },
  card: {
    backgroundColor: '#f9f9f9',
    marginVertical: 10,
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  cardImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  healthTip: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  author: {
    fontSize: 14,
    color: '#555',
  },
  floatingButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    backgroundColor: '#008dfb',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  floatingButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  bottomButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
  },
  moreTipsButton: {
    backgroundColor: '#008dfb',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  moreTipsText: {
    color: '#fff',
    fontSize: 16,
  },
  logoutButton: {
    backgroundColor: '#f44336',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Home;
