import getFiveDaysForecasts from "./getFiveDaysWeather";
import getLocationID from "./getLocationId";

const getLocationData = async (text: string) => {
  const locations = await getLocationID(text);

  if (locations) {
    if (locations.length === 0) {
      return;
    }

    const fiveDaysForecasts = await getFiveDaysForecasts(locations[0].id);

    if (fiveDaysForecasts) {
      return { currentDate: new Date().toLocaleDateString('en'), ...locations[0], ...fiveDaysForecasts };
    } else {
      return;
    }

  } else {
    return;
  }
}

export default getLocationData;