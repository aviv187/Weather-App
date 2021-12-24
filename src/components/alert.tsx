import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { setAlertMessage } from '../redux/alertMessage';

import '../css/alert.css';

const Alert: React.FC = () => {
  const dispatch = useDispatch();

  const alertMessage: string | null = useSelector((state: any) => state.alertMessage);

  return (
    <div className='alert'>
      {alertMessage}
      <div className='close_button' onClick={() => dispatch(setAlertMessage(null))}>OK</div>
    </div>
  );
}

export default Alert;