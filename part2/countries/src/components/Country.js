import axios from 'axios';
import { useEffect, useState } from 'react';

const County = (props) => {
	const [weatherInfo, setWeatherInfo] = useState(null);
	const {
		name: { common },
		capital,
		area,
		languages,
		flags,
		latlng: [lat, lon],
	} = props;

	useEffect(() => {
		axios
			.get(
				`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_API_KEY}`
			)
			.then((response) => response.data)
			.then((data) => {
				setWeatherInfo(data);
				console.log(data);
			});
	}, []);

	return (
		<div>
			<h1>{common}</h1>
			<p>
				capital{' '}
				{capital.length === 1 ? capital : capital.map((cap) => <li>{cap}</li>)}
			</p>
			<p>area {area}</p>
			<h4>languages:</h4>
			<ul>
				{Object.values(languages).map((lang) => (
					<li key={lang}>{lang}</li>
				))}
			</ul>
			<img src={flags.png} alt={`${common}'s flag`} />
			<h2>Weather in {capital}</h2>
			<p>temperature {weatherInfo?.main.temp}&#8451;</p>
			<img
				src={`http://openweathermap.org/img/wn/${weatherInfo?.weather[0].icon}@2x.png`}
				alt='icon'
			/>
			<p>wind {weatherInfo?.wind?.speed} m/s</p>
		</div>
	);
};

export default County;
