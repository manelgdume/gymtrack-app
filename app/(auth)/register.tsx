import { Ionicons } from '@expo/vector-icons';
import { defaultStyles } from '../../constants/Styles';
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';

const Register = () => {
  // Estados para almacenar el nombre de usuario y la contraseña
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const signUpDto = {
    username: name,
    email: email,
    password: password,
  };


  const handleLogin = () => {
    axios.post(`http://192.168.0.16:3000/user`, signUpDto)
      .then((response) => {
        console.log('Respuesta exitosa:', response.data);
      })
      .catch((error) => {
        console.error('Error en la petición:', error.message);
      });
  };

  return (
    <View style={styles.container}>
      <TextInput
        autoCapitalize="none"
        placeholder="Name"
        style={[defaultStyles.input, { marginBottom: 30 }]}
        onChangeText={(text) => setName(text)}
        value={name}
      />
      <TextInput
        autoCapitalize="none"
        placeholder="Email"
        style={[defaultStyles.input, { marginBottom: 30 }]}
        onChangeText={(text) => setEmail(text)}
        value={email}
      />
      <TextInput
        autoCapitalize="none"
        placeholder="Password"
        secureTextEntry={true}
        style={[defaultStyles.input, { marginBottom: 30 }]}
        onChangeText={(text) => setPassword(text)}
        value={password}
      />

      <TouchableOpacity style={defaultStyles.btn} onPress={() => handleLogin()}>
        <Text style={defaultStyles.btnText}>Continue</Text>
      </TouchableOpacity>

    </View>
  );
};

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 26,

  },

  seperatorView: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    marginVertical: 30,
  },
  seperator: {
    fontFamily: 'mon-sb',
    color: '#eee',
    fontSize: 16,
  },
  btnOutline: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#eee',
    height: 50,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  btnOutlineText: {
    color: '#000',
    fontSize: 16,
    fontFamily: 'mon-sb',
  },
});

export default Register;
