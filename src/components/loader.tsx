import React from 'react';

import '../css/loader.css';

import sun_icon from '../svg/icons/1.svg';

const Loader: React.FC = () => {
  return (
    <div className='loader'>
      <img className='sun_icon' src={sun_icon} alt='loader' />
    </div>
  );
}

export default Loader;