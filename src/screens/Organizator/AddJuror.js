import React, { useState, useEffect } from 'react';
import { Text, TextInput, View, StyleSheet, ActivityIndicator, Button, Alert, TouchableOpacity} from 'react-native';
import {Colors, Fonts, Paths} from '../../../Theme'
import { SafeAreaView } from 'react-native-safe-area-context';
import DropDownPicker from 'react-native-dropdown-picker';
import axios from 'axios';

const AddJuror = ({ navigation, route }) => {
    const [jurorName, setJurorName] = useState('');
    const [jurorSurname, setJurorSurname] = useState('');
    const [jurorPhone, setJurorPhone] = useState('');
    const [jurorEmail, setJurorEmail] = useState('');
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get(`${Paths.serverApi}/api/event/${route.params.eventId}/categories`);
                const convertedCategories = response.data.map(category => ({
                    label: category.category_name,
                    value: category.id
                }));
                
                setCategories(convertedCategories);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };
        fetchCategories();
    }, []);


    const handleSubmit = async () => {
        if (!jurorName || !jurorSurname || !jurorEmail || selectedCategories.length === 0) {
            Alert.alert('Błąd', 'Pola imię, naziwsko, e-mail i co najmniej jedna kategoria są wymagane.');
            return;
        }
    
        try {
            setIsLoadingSubmit(true);
            const response = await axios.post(`${Paths.serverApi}/api/jurors`, {
                name: jurorName,
                surname: jurorSurname,
                email: jurorEmail,
                phone: jurorPhone,
                categories: selectedCategories,
                event_id: route.params.eventId,
            });
            setIsLoadingSubmit(false);
            navigation.navigate('JurorsView', {eventId: route.params.eventId});
        } catch (error) {
            console.error('Error:', error);
            Alert.alert('Błąd', 'Nie udało się dodać jurora.');
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

            <View style={styles.label}>
                <Text style={styles.labelText}>Kategorie</Text>
                <DropDownPicker
                    style={styles.dropDown}
                    items={categories}
                    open={isOpen}
                    setOpen={() => setIsOpen(!isOpen)}
                    value={selectedCategories}
                    setValue={(val) => setSelectedCategories(val)}
                    showTickIcon={true}
                    disableBorderRadius={true}
                    badgeDotColors={Colors.brandColor}
                    autoScroll={true}
                    multiple={true}
                    mode='BADGE'
                    min={0}
                    max={categories.length}
                    placeholder='Wybierz kategorie z listy'
                />
            </View>

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Dodaj jurora</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('JurorsView', {eventId: route.params.eventId})} style={styles.button}>
                <Text style={styles.buttonText}>Anuluj</Text>
            </TouchableOpacity>
            {isLoadingSubmit && (
                <ActivityIndicator size="large" color={Colors.brandColor} />
            )}
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
        marginBottom: 5,
        zIndex: 1,
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
    dropDown: {
        marginTop: 10,
        fontFamily: Fonts.brandFont,
        borderColor: 'gray',
        borderWidth: 1,
        zIndex: 1,
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
        zIndex: 0,
    },
    buttonText: {
        color: Colors.white,
        fontFamily: Fonts.brandFont,
        fontWeight: 'bold'
    },
});


export default AddJuror;