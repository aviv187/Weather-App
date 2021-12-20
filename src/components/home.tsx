import React from 'react';

import Loader from './loader';
import SearchBar from './searchBar';

import { LocationData } from '../modules/location';

import CurrentWeatherBox from './currentWeatherBox';

interface HomeProps {
  currentLocation: LocationData | null;
  isFavorite: boolean;
  setFavoriteLocations: React.Dispatch<React.SetStateAction<LocationData[]>>
  setCurrentLocation: React.Dispatch<React.SetStateAction<LocationData | null>>
  setAlertMessange: React.Dispatch<React.SetStateAction<string | null>>
  tempInFahrenheit: boolean;
  isDemoData: boolean;
}

const Home: React.FC<HomeProps> = ({ currentLocation, isFavorite, setFavoriteLocations, setCurrentLocation, setAlertMessange, tempInFahrenheit, isDemoData }) => {
  return (
    <>
      <SearchBar
        setCurrentLocation={setCurrentLocation}
        setAlertMessange={setAlertMessange}
        isDemoData={isDemoData}
      />
      {currentLocation
        ? <CurrentWeatherBox
          currentLocation={currentLocation}
          isFavorite={isFavorite}
          setFavoriteLocations={setFavoriteLocations}
          tempInFahrenheit={tempInFahrenheit}
        />
        : <Loader />
      }
    </>
  );
}

export default Home;

