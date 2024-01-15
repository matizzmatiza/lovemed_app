import React, { useState, useEffect } from 'react';
import { View, TextInput, Alert, StyleSheet, Text, TouchableOpacity } from 'react-native';
import axios from 'axios';
import DateTimePicker from '@react-native-community/datetimepicker';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import {Colors, Fonts, Paths} from '../../../Theme'

const AddEventForm = ({ navigation }) => {
    const [eventName, setEventName] = useState('');
    const [eventPlace, setEventPlace] = useState('');
    const [eventDesc, setEventDesc] = useState('');
    const [eventDate, setEventDate] = useState(new Date());
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
    const [eventTime, setEventTime] = useState(new Date());
    const [userId, setUserId] = useState('');

    useEffect(() => {
        // Funkcja pobierająca wartość z AsyncStorage
        const fetchDataFromStorage = async () => {
          try {
            // Pobieranie wartości dla klucza 'yourKey'
            const storedValue = await AsyncStorage.getItem('userId');
    
            // Możesz teraz użyć pobranej wartości
            if (storedValue !== null) {
                setUserId(storedValue);
            } else {
              console.log('Brak wartości dla klucza "userId"');
            }
          } catch (error) {
            console.error('Błąd podczas pobierania wartości z AsyncStorage:', error);
          }
        };
    
        // Wywołanie funkcji pobierającej wartość
        fetchDataFromStorage();
      }, []); // Pusta tablica oznacza, że useEffect zostanie wykonany tylko raz po zamontowaniu komponentu

    const handleDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || eventDate;
        setEventDate(currentDate);
    };

    const showTimePicker = () => {
        setTimePickerVisibility(true);
    };

    const hideTimePicker = () => {
        setTimePickerVisibility(false);
    };

    const handleTimeChange = (event, selectedTime) => {
        const currentTime = selectedTime || eventTime;
        setEventTime(currentTime);
        hideTimePicker();
    };

    const handleSubmit = async () => {
        if (!eventName || !eventPlace || !eventDate || !eventTime || !eventDesc) {
            Alert.alert('Błąd', 'Wszystkie pola są wymagane.');
            return;
        }

        try {
            const formattedDate = `${eventDate.getFullYear()}-${eventDate.getMonth() + 1}-${eventDate.getDate()}`;
            const formattedTime = moment(eventTime).format('YYYY-MM-DD HH:mm');
            const response = await axios.post(`${Paths.serverApi}/api/events`, {
                event_name: eventName,
                event_place: eventPlace,
                event_start_date: formattedDate,
                event_start_time: formattedTime,
                event_desc: eventDesc,
                user_id: userId,
            });
            navigation.navigate('OrganizatorPanel');
        } catch (error) {
            console.error('Error:', error.response.data);
            Alert.alert('Błąd', 'Nie udało się dodać wydarzenia.');
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Tworzenie nowego wydarzenia</Text>
            <TextInput placeholder="Nazwa wydarzenia" onChangeText={setEventName} value={eventName} style={styles.textInput} />
            <TextInput placeholder="Miejsce wydarzenia" onChangeText={setEventPlace} value={eventPlace} style={styles.textInput} />
            <View style={styles.dataPickerWrapper}>
                <Text style={styles.dataText}>Data rozpoczęcia: </Text>
                <DateTimePicker
                    style={styles.dataPicker}
                    testID="dateTimePicker"
                    value={eventDate}
                    mode="date"
                    display="default"
                    onChange={handleDateChange}
                />
            </View>
            <View style={styles.dataPickerWrapper}>
                <Text style={styles.dataText}>Czas rozpoczęcia: </Text>
                <DateTimePicker
                    testID="timePicker"
                    value={eventTime}
                    mode="time"
                    display="default"
                    onChange={handleTimeChange}
                />
            </View>
            <TextInput placeholder="Opis" onChangeText={setEventDesc} value={eventDesc} style={styles.textArea} multiline/>
            <TouchableOpacity onPress={handleSubmit} style={styles.buttonTop}>
                <Text style={styles.buttonText}>Dodaj wydarzenie</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('OrganizatorPanel')}>
                <Text style={styles.buttonText}>Anuluj</Text>
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
        flex: 1,
    },
    title: {
        fontSize: 18,
        fontFamily: Fonts.brandFont,
        paddingBottom: 10,
        fontWeight: 'bold'
    },
    textInput: {
        width: '100%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginTop: 10,
        padding: 10,
        fontFamily: Fonts.brandFont,
    },
    textArea: {
        width: '100%',
        height: 100,
        borderColor: 'gray',
        borderWidth: 1,
        marginTop: 10,
        padding: 10,
        fontFamily: Fonts.brandFont,
    },
    dataPickerWrapper: {
        marginTop: 10,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },  
    dataText: {
        fontFamily: Fonts.brandFont,
    },
    buttonTop: {
        marginTop: 10,
        backgroundColor: Colors.brandColor,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        borderRadius: 25,
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
        fontSize: 14,
        fontWeight: 'bold',
        color: Colors.white,
        fontFamily: Fonts.brandFont,
    },
    
});

export default AddEventForm;