const Todo = require('../models/Todo');

class TodoService {
	async getAll() {
		return await Todo.all();
	}

	async findById(id) {
		return await Todo.find(id);
	}

	async store(data) {
		return await Todo.store(data);
	}

	async update(id, data) {
		return await Todo.update(id, data);
	}

	async destroy(id) {
		return await Todo.destroy(id);
	}
}

module.exports = TodoService;