import { useState } from 'react';
import { ImageBackground, TouchableOpacity, StyleSheet, View, StatusBar, Text, Image, TextInput, Alert } from 'react-native';
// import {Colors, Fonts} from '../../../Theme'
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import { Paths, Colors, Fonts } from '../../../Theme';

const OrganizerFirstLogin = ({ navigation, route }) => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSavePassword = async () => {
        try {
          // Sprawdź, czy nowe hasło i potwierdzenie hasła są identyczne
          if (newPassword !== confirmPassword) {
                Alert.alert('Błąd', 'Nowe hasło i potwierdzenie hasła muszą być identyczne.');
            } else if (!newPassword.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,15}$/)) {
                Alert.alert('Błąd', 'Hasło musi mieć co najmniej 8 znaków, 1 dużą literę, 1 małą literę, 1 cyfrę i 1 znak specjalny.');
            } else {
                const response = await axios.post(`${Paths.serverApi}/api/save-new-password`, {
                    newPassword: newPassword,
                    userId: route.params.userId,
                  });
            
                  Alert.alert('Sukces', 'Hasło zostało zapisane pomyślnie.');
                  navigation.navigate('OrganizatorPanel');
            }
        } catch (error) {
          console.error('Błąd podczas zapisywania hasła:', error);
          Alert.alert('Błąd', 'Wystąpił błąd podczas zapisywania hasła.');
        }
      };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Pierwsze logowanie</Text>
            {/* Pole nowego hasła */}
            <View style={styles.label}>
                <Text style={styles.labelText}>Nowe hasło</Text>
                <TextInput
                style={styles.input}
                placeholder="Nowe hasło"
                secureTextEntry={true}
                value={newPassword}
                onChangeText={(text) => setNewPassword(text)}
                />
            </View>
            {/* Pole potwierdzenia nowego hasła */}
            <View style={styles.label}>
            <Text style={styles.labelText}>Powtórz hasło</Text>
            <TextInput
                style={styles.input}
                placeholder="Potwierdź nowe hasło"
                secureTextEntry={true}
                value={confirmPassword}
                onChangeText={(text) => setConfirmPassword(text)}
            />
            </View>
            {/* Przycisk Zapisz */}
            <TouchableOpacity style={styles.button} onPress={handleSavePassword}>
                <Text style={styles.buttonText}>Zapisz</Text>
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
    title: {
        fontSize: 18,
        fontFamily: Fonts.brandFont,
        paddingBottom: 10,
        fontWeight: 'bold'
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

export default OrganizerFirstLogin;