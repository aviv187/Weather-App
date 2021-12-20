import { API_KEY } from "./key";

const getLocationID = async (text: string) => {
  const url = '//dataservice.accuweather.com/locations/v1/cities/search'
  const query = `?apikey=${API_KEY}&q=${text}`

  const response = await fetch(url + query)
    .then(res => {
      if (res.status === 200) return res.json();
    })
    .catch(e => {
      console.log(e);
    });

  if (typeof response === 'undefined') return undefined;

  const locationArr: { fullName: string; name: string; id: string }[] = response.map((location: any) => {
    return {
      fullName: location.Region.EnglishName + ' - ' +
        location.Country.EnglishName + ' - ' +
        location.AdministrativeArea.EnglishName + ' - ' +
        location.EnglishName,
      name:
        location.EnglishName,
      id: location.Key.toString()
    };
  })

  return locationArr;
}

export default getLocationID;