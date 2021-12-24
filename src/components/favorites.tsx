import React from 'react';
import { useDispatch } from 'react-redux';
import { setCurrentLocation } from '../redux/currentLocation';

import '../css/favorites.css';

import { LocationData } from '../modules/location';

import fahrenheitToCelsius from '../helpers/fahrenheitToCelsius';
import { setPageName } from '../redux/page';


interface FavoritesProps {
  favoriteCities: LocationData[];
  tempInFahrenheit: boolean;
}

const Favorites: React.FC<FavoritesProps> = ({ favoriteCities, tempInFahrenheit }) => {
  const dispatch = useDispatch();

  const selectLocation = (city: LocationData) => {
    dispatch(setCurrentLocation(city));
    dispatch(setPageName('home'));
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