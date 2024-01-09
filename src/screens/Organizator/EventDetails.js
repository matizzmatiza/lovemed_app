import React, { useState } from 'react';
import { TouchableOpacity, StyleSheet, Text, Image, StatusBar, View, Alert, ActivityIndicator } from 'react-native';
import axios from 'axios';
import moment from 'moment';
import { useFocusEffect } from '@react-navigation/native';
import {Colors, Fonts, Paths} from '../../../Theme'
import { SafeAreaView } from 'react-native-safe-area-context';

const EventDetails = ({ navigation, route, backEventId }) => {
    const [event, setEvent] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const { eventId } = route.params;

    useFocusEffect(
        React.useCallback(() => {
            const fetchEvents = async () => {
                setIsLoading(true);
                try {
                    const response = await axios.get(`${Paths.serverApi}/api/events/${eventId || backEventId}`);
                    setEvent(response.data);
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

    const confirmDelete = () => {
        Alert.alert(
          "Kończenie wydarzenia",
          "Czy na pewno chcesz zakończyć to wydarzenie? Wszyscy jurorzy, uczestnicy i kategorie zostaną trwale usunięte.",
          [
            {
              text: "Anuluj",
              style: "cancel"
            },
            { 
              text: "Zakończ", 
              onPress: () => {
                deleteEvent(eventId);
                navigation.navigate('OrganizatorPanel');
              }
            }
          ]
        );
      };

    const deleteEvent = async () => {
        try {
            await axios.delete(`${Paths.serverApi}/api/events/${eventId}`);
        } catch (error) {
            console.error(error);
            Alert.alert('Błąd', 'Nie udało się usunąć wydarzenia');
        }
    };    

    if (isLoading) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color={Colors.brandColor} />
            </View>
        );
    }
    
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.wrapper}>
                <Text style={styles.title}>Szczegóły wydarzenia</Text>
                <Text>Nazwa: {event.event_name}</Text>
                <Text>Miejsce: {event.event_place}</Text>
                <Text>Data rozpoczęcia: {event.event_start_date}</Text>
                <Text>Godzina rozpoczęcia: {moment(event.event_start_time, "HH:mm:ss").format("HH:mm")}</Text>
                <Text>Opis: {event.event_desc}</Text>
            </View>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('JurorsView', {route: route})}>
                <Text style={styles.buttonText}>Jurorzy</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Uczestnicy</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Kategorie</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => confirmDelete()}>
                <Text style={styles.buttonText}>Zakończ wydarzenie</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('OrganizatorPanel')}>
                <Text style={styles.buttonText}>Wróć</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        gap: 20,
        padding: 20,
        backgroundColor: Colors.white,
    },
    title: {
        fontSize: 18,
        fontFamily: Fonts.brandFont,
        paddingBottom: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    wrapper: {
        width: '100%'
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
})

export default EventDetails;