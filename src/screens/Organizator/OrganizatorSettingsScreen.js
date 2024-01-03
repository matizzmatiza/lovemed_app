import React from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Colors, Fonts, Paths} from '../../../Theme'

const Tab = createBottomTabNavigator();

const handleLogout = async ({navigation}) => {
  const userToken = await AsyncStorage.getItem('userToken');

  // Zapytanie do API o wylogowanie
  await fetch(`${Paths.serverApi}/api/logout`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${userToken}`,
    },
  });

  // Usunięcie tokena i przekierowanie
  await AsyncStorage.removeItem('userToken');
  navigation.navigate('Home');
};

const OrganizatorSettingsScreen = ({ navigation }) => {
  return (
  <View style={styles.container}>
    <Text style={styles.title}>Ustawienia</Text>
    <TouchableOpacity style={styles.button} onPress={() => handleLogout({navigation})}>
      <Text style={styles.buttonText}>Wyloguj się</Text>
    </TouchableOpacity>
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: Colors.white,
  },
  title: {
      fontSize: 18,
      fontFamily: Fonts.brandFont,
      paddingBottom: 20,
      fontWeight: 'bold'
  },
  button: {
    backgroundColor: Colors.brandColor,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 25,
  },
  buttonText: {
      color: Colors.white,
      fontFamily: Fonts.brandFont,
      fontWeight: 'bold'
  },
})

export default OrganizatorSettingsScreen;