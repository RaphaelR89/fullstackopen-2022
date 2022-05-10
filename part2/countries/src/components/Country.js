const County = (props) => {
	const {
		name: { common },
		capital,
		area,
		languages,
		flags,
	} = props;
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
		</div>
	);
};

export default County;
