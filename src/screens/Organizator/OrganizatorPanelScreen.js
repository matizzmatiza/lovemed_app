import React from 'react';
import { StyleSheet, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaView } from 'react-native-safe-area-context';
import {Colors} from '../../../Theme'

import OrganizatorSettingsScreen from './OrganizatorSettingsScreen';
import OrganizatorEventsScreen from './OrganizatorEventsScreen';
import OrganizatorProfilScreen from './OrganizatorProfilScreen';

const Tab = createBottomTabNavigator();

const OrganizatorPanelScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1 , backgroundColor: Colors.white}}>
    <Tab.Navigator
    
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        if (route.name === 'Wydarzenia') {
          iconName = focused ? require('../../assets/img/calendar-icon.png') : require('../../assets/img/calendar-icon.png');
        } else if (route.name === 'Profil') {
          iconName = focused ? require('../../assets/img/profile-icon.png') : require('../../assets/img/profile-icon.png');
        } else if (route.name === 'Ustawienia') {
          iconName = focused ? require('../../assets/img/settings-icon.png') : require('../../assets/img/settings-icon.png');
        }
        return <Image source={iconName} style={{ width: size, height: size, tintColor: color }} />;
      },
      tabBarStyle: {
        height: 55,
        paddingBottom: 5,
        paddingTop: 10,
        backgroundColor: Colors.white,
        borderTopColor: 'gray',

      },
      headerShown: false,
      tabBarActiveTintColor: Colors.brandColor,
      tabBarInactiveTintColor: 'gray',
    })}

    >
      <Tab.Screen name="Wydarzenia" component={OrganizatorEventsScreen} />
      <Tab.Screen name="Profil" component={OrganizatorProfilScreen} />
      <Tab.Screen name="Ustawienia" component={OrganizatorSettingsScreen} />
    </Tab.Navigator>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  
})

export default OrganizatorPanelScreen;