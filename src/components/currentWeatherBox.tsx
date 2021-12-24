import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFavoriteLocations } from '../redux/favoriteLocations';

import '../css/currentWeatherBox.css';

import heart_icon from '../svg/heart.svg';
import full_heart_icon from '../svg/full_heart.svg';

import { LocationData } from '../modules/location';

import fahrenheitToCelsius from '../helpers/fahrenheitToCelsius';

const CurrentWeatherBox: React.FC = () => {
  const dispatch = useDispatch();

  const currentLocation: LocationData = useSelector((state: any) => state.currentLocation);
  const favoriteLocations: LocationData[] = useSelector((state: any) => state.favoriteLocations);
  const tempInFahrenheit: boolean = useSelector((state: any) => state.tempInFahrenheit);

  const currentDay = useMemo(() => {
    return currentLocation?.fiveDaysForecasts[0];
  }, [currentLocation])

  const addOrDeleteFromFavorite = () => {
    const favoriteLocationsData = [...favoriteLocations];

    if (!favoriteLocations.includes(currentLocation)) {
      favoriteLocationsData.push(currentLocation!);
    } else {
      const index = favoriteLocationsData.findIndex(item => {
        return item.id === currentLocation!.id;
      })

      favoriteLocationsData.splice(index, 1);
    }

    dispatch(setFavoriteLocations(favoriteLocationsData));
  };

  return <div className='weather_box'>
    {/* general data about the selected city weather*/}
    <div className='weather_box_start'>
      <div className='city_name_and_temp'>
        <div className='name'>{currentLocation.name}</div>
        <div className='date'>{new Intl.DateTimeFormat('en-GB', { dateStyle: 'full' }).format(new Date())}</div>
      </div>

      <img
        onClick={addOrDeleteFromFavorite}
        className='heart_icon'
        src={favoriteLocations.includes(currentLocation) ? full_heart_icon : heart_icon}
        alt='' />
    </div>

    <div className={`current_weather icon_${currentDay?.dayTime.icon}`}>
      <div className='temp'>
        {tempInFahrenheit
          ? <div>{`${currentDay!.maxTemp}°`}</div>
          : <div>{`${fahrenheitToCelsius(currentDay!.maxTemp)}°`}</div>
        }
      </div>
      <div className='phrase'>{currentDay?.dayTime.phrase}</div>
    </div>
    {/* the coming days weather */}
    <div className='five_days_weather'>
      {currentLocation.fiveDaysForecasts.map((item, index) => {

        return index > 0
          ? <div className={`day_weather icon_${item!.dayTime.icon}`} key={item.day}>
            <div>{item.day}</div>
            {tempInFahrenheit
              ? <div>{`${item.maxTemp}°`}</div>
              : <div>{`${fahrenheitToCelsius(item!.maxTemp)}°`}</div>}
          </div>
          : null

      })}
    </div>
  </div>

}

export default CurrentWeatherBox;

