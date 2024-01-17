import React, { useState, useEffect } from 'react';
import { Text, TextInput, View, StyleSheet, ActivityIndicator, Button, Alert, TouchableOpacity} from 'react-native';
import {Colors, Fonts, Paths} from '../../../Theme'
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';

const AddJuror = ({ navigation, route }) => {
    const [jurorName, setJurorName] = useState('');
    const [jurorSurname, setJurorSurname] = useState('');
    const [jurorPhone, setJurorPhone] = useState('');
    const [jurorEmail, setJurorEmail] = useState('');

    const handleSubmit = async () => {
        if (!jurorName || !jurorSurname || !jurorEmail) {
            Alert.alert('Błąd', 'Pola imię, naziwsko i e-mail są wymagane.');
            return;
        }
    
        try {
            const response = await axios.post(`${Paths.serverApi}/api/jurors`, {
                name: jurorName,
                surname: jurorSurname,
                email: jurorEmail,
                phone: jurorPhone,
                event_id: route.params.eventId,
            });
            navigation.navigate('JurorsView', {eventId: route.params.eventId});
        } catch (error) {
            console.error('Error:', error);
            Alert.alert('Błąd', 'Nie udało się dodać jurora.');
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Dodawanie jurora</Text>
            <View style={styles.label}>
                <Text style={styles.labelText}>Imię</Text>
                <TextInput onChangeText={setJurorName} value={jurorName} style={styles.input}/>
            </View>
            
            <View style={styles.label}>
                <Text style={styles.labelText}>Nazwisko</Text>
                <TextInput onChangeText={setJurorSurname} value={jurorSurname} style={styles.input}/>
            </View>

            <View style={styles.label}>
                <Text style={styles.labelText}>Numer telefonu (opcojonalnie)</Text>
                <TextInput onChangeText={setJurorPhone} value={jurorPhone} style={styles.input}/>
            </View>

            <View style={styles.label}>
                <Text style={styles.labelText}>Adres e-mail</Text>
                <TextInput onChangeText={setJurorEmail} value={jurorEmail} autoCapitalize="none" style={styles.input}/>
            </View>

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Dodaj jurora</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('JurorsView', {eventId: route.params.eventId})} style={styles.button}>
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
});


export default AddJuror;