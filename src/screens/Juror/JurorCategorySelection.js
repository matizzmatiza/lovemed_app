import React, { useState, useEffect } from 'react';
import { TouchableOpacity, StyleSheet, Text, View, Button, ActivityIndicator } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Colors, Fonts, Paths} from '../../../Theme'
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';

const JurorCategorySelection = ({ navigation, route }) => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useFocusEffect(
    React.useCallback(() => {
        const fetchEvents = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${Paths.serverApi}/api/juror/${route.params.userId}/categories`);
                setCategories(response.data);
            } catch (error) {
                console.error(error);
            } finally {
              setLoading(false);
            }
        };

        fetchEvents();
        return () => {
            // opcjonalne czyszczenie
        };
    }, [])
);

  if (isLoading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={Colors.brandColor} />
      </View>
    )
  }

  return (
  <SafeAreaView style={styles.container}>
    <Text style={styles.title}>Wybierz w jakiej kategorii chcesz oceniać</Text>
    {categories.map((category) => ( 
      <TouchableOpacity key={category.id} style={styles.button}>
        <Text style={styles.buttonText}>{category.category_name}</Text>
      </TouchableOpacity>
    ))}
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
  loaderContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
  },
})

export default JurorCategorySelection;