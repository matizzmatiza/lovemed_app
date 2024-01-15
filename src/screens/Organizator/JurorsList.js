import React, { useState, useEffect } from 'react';
import { FlatList, Text, View, TouchableOpacity, StyleSheet, ActivityIndicator, Image, Alert} from 'react-native';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';
import moment from 'moment';
import {Colors, Fonts, Paths} from '../../../Theme'

const JurorsList = ({ navigation, route }) => {
    const [jurors, setJurors] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

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

    const confirmDelete = (item) => {
        Alert.alert(
          "Juror",
          "Czy na pewno chcesz usunąć tego jurora?",
          [
            {
              text: "Anuluj",
              style: "cancel"
            },
            { 
              text: "Usuń", onPress: () => {
                deleteJuror(item.id);
              }
            }
          ]
        );
    };

    const deleteJuror = async (id) => {
        try {
            await axios.delete(`${Paths.serverApi}/api/jurors/${id}`);
            setJurors(currentJuror => currentJuror.filter(juror => juror.id !== id));
        } catch (error) {
            console.error(error);
            Alert.alert('Błąd', 'Nie udało się usunąć jurora');
        }
    };    

    const ItemSeparator = () => (
        <View style={{ height: 10, width: '100%' }} /> // Możesz dostosować wysokość dla pionowego odstępu
    );   
    
    if (isLoading) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color={Colors.brandColor} />
            </View>
        );
    }

    return (
        <View style={{ flex: 1, width: '100%' }}>
        {jurors.length > 0 ? (
            <FlatList
            data={jurors}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => (
            <TouchableOpacity style={styles.eventContainer}>
                <View style={styles.column1}>
                    <Text style={styles.eventText}>{item.name} {item.surname}</Text>
                    <Text style={styles.eventPlace}>{item.email}</Text>
                </View>
                <View style={styles.column2}>
                    <TouchableOpacity style={styles.deleteButton} onPress={() => confirmDelete(item)}>
                        <Image source={require('../../assets/img/remove-button.png')} style={{ width: 25, height: 25, tintColor: Colors.brandColor }} />
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
            )}
            ItemSeparatorComponent={ItemSeparator} // Dodaje separator między elementami
            />
            ) : (
                <Text style={styles.noEventsText}>Brak jurorów. Dodaj pierwszego!</Text>
        )}
        </View>
    );
};

const styles = StyleSheet.create({
    noEventsText: {
        fontSize: 14,
        fontFamily: Fonts.brandFont,
        textAlign: 'center'
    },
    eventContainer: {
        width: '100%',
        height: 'auto',
        padding: 10,
        borderColor: '#00000033',
        backgroundColor: Colors.white,
        borderWidth: 0.5,
        flexDirection: 'row',
    },
    column1: {
        flex: 9,
        gap: 4
    },
    column2: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    eventText: {
        color: Colors.black,
        fontFamily: Fonts.brandFont,
        fontSize: 14,
        fontWeight: 'bold'
    },
    eventDate: {
        color: Colors.black,
        fontFamily: Fonts.brandFont,
        fontSize: 14,
        fontStyle: 'italic'
    },
    eventPlace: {
        color: Colors.black,
        fontFamily: Fonts.brandFont,
        fontSize: 14,
    },
    loaderContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.white,
    },
})

export default JurorsList;
