import React from 'react';

import '../css/alert.css';

interface AlertProps {
  text: string;
  closeFunc: Function;
}

const Alert: React.FC<AlertProps> = ({ text, closeFunc }) => {
  return (
    <div className='alert'>
      {text}
      <div className='close_button' onClick={() => closeFunc()}>OK</div>
    </div>
  );
}

export default Alert;