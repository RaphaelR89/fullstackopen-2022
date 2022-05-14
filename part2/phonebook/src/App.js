import { useEffect, useState } from 'react';
import axios from 'axios';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import personService from './services/persons';

const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState('');
	const [newNumber, setNewNumber] = useState('');
	const [filteredPersons, setFilteredPersons] = useState(persons.concat([]));

	useEffect(() => {
		personService.getAll().then((response) => {
			setPersons(response);
			setFilteredPersons(response);
		});
	}, []);

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

		personService.create(newPerson).then((response) => {
			setPersons(persons.concat(response));
			setFilteredPersons(persons.concat(newPerson));
			setNewName('');
			setNewNumber('');
		});
	};

	const filterPersons = (e) => {
		console.log(persons);
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
