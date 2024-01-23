import React, { useState, useEffect } from 'react';
import { Text, TextInput, View, StyleSheet, ActivityIndicator, Button, Alert, TouchableOpacity} from 'react-native';
import {Colors, Fonts, Paths} from '../../../Theme'
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';

const AddCategory = ({ navigation, route }) => {
    const [categoryName, setCategoryName] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async () => {
        if (!categoryName) {
            Alert.alert('Błąd', 'Nazwa kategorii nie może być pusta.');
            return;
        }
    
        try {
            setIsLoading(true);
            const response = await axios.post(`${Paths.serverApi}/api/categories`, {
                category_name: categoryName,
                event_id: route.params.eventId,
            });
            Alert.alert('Sukces', `Kategoria ${categoryName} została dodana.`);
            navigation.navigate('CategoriesView', {eventId: route.params.eventId});
            setIsLoading(false);
        } catch (error) {
            console.error('Error:', error);
            Alert.alert('Błąd', 'Nie udało się dodać kategorii.');
            setIsLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Dodawanie kategorii</Text>
            <View style={styles.label}>
                <Text style={styles.labelText}>Nazwa kategorii</Text>
                <TextInput onChangeText={setCategoryName} value={categoryName} style={styles.input}/>
            </View>
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Dodaj kategorię</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('CategoriesView', {eventId: route.params.eventId})} style={styles.button}>
                <Text style={styles.buttonText}>Anuluj</Text>
            </TouchableOpacity>
            {isLoading && <ActivityIndicator size="large" color={Colors.brandColor} />}
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


export default AddCategory;