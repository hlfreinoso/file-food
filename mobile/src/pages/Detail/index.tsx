import React, { useEffect, useState } from 'react';
import { 
  View, 
  StyleSheet, 
  TouchableOpacity, 
  Image, 
  Text,
  SafeAreaView,
  Linking, 
  Alert
} from 'react-native';
import { Feather as Icon, FontAwesome } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import api from '../../services/api';

interface Params {
  idRestaurant: number;
  name: string;
  people: string;
}

interface Data {
    thumbnail: string;
    name: string;
    whatsapp: string;
    adress: string;
    city: string;
    uf: string;
    maxWaitTime: string;
}

const Detail = () => {

  const [data, setData] = useState<Data>({} as Data);

  const navigation = useNavigation();
  const route = useRoute();

  const routeParams = route.params as Params;

  useEffect(() => {
    api.get(`restaurants/${routeParams.idRestaurant}`).then(response => {
      setData(response.data);
    });
  }, []);

  function handleNavigateBack() {
    navigation.goBack();
  }

  function handleWhatsapp() {
    Linking.openURL(`whatsapp://send?phone=${data.whatsapp}&text=Olá meu nome é ${routeParams.name}, tenho uma dúvida sobre a reserva.`)
  }

  function handleGetIn() {
    api.post('customers', { name: routeParams.name }).then(response => {
      api.post('queues', { 
        idRestaurant: routeParams.idRestaurant, 
        idCustomer: response.data.idCustomer, 
        numberPeople: routeParams.people
      }).then(response => {
        Alert.alert('Registrado', `Você foi registrado na fila do ${data.name} com reserva para ${routeParams.people} pessoa(s)`);
      });
    });
  }

  if (!data) {
    return null;
  }

  return (
    <SafeAreaView style={{ flex: 1 }} >   
      <View style={styles.container}>
        <TouchableOpacity onPress={handleNavigateBack}>
          <Icon name="arrow-left" size={24} color="#FF5D02" />
        </TouchableOpacity>

        <Image style={styles.restaurantImage} source={{ uri: data.thumbnail }} />

        <Text style={styles.restaurantName}>{data.name}</Text>

        <View style={styles.address}>
          <Text style={styles.addressTitle}>Endereço:</Text>
          <Text style={styles.addressContent}>{data.adress}, {data.city}, {data.uf}</Text>
          <Text style={styles.addressContent}>Tempo de espera máximo para sua entrada de {data.maxWaitTime} minutos após chegar sua vez na fila.</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <RectButton style={styles.button} onPress={handleWhatsapp}>
          <FontAwesome name="whatsapp" size={20} color="#FFF" />
          <Text style={styles.buttonText}>WhatsApp</Text>
        </RectButton>

        <RectButton style={styles.button} onPress={handleGetIn}>
          <Icon name="log-in" size={20} color="#FFF" />
          <Text style={styles.buttonText}>Entrar na Fila</Text>
        </RectButton>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
    paddingTop: 40,
  },

  restaurantImage: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
    borderRadius: 10,
    marginTop: 32,
  },

  restaurantName: {
    color: '#92390A',
    fontSize: 28,
    fontFamily: 'Ubuntu_700Bold',
    marginTop: 24,
  },

  address: {
    marginTop: 32,
  },
  
  addressTitle: {
    color: '#92390A',
    fontFamily: 'Roboto_500Medium',
    fontSize: 16,
  },

  addressContent: {
    fontFamily: 'Roboto_400Regular',
    lineHeight: 24,
    marginTop: 8,
    color: '#6C6C80'
  },

  footer: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: '#999',
    paddingVertical: 20,
    paddingHorizontal: 32,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  
  button: {
    width: '48%',
    backgroundColor: '#FF5D02',
    borderRadius: 10,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },

  buttonText: {
    marginLeft: 8,
    color: '#FFF',
    fontSize: 16,
    fontFamily: 'Roboto_500Medium',
  },
});

export default Detail;