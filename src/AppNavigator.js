import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen'; // Zaimportuj HomeScreen
import BeOrganizatorScreen from './screens/BeOrganiztorScreen';
import OrganizatorLoginScreen from './screens/Organizator/OrganizatorLoginScreen'; // Zaimportuj LoginScreen
import OrganizatorPanelScreen from './screens/Organizator/OrganizatorPanelScreen';
import NewEvent from './screens/Organizator/AddEventForm';
import EventDetailsScreen from './screens/Organizator/EventDetails';
import JurorsViewScreen from './screens/Organizator/JurorsView';
import AddJuror from './screens/Organizator/AddJuror';
import JurorLoginScreen from './screens/Juror/JurorLoginScreen';
import JurorPanelScreen from './screens/Juror/JurorPanelScreen';
import OrganizerFirstLoginScreen from './screens/Organizator/OrganizerFirstLogin';
import JurorFirstLoginScreen from './screens/Juror/JurorFirstLogin';
import JurorEventScreen from './screens/Juror/JurorEventScreen';
import JurorCategorySelection from './screens/Juror/JurorCategorySelection';
import CategoriesView from './screens/Organizator/CategoriesView';
import AddCategory from './screens/Organizator/AddCategory';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="BeOrganizator" component={BeOrganizatorScreen} />
      <Stack.Screen name="OrganizatorLogin" component={OrganizatorLoginScreen} />
      <Stack.Screen name="OrganizatorPanel" component={OrganizatorPanelScreen} />
      <Stack.Screen name="NewEvent" component={NewEvent} />
      <Stack.Screen name="EventDetails" component={EventDetailsScreen} />
      <Stack.Screen name="JurorsView" component={JurorsViewScreen} />
      <Stack.Screen name="AddJuror" component={AddJuror} />
      <Stack.Screen name="JurorLogin" component={JurorLoginScreen} />
      <Stack.Screen name="JurorPanel" component={JurorPanelScreen} />
      <Stack.Screen name="OrganizerFirstLogin" component={OrganizerFirstLoginScreen} />
      <Stack.Screen name="JurorFirstLogin" component={JurorFirstLoginScreen} />
      <Stack.Screen name="JurorEvent" component={JurorEventScreen} />
      <Stack.Screen name="JurorCategorySelection" component={JurorCategorySelection} />
      <Stack.Screen name="CategoriesView" component={CategoriesView} />
      <Stack.Screen name="AddCategory" component={AddCategory} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
