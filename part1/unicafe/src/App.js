import { useState } from 'react';

const Button = ({ giveFeedback, text }) => {
	return <button onClick={giveFeedback}>{text}</button>;
};
const StatisticLine = ({ text, value }) => {
	return (
		<tr>
			<td>{text}</td>
			<td>{value}</td>
		</tr>
	);
};

const Statistics = (props) => {
	const { good, neutral, bad } = props.clicks;
	const all = good + neutral + bad;
	const average = (good - bad) / all;
	const positive = (good * 100) / all;
	return (
		<div>
			<h2>statistics</h2>
			{all !== 0 ? (
				<table>
					<tbody>
						<StatisticLine text='good' value={good} />
						<StatisticLine text='neutral' value={neutral} />
						<StatisticLine text='bad' value={bad} />
						<StatisticLine text='all' value={all} />
						<StatisticLine text='average' value={average} />
						<StatisticLine text='positive' value={positive + '%'} />
					</tbody>
				</table>
			) : (
				'No feedback given'
			)}
		</div>
	);
};

const App = () => {
	// save clicks of each button to its own state
	const [clicks, setClicks] = useState({
		good: 0,
		neutral: 0,
		bad: 0,
	});

	const handleClick = (feedback) => {
		if (feedback === 'good') {
			return () => setClicks({ ...clicks, good: clicks.good + 1 });
		} else if (feedback === 'neutral') {
			return () => setClicks({ ...clicks, neutral: clicks.neutral + 1 });
		}
		return () => setClicks({ ...clicks, bad: clicks.bad + 1 });
	};

	return (
		<div>
			<h2>give feedback</h2>
			<Button giveFeedback={handleClick('good')} text='good' />
			<Button giveFeedback={handleClick('neutral')} text='neutral' />
			<Button giveFeedback={handleClick('bad')} text='bad' />
			<Statistics clicks={clicks} />
		</div>
	);
};

export default App;
