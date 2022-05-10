import { useEffect, useState } from 'react';
import axios from 'axios';
import County from './components/Country';

function App() {
	const [countries, setCountries] = useState([]);
	const [filteredCountries, setFilteredCountries] = useState([]);

	useEffect(() => {
		axios.get('https://restcountries.com/v3.1/all').then((response) => {
			setCountries(response.data);
		});
	}, []);

	const findCountries = (e) => {
		const foundCountries = countries.filter((country) => {
			return country.name.common.toLowerCase().includes(e.target.value);
		});
		setFilteredCountries(foundCountries);
	};

	return (
		<div>
			<div className='filter'>
				find countries <input type='text' onChange={findCountries} />
				{filteredCountries.length > 10 ? (
					<div>Too many matches, specify another filter</div>
				) : filteredCountries.length === 1 ? (
					<County {...filteredCountries[0]} />
				) : (
					filteredCountries.map((country) => {
						return <li key={country.name.common}>{country.name.common}</li>;
					})
				)}
			</div>
		</div>
	);
}

export default App;
