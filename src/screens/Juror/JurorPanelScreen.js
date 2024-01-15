import React from 'react';
import { StyleSheet, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaView } from 'react-native-safe-area-context';
import {Colors} from '../../../Theme'

import JurorSettingsScreen from './JurorSettingsScreen';
import JurorProfilScreen from './JurorProfilScreen';

const Tab = createBottomTabNavigator();

const JurorPanelScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1 , backgroundColor: Colors.white}}>
    <Tab.Navigator
    
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        if (route.name === 'Profil') {
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
      <Tab.Screen name="Profil" component={JurorProfilScreen} />
      <Tab.Screen name="Ustawienia" component={JurorSettingsScreen} />
    </Tab.Navigator>
    </SafeAreaView>
  );
};

export default JurorPanelScreen;