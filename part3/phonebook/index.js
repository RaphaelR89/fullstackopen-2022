const express = require('express');
const app = express();
const morgan = require('morgan');

app.use(express.json());
app.use(morgan('tiny'));

let persons = [
	{
		id: 1,
		name: 'Arto Hellas',
		number: '040-123456',
	},
	{
		id: 2,
		name: 'Ada Lovelace',
		number: '39-44-5323523',
	},
	{
		id: 3,
		name: 'Dan Abramov',
		number: '12-43-234345',
	},
	{
		id: 4,
		name: 'Mary Poppendieck',
		number: '39-23-6423122',
	},
];

//step 1
app.get('/api/persons', (request, response) => {
	response.json(persons);
});

// step 2
app.get('/info', (request, response) => {
	response.send(
		`<p>Phonebook has info for ${persons.length} </p>
		<p>${new Date().toUTCString()}</p>`
	);
});

//step 3
app.get('/api/persons/:id', (request, response) => {
	const id = Number(request.params.id);
	const person = persons.find((person) => person.id === id);

	if (person) {
		response.json(person);
	} else {
		response.status(404).end();
	}
});

// step 4
app.delete('/api/persons/:id', (request, response) => {
	const id = Number(request.params.id);
	persons = persons.filter((person) => person.id !== id);
	response.status(204).end();
});

// step 5
const generateId = () => {
	const maxId = Math.max(...persons.map((p) => p.id));
	return maxId + 1;
};

app.post('/api/persons', (request, response) => {
	const { name, number } = request.body;

	// step 6
	if (!request.body) {
		return response.status(400).json({
			error: 'missing content',
		});
	}

	if (!name || !number) {
		return response.status(400).json({
			error: 'name or number missing',
		});
	}

	// check for unique name
	if (persons.find((p) => p.name === name)) {
		return response.status(400).json({
			error: 'name must be unique',
		});
	}

	const person = {
		name,
		number,
		id: generateId(),
	};

	persons = persons.concat(person);
	response.json(person);
});

const PORT = 3001;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
