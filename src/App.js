import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {

  const [countries, setCountries] = useState([] );
  const [states, setStates] = useState([])
  const [cities, setCities] = useState([])
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  const fetchCountries = async () =>{

    try{
      const response = await fetch(`https://crio-location-selector.onrender.com/countries`)
      const countriesData = await response.json()
      setCountries(countriesData)
      console.log(countriesData)
    }catch(error){
      console.error(error, "countries")
    }
  }

  const fetchStates = async (countryName) =>{

    try{
      const response = await fetch(`https://crio-location-selector.onrender.com/country=${countryName}/states`)
      const statesData = await response.json()
      setStates(statesData)
      // console.log(statesData)
    }catch(error){
      console.error(error, "States")
    }
  }

  const fetchCities = async (countryName,stateName) =>{

    try{
      const response = await fetch(`https://crio-location-selector.onrender.com/country=${countryName}/state=${stateName}/cities`)
      const citiesData = await response.json()
      setCities(citiesData)
      // console.log(citiesData)
    }catch(error){
      console.error(error, "Cities")
    }
  }

  useEffect(()=>{
   fetchCountries();
  },[])
  
  useEffect(() => {
    if (selectedCountry) {
      fetchStates(selectedCountry);
    } else {
      setStates([]); 
    }
    setSelectedState(''); 
    setCities([]);
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedCountry && selectedState) {
      fetchCities(selectedCountry, selectedState);
    } else {
      setCities([]);
    }
    setSelectedCity(''); 
  }, [selectedState]);

  return (
    <div className="App">
       <div> 
        <h1>Select Location</h1>
        <select name="country" onChange={(e) => setSelectedCountry(e.target.value)}>
          <option value="">Select Country</option>
          {countries.map((country) => (
            <option key={country} value={country}>{country}</option>
          ))}
        </select>
      </div>
      <div> 
        <select name="State" onChange={(e) => setSelectedState(e.target.value)} disabled={!selectedCountry}>
          <option value="">Select State</option>
          {states.map((state) => (
            <option key={state} value={state}>{state}</option>
          ))}
        </select>
      </div>
      <div> 
        <select name="cities" onChange={(e) => setSelectedCity(e.target.value)} disabled={!selectedState || !selectedCountry}>
          <option value="">Select city</option>
          {cities.map((city) => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>
      </div>
      {selectedCountry && selectedState && selectedCity && (
        <h1>You selected {selectedCity}, {selectedState}, {selectedCountry}</h1>
      )}
    </div>
  );
}

export default App;
