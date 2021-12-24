import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setTempInFahrenheit } from './redux/tempInFahrenheit';
import { setCurrentLocation } from './redux/currentLocation';
import { setFavoriteLocations } from './redux/favoriteLocations';
import { setAlertMessage } from './redux/alertMessage';

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
  const dispatch = useDispatch();

  const [darkMode, setDarkMode] = useState(false);

  const pageName: 'home' | 'favorites' = useSelector((state: any) => state.pageName);
  const tempInFahrenheit: boolean = useSelector((state: any) => state.tempInFahrenheit);
  const favoriteLocations: LocationData[] = useSelector((state: any) => state.favoriteLocations);
  const alertMessage: string | null = useSelector((state: any) => state.alertMessage);

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
        dispatch(setCurrentLocation(location));
      } else {
        dispatch(setAlertMessage('Sorry! We could not get the weather in Tel Aviv'));
      }
    }

    getTelAvivData()
  }, [isDemoData, dispatch]);

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
            dispatch(setAlertMessage('Sorry! We could not get the new weather in ' + location.name + ', we only have the weather from the last time you connected'));
          }

          favoriteLocationsData.push(newLocationData);
        }
      }

      dispatch(setFavoriteLocations(favoriteLocationsData));
    }

    const data = window.localStorage.getItem(favoritesStorageName);

    if (data) {
      getLocationNewData(data);
    }
  }, [isDemoData, dispatch])

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
      dispatch(setTempInFahrenheit(false));
    }
  }, [dispatch]);

  useEffect(() => {
    window.localStorage.setItem(metricStorageName, tempInFahrenheit ? 'farenheit' : 'celcius');
  }, [tempInFahrenheit]);

  return (
    <div className="App">
      <Header
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        tempInFahrenheit={tempInFahrenheit}
        isDemoData={isDemoData}
      />

      <div className={`content ${pageName === 'favorites' ? 'favorites' : 'home'}Page`}>
        <div className='container'>
          <Home
            isDemoData={isDemoData}
          />
        </div>
        <div className='container'>
          <Favorites
            tempInFahrenheit={tempInFahrenheit}
            favoriteCities={favoriteLocations} />
        </div>
      </div>
      {alertMessage && <Alert />}
    </div>
  );
}

export default App;
