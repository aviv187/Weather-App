export const tempInFahrenheit = (
  state: boolean = true,
  action: {
    type: 'SET_TEMP_METRIC';
    value: boolean;
  }
) => {
  switch (action.type) {
    case 'SET_TEMP_METRIC':
      return action.value;

    default:
      return state;
  }
};

export const setTempInFahrenheit = (value: boolean) => {
  return {
    type: 'SET_TEMP_METRIC',
    value,
  };
};