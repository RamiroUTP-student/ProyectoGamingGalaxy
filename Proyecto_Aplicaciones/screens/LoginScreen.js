import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image, ScrollView } from 'react-native';

export default function LoginScreen({ onLogin, API_URL }) {
  const [isRegistering, setIsRegistering] = useState(false);
  
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (!email.includes('@') || password.length < 4) {
      Alert.alert("Error", "Introduce un correo válido y una contraseña de 4+ caracteres.");
      return;
    }

    fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          Alert.alert("¡Bienvenido!", `Hola de nuevo, ${data.usuario}`);
          onLogin();
        } else {
          Alert.alert("Error", "Correo electrónico o contraseña incorrectos.");
        }
      })
      .catch(() => {
        Alert.alert("Error", "No se pudo establecer conexión con el servidor local.");
      });
  };

  const handleRegister = () => {
    if (nombre.trim() === '' || !email.includes('@') || password.length < 4) {
      Alert.alert("Error", "Por favor completa todos los campos correctamente.");
      return;
    }

    fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre, email, password })
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          Alert.alert("¡Registro Exitoso!", `Bienvenido a Gaming Galaxy, ${nombre}. Ahora puedes iniciar sesión.`);
          setIsRegistering(false); 
          setNombre('');
        } else {
          Alert.alert("Error", data.message || "No se pudo registrar.");
        }
      })
      .catch(() => {
        Alert.alert("Error", "Falla al registrar en la base de datos.");
      });
  };

  return (
    <ScrollView style={styles.scrollBase} contentContainerStyle={styles.containerContent}>
      <View style={styles.formContainer}>
        
        <Image source={require('../assets/Logo_GamingGalaxy.png')} style={styles.logoImage} />
        
        <Text style={styles.titleText}>
          {isRegistering ? 'CREAR CUENTA' : 'INICIAR SESIÓN'}
        </Text>
        
        {/* Si está en modo registro, mostramos de forma dinámica el campo nombre */}
        {isRegistering && (
          <TextInput 
            style={styles.input} 
            placeholder="Nombre" 
            placeholderTextColor="#888" 
            value={nombre} 
            onChangeText={setNombre} 
          />
        )}
        
        <TextInput 
          style={styles.input} 
          placeholder="Correo electrónico" 
          placeholderTextColor="#888" 
          autoCapitalize="none" 
          keyboardType="email-address" 
          value={email} 
          onChangeText={setEmail} 
        />
        
        <TextInput 
          style={styles.input} 
          placeholder="Contraseña" 
          placeholderTextColor="#888" 
          secureTextEntry 
          autoCapitalize="none" 
          value={password} 
          onChangeText={setPassword} 
        />
        
        <TouchableOpacity style={styles.button} onPress={isRegistering ? handleRegister : handleLogin}>
          <Text style={styles.buttonText}>
            {isRegistering ? 'REGISTRARSE' : 'INGRESAR'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.toggleContainer} onPress={() => setIsRegistering(!isRegistering)}>
          <Text style={styles.toggleText}>
            {isRegistering ? '¿Ya tienes cuenta? Inicia sesión' : '¿No tienes cuenta? Regístrate aquí'}
          </Text>
        </TouchableOpacity>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollBase: { 
    flex: 1, 
    backgroundColor: '#0f0f0f' 
  },
  containerContent: { 
    flexGrow: 1, 
    justifyContent: 'center', // Mantiene todo el bloque centrado verticalmente
    alignItems: 'center',
    padding: 20 
  },
  formContainer: {
    width: '100%',
    maxWidth: 360, // Evita que se deforme o estire de más en pantallas anchas o web
    justifyContent: 'center',
  },
  logoImage: { 
    width: '100%', 
    height: 140, 
    resizeMode: 'contain', 
    marginBottom: 20,
    alignSelf: 'center'
  },
  titleText: { 
    color: '#00d4ff', 
    fontSize: 20, 
    fontWeight: 'bold', 
    textAlign: 'center', 
    marginBottom: 25, 
    letterSpacing: 1.5 
  },
  input: { 
    backgroundColor: '#1e1e1e', 
    color: '#fff', 
    padding: 15, 
    borderRadius: 10, 
    marginBottom: 15, 
    borderWidth: 1, 
    borderColor: '#333',
    fontSize: 15
  },
  button: { 
    backgroundColor: '#6200ee', 
    padding: 16, 
    borderRadius: 10, 
    alignItems: 'center', 
    marginTop: 10 
  },
  buttonText: { 
    color: '#fff', 
    fontWeight: 'bold', 
    fontSize: 16,
    letterSpacing: 1
  },
  toggleContainer: { 
    marginTop: 25, 
    alignItems: 'center',
    paddingVertical: 10 
  },
  toggleText: { 
    color: '#00d4ff', 
    fontSize: 14, 
    fontWeight: '600',
    textDecorationLine: 'underline' 
  }
});