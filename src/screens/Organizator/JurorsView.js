import React, { useEffect, useState } from 'react';
import { Text, Image, View, StyleSheet, ActivityIndicator, Button, Alert, TouchableOpacity} from 'react-native';
import {Colors, Fonts, Paths} from '../../../Theme'
import axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';
import JurorsList from './JurorsList';
import { useFocusEffect } from '@react-navigation/native';


const JurorsView = ({ navigation, route }) => {
    const [jurors, setJurors] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    iconName = require('../../assets/img/add-button.png');

    useFocusEffect(
        React.useCallback(() => {
            const fetchEvents = async () => {
                setIsLoading(true);
                try {
                    const response = await axios.get(`${Paths.serverApi}/api/jurors/${route.params.eventId}`);
                    setJurors(response.data);
                } catch (error) {
                    console.error(error);
                } finally {
                    setIsLoading(false);
                }
            };

            fetchEvents();
            return () => {
                // opcjonalne czyszczenie
            };
        }, [])
    );

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Jurorzy {isLoading ? (
                <Text>(Ładowanie..)</Text>
            ) : (
                <Text>({jurors.length})</Text>
            )}</Text>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('EventDetails')}>
                <Text style={styles.buttonText}>Wróć</Text>
            </TouchableOpacity>
            <JurorsList navigation={navigation} route={route} />
            <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddJuror', {eventId: route.params.eventId})}>
                <Image source={iconName} style={{ width: 20, height: 20, tintColor: Colors.white }} />
            </TouchableOpacity>
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