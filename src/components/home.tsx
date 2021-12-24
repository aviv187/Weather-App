import React from 'react';
import { useSelector } from 'react-redux';

import Loader from './loader';
import SearchBar from './searchBar';

import { LocationData } from '../modules/location';

import CurrentWeatherBox from './currentWeatherBox';

interface HomeProps {
  isDemoData: boolean;
}

const Home: React.FC<HomeProps> = ({ isDemoData }) => {
  const currentLocation: null | LocationData = useSelector((state: any) => state.currentLocation);

  return (
    <>
      <SearchBar isDemoData={isDemoData} />
      {currentLocation
        ? <CurrentWeatherBox />
        : <Loader />
      }
    </>
  );
}

export default Home;

