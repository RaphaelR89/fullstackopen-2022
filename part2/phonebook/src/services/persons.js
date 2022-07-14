import axios from 'axios';
const baseUrl = '/api/persons';

// CREATE
const create = (newObject) => {
	return axios.post(baseUrl, newObject);
};

// READ
const getAll = () => {
	return axios.get(baseUrl);
};

// UPDATE
const update = (id, newObject) => {
	return axios.put(`${baseUrl}/${id}`, newObject);
};

// DELETE
const remove = (id) => {
	return axios.delete(`${baseUrl}/${id}`);
};

export default { getAll, create, update, remove };
