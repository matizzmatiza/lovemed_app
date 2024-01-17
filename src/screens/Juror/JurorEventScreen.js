import React, { useState, useEffect } from 'react';
import { TouchableOpacity, StyleSheet, Text, Image, StatusBar, View, ActivityIndicator, FlatList } from 'react-native';
import { Colors, Fonts } from '../../../Theme';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';
import { Paths } from '../../../Theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';

const JurorEventScreen = ({ navigation }) => {
  const [event, setEvent] = useState([]);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const value = await AsyncStorage.getItem('userId');
        if (value !== null) {
          setUserId(value);
        } else {
          console.log('Brak zapisanej wartości.');
        }
      } catch (error) {
        console.error('Błąd podczas pobierania:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      const fetchEvents = async () => {
        if (!userId) {
          return;
        }

        setLoading(true);
        try {
          const response = await axios.get(`${Paths.serverApi}/api/juror/${userId}/event/`);
          setEvent(response.data);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      };

      fetchEvents();
      return () => {
        // opcjonalne czyszczenie
      };
    }, [userId])
  );

  if (loading) {
    return (
        <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color={Colors.brandColor} />
        </View>
    );
    }

    const data = [
        { id: '1', name: 'Data', value: event.event_start_date },
        { id: '2', name: 'Godzina', value: moment(event.event_start_time, "HH:mm:ss").format("HH:mm") },
      ];

      const renderItem = ({ item }) => (
        <View style={styles.row}>
          <Text style={styles.cellFirst}>{item.name}</Text>
          <Text style={styles.cell}>{item.value}</Text>
        </View>
      );

  return (
    <View style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <Text style={styles.title}>Twoje wydarzenie:</Text>
        <Text style={styles.eventName}>{event.event_name}</Text>
        {/* Lista danych */}
        <FlatList
            data={data}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            scrollEnabled={false}
        />
        <View style={styles.wrapper}>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('JurorCategorySelection')}>
                <Text style={styles.buttonText}>Rozpocznij ocenianie</Text>
            </TouchableOpacity>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.brandColor,
    marginBottom: 10,
    textTransform: 'uppercase',
    fontFamily: Fonts.brandFont,
  },
  loaderContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
  },
  eventName: {
    fontSize: 20,
    color: Colors.black,
    marginBottom: 30,
    fontFamily: Fonts.brandFont,
    
  },
  eventDate: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.black,
    marginBottom: 10,
    fontFamily: Fonts.brandFont,
  },
  eventTime: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.black,
    marginBottom: 10,
    fontFamily: Fonts.brandFont,
  },
  eventDateText: {
    fontSize: 20,
    fontWeight: 'normal',
    color: Colors.black,
    marginBottom: 10,
    fontFamily: Fonts.brandFont,
  },
  eventTimeText: {
    fontSize: 20,
    fontWeight: 'normal',
    color: Colors.black,
    marginBottom: 10,
    fontFamily: Fonts.brandFont,
  },
  button: {
    backgroundColor: Colors.brandColor,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    borderRadius: 25,
 },
  buttonText: {
    color: Colors.white,
    fontFamily: Fonts.brandFont,
    fontWeight: 'bold'
 },
 wrapper: {
    marginTop: 20,
 },
 container: {
    flex: 1,
    padding: 16,
    backgroundColor: Colors.white,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  cell: {
    flex: 1,
    padding: 8,
    borderWidth: 1,
    borderColor: Colors.gray,
    textAlign: 'center',
    fontSize: 18,
  },
  cellFirst: {
    flex: 1,
    padding: 8,
    borderWidth: 1,
    borderColor: Colors.gray,
    fontSize: 18,
    borderRightWidth: 0,
  }
});

export default JurorEventScreen;
