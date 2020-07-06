import React, { useState, useEffect } from 'react';
import Constants from 'expo-constants';
import { Feather as Icon } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import api from '../../services/api';
import * as Location from 'expo-location';

interface Restaurant {
  idRestaurant: number;
  thumbnail: string;
  name: string;
  latitude: number;
  longitude: number;
}

interface Params {
  name: string;
  people: string;
}

const Restaurants = () => {

  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [initialPosition, setInitialPosition] = useState<[number, number]>([0, 0]);
  
  const navigation = useNavigation();
  const route = useRoute();

  const routeParams = route.params as Params;

  useEffect(() => {
    async function loadPosition() {
      const { status } = await Location.requestPermissionsAsync();

      if (status !== 'granted') {
        Alert.alert('Permissão', 'Precisamos de sua permissão para obter a localização.');
        return;
      }

      const location = await Location.getCurrentPositionAsync();
      const { latitude, longitude } = location.coords;

      setInitialPosition([
        latitude,
        longitude
      ]);
    }

    loadPosition();
  }, []);

  useEffect(() => {
    api.get('restaurants').then(response => {
      setRestaurants(response.data);
    })
  }, [])

  function handleNavigateBack() {
    navigation.goBack();
  }

  function handeNavigateToDetail(id: number, name: string, people: string) {
    navigation.navigate('Detail', { idRestaurant: id, name: name, people: people });
  }

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity onPress={handleNavigateBack}>
          <Icon name="arrow-left" size={24} color="#FF5D02" />
        </TouchableOpacity>

        <Text style={styles.title}>Bem vindo.</Text>
        <Text style={styles.description}>Encontre no mapa seu Restaurante.</Text>
      
        <View style={styles.mapContainer}>
          { initialPosition[0] !== 0 && (
            <MapView 
              style={styles.map}
              initialRegion={{
                latitude: initialPosition[0],
                longitude: initialPosition[1],
                latitudeDelta: 0.014,
                longitudeDelta: 0.014,
              }}
            >
              {restaurants.map(restaurant => (
                <Marker
                  key={String(restaurant.idRestaurant)}
                  style={styles.mapMarker}
                  onPress={() => handeNavigateToDetail(restaurant.idRestaurant, routeParams.name, routeParams.people)} 
                  coordinate={{
                    latitude: restaurant.latitude,
                    longitude: restaurant.longitude,
                  }} 
                >
                  <View style={styles.mapMarkerContainer}>
                    <Image style={styles.mapMarkerImage} source={{ uri: restaurant.thumbnail }} />
                    <Text style={styles.mapMarkerTitle}>{restaurant.name}</Text>
                  </View>
                </Marker>
              ))}
            </MapView>
          ) }
        </View>
      </View>
      <View style={styles.footer}>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 32,
    paddingTop: 20 + Constants.statusBarHeight,
  },

  title: {
    color: '#92390A',
    fontSize: 20,
    fontFamily: 'Ubuntu_700Bold',
    marginTop: 24,
  },

  description: {
    color: '#6C6C80',
    fontSize: 16,
    marginTop: 4,
    fontFamily: 'Roboto_400Regular',
  },

  mapContainer: {
    flex: 1,
    width: '100%',
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 16,
  },

  map: {
    width: '100%',
    height: '100%',
  },

  mapMarker: {
    width: 90,
    height: 80, 
  },

  mapMarkerContainer: {
    width: 90,
    height: 70,
    backgroundColor: '#FF5D02',
    flexDirection: 'column',
    borderRadius: 8,
    overflow: 'hidden',
    alignItems: 'center'
  },

  mapMarkerImage: {
    width: 90,
    height: 45,
    resizeMode: 'cover',
  },

  mapMarkerTitle: {
    flex: 1,
    fontFamily: 'Roboto_400Regular',
    color: '#FFF',
    fontSize: 13,
    lineHeight: 23,
  },

  footer: {
    flexDirection: 'row',
    marginTop: 16,
    marginBottom: 32,
  }
});

export default Restaurants;