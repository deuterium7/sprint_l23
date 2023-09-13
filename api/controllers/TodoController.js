const TodoService = require('../services/TodoService');
const service = new TodoService();

const index = async (req, res) => {
	const todos = await service.getAll();
	res.status(200).json({ data: todos, meta: { total: todos.length }});
}

const get = async (req, res) => {
	const todo = await service.findById(req.params.id);
	res.status(200).json(todo);
}

const store = async (req, res) => {
	const todo = await service.store(req.body);
	res.status(201).send(todo);
}

const update = async (req, res) => {
	const todo = await service.update(req.params.id, req.body);
	res.status(200).json(todo);
}

const destroy = async (req, res) => {
	await service.destroy(req.params.id);
	res.status(204).send();
}

module.exports = { index, get, store, update, destroy };