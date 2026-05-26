import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';

import LoginScreen from './screens/LoginScreen';
import TopMenu from './components/TopMenu';
import GamesCatalogScreen from './screens/GamesCatalogScreen';
import ConsolesCatalogScreen from './screens/ConsolesCatalogScreen';
import AccessoriesCatalogScreen from './screens/AccessoriesCatalogScreen';

const API_URL = 'http://localhost:3001/api';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [pantallaActual, setPantallaActual] = useState('juegos');

  if (!isLoggedIn) {
    return (
      <View style={styles.container}>
        <LoginScreen API_URL={API_URL} onLogin={() => setIsLoggedIn(true)} />
      </View>
    );
  }

  const renderizarPantalla = () => {
    switch (pantallaActual) {
      case 'juegos':
        return <GamesCatalogScreen API_URL={API_URL} onLogout={() => setIsLoggedIn(false)} />;
      case 'consolas':
        return <ConsolesCatalogScreen API_URL={API_URL} onLogout={() => setIsLoggedIn(false)} />;
      case 'accesorios':
        return <AccessoriesCatalogScreen API_URL={API_URL} onLogout={() => setIsLoggedIn(false)} />;
      default:
        return <GamesCatalogScreen API_URL={API_URL} onLogout={() => setIsLoggedIn(false)} />;
    }
  };

  return (
    <View style={styles.container}>
      <TopMenu pantallaActual={pantallaActual} alCambiarPantalla={setPantallaActual} />
      <View style={styles.contenido}>
        {renderizarPantalla()}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f0f0f' },
  contenido: { flex: 1 }
});