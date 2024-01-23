import React from 'react';
import { TouchableOpacity, StyleSheet, Text, Image, StatusBar, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {Colors, Fonts} from '../../../Theme'

import EventList from './EventList';

const Tab = createBottomTabNavigator();

const OrganizatorEventsScreen = ({ navigation }) => {
    iconName = require('../../assets/img/add-button.png');

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <Text style={styles.title}>Twoje wydarzenia</Text>
            <EventList navigation={navigation} />
            <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('NewEvent')}>
                <Image source={iconName} style={{ width: 20, height: 20, tintColor: Colors.white }} />
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
        fontWeight: 'bold',
    },
    addButton: {
        position: 'absolute', // Ustawienie absolutne
        right: 15,            // Odległość od prawej krawędzi
        bottom: 15,           // Odległość od dolnej krawędzi
        width: 50,            // Szerokość przycisku
        height: 50,           // Wysokość przycisku
        borderRadius: 30,     // Zaokrąglenie przycisku
        backgroundColor: Colors.brandColor, // Kolor tła przycisku
        justifyContent: 'center',   // Wyśrodkowanie tekstu wewnątrz przycisku
        alignItems: 'center',       // Wyśrodkowanie tekstu wewnątrz przycisku
      },
})

export default OrganizatorEventsScreen;