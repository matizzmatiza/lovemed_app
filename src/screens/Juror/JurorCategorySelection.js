import React from 'react';
import { TouchableOpacity, StyleSheet, Text, View, Button } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Colors, Fonts, Paths} from '../../../Theme'
import { SafeAreaView } from 'react-native-safe-area-context';

const JurorCategorySelection = ({ navigation }) => {
  return (
  <SafeAreaView style={styles.container}>
    <Text style={styles.title}>Wybierz w jakiej kategorii chcesz oceniać</Text>
    <TouchableOpacity style={styles.button}>
      <Text style={styles.buttonText}>Kategoria 1</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.button}>
      <Text style={styles.buttonText}>Kategoria 2</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.button}>
      <Text style={styles.buttonText}>Kategoria 3</Text>
    </TouchableOpacity>
    <Button title='Wróć' onPress={() => navigation.navigate('JurorPanel')}/>
  </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: Colors.white,
    gap: 20,
  },
  title: {
      fontSize: 18,
      fontFamily: Fonts.brandFont,
      paddingBottom: 20,
      fontWeight: 'bold',
      textAlign: 'center',
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
})

export default JurorCategorySelection;