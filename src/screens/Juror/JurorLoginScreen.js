import React, { useState } from 'react';
import { View, TextInput, Text, Alert, StyleSheet, TouchableOpacity, ImageBackground, ActivityIndicator } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Colors, Fonts, Paths} from '../../../Theme'
import { SafeAreaView } from 'react-native-safe-area-context';

const JurorLoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post(`${Paths.serverApi}/api/login`, {
        //
        // UWAGA - tymczasowe dane logowania poniej trzeba zmienic na "email" i "password"
        //
        email: email,
        password: password,
      });

      if(response.data.userRank !== 'juror') {
        Alert.alert('Nie jesteś jurorem!', '');
        navigation.navigate('Home');
        return;
      }

      // Przechowywanie tokena
      const token = response.data.token;
      await AsyncStorage.setItem('userToken', JSON.stringify(token));

      // Przechowywanie User ID
      const userId = response.data.userId; // Upewnij się, że ta ścieżka dostępu jest poprawna
      AsyncStorage.setItem('userId', JSON.stringify(userId));

      if(response.data.firstLogin == 1) {
        setLoading(false);
        navigation.navigate('JurorFirstLogin', {userId: userId});
      } else {
        setLoading(false);
        navigation.navigate('JurorPanel');
      }
    } catch (error) {
      setLoading(false);
      Alert.alert('Błąd logowania', '');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Juror</Text>
        <View style={styles.label}>
          <Text style={styles.labelText}>Adres e-mail</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            style={styles.input}
          />
        </View>
        <View style={styles.label}>
          <Text style={styles.labelText}>Hasło</Text>
          <TextInput
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.input}
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={() => handleLogin()}>
              <Text style={styles.buttonText}>Zaloguj się</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
              <Text style={styles.buttonText}>Wróć</Text>
        </TouchableOpacity>
        {loading && 
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color={Colors.brandColor} />
            </View>}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 20,
    padding: 20,
    backgroundColor: Colors.white,
  },
  label: {
    width: '100%',
    marginBottom: 5
  },
  labelText: {
      fontFamily: Fonts.brandFont,
      fontWeight: 'bold',
      color: Colors.brandColor,
  },
  input: {
      width: '100%',
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      marginTop: 10,
      padding: 10,
      fontFamily: Fonts.brandFont,
  },
  button: {
    backgroundColor: Colors.brandColor,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    borderRadius: 25,
  },
  buttonText: {
      color: Colors.white,
      fontFamily: Fonts.brandFont,
      fontWeight: 'bold'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.brandColor,
    marginBottom: 20,
    textTransform: 'uppercase',
    fontFamily: Fonts.brandFont,
  }
});

export default JurorLoginScreen;