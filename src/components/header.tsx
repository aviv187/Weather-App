import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPageName } from '../redux/page';
import { setTempInFahrenheit } from '../redux/tempInFahrenheit';


import sun_icon from '../svg/sun.svg'
import moon_icon from '../svg/moon.svg'

import '../css/header.css';

const demoDataStorageName = "react_weather_app_demo";

interface HeaderProps {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
  tempInFahrenheit: boolean;
  isDemoData: boolean;
}

const Header: React.FC<HeaderProps> = ({ darkMode, setDarkMode, tempInFahrenheit, isDemoData }) => {
  const dispatch = useDispatch();

  const pageName: 'home' | 'favorites' = useSelector((state: any) => state.pageName);

  return (
    <header>
      <div className='header_title'>Abra Weather Task</div>
      <div className='header_buttons'>
        <div
          className={pageName === 'home' ? 'selected' : ''}
          onClick={() => dispatch(setPageName('home'))}
        >Home</div>
        <div
          className={pageName === 'favorites' ? 'selected' : ''}
          onClick={() => dispatch(setPageName('favorites'))}
        >Favorites</div>

        <div className='controls'>

          <div onClick={() => dispatch(setTempInFahrenheit(!tempInFahrenheit))}>{tempInFahrenheit ? 'F' : 'C'}°</div>

          <img
            className='theme_svg'
            src={darkMode ? sun_icon : moon_icon}
            alt={darkMode ? 'light-mode' : 'dark-mode'}
            onClick={() => setDarkMode(!darkMode)}
          />

          <div
            className='switch'
            onClick={() => {
              if (isDemoData) {
                window.localStorage.removeItem(demoDataStorageName);
              } else {
                window.localStorage.setItem(demoDataStorageName, "true");
              }
              window.location.reload();
            }}
          >
            {isDemoData ? "Switch to real" : "Switch to demo"}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
