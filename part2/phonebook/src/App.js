import { useState } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const App = () => {
	const [persons, setPersons] = useState([
		{ name: 'Arto Hellas', number: '040-123456', id: 1 },
		{ name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
		{ name: 'Dan Abramov', number: '12-43-234345', id: 3 },
		{ name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 },
	]);
	const [newName, setNewName] = useState('');
	const [newNumber, setNewNumber] = useState('');
	const [filteredPersons, setFilteredPersons] = useState(persons.concat([]));

	const addPerson = (e) => {
		e.preventDefault();
		// prevent adding names that already exist in the phonebook
		const duplicateNames = persons.filter((person) => person.name === newName);
		if (duplicateNames.length) {
			alert(`${newName} is already added to phonebook`);
			setNewName('');
			setNewNumber('');
			return;
		}

		const newPerson = {
			name: newName,
			number: newNumber,
			id: persons.length + 1,
		};

		setPersons(persons.concat(newPerson));
		setFilteredPersons(persons.concat(newPerson));
		setNewName('');
		setNewNumber('');
	};

	const filterPersons = (e) => {
		const matched = persons.filter((person) =>
			person.name.includes(e.target.value)
		);
		setFilteredPersons(matched);
	};

	return (
		<div>
			<h2>Phonebook</h2>
			<Filter filterPersons={filterPersons} />
			<PersonForm
				addPerson={addPerson}
				setNewName={setNewName}
				newName={newName}
				setNewNumber={setNewNumber}
				newNumber={newNumber}
			/>
			<h2>Numbers</h2>
			<Persons persons={filteredPersons} />
		</div>
	);
};

export default App;
