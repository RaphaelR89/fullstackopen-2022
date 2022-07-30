import { useEffect, useState } from 'react';
import personServices from './services/persons';
import { v4 as uuid } from 'uuid';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import Notification from './components/Notification';

const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState('');
	const [newNumber, setNewNumber] = useState('');
	const [filter, setFilter] = useState('');
	const [message, setMessage] = useState(null);

	useEffect(() => {
		personServices.getAll().then((response) => {
			setPersons(response.data);
		});
	}, [persons]);

	const addPerson = (e) => {
		e.preventDefault();
		const duplicatedPersons = persons.filter(
			(person) => person.name === newName
		);
		if (duplicatedPersons.length) {
			if (
				window.confirm(
					`${duplicatedPersons[0].name} is already added to phonebook, replace the old number with a new one?`
				)
			) {
				const updatedPerson = {
					...duplicatedPersons[0],
					number: newNumber,
				};

				personServices
					.update(duplicatedPersons[0].id, updatedPerson)
					.then((response) => {
						console.log(updatedPerson);
						setPersons(
							persons.map((person) =>
								person.id === duplicatedPersons[0].id ? updatedPerson : person
							)
						);
						setMessage(
							`${duplicatedPersons[0].name}'s number has been updated`
						);
						setTimeout(() => setMessage(null), 5000);
					});
				setNewName('');
				setNewNumber('');
				return;
			}
		}

		const newPerson = {
			name: newName,
			number: newNumber,
			id: uuid(),
		};

		personServices.create(newPerson).then((response) => {
			// setPersons(persons.concat(newPerson));
			setNewName('');
			setNewNumber('');
			setMessage(`Added ${newPerson.name}`);
			setTimeout(() => setMessage(null), 5000);
			return;
		});
	};

	const deletePerson = (id) => {
		personServices
			.remove(id)
			.then((response) => {
				const person = persons.find((person) => person.id === id);
				if (window.confirm(`Delete ${person.name}`)) {
					personServices.remove(id).then((response) => {
						console.log(response);
					});
					setPersons(persons.filter((person) => person.id !== id));
				}
			})
			.catch((error) => {
				setMessage(
					`Error, Information of ${
						persons.find((p) => p.id === id).name
					} has already been removed from server`
				);
				setPersons(persons.filter((p) => p.id !== id));
			});
	};

	const handleFilter = (e) => {
		setFilter(e.target.value);
	};

	return (
		<div>
			<h2>Phonebook</h2>
			<Notification message={message} />
			<Filter filter={filter} handleFilter={handleFilter} />
			<PersonForm
				addPerson={addPerson}
				newName={newName}
				newNumber={newNumber}
				setNewName={setNewName}
				setNewNumber={setNewNumber}
			/>
			<h2>Numbers</h2>
			<Persons persons={persons} filter={filter} deletePerson={deletePerson} />
		</div>
	);
};

export default App;
