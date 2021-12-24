import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { setCurrentLocation } from '../redux/currentLocation';
import { setAlertMessage } from '../redux/alertMessage';


import '../css/searchBar.css';

import search_icon from '../svg/search.svg';

import { LocationSearchData } from '../modules/location';

import getLocationID from '../helpers/getLocationId';
import getFiveDaysForecasts from '../helpers/getFiveDaysWeather';
import { autocompleteCall, fiveDaysCall } from '../helpers/demoData';

declare global {
  interface Window {
    __weatherAppTimeout: number;
  }
}

interface SearchBarProps {
  isDemoData: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ isDemoData }) => {
  const dispatch = useDispatch()

  const [locations, setLocations] = useState<LocationSearchData[]>([]);

  const [showSearchResults, setShowSearchResults] = useState(false);
  const [lookingForResults, setLookingForResults] = useState(false);

  const getLocations = (text: string) => {
    if (text !== '') {
      setLookingForResults(true);

      // start search after 500 ms from last text change
      window.clearTimeout(window.__weatherAppTimeout);
      window.__weatherAppTimeout = window.setTimeout(async () => {
        const autocompleteLocation = isDemoData ? autocompleteCall : await getLocationID(text);

        if (autocompleteLocation && autocompleteLocation.length > 0) {
          autocompleteLocation.splice(10, autocompleteLocation.length)
          setLocations(autocompleteLocation);
        } else {
          setLocations([]);
        }
        setLookingForResults(false);
        setShowSearchResults(true);
      }, 500);

    } else {
      setShowSearchResults(false);
    }
  }

  const getLocationData = async (location: LocationSearchData) => {
    const locationData = isDemoData ? fiveDaysCall : await getFiveDaysForecasts(location.id);

    if (locationData) {
      const finalData = { ...locationData, ...location, currentDate: new Date().toLocaleDateString('en') };

      dispatch(setCurrentLocation(finalData));
    } else {
      dispatch(setAlertMessage('Sorry, we could not find the weather in ' + location.name))
    }
  }

  // close the results items after a click on the screen
  useEffect(() => {
    const closeTesults = () => {
      setShowSearchResults(false);
    }

    if (showSearchResults) {
      window.addEventListener('click', closeTesults);
    }

    return () => window.removeEventListener('click', closeTesults);
  }, [showSearchResults]);

  return (
    <div className={`search ${lookingForResults ? 'searching' : 'idle'}`}>
      <img
        className='search_icon'
        src={search_icon} alt='search'
      />
      <input
        onClick={() => { if (locations.length > 0) setShowSearchResults(true); }}
        className='search_city'
        placeholder='Type to search a city...'
        onChange={(e) => getLocations(e.target.value)}
      />

      {showSearchResults && !lookingForResults &&
        <div className='search_results'>
          {locations.length > 0
            ? locations.map((item, i) => {
              return <div
                className='result'
                key={item.fullName + i}
                onClick={() => { getLocationData(item) }}
              >{item.fullName}</div>
            })
            : <div className='no_result'>No results</div>
          }
        </div>
      }
    </div>
  );
}

export default SearchBar;

