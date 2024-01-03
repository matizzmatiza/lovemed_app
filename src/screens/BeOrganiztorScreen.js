import React from 'react';
import { ImageBackground, TouchableOpacity, StyleSheet, View, StatusBar, Text, Image, Button } from 'react-native';
import {Colors, Fonts} from '../../Theme'
import { SafeAreaView } from 'react-native-safe-area-context';

const BeOrganiztorScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Informacje odnośnie jak zostać organizatorem (rejestracja itp.)</Text>
      <Button title='Wróć' onPress={() => navigation.navigate('Home')}></Button>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({

});

export default BeOrganiztorScreen;