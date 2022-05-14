const Person = ({ person, deletePerson }) => {
	return (
		<div>
			{person.name} {person.number}{' '}
			<button onClick={() => deletePerson(person.id)}>delete</button>
		</div>
	);
};

const Persons = ({ persons, deletePerson }) => {
	return (
		<div>
			{persons.map((person) => (
				<Person key={person.id} person={person} deletePerson={deletePerson} />
			))}
		</div>
	);
};
export default Persons;
