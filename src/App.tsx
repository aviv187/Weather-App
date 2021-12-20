import React, { useEffect, useMemo, useState } from 'react';

import Favorites from './components/favorites';
import Home from './components/home';
import Alert from './components/alert';
import Header from './components/header';

import './css/App.css';

import { LocationData } from './modules/location';

import getLocationData from './helpers/getLocationData';
import getFiveDaysForecasts from './helpers/getFiveDaysWeather';
import { fiveDaysCall, locationCall } from './helpers/demoData';

const favoritesStorageName = 'react_weather_app_favorites';
const themeStorageName = 'react_weather_app_theme';
const metricStorageName = 'react_weather_app_metric';
const demoDataStorageName = "react_weather_app_demo";

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);

  const [page, setPage] = useState<'home' | 'favorites'>('home');

  const [currentLocation, setCurrentLocation] = useState<null | LocationData>(null);
  const [favoriteLocations, setFavoriteLocations] = useState<LocationData[]>([]);

  const [tempInFahrenheit, setTempInFahrenheit] = useState(true);

  const [alertMessange, setAlertMessange] = useState<null | string>(null);

  const isDemoData = useMemo(() => {
    return window.localStorage.getItem(demoDataStorageName) ? true : false;
  }, []);

  // getting tel aviv as default
  useEffect(() => {
    const getTelAvivData = async () => {
      const location = isDemoData
        ? locationCall
        : await getLocationData("Tel Aviv");

      if (location) {
        setCurrentLocation(location);
      } else {
        setAlertMessange('Sorry! We could not get the weather in Tel Aviv');
      }
    }

    getTelAvivData()
  }, [isDemoData]);

  // get the favorite locations from the local storage
  useEffect(() => {
    const getLocationNewData = async (data: string) => {
      const favoriteLocationsOldData: LocationData[] = JSON.parse(data);

      const favoriteLocationsData: LocationData[] = [];

      // make sure the dates in the data are current
      for (const location of favoriteLocationsOldData) {
        if (location.currentDate === new Date().toLocaleDateString('en')) {
          favoriteLocationsData.push(location);
        } else {
          const newLocationData = { ...location }

          const newFiveDaysForecasts = isDemoData ? fiveDaysCall : await getFiveDaysForecasts(location.id);

          if (newFiveDaysForecasts) {
            newLocationData.fiveDaysForecasts = newFiveDaysForecasts.fiveDaysForecasts;
            newLocationData.currentWeather = newFiveDaysForecasts.currentWeather;
            newLocationData.currentDate = new Date().toLocaleDateString('en');
          } else {
            setAlertMessange('Sorry! We could not get the new weather in ' + location.name + ', we only have the weather from the last time you connected');
          }

          favoriteLocationsData.push(newLocationData);
        }
      }

      setFavoriteLocations(favoriteLocationsData);
    }

    const data = window.localStorage.getItem(favoritesStorageName);

    if (data) {
      getLocationNewData(data);
    }
  }, [isDemoData])

  // save favorite locations in the local storage
  useEffect(() => {
    const data = JSON.stringify(favoriteLocations);

    window.localStorage.setItem(favoritesStorageName, data);
  }, [favoriteLocations]);

  // get the theme from the local storage
  useEffect(() => {
    const theme = window.localStorage.getItem(themeStorageName);

    if (theme === 'dark-mode') {
      setDarkMode(true);
    }
  }, []);

  // change theme of the app and save the theme on the local storage
  useEffect(() => {
    if (darkMode) {
      document.documentElement.setAttribute('theme', 'dark-mode');

      window.localStorage.setItem(themeStorageName, 'dark-mode');
    } else {
      document.documentElement.setAttribute('theme', 'light-mode');

      window.localStorage.setItem(themeStorageName, 'light-mode');
    }
  }, [darkMode]);

  useEffect(() => {
    const metric = window.localStorage.getItem(metricStorageName);

    if (metric === 'celcius') {
      setTempInFahrenheit(false);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(metricStorageName, tempInFahrenheit ? 'farenheit' : 'celcius');
  }, [tempInFahrenheit]);

  return (
    <div className="App">
      <Header
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        page={page}
        setPage={setPage}
        tempInFahrenheit={tempInFahrenheit}
        setTempInFahrenheit={setTempInFahrenheit}
        isDemoData={isDemoData}
      />

      <div className={`content ${page === 'favorites' ? 'favorites' : 'home'}Page`}>
        <div className='container'>
          <Home
            tempInFahrenheit={tempInFahrenheit}
            setAlertMessange={setAlertMessange}
            currentLocation={currentLocation}
            setCurrentLocation={setCurrentLocation}
            setFavoriteLocations={setFavoriteLocations}
            isFavorite={favoriteLocations.some((loc) => {
              return loc.id === currentLocation?.id
            })}
            isDemoData={isDemoData}
          />
        </div>
        <div className='container'>
          <Favorites
            tempInFahrenheit={tempInFahrenheit}
            setPage={setPage}
            setCurrentLocation={setCurrentLocation}
            favoriteCities={favoriteLocations} />
        </div>
      </div>
      {alertMessange && <Alert text={alertMessange} closeFunc={() => setAlertMessange(null)} />}
    </div>
  );
}

export default App;
