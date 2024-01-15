import React from 'react';
import { TouchableOpacity, StyleSheet, View, StatusBar, Text, Image } from 'react-native';
import OrganizerIcon from '../assets/img/organizer.png';
import JurorIcon from '../assets/img/juror.png';
import MemberIcon from '../assets/img/member.png';
import Logo from '../assets/img/logo.png';
import {Colors, Fonts} from '../../Theme'
import { SafeAreaView } from 'react-native-safe-area-context';

const HomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
        <Image source={Logo} style={styles.logo} />
        <Text style={styles.title}>Wybierz rolę</Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('OrganizatorLogin')}>
            <View style={styles.iconWrapper}>
              <Image source={OrganizerIcon} style={styles.icon} />
            </View>
            <Text style={styles.text}>Organizator</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('JurorLogin')}>
            <View style={styles.iconWrapper}>
              <Image source={JurorIcon} style={styles.icon} />
            </View>
            <Text style={styles.text}>Juror</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => console.log('Button Pressed')}>
            <View style={styles.iconWrapper}>
              <Image source={MemberIcon} style={styles.icon} />
            </View>
            <Text style={styles.text}>Uczestnik</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.organizatorContainer} onPress={() => navigation.navigate('BeOrganizator')}>
          <Text style={styles.organizatorText}>Chcesz zostać organizatorem?</Text>
        </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
    gap: 20
  },
  button: {
    backgroundColor: Colors.brandColor,
    padding: 20,
    borderRadius: 45,
    width: '65%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.white,
    fontFamily: Fonts.brandFont,
  },
  title: {
    fontSize: 20,
    color: Colors.brandColor,
    marginBottom: 20,
    textTransform: 'uppercase',
    fontFamily: Fonts.brandFont,
  },
  iconWrapper: {
    position: 'absolute',
    left: -10,
    padding: 10,
    backgroundColor: Colors.white,
    borderRadius: 25,
    borderColor: Colors.brandColor,
    borderWidth: 1,
  },
  icon: {
    width: 20,
    height: 20,
  },
  organizatorContainer: {
    position: 'absolute',
    bottom: 50,
  },
  organizatorText: {
    color: Colors.brandColor,
    textDecorationLine: 'underline'
  },
  logo: {
    position: 'absolute',
    top: '10%',
    width: '50%',
    resizeMode: 'contain'
  },
});

export default HomeScreen;