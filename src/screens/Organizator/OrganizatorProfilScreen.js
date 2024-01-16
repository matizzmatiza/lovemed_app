import React, { useState, useEffect } from 'react';
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
    const [isEmailVerified, setIsEmailVerified] = useState(false);
    const [verificationCode, setVerificationCode] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [userPasswordNew, setUserPasswordNew] = useState('');
    const [userPasswordConfirmation, setUserPasswordConfirmation] = useState(false);
    
    useFocusEffect(
        React.useCallback(() => {
            setIsEmailVerified(false);
            setUserPasswordConfirmation(false);
            setUserPassword('');
            setUserPasswordNew('');
            setVerificationCode('');
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
      
        if (name === 'email') {
          setUserEmail(value);
        }
      };

    if (isLoading) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color={Colors.brandColor} />
            </View>
        );
    }

    const isValidEmail = (email) => {
        const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/;
        return emailRegex.test(email);
    };

    const isValidPhoneNumber = (phoneNumber) => {
        const phoneNumberRegex = /^[0-9]+$/;
        return phoneNumberRegex.test(phoneNumber);
    };

    // Funkcja do obsługi zapisu
    const handleSubmit = async () => {
        if (!user.name || !user.surname || !isValidPhoneNumber(user.phone_number) || !isValidEmail(user.email)) {
            let errorMessage = "Wszystkie pola są wymagane.";
            
            if (!user.name) {
                errorMessage += "\n- Imię";
            }
        
            if (!user.surname) {
                errorMessage += "\n- Nazwisko";
            }
        
            if (!isValidPhoneNumber(user.phone_number)) {
                errorMessage += "\n- Numer telefonu powinien składać się tylko z cyfr.";
            }
        
            if (!isValidEmail(user.email)) {
                errorMessage += "\n- Adres email powinien być poprawny.";
            }
        
            Alert.alert("Błąd", errorMessage);
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

    const handleChangeEmail = async () => {
        try {
            const storedUserId = await AsyncStorage.getItem('userId');
            const userId = JSON.parse(storedUserId);
            const response = await axios.post(`${Paths.serverApi}/api/change-email/${userId}`, {
                verificationCode: verificationCode
            });
            Alert.alert("Sukces", "Twój adres email został zmieniony.");
            setVerificationCode('');
            setIsEmailVerified(false);
        } catch (error) {
            console.error("Błąd podczas zmiany adresu e-mail:", error.response.data);
            Alert.alert("Błąd", "Nie udało się zmienić adresu e-mail.");
        }
    };

    const handleEmailVerification = async () => {
        try {
          const storedUserId = await AsyncStorage.getItem('userId');
          const userId = JSON.parse(storedUserId);
    
          // Sprawdzanie, czy wprowadzony email różni się od aktualnego
          if (userEmail === user.email) {
            Alert.alert("Błąd", "Nowy adres e-mail nie może być taki sam jak obecny.");
            return;
          }

          // Sprawdzenie, czy wprowadzono nowy adres e-mail
        if (!userEmail) {
            Alert.alert("Błąd", "Wprowadź nowy adres e-mail przed zmianą.");
            return;
        }
    
          const response = await axios.post(`${Paths.serverApi}/api/email-verification/${userId}`, {
            email: user.email,
          });
    
          // Sprawdź, czy status znajduje się w zakresie 2xx (czyli sukces)
          if (response.status >= 200 && response.status < 300) {
            Alert.alert("Sukces", "Wysłano wiadomość z kodem weryfikacyjnym na nowy adres e-mail.");
            setIsEmailVerified(true);
          } else {
            // Obsługa błędów (np. status 400)
            Alert.alert("Błąd", response.data.message || "Nieprawidłowy kod weryfikacyjny.");
          }
        } catch (error) {
          console.error("Błąd podczas zmiany adresu e-mail:", error);
          Alert.alert("Błąd", "Nie udało się zmienić adresu e-mail. Sprawdź poprawność adresu e-mail i kodu weryfikacyjnego.");
        }
    };

    const handleCheckChangePassword = async () => {
        try {
            const storedUserId = await AsyncStorage.getItem('userId');
            const userId = JSON.parse(storedUserId);
            const response = await axios.post(`${Paths.serverApi}/api/check-change-password/${userId}`, {
                newPassword: userPasswordNew,
            });
            setUserPasswordConfirmation(true);
        } catch (error) {
            console.error("Błąd podczas zmiany hasła:", error.response.data);
            Alert.alert("Błąd", "Nie udało się zmienić hasła. Prawdopodobnie podałeś stare hasło.");
        }
    }

    const handleSetNewPassword = async () => {
        try {
            const storedUserId = await AsyncStorage.getItem('userId');
            const userId = JSON.parse(storedUserId);
            const response = await axios.post(`${Paths.serverApi}/api/set-new-password/${userId}`, {
                oldPassword: userPassword,
            });
            Alert.alert("Sukces", "Twoje hasło zostało zmienione.");
            setUserPasswordConfirmation(false);
            setUserPassword('');
            setUserPasswordNew('');
        } catch (error) {
            console.error("Błąd podczas zmiany hasła:", error.response.data);
            Alert.alert("Błąd", "Nie udało się zmienić hasła. Prawdopodobnie podałeś nie poprawnie stare hasło.");
        }
    }

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
            {!isEmailVerified ? (
                <TouchableOpacity onPress={handleEmailVerification} style={styles.button}>
                    <Text style={styles.buttonText}>Zmień adres email</Text>
                </TouchableOpacity>
            ) : (
                <>
                <View style={styles.label}>
                    <Text style={styles.labelText}>Potwierdź kodem</Text>
                    <TextInput
                        value={verificationCode}
                        onChangeText={(text) => setVerificationCode(text)}
                        placeholder="Kod weryfikujący"
                        style={styles.input}
                    /> 
                </View>
                <TouchableOpacity onPress={handleChangeEmail} style={styles.button}>
                    <Text style={styles.buttonText}>Potwierdź</Text>
                </TouchableOpacity>
                </>
            )}
            {!userPasswordConfirmation ? (
                <>
                    <View style={styles.label}>
                        <Text style={styles.labelText}>Nowe hasło</Text>
                        <TextInput
                            value={userPasswordNew}
                            onChangeText={(text) => setUserPasswordNew(text)}
                            placeholder="Twoje nowe hasło"
                            secureTextEntry
                            style={styles.input}
                        />
                    </View>
                    <TouchableOpacity style={styles.button} onPress={handleCheckChangePassword}>
                        <Text style={styles.buttonText}>Zmień hasło</Text>
                    </TouchableOpacity>
                </>
            ) : (
                <>
                    <View style={styles.label}>
                        <Text style={styles.labelText}>Potwierdź aktualnym hasłem</Text>
                        <TextInput
                            value={userPassword}
                            onChangeText={(text) => setUserPassword(text)}
                            placeholder="Twoje aktualne hasło"
                            secureTextEntry
                            style={styles.input}
                        />
                    </View>
                    <TouchableOpacity style={styles.button} onPress={handleSetNewPassword}>
                        <Text style={styles.buttonText}>Potwierdź</Text>
                    </TouchableOpacity>
                </>
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