import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
  ImageBackground,
} from 'react-native';
import * as Location from 'expo-location';
import ForecastItem from '../../../components/core/ForecastItem';
import { Stack } from 'expo-router';
import LottieView from 'lottie-react-native';

const BASE_URL = `https://api.openweathermap.org/data/2.5`;
const OPEN_WEATHER_API_KEY = process.env.EXPO_PUBLIC_OPEN_WEATHER_KEY;

type MainWeather = {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
};

type Weather = {
  name: string;
  main: MainWeather;
  weather: [
    {
      id: string;
      main: string;
      description: string;
      icon: string;
    }
  ];
};

type WeatherForecast = {
  main: MainWeather;
  dt: number;
};

// api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}

const WeatherApp = () => {
  const [weather, setWeather] = useState<Weather>();
  const [forecast, setForecast] = useState<WeatherForecast[]>([]);
  const [location, setLocation] = useState<Location.LocationObject>();
  const [errorMsg, setErrorMsg] = useState<string>('');
  const bgImage =
    'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/vertical-images/1.jpg';

  const fetchWeather = async () => {
    if (!location) return;
    fetch(
      `${BASE_URL}/weather?lat=${location.coords.latitude}&lon=${location.coords.longitude}&appid=${OPEN_WEATHER_API_KEY}&units=metric`
    )
      .then((res) => res.json())
      .then((data) => setWeather(data));
  };

  const fetchForecast = async () => {
    if (!location) return;
    fetch(
      `${BASE_URL}/forecast?lat=${location.coords.latitude}&lon=${location.coords.longitude}&appid=${OPEN_WEATHER_API_KEY}&units=metric`
    )
      .then((res) => res.json())
      .then((data) => setForecast(data.list));
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  useEffect(() => {
    if (location) {
      fetchWeather();
      fetchForecast();
    }
  }, [location]);

  if (!weather) {
    return <ActivityIndicator />;
  }

  return (
    <ImageBackground source={{ uri: bgImage }} style={styles.container}>
      <View
        style={{
          ...StyleSheet.absoluteFillObject,
          backgroundColor: 'rgba(0, 0, 0, 0.2)',
        }}
      />
      <Stack.Screen options={{ headerShown: false }} />
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <LottieView
          source={
            weather.weather[0].main === 'Rain'
              ? require('../../../../assets/lootie/rain.json')
              : require('../../../../assets/lootie/sunny.json')
          }
          style={{
            width: 150,
            aspectRatio: 1,
          }}
          loop
          autoPlay
        />
        <Text style={styles.location}>{weather.name}</Text>
        <Text style={styles.temp}>{Math.round(weather.main.temp)}</Text>
        <Text style={styles.location}>{weather.weather[0].main}</Text>
      </View>
      <FlatList
        data={forecast}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ flexGrow: 0, height: 150, marginBottom: 40 }}
        contentContainerStyle={{ gap: 10, paddingHorizontal: 10 }}
        renderItem={({ item }) => <ForecastItem forecast={item} />}
      />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  location: {
    fontFamily: 'Inter',
    fontSize: 30,
    color: 'lightgray',
  },
  temp: {
    fontFamily: 'InterBlack',
    fontSize: 150,
    color: '#FEFEFE',
  },
});

export default WeatherApp;
