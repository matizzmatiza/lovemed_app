import React, { useState } from 'react';
import { Text, TextInput, View, StyleSheet, ActivityIndicator, Button, Alert, TouchableOpacity} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import {Colors, Fonts, Paths} from '../../../Theme'

const OrganizatorProfilScreen = ({ userId }) => {
    const [user, setUser] = useState({
        name: '',
        surname: '',
        email: '',
        phone_number: '',
    });
    const [isLoading, setIsLoading] = useState(true);

    const [newEmail, setNewEmail] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [showVerificationInput, setShowVerificationInput] = useState(false);

    const handleChangeEmail = async () => {
        try {
            // Wyślij żądanie do backendu
            const response = await fetch(`${Paths.serverApi}/change-email`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: newEmail }),
            });
        
            const data = await response.json();
            if (data.success) {
            setShowVerificationInput(true); // Pokaż pole do wpisania kodu
            } else {
            // Obsługa błędów
            }
        } catch (error) {
            // Obsługa wyjątków
        }
    };      

    const handleVerification = async () => {
        try {
          // Wysyłanie żądania do backendu z kodem weryfikacyjnym
          const response = await fetch(`${Paths.serverApi}/verify-code`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ code: verificationCode }),
          });
      
          const data = await response.json();
          
          // Sprawdzanie, czy weryfikacja się powiodła
          if (data.success) {
            // Jeśli kod jest poprawny
            setShowVerificationInput(false); // Ukryj pole do wpisania kodu
            setNewEmail(''); // Opcjonalnie, wyczyść pole nowego e-maila
            setVerificationCode(''); // Wyczyść kod weryfikacyjny
            // Możesz również wyświetlić powiadomienie o sukcesie
            alert("Adres e-mail został pomyślnie zmieniony.");
          } else {
            // Jeśli kod jest niepoprawny
            alert("Niepoprawny kod weryfikacyjny. Spróbuj ponownie.");
          }
        } catch (error) {
          // Obsługa wyjątków, np. problemów z połączeniem sieciowym
          alert("Wystąpił błąd podczas weryfikacji. Spróbuj ponownie później.");
        }
      };        
    
    useFocusEffect(
        React.useCallback(() => {
            const fetchUserData = async () => {
                setIsLoading(true);
                try {
                    const storedUserId = await AsyncStorage.getItem('userId');
                    const userId = JSON.parse(storedUserId);
                    const response = await axios.get(`${Paths.serverApi}/api/users/${userId}`);
                    setUser(response.data);
                } catch (error) {
                    console.error("Błąd podczas pobierania danych użytkownika:", error);
                } finally {
                    setIsLoading(false);
                }
            };

            fetchUserData();
        }, [])
    );

    const handleInputChange = (name, value) => {
        setUser((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    if (isLoading) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color={Colors.brandColor} />
            </View>
        );
    }

    // Funkcja do obsługi zapisu
    const handleSubmit = async () => {
        // Walidacja pól formularza
        if (!user.name || !user.surname || !user.phone_number) {
            Alert.alert("Błąd", "Wszystkie pola są wymagane.");
            return;
        }

        // Zapytanie do API
        try {
            const storedUserId = await AsyncStorage.getItem('userId');
            const userId = JSON.parse(storedUserId);
            const response = await axios.put(`${Paths.serverApi}/api/users/${userId}`, user);
            Alert.alert("Sukces", "Dane zostały zaktualizowane.");
        } catch (error) {
            console.error("Błąd podczas aktualizacji danych:", error);
            Alert.alert("Błąd", "Nie udało się zaktualizować danych.");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Twoje dane profilowe</Text>
            <View style={styles.label}>
                <Text style={styles.labelText}>Imię</Text>
                <TextInput
                    value={user.name}
                    onChangeText={(text) => handleInputChange('name', text)}
                    placeholder="Imię"
                    style={styles.input}
                />
            </View>
            
            <View style={styles.label}>
                <Text style={styles.labelText}>Nazwisko</Text>
                <TextInput
                    value={user.surname}
                    onChangeText={(text) => handleInputChange('surname', text)}
                    placeholder="Nazwisko"
                    style={styles.input}
                />
            </View>

            <View style={styles.label}>
                <Text style={styles.labelText}>Numer telefonu</Text>
                <TextInput
                    value={user.phone_number}
                    onChangeText={(text) => handleInputChange('phone_number', text)}
                    placeholder="Numer telefonu"
                    style={styles.input}
                />
            </View>

            <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                <Text style={styles.buttonText}>Zapisz zmiany</Text>
            </TouchableOpacity>

            <View style={styles.label}>
                <Text style={styles.labelText}>Adres e-mail</Text>
                <TextInput
                    value={user.email}
                    onChangeText={(text) => handleInputChange('email', text)}
                    placeholder="Adres e-mail"
                    style={styles.input}
                /> 
            </View>
            <Button title='Zmień adres e-mail' onPress={handleChangeEmail}/>
            {showVerificationInput && (
            <View>
            <TextInput
                placeholder="Wpisz kod weryfikacyjny"
                onChangeText={(text) => setVerificationCode(text)}
                style={styles.input}
            />
            <Button title="Potwierdź" onPress={handleVerification}/>
            </View>
        )}
        </View>
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


export default OrganizatorProfilScreen;