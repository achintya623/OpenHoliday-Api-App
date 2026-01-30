import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [CountryHolidays, setCountryHolidays] = useState([]);

  // holidayApi = https://openholidaysapi.org/PublicHolidays?countryIsoCode=AD&validFrom=2026-01-01&validTo=2026-12-31&languageIsoCode=En

  useEffect(() => {
    const fetchCountries = async () => {
      const apiUrl = "https://openholidaysapi.org/Countries?languageIsoCode=EN";
      try {
        const response = await fetch(apiUrl);
        const result = await response.json();
        console.log("Api data of countries", result);
        setCountries(result);
      } catch (err) {
        console.error(err.message);
      }
    };
    fetchCountries();
  }, []);

  const fetchHoliday = async (code, country) => {
    const holidayApi = `https://openholidaysapi.org/PublicHolidays?countryIsoCode=${code}&validFrom=2026-01-01&validTo=2026-12-31&languageIsoCode=En`;
    try {
      const response = await fetch(holidayApi);
      const result = await response.json();
      console.log(`Holiday list of country ${country}`, result);
      setCountryHolidays(result);
      console.log(
        `Use state country holidays of country ${country}`,
        CountryHolidays,
      );
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleChange = (e) => {
    const countryCode = e.target.value;
    setSelectedCountry(countryCode);

    const country = countries.find((c) => c.isoCode === countryCode);

    if (country) {
      fetchHoliday(country.isoCode, country.name[0].text);
    }
  };

  console.log("use state countries", countries);

  return (
    <div>
      <div>
        <select name="countries" id="countries" onChange={handleChange}>
          <option value="">Choose a country</option>
          {countries.map((country) => (
            <option key={country.isoCode} value={country.isoCode}>
              {country.name[0].text}
            </option>
          ))}
        </select>
      </div>
      {CountryHolidays &&
        CountryHolidays.map((holiday) => (
          <div key={holiday.id}>-{holiday.name[0].text}</div>
        ))}
    </div>
  );
}

export default App;
