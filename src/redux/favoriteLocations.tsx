import { LocationData } from "../modules/location";

export const favoriteLocations = (
  state: LocationData[] = [],
  action: {
    type: 'SET_FAVORITE_LOCATIONS';
    value: LocationData[];
  }
) => {
  switch (action.type) {
    case 'SET_FAVORITE_LOCATIONS':
      return action.value;

    default:
      return state;
  }
};

export const setFavoriteLocations = (value: LocationData[]) => {
  return {
    type: 'SET_FAVORITE_LOCATIONS',
    value,
  };
};