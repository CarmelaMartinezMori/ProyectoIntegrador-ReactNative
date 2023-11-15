// Login.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import LoginForm from '../components/LoginForm';
import Loader from '../components/Loader';  // Importa el componente Loader

const Login = ({ navigation }) => {
  const [loading, setLoading] = useState(false);  // Nuevo estado para manejar el indicador de carga

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      {/* Pasa el estado de carga y la función para cambiar el estado como propiedades al componente LoginForm */}
      <LoginForm navigation={navigation} setLoading={setLoading} />

      <Text style={styles.btnText}>
        Don't have an account?
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.boton}> Register Here! </Text>
        </TouchableOpacity>
      </Text>

      {/* Muestra el indicador de carga solo cuando loading es true */}
      {loading && <Loader />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  boton: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: '#A3A0FD',
    margin: 10,
    color: 'black',
    padding: 10,
    textAlign: 'center',
    borderRadius: 8,
  },
  btnText: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'black',
  },
  title: {
    marginTop: 50,
    marginBottom: 15,
    fontWeight: '600',
    color: 'black',
    fontSize: 32,
    textAlign: 'center',
  },
});

export default Login;
