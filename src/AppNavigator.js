import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen'; // Zaimportuj HomeScreen
import BeOrganizatorScreen from './screens/BeOrganiztorScreen';
import OrganizatorLoginScreen from './screens/Organizator/OrganizatorLoginScreen'; // Zaimportuj LoginScreen
import OrganizatorPanelScreen from './screens/Organizator/OrganizatorPanelScreen';
import NewEvent from './screens/Organizator/AddEventForm';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="BeOrganizator" component={BeOrganizatorScreen} />
      <Stack.Screen name="OrganizatorLogin" component={OrganizatorLoginScreen} />
      <Stack.Screen name="OrganizatorPanel" component={OrganizatorPanelScreen} />
      <Stack.Screen name="NewEvent" component={NewEvent} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
