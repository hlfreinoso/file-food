import React, { useState } from 'react';
import { Feather as Icon } from '@expo/vector-icons';
import { 
  View, 
  ImageBackground, 
  Text, 
  Image, 
  StyleSheet, 
  TextInput, 
  KeyboardAvoidingView,
  Platform,
  Alert
} from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

const Home = () => {

  const [name, setName] = useState('');
  const [people, setPeople] = useState('');

  const navigation = useNavigation();

  function handleNavigateToRestaurants() {
    if (name === '') 
    {
      Alert.alert('Nome', 'Precisamos saber seu nome.');
    }
    else if (people === '') 
    {
      Alert.alert('Número de pessoas', 'Precisamos saber quantas pessoas estarão com você.');
    }
    else
    {
      navigation.navigate('Restaurants', {
        name,
        people
      });
    }
  }
  
  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ImageBackground
        source={require('../../assets/home-background.png')} 
        style={styles.container}
        imageStyle={{ flex: 1,  margin: 50, width: 300, height: 234  }}
        >
        <View style={styles.main}>
          <Image source={require('../../assets/logo.png')} />
          <View>
            <Text style={styles.title}>Fila digital, sem aglomerações.</Text>
            <Text style={styles.description}>Espere seu atendimento no conforto do lar.</Text>
          </View>
        </View>

        <View style={styles.footer}>
          <TextInput 
            style={styles.input}
            placeholder="Digite seu nome"
            value={name}
            autoCorrect={false}
            onChangeText={setName}
            />

          <TextInput 
            style={styles.input}
            placeholder="Reserva para quantas pessoas"
            value={people}
            keyboardType={'numeric'}
            maxLength={2}
            autoCorrect={false}
            onChangeText={setPeople}
          />

          <RectButton style={styles.button} onPress={handleNavigateToRestaurants}>
            <View style={styles.buttonIcon}>
              <Text>
                <Icon name="arrow-right" color="#FFF" size={24} />
              </Text>
            </View>
            <Text style={styles.buttonText}>
              Entrar
            </Text>
          </RectButton>
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
  },
  
  main: {
    flex: 1,
    justifyContent: 'center',
  },

  title: {
    color: '#92390A',
    fontSize: 32,
    fontFamily: 'Ubuntu_700Bold',
    maxWidth: 260,
    marginTop: 64,
  },

  description: {
    color: '#6C6C80',
    fontSize: 16,
    marginTop: 16,
    fontFamily: 'Roboto_400Regular',
    maxWidth: 260,
    lineHeight: 24,
  },

  footer: {},

  select: {},

  input: {
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginBottom: 8,
    paddingHorizontal: 24,
    fontSize: 16,
  },

  button: {
    backgroundColor: '#FF5D02',
    height: 60,
    flexDirection: 'row',
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    marginTop: 8,
  },

  buttonIcon: {
    height: 60,
    width: 60,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    justifyContent: 'center',
    alignItems: 'center'
  },

  buttonText: {
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
    color: '#FFF',
    fontFamily: 'Roboto_500Medium',
    fontSize: 16,
  }
});

export default Home;
