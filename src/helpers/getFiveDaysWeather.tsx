import { dayForecast } from "../modules/location";
import { API_KEY } from "./key";

const weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

const getFiveDaysForecasts = async (id: string) => {
  const url = '//dataservice.accuweather.com/forecasts/v1/daily/5day/'
  const query = `${id}?apikey=${API_KEY}`

  const response = await fetch(url + query)
    .then(res => {
      if (res.status === 200) return res.json();
    })
    .catch(e => console.log(e));

  if (!response) return undefined;
  const forecast: {
    currentWeather: string;
    fiveDaysForecasts: dayForecast[]
  } = {
    currentWeather: response.Headline.Category,
    fiveDaysForecasts: response.DailyForecasts.map((item: any) => {
      const day = weekday[new Date(item.Date).getDay()];

      const minTemp = item.Temperature.Minimum.Value;
      const maxTemp = item.Temperature.Maximum.Value;

      const dayTime = { icon: item.Day.Icon, phrase: item.Day.IconPhrase };
      const nightTime = { icon: item.Night.Icon, phrase: item.Night.IconPhrase };

      return { minTemp, maxTemp, day, dayTime, nightTime }
    })
  };

  return forecast;
}

export default getFiveDaysForecasts;
