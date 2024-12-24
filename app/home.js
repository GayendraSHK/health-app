import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity, Image } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';
import { useAuth } from "./context/AuthContext";

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
  const [clickCount, setClickCount] = useState(0);

  const fetchHealthTips = async () => {
    setLoading(true);
    try {
      const tips = [];
      for (let i = 0; i < 5; i++) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const response = await axios.get('https://zenquotes.io/api/random');
        const imageResponse = await axios.get('https://picsum.photos/200');

        if (response.data && response.data.length > 0) {
          const randomTip = response.data[0];
          tips.push({
            quote: randomTip.q,
            author: randomTip.a,
            imageUrl: imageResponse.request.responseURL
          });
        }
      }

      setHealthTips(tips);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching health tips:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHealthTips();
  }, []);

  return (
    <LinearGradient colors={['#fff', '#79DCD5']} style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Hello, {user?.username ?? 'Guest'}!</Text>
          <Text style={styles.subtitle}>Welcome to the HealthApp</Text>
        </View>
        <TouchableOpacity style={styles.logoutButtonHeader} onPress={() => logout()}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.contentContainer}>
        {loading ? (
          <ActivityIndicator size="large" color="#66BFBF" />
        ) : (
          <FlatList
            keyExtractor={(item, index) => index.toString()}
            data={healthTips}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => setClickCount((prevCount) => prevCount + 1)}
              >
                <View style={styles.card}>
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

      <FloatingButton count={clickCount} />

      <View style={styles.bottomButtons}>
        <TouchableOpacity style={styles.moreTipsButton} onPress={fetchHealthTips}>
          <Text style={styles.moreTipsText}>Get New Tips</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#004D40',
  },
  subtitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#757575',
  },
  contentContainer: {
    flex: 1,
  },
  card: {
    backgroundColor: '#F5F5F5',
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
    color: '#FFC107',
  },
  healthTip: {
    fontSize: 16,
    color: '#00796B',
    marginBottom: 5,
  },
  author: {
    fontSize: 14,
    color: '#6D6D6D',
  },
  floatingButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    backgroundColor: '#66BFBF',
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
    paddingVertical: 10,
  },
  moreTipsButton: {
    backgroundColor: '#FFC107',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  moreTipsText: {
    color: '#fff',
    fontSize: 16,
  },
  logoutButtonHeader: {
    backgroundColor: '#004D40',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  logoutText: {
    color: '#fff',
    fontSize: 14,
  },
});

export default Home;
