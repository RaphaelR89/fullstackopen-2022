const Header = ({ name }) => {
	return (
		<div>
			<h2>{name}</h2>
		</div>
	);
};

const Part = ({ part }) => {
	return (
		<li>
			{part.name} {part.exercises}
		</li>
	);
};

const Content = ({ course }) => {
	const total = course.reduce((sum, acc) => sum + acc.exercises, 0);
	return (
		<div>
			<ul style={{ listStyle: 'none', padding: '0' }}>
				{course.map((part) => (
					<Part part={part} key={part.id} />
				))}
			</ul>
			<strong>total of {total} exercises</strong>
		</div>
	);
};

const Course = ({ course }) => {
	return (
		<div>
			<Header name={course.name} />
			<Content course={course.parts} />
		</div>
	);
};

export default Course;
