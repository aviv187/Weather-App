import React from 'react';

import sun_icon from '../svg/sun.svg'
import moon_icon from '../svg/moon.svg'

import '../css/header.css';

const demoDataStorageName = "react_weather_app_demo";

interface HeaderProps {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
  page: "home" | "favorites";
  setPage: React.Dispatch<React.SetStateAction<"home" | "favorites">>;
  tempInFahrenheit: boolean;
  setTempInFahrenheit: React.Dispatch<React.SetStateAction<boolean>>;
  isDemoData: boolean;
}

const Header: React.FC<HeaderProps> = ({ darkMode, setDarkMode, page, setPage, tempInFahrenheit, setTempInFahrenheit, isDemoData }) => {
  return (
    <header>
      <div className='header_title'>Abra Weather Task</div>
      <div className='header_buttons'>
        <div
          className={page === 'home' ? 'selected' : ''}
          onClick={() => setPage('home')}
        >Home</div>
        <div
          className={page === 'favorites' ? 'selected' : ''}
          onClick={() => setPage('favorites')}
        >Favorites</div>

        <div className='controls'>

          <div onClick={() => setTempInFahrenheit(!tempInFahrenheit)}>{tempInFahrenheit ? 'F' : 'C'}°</div>

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
