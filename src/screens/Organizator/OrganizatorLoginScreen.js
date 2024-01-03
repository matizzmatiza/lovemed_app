import React, { useState } from 'react';
import { View, TextInput, Text, Alert, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Colors, Fonts, Paths} from '../../../Theme'

const OrganizatorLoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${Paths.serverApi}/api/login`, {
        email: email,
        password: password,
      });

      // Przechowywanie tokena
      const token = response.data;
      await AsyncStorage.setItem('userToken', JSON.stringify(token));

      // Przechowywanie User ID
      const userId = response.data.userId; // Upewnij się, że ta ścieżka dostępu jest poprawna
      AsyncStorage.setItem('userId', JSON.stringify(userId));

      navigation.navigate('OrganizatorPanel');
    } catch (error) {
      Alert.alert('Błąd logowania', '');
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={require('../../assets/img/bg_lovemed.png')} style={styles.backgroundImage}>
        <Text style={styles.title}>Organizator</Text>
        <TextInput
          placeholder="Adres e-mail"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          style={styles.input}
          placeholderTextColor="rgba(0,0,0,0.5)"
        />
        <TextInput
          placeholder="Hasło"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
          placeholderTextColor="rgba(0,0,0,0.5)"
        />
        <TouchableOpacity style={styles.button} onPress={() => handleLogin()}>
              <Text style={styles.text}>Zaloguj się</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonback} onPress={() => navigation.navigate('Home')}>
              <Text style={styles.text}>Wróć</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: Colors.brandColor,
  },
  backgroundImage: {
    resizeMode: 'cover',
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20
  },
  input: {
    width: 280,
    height: 60,
    fontSize: 20,
    borderWidth: 0,
    padding: 10,
    backgroundColor: Colors.white,
    borderRadius: 5,
    fontFamily: Fonts.brandFont,
  },
  button: {
    backgroundColor: Colors.white,
    padding: 10,
    borderRadius: 5,
    width: 200,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  buttonback: {
    backgroundColor: Colors.white,
    padding: 10,
    borderRadius: 5,
    width: 200,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.brandColor,
    fontFamily: Fonts.brandFont,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.white,
    marginBottom: 20,
    textTransform: 'uppercase',
    fontFamily: Fonts.brandFont,
  }
});

export default OrganizatorLoginScreen;