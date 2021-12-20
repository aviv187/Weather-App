import React from 'react';

import '../css/favorites.css';

import { LocationData } from '../modules/location';

import fahrenheitToCelsius from '../helpers/fahrenheitToCelsius';


interface FavoritesProps {
  favoriteCities: LocationData[];
  setCurrentLocation: React.Dispatch<React.SetStateAction<LocationData | null>>
  setPage: React.Dispatch<React.SetStateAction<"favorites" | "home">>
  tempInFahrenheit: boolean;
}

const Favorites: React.FC<FavoritesProps> = ({ favoriteCities, setCurrentLocation, setPage, tempInFahrenheit }) => {
  const selectLocation = (city: LocationData) => {
    setCurrentLocation(city);
    setPage('home');
  }

  return (
    <div className="favorites">
      {favoriteCities.map((city, i) => {
        return <div
          key={`${city.name}${i}`}
          className='city_box'
          onClick={() => selectLocation(city)}
        >
          <div className='city_name'>
            <div className='name'>{city.name}</div>
            <div className='location'>{city.fullName}</div>
          </div>

          <div className={`current_weather icon_${city.fiveDaysForecasts[0]!.dayTime.icon}`}>
            <div className='temp'>
              {tempInFahrenheit
                ? <div>{`${city.fiveDaysForecasts[0]!.maxTemp}°`}</div>
                : <div>{`${fahrenheitToCelsius(city.fiveDaysForecasts[0]!.maxTemp)}°`}</div>
              }
            </div>
            <div className='phrase'>{city.fiveDaysForecasts[0]?.dayTime.phrase}</div>
          </div>
        </div>
      })}
    </div>
  );
}

export default Favorites;