import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import GameCard from '../components/GameCard';

export default function AccessoriesCatalogScreen({ onLogout, API_URL }) {
  const [accessories, setAccessories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/productos/accesorio`)
      .then(res => res.json())
      .then(data => {
        setAccessories(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [API_URL]);

  if (loading) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color="#00d4ff" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      <Text style={styles.header}>Gaming Galaxy Store</Text>
      <View style={styles.list}>
        {accessories.map(accessory => (
          <GameCard 
            key={accessory.id} 
            title={accessory.title} 
            price={accessory.price} 
            category={accessory.category} 
            image={accessory.image} 
          />
        ))}
      </View>
      <TouchableOpacity onPress={onLogout} style={styles.logoutButton}>
        <Text style={styles.logoutText}>Cerrar Sesión</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, // Flexbox: ocupa toda la pantalla
    backgroundColor: '#0f0f0f' 
  },
  scrollContent: {
    paddingHorizontal: 10,
    paddingTop: 50,
    paddingBottom: 120, // Usabilidad: deja espacio para facilitar interacción con el botón
  },
  header: { 
    color: '#00d4ff', // Usabilidad: color llamativo para destacar el título
    fontSize: 26, 
    fontWeight: 'bold', 
    textAlign: 'center', 
    marginBottom: 25,
    letterSpacing: 1
  },
  list: { 
    flexDirection: 'row', // Flexbox: organiza los elementos en filas
    flexWrap: 'wrap', // Flexbox: permite que los elementos bajen a otra línea (tipo grid)
    justifyContent: 'space-between' // Flexbox: distribuye espacio entre tarjetas
  },
  logoutButton: { 
    marginTop: 40,
    padding: 18,
    backgroundColor: '#1e1e1e', // Usabilidad: botón grande y fácil de presionar
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ff4b4b',
    shadowColor: '#ff4b4b',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 5
  },
  logoutText: {
    color: '#ff4b4b', // Usabilidad: alto contraste para lectura clara
    textAlign: 'center', 
    fontWeight: 'bold', 
    fontSize: 16,
    letterSpacing: 1
  }
});