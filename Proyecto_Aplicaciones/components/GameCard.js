import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
const imagenesLocales = {
  // Juegos
  'elden_ring.png': require('../assets/elden_ring.png'),
  'spiderman2.png': require('../assets/spiderman2.png'),
  'tlou2.png': require('../assets/tlou2.png'),
  're4.png': require('../assets/re4.png'),
  'gow_ragnarok.png': require('../assets/gow_ragnarok.png'),
  'crash.png': require('../assets/crash.png'),
  'minecraft.png': require('../assets/minecraft.png'),
  'cuphead.png': require('../assets/cuphead.png'),
  // Consolas
  'ps5_standard.png': require('../assets/ps5_standard.png'),
  'xbox_series_x.png': require('../assets/xbox_series_x.png'),
  'switch_oled.png': require('../assets/switch_oled.png'),
  'ps5_digital.png': require('../assets/ps5_digital.png'),
  'xbox_series_s.png': require('../assets/xbox_series_s.png'),
  'switch_lite.png': require('../assets/switch_lite.png'),
  'steam_deck.png': require('../assets/steam_deck.png'),
  'ps_portal.png': require('../assets/ps_portal.png'),
  // Accesorios
  'dualsense_white.png': require('../assets/dualsense_white.png'),
  'mando_xbox_green.png': require('../assets/mando_xbox_green.png'),
  'pulse_3d.png': require('../assets/pulse_3d.png'),
  'switch_pro_mando.png': require('../assets/switch_pro_mando.png'),
  'logitech_g29.png': require('../assets/logitech_g29.png'),
  'cargador_dualsense.png': require('../assets/cargador_dualsense.png'),
  'xbox_elite.png': require('../assets/xbox_elite.png'),
  'razer_kishi.png': require('../assets/razer_kishi.png'),
};
export default function GameCard({ title, price, category, image, onAddToCart }) {
  const imagenLocal = imagenesLocales[image];
  return (
    <View style={styles.card}>
      <View style={[styles.imageContainer, !imagenLocal && styles.imagePlaceholder]}>
        {imagenLocal ? (
          <Image
            source={imagenLocal}
            style={styles.cardImage}
            resizeMode="cover"
          />
        ) : (
          <Text style={{ color: '#555', fontSize: 10 }}>SIN IMAGEN</Text>
        )}
      </View>

      <Text style={styles.title}>{title}</Text>
      <Text style={styles.category}>{category}</Text>
      <Text style={styles.price}>S/ {price}</Text>
      <TouchableOpacity style={styles.buyButton} onPress={onAddToCart}>
        <Text style={styles.buyText}>Añadir</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1e1e1e',
    width: '48%', // Diseño responsivo: permite mostrar 2 columnas adaptables
    padding: 10,
    borderRadius: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#444',
    justifyContent: 'space-between', // Flexbox: distribuye el contenido verticalmente
  },
  imageContainer: {
    width: '100%', // Responsivo: ocupa todo el ancho de la tarjeta
    height: 120,
    borderRadius: 10,
    overflow: 'hidden', // Usabilidad: evita que la imagen se salga del contenedor
    marginBottom: 10,
  },
  cardImage: {
    width: '100%', // Responsivo: imagen se adapta al contenedor
    height: '100%',
  },
  imagePlaceholder: {
    backgroundColor: '#333',
    justifyContent: 'center', // Flexbox: centra contenido verticalmente
    alignItems: 'center', // Flexbox: centra contenido horizontalmente
  },
  title: {
    color: '#fff', // Usabilidad: texto claro y legible
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 2,
  },
  category: {
    color: '#00d4ff', // Usabilidad: diferencia visual de categoría
    fontSize: 10,
    marginBottom: 5,
  },
  price: {
    color: '#fff', // Usabilidad: resalta información importante (precio)
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 'auto', // Flexbox: empuja el precio al final de la tarjeta
  },
  buyButton: {
    backgroundColor: '#00d4ff', // Usabilidad: botón llamativo para acción
    marginTop: 10,
    padding: 5,
    borderRadius: 5,
    alignItems: 'center', // Flexbox: centra el texto del botón
  },
  buyText: {
    color: '#000', // Usabilidad: contraste para buena lectura
    fontWeight: 'bold',
    fontSize: 12,
  },
});