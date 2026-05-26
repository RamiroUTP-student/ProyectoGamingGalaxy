import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function TopMenu({ pantallaActual, alCambiarPantalla }) {
  const opciones = [
    { id: 'juegos', label: 'Juegos' },
    { id: 'consolas', label: 'Consolas' },
    { id: 'accesorios', label: 'Accesorios' },
  ];

  return (
    <View style={styles.menuContainer}>
      {opciones.map((opcion) => {
        const esActiva = pantallaActual === opcion.id;
        return (
          <TouchableOpacity
            key={opcion.id}
            style={[styles.boton, esActiva && styles.botonActivo]}
            onPress={() => alCambiarPantalla(opcion.id)}
          >
            <Text style={[styles.textoBoton, esActiva && styles.textoActivo]}>
              {opcion.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  menuContainer: { flexDirection: 'row', backgroundColor: '#161616', paddingVertical: 12, paddingHorizontal: 8, borderBottomWidth: 1, borderColor: '#222', justifyContent: 'space-around', alignItems: 'center', paddingTop: 40 },
  boton: { paddingVertical: 8, paddingHorizontal: 16, borderRadius: 20, backgroundColor: 'transparent' },
  botonActivo: { backgroundColor: '#00d4ff' },
  textoBoton: { color: '#aaaaaa', fontWeight: 'bold', fontSize: 14, letterSpacing: 0.5 },
  textoActivo: { color: '#0f0f0f' },
});