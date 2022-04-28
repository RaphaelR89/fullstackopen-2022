const PersonForm = ({
	addPerson,
	setNewName,
	newName,
	setNewNumber,
	newNumber,
}) => {
	return (
		<form onSubmit={addPerson}>
			<div>
				name:{' '}
				<input onChange={(e) => setNewName(e.target.value)} value={newName} />
			</div>
			<div>
				number:{' '}
				<input
					onChange={(e) => setNewNumber(e.target.value)}
					value={newNumber}
				/>
			</div>
			<div>
				<button type='submit'>add</button>
			</div>
		</form>
	);
};

export default PersonForm;
