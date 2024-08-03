import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import weatherData from './assets/weather.json';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Animatable from 'react-native-animatable';
import DropDownPicker from 'react-native-dropdown-picker';

const { height } = Dimensions.get('window');

const theme = {
  primary: '#FF6F61',
  secondary: '#FF8C00',
  containerStart: '#00C6FF',
  containerEnd: '#0072FF',
  textPrimary: '#FFFFFF',
  textSecondary: '#E0E0E0',
  pickerBackground: '#F9F9F9',
  pickerText: '#333333',
};

const App = () => {
  const [selectedCity, setSelectedCity] = useState('');
  const [cityWeather, setCityWeather] = useState(null);
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState(weatherData.map((item) => ({ label: item.city, value: item.city })));

  useEffect(() => {
    if (selectedCity) {
      const weather = weatherData.find((item) => item.city === selectedCity);
      setCityWeather(weather);
    }
  }, [selectedCity]);

  const getWeatherIcon = (description) => {
    switch (description.toLowerCase()) {
      case 'sunny':
        return 'weather-sunny';
      case 'cloudy':
        return 'weather-cloudy';
      case 'rainy':
        return 'weather-rainy';
      case 'snowy':
        return 'weather-snowy';
      case 'stormy':
        return 'weather-lightning';
      default:
        return 'weather-partly-cloudy';
    }
  };

  const getAnimationType = (description) => {
    switch (description.toLowerCase()) {
      case 'sunny':
        return { animation: 'pulse', duration: 2000 };
      case 'cloudy':
        return { animation: 'fadeIn', duration: 3000 };
      case 'rainy':
        return { animation: 'bounceIn', duration: 1500 };
      case 'snowy':
        return { animation: 'swing', duration: 2500 };
      case 'stormy':
        return { animation: 'flash', duration: 1000 };
      default:
        return { animation: 'bounceIn', duration: 1500 };
    }
  };

  const getIconColor = (description) => {
    switch (description.toLowerCase()) {
      case 'sunny':
        return '#FFD700';
      case 'cloudy':
        return '#B0BEC5';
      case 'rainy':
        return '#00BFFF';
      case 'snowy':
        return '#ADD8E6';
      case 'stormy':
        return '#FF4500';
      default:
        return '#B0BEC5';
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[theme.primary, theme.secondary]}
        style={styles.gradient}
      >
        <View style={styles.card}>
          <Text style={styles.header}>Weather Checker</Text>
          <Text style={styles.label}>Select a city:</Text>
          <DropDownPicker
            open={open}
            value={selectedCity}
            items={items}
            setOpen={setOpen}
            setValue={setSelectedCity}
            setItems={setItems}
            style={styles.picker}
            placeholder="Select a city..."
            dropDownContainerStyle={styles.dropDownContainer}
            textStyle={styles.pickerText}
          />
          {cityWeather && (
            <View style={styles.weatherInfo}>
              <Text style={styles.city}>{cityWeather.city}</Text>
              <Animatable.View
                animation={getAnimationType(cityWeather.description).animation}
                duration={getAnimationType(cityWeather.description).duration}
                iterationCount="infinite"
                iterationDelay={1000}
              >
                <Icon
                  name={getWeatherIcon(cityWeather.description)}
                  size={90}
                  color={getIconColor(cityWeather.description)}
                  style={styles.icon}
                />
              </Animatable.View>
              <Text style={styles.temperature}>{cityWeather.temperature}</Text>
              <Text style={styles.description}>{cityWeather.description}</Text>
            </View>
          )}
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 2,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: theme.primary,
    paddingTop: height * -1,
  },
  gradient: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: '60%',
    padding: 20,
    borderRadius: 20,
    elevation: 15,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 15,
    shadowOffset: { width: 0, height: 6 },
    alignItems: 'center',
    backgroundColor: 'linear-gradient(135deg, #00C6FF 0%, #0072FF 100%)',
    ...Platform.select({
      ios: {
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.3,
        shadowRadius: 15,
      },
      android: {
        elevation: 10,
      },
    }),
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    color: theme.textPrimary,
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    color: theme.textPrimary,
    marginBottom: 10,
  },
  picker: {
    width: '100%',
    height: 50,
    backgroundColor: theme.pickerBackground,
    borderColor: theme.pickerText,
  },
  dropDownContainer: {
    backgroundColor: theme.pickerBackground,
    borderColor: theme.pickerText,
  },
  pickerText: {
    color: theme.pickerText,
  },
  weatherInfo: {
    alignItems: 'center',
  },
  city: {
    fontSize: 26,
    fontWeight: 'bold',
    color: theme.textPrimary,
    marginBottom: 10,
  },
  temperature: {
    fontSize: 24,
    color: theme.textPrimary,
    marginBottom: 5,
  },
  description: {
    fontSize: 20,
    color: theme.textSecondary,
  },
  icon: {
    marginVertical: 15,
  },
});

export default App;
