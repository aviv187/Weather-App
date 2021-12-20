export interface LocationData {
  currentDate: string;
  id: string;
  name: string;
  fullName: string;
  currentWeather: string;
  fiveDaysForecasts: dayForecast[];
}

export interface dayForecast {
  minTemp: number;
  maxTemp: number;
  day: string;
  dayTime: {
    icon: number;
    phrase: string;
  };
  nightTime: {
    icon: number;
    phrase: string;
  };
}

export interface LocationSearchData {
  fullName: string;
  name: string;
  id: string;
}