import React, { useState } from 'react';
import { Text, TextInput, View, StyleSheet, ActivityIndicator, Button, Alert, TouchableOpacity} from 'react-native';
import {Colors, Fonts, Paths} from '../../../Theme'
import { SafeAreaView } from 'react-native-safe-area-context';

const AddJuror = ({ navigation, route }) => {
    const { eventId } = route.params;
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Dodawanie jurora</Text>
            <View style={styles.label}>
                <Text style={styles.labelText}>Imię</Text>
                <TextInput
                    // value={user.name}
                    // onChangeText={(text) => handleInputChange('name', text)}
                    placeholder="Imię"
                    style={styles.input}
                />
            </View>
            
            <View style={styles.label}>
                <Text style={styles.labelText}>Nazwisko</Text>
                <TextInput
                    // value={user.surname}
                    // onChangeText={(text) => handleInputChange('surname', text)}
                    placeholder="Nazwisko"
                    style={styles.input}
                />
            </View>

            <View style={styles.label}>
                <Text style={styles.labelText}>Numer telefonu (opcojonalnie)</Text>
                <TextInput
                    // value={user.phone_number}
                    // onChangeText={(text) => handleInputChange('phone_number', text)}
                    placeholder="Numer telefonu"
                    style={styles.input}
                />
            </View>

            <View style={styles.label}>
                <Text style={styles.labelText}>Adres e-mail</Text>
                <TextInput
                    // value={user.email}
                    // onChangeText={(text) => handleInputChange('email', text)}
                    placeholder="Adres e-mail"
                    style={styles.input}
                /> 
            </View>

            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Dodaj jurora</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('JurorsView', {backEventId: eventId})} style={styles.button}>
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