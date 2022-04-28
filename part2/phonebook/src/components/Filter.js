const Filter = ({ filterPersons }) => {
	return (
		<div>
			filter shown with <input onChange={filterPersons} />
		</div>
	);
};

export default Filter;
