export const alertMessage = (
  state: string | null = null,
  action: {
    type: 'SET_ALERT_MESSAGE';
    value: string | null;
  }
) => {
  switch (action.type) {
    case 'SET_ALERT_MESSAGE':
      return action.value;

    default:
      return state;
  }
};

export const setAlertMessage = (value: string | null) => {
  return {
    type: 'SET_ALERT_MESSAGE',
    value,
  };
};