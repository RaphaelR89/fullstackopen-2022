const Header = (props) => {
	console.log(props);
	return (
		<div>
			<h1>{props.course}</h1>
		</div>
	);
};

const Content = (props) => {
	const { parts } = props;
	return (
		<div>
			<Part part={parts[0]} />
			<Part part={parts[1]} />
			<Part part={parts[2]} />
		</div>
	);
};

const Part = (props) => {
	const { name, exercises } = props.part;
	return (
		<div>
			<p>
				{name} {exercises}
			</p>
		</div>
	);
};

const Total = ({ parts }) => {
	return (
		<div>
			<p>
				Number of exercises{' '}
				{parts[0].exercises + parts[1].exercises + parts[2].exercises}
			</p>
		</div>
	);
};

const App = () => {
	const course = {
		name: 'Half Stack application development',
		parts: [
			{
				name: 'Fundamentals of React',
				exercises: 10,
			},
			{
				name: 'Using props to pass data',
				exercises: 7,
			},
			{
				name: 'State of a component',
				exercises: 14,
			},
		],
	};
	return (
		<div>
			<Header course={course.name} />
			<Content parts={course.parts} />
			<Total parts={course.parts} />
		</div>
	);
};

export default App;
