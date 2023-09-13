const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');

class Todo {
	constructor(userId, title, completed) {
		this.userId = userId;
		this.id = uuidv4();
		this.title = title;
		this.completed = completed;
	}

	static all() {
		return new Promise((resolve, reject) => {
			fs.readFile(
				path.join(__dirname, '..', 'database', 'todos.json'),
				'utf-8',
				(e, content) => {
					e ? reject(e) : resolve(JSON.parse(content));
				}
			)
		});
	}

	static async find(id) {
		const todos = await Todo.all();
		return todos.find(todo => todo.id == id);
	}

	static async store(data) {
		const todo = new Todo(data.userId, data.title, data.completed);
		const todos = await Todo.all();

		todos.push({
			userId: todo.userId,
			id: todo.id,
			title: todo.title,
			completed: todo.completed,
		});

		return new Promise((resolve, reject) => {
			fs.writeFile(
				path.join(__dirname, '..', 'database', 'todos.json'),
				JSON.stringify(todos),
				(e) => {
					e ? reject(e) : resolve(todo);
				}
			)
		});
	}

	static async update(id, data) {
		const todos = await Todo.all();
		const index = todos.findIndex(todo => todo.id == id);

		todos[index] = {
			userId: data.userId,
			id: id,
			title: data.title,
			completed: data.completed,
		};

		return new Promise((resolve, reject) => {
			fs.writeFile(
				path.join(__dirname, '..', 'database', 'todos.json'),
				JSON.stringify(todos),
				(e) => {
					e ? reject(e) : resolve(todos[index]);
				}
			)
		});
	}

	static async destroy(id) {
		const todos = await Todo.all();
		const index = todos.findIndex(todo => todo.id === id);
		todos.splice(index, 1);

		return new Promise((resolve, reject) => {
			fs.writeFile(
				path.join(__dirname, '..', 'database', 'todos.json'),
				JSON.stringify(todos),
				(e) => {
					e ? reject(e) : resolve();
				}
			)
		});
	}
}

module.exports = Todo;