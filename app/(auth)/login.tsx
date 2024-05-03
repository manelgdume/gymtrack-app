import { Ionicons } from '@expo/vector-icons';
import { defaultStyles } from '../../constants/Styles';
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { useRouter } from 'expo-router';
 
const Login = () => {
  // Estados para almacenar el nombre de usuario y la contraseña
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const signInDto = {
    username: email,
    password: password,
  };
  const router = useRouter();

  const handleLogin = () => {
    axios.post(`http://192.168.0.15:3000/auth/login`, signInDto)
      .then(async (response) => {
        console.log(response.data + "1")
        await SecureStore.setItemAsync("sessionJWT", response.data);
        if(response.data == "invalid credentials"){
          router.push('/(auth)/login')
        }
        else{
          router.push('/(tabs)/one')
        }
      })
      .catch((error) => {
        console.error('Error en la petición:', error.message);
      });
  };

  return (
    <View style={styles.container}>
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

      <View style={styles.seperatorView}>
        <View
          style={{
            flex: 1,
            borderBottomColor: 'black',
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />
        <Text style={styles.seperator}>or</Text>
        <View
          style={{
            flex: 1,
            borderBottomColor: 'black',
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />
      </View>

      <View style={{ gap: 20 }}>

        <TouchableOpacity style={styles.btnOutline} >
          <Ionicons name="md-logo-google" size={24} style={defaultStyles.btnIcon} />
          <Text style={styles.btnOutlineText}>Continue with Google</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnOutline} >
          <Ionicons name="md-logo-facebook" size={24} style={defaultStyles.btnIcon} />
          <Text style={styles.btnOutlineText}>Continue with Facebook</Text>
        </TouchableOpacity>
      </View>
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

export default Login;
