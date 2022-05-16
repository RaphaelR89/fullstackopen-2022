import { useEffect, useState } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import personService from './services/persons';
import { v4 as uuidv4 } from 'uuid';
import Notification from '../src/components/Notification';

const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState('');
	const [newNumber, setNewNumber] = useState('');
	const [filteredPersons, setFilteredPersons] = useState(persons.concat([]));
	const [message, setMessage] = useState(null);

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
			if (
				window.confirm(
					`${duplicateNames[0].name} is already added to phonebook, replace the old number with a new one?`
				)
			) {
				const changedNumber = {
					...duplicateNames[0],
					number: newNumber,
				};
				// updating number of a person
				personService
					.update(duplicateNames[0].id, changedNumber)
					.then((person) => {
						// force components to rerender in order to display updated number
						setPersons(
							persons.map((p) => (p.id === person.id ? changedNumber : p))
						);
						setFilteredPersons(
							persons.map((p) => (p.id === person.id ? changedNumber : p))
						);
						// show message that person's number has been updated
						setMessage(`
							${person.name}'s number has been updated
						`);
						setTimeout(() => {
							setMessage(null);
						}, 5000);
					})
					.catch((error) => {
						setMessage(`Error, ${error}`);
						setPersons(persons.filter((p) => p.id !== duplicateNames[0].id));
						setFilteredPersons(
							persons.filter((p) => p.id !== duplicateNames[0].id)
						);
						setTimeout(() => {
							setMessage(null);
						}, 5000);
					});
			}
			setNewName('');
			setNewNumber('');
			return;
		}

		const newPerson = {
			name: newName,
			number: newNumber,
			id: uuidv4(),
		};

		personService.create(newPerson).then((response) => {
			setPersons(persons.concat(response));
			setFilteredPersons(persons.concat(newPerson));
			setNewName('');
			setNewNumber('');
			setMessage(
				`
					Added ${response.name}
					`
			);
			setTimeout(() => {
				setMessage(null);
			}, 5000);
		});
	};

	const filterPersons = (e) => {
		const matched = persons.filter((person) =>
			person.name.includes(e.target.value)
		);
		setFilteredPersons(matched);
	};

	const deletePerson = (id) => {
		const deletedPerson = persons.find((p) => p.id === id);
		const { name } = deletedPerson;

		if (window.confirm(`Delete ${name}?`)) {
			personService.remove(id);
			setPersons(persons.filter((p) => p.id !== id));
			setFilteredPersons(persons.filter((p) => p.id !== id));
		}
	};

	return (
		<div>
			<h2>Phonebook</h2>
			<Notification message={message} />
			<Filter filterPersons={filterPersons} />
			<PersonForm
				addPerson={addPerson}
				setNewName={setNewName}
				newName={newName}
				setNewNumber={setNewNumber}
				newNumber={newNumber}
			/>
			<h2>Numbers</h2>
			<Persons persons={filteredPersons} deletePerson={deletePerson} />
		</div>
	);
};

export default App;
