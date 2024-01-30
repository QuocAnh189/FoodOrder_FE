const config = {
  url: 'https://api.countrystatecity.in/v1/countries',
  key: 'RTRUNFR1WlB2WjNjRnppWlJqNVNmSmltakdWTG5nT3Q4RjRqa043Mw=='
};

const loadCountries = async () => {
  const apiEndPoint = config.url;
  const res = await fetch(apiEndPoint, {
    headers: { 'X-CSCAPI-KEY': config.key }
  })
    .then(res => res.json())
    .then(data => data);
  return res;
};

const loadState = () => {
  const selectedCountryCode = 'AF';
  fetch(`${config.url}/${selectedCountryCode}/states`, {
    headers: { 'X-CSCAPI-KEY': config.key }
  })
    .then(res => res.json())
    .then(data => console.log(data));
};

const loadCity = () => {
  const selectedCountryCode = 'AF';
  const selectedStateCode = 'aaaaa';

  fetch(
    `${config.url}/${selectedCountryCode}/states/${selectedStateCode}/cities`,
    {
      headers: { 'X-CSCAPI-KEY': config.key }
    }
  )
    .then(res => res.json())
    .then(data => console.log(data));
};
