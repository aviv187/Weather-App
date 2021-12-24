import { LocationData } from "../modules/location";

export const currentLocation = (
  state: null | LocationData = null,
  action: {
    type: 'SET_CURRENT_LOCATION';
    value: null | LocationData;
  }
) => {
  switch (action.type) {
    case 'SET_CURRENT_LOCATION':
      return action.value;

    default:
      return state;
  }
};

export const setCurrentLocation = (value: null | LocationData) => {
  return {
    type: 'SET_CURRENT_LOCATION',
    value,
  };
};