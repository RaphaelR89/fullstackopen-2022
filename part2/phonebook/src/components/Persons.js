const Person = ({ person, deletePerson }) => {
	const { name, number, id } = person;
	return (
		<div>
			{name} {number} <button onClick={() => deletePerson(id)}>delete</button>
		</div>
	);
};

const Persons = ({ persons, filter, deletePerson }) => {
	return persons?.map((person) => {
		return filter ? (
			person.name.toLowerCase().includes(filter) && (
				<Person person={person} key={person.id} deletePerson={deletePerson} />
			)
		) : (
			<Person person={person} key={person.id} deletePerson={deletePerson} />
		);
	});
};

export default Persons;
