import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
  FlatList,
} from 'react-native';
import GameCard from '../components/GameCard';
export default function ConsolesCatalogScreen({ onLogout, API_URL }) {
  const [consoles, setConsoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  const [cartVisible, setCartVisible] = useState(false);
  const [confirmClear, setConfirmClear] = useState(false);
  const [purchaseSuccess, setPurchaseSuccess] = useState(false);
  useEffect(() => {
    fetch(`${API_URL}/productos/consola`)
      .then(res => res.json())
      .then(data => {
        setConsoles(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [API_URL]);
  const addToCart = (product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };
  const removeFromCart = (productId, all = false) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === productId);
      if (!existing) return prev;
      if (all || existing.quantity === 1) {
        return prev.filter(item => item.id !== productId);
      }
      return prev.map(item =>
        item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
      );
    });
  };
  const handleCloseModal = () => {
    setCartVisible(false);
    setConfirmClear(false);
    setPurchaseSuccess(false);
  };
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  if (loading) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color="#00d4ff" />
      </View>
    );
  }
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Gaming Galaxy Store</Text>
        <TouchableOpacity
          style={styles.cartIcon}
          onPress={() => setCartVisible(true)}
        >
          <Text style={styles.cartIconText}>🛒</Text>
          {totalItems > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{totalItems}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.list}>
          {consoles.map(consoleItem => (
            <GameCard
              key={consoleItem.id}
              title={consoleItem.title}
              price={consoleItem.price}
              category={consoleItem.category}
              image={consoleItem.image}
              onAddToCart={() => addToCart(consoleItem)}
            />
          ))}
        </View>
        <TouchableOpacity onPress={onLogout} style={styles.logoutButton}>
          <Text style={styles.logoutText}>Cerrar Sesión</Text>
        </TouchableOpacity>
      </ScrollView>
      <Modal
        visible={cartVisible}
        animationType="slide"
        transparent={false}
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>🛒 Mi Carrito</Text>
          {cartItems.length === 0 && !purchaseSuccess ? (
            <View style={styles.emptyCart}>
              <Text style={styles.emptyText}>El carrito está vacío</Text>
            </View>
          ) : (
            <>
              {!purchaseSuccess && (
                <FlatList
                  data={cartItems}
                  keyExtractor={(item) => item.id.toString()}
                  renderItem={({ item }) => (
                    <View style={styles.cartItem}>
                      <View style={styles.itemInfo}>
                        <Text style={styles.itemTitle}>{item.title}</Text>
                        <Text style={styles.itemPrice}>
                          ${item.price} x {item.quantity}
                        </Text>
                      </View>
                      <View style={styles.itemActions}>
                        <TouchableOpacity
                          style={styles.actionButton}
                          onPress={() => removeFromCart(item.id)}
                        >
                          <Text style={styles.actionText}>-</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={styles.actionButton}
                          onPress={() => addToCart(item)}
                        >
                          <Text style={styles.actionText}>+</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={[styles.actionButton, styles.deleteButton]}
                          onPress={() => removeFromCart(item.id, true)}
                        >
                          <Text style={styles.actionText}>✕</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  )}
                  style={styles.cartList}
                />
              )}
              {purchaseSuccess ? (
                <View style={styles.totalContainer}>
                  <Text style={[styles.totalText, { color: '#00fa9a', fontSize: 24 }]}>
                    ¡Gracias por tu compra!
                  </Text>
                </View>
              ) : confirmClear ? (
                <View style={styles.totalContainer}>
                  <Text style={[styles.totalText, { color: '#ff4b4b', fontSize: 16 }]}>
                    ¿Seguro que deseas eliminar todas las consolas?
                  </Text>
                  <View style={styles.modalButtons}>
                    <TouchableOpacity
                      style={[styles.modalButton, { backgroundColor: '#555' }]}
                      onPress={() => setConfirmClear(false)}
                    >
                      <Text style={styles.buttonText}>Cancelar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.modalButton, styles.clearButton]}
                      onPress={() => {
                        setCartItems([]);
                        setConfirmClear(false);
                      }}
                    >
                      <Text style={styles.buttonText}>Sí, vaciar</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ) : (
                <View style={styles.totalContainer}>
                  <Text style={styles.totalText}>Total: ${totalPrice.toFixed(2)}</Text>
                  <View style={styles.modalButtons}>
                    <TouchableOpacity
                      style={[styles.modalButton, styles.clearButton]}
                      onPress={() => setConfirmClear(true)}
                    >
                      <Text style={styles.buttonText}>Vaciar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.modalButton, styles.checkoutButton]}
                      onPress={() => {
                        setPurchaseSuccess(true);
                        setTimeout(() => {
                          setCartItems([]);
                          handleCloseModal();
                        }, 2000); // Muestra el mensaje por 2 segundos y luego cierra todo
                      }}
                    >
                      <Text style={styles.buttonText}>Comprar</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </>
          )}
          <TouchableOpacity
            style={styles.closeModalButton}
            onPress={handleCloseModal}
          >
            <Text style={styles.closeModalText}>Cerrar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1, // Flexbox: ocupa toda la pantalla
    backgroundColor: '#0f0f0f',
  },
  center: {
    justifyContent: 'center', // Flexbox: centra verticalmente
    alignItems: 'center', // Flexbox: centra horizontalmente
  },
  scrollContent: {
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 120,
  },
  headerContainer: {
    flexDirection: 'row', // Flexbox: alinea elementos en fila
    alignItems: 'center',
    justifyContent: 'center', // Flexbox: centra el título horizontalmente
    paddingHorizontal: 15,
    paddingTop: 50,
    paddingBottom: 10,
    backgroundColor: '#0f0f0f',
    // Eliminamos borderBottomWidth y borderBottomColor para quitar la línea
    position: 'relative', // Necesario para posicionar el carrito absoluto
  },
  header: {
    color: '#00d4ff', // Usabilidad: color llamativo para destacar el título
    fontSize: 22,
    fontWeight: 'bold',
    letterSpacing: 1,
    textAlign: 'center', // Centra el texto dentro del componente
  },
  cartIcon: {
    position: 'absolute', // Posiciona el icono a la derecha sin afectar el centrado
    right: 15,
    top: 50, // Coincide con el paddingTop del contenedor
    padding: 8,
  },
  cartIconText: {
    fontSize: 28,
    color: '#fff',
  },
  badge: {
    position: 'absolute',
    right: 0,
    top: 0,
    backgroundColor: '#ff4b4b', // Usabilidad: color de alerta para notificar cantidad
    borderRadius: 12,
    minWidth: 22,
    height: 22,
    justifyContent: 'center', // Flexbox: centra el texto
    alignItems: 'center', // Flexbox: centra el texto
    paddingHorizontal: 5,
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  list: {
    flexDirection: 'row', // Flexbox: organiza los elementos en filas
    flexWrap: 'wrap', // Flexbox: permite que los elementos bajen a otra línea (tipo grid)
    justifyContent: 'space-between', // Flexbox: distribuye espacio entre tarjetas
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
    elevation: 5,
  },
  logoutText: {
    color: '#ff4b4b', // Usabilidad: alto contraste para lectura clara
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
    letterSpacing: 1,
  },
  // Estilos del modal
  modalContainer: {
    flex: 1,
    backgroundColor: '#0f0f0f',
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  modalTitle: {
    color: '#00d4ff',
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  emptyCart: {
    flex: 1,
    justifyContent: 'center', // Flexbox: centra verticalmente
    alignItems: 'center', // Flexbox: centra horizontalmente
  },
  emptyText: {
    color: '#aaa',
    fontSize: 18,
  },
  cartList: {
    flex: 1,
  },
  cartItem: {
    flexDirection: 'row', // Flexbox: alinea info y acciones en fila
    justifyContent: 'space-between', // Flexbox: separa información de acciones
    alignItems: 'center',
    backgroundColor: '#1e1e1e',
    padding: 12,
    marginVertical: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#333',
  },
  itemInfo: {
    flex: 1, // Flexbox: ocupa espacio disponible
  },
  itemTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemPrice: {
    color: '#aaa',
    fontSize: 14,
    marginTop: 4,
  },
  itemActions: {
    flexDirection: 'row', // Flexbox: botones en fila
    alignItems: 'center',
  },
  actionButton: {
    backgroundColor: '#333',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center', // Flexbox: centra el texto
    alignItems: 'center', // Flexbox: centra el texto
    marginHorizontal: 4,
  },
  deleteButton: {
    backgroundColor: '#ff4b4b', // Usabilidad: color de peligro para eliminar
  },
  actionText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  totalContainer: {
    marginTop: 20,
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  totalText: {
    color: '#00d4ff',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  modalButtons: {
    flexDirection: 'row', // Flexbox: botones en fila
    justifyContent: 'space-around', // Flexbox: distribuye espacio entre botones
  },
  modalButton: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginHorizontal: 10,
  },
  clearButton: {
    backgroundColor: '#ff4b4b', // Usabilidad: color de advertencia
  },
  checkoutButton: {
    backgroundColor: '#00d4ff', // Usabilidad: color de acción principal
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  closeModalButton: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#1e1e1e',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#555',
  },
  closeModalText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
});