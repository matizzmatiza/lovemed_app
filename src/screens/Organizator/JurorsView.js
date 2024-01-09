import React, { useState } from 'react';
import { Text, Image, View, StyleSheet, ActivityIndicator, Button, Alert, TouchableOpacity} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import {Colors, Fonts, Paths} from '../../../Theme'
import { SafeAreaView } from 'react-native-safe-area-context';
import JurorsList from './JurorsList';


const JurorsView = ({ navigation, route }) => {
    iconName = require('../../assets/img/add-button.png');
    // const { eventId } = route.params;
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Jurorzy</Text>
            <JurorsList navigation={navigation} route={route} />
            <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddJuror', {route: route})}>
                <Image source={iconName} style={{ width: 20, height: 20, tintColor: Colors.white }} />
            </TouchableOpacity>
            <Button title='wróć' onPress={navigation.navigate('EventDetails')}/>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        padding: 20,
        gap: 10,
        backgroundColor: Colors.white,
        flex: 1
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
    title: {
        fontSize: 18,
        fontFamily: Fonts.brandFont,
        paddingBottom: 10,
        fontWeight: 'bold'
    },
    loaderContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.white,
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
});


export default JurorsView;