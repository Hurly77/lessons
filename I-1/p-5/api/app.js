const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const cuid = require('cuid');

const taskPath = process.cwd() + '/db.json';
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const getFile = () => {
	let file = fs.readFileSync(taskPath);
	return JSON.parse(file);
};

const addTask = (task) => {
	let tasks = getFile();
	task.id = cuid();
	tasks.push(task);
	fs.writeFileSync(taskPath, JSON.stringify(tasks));
	return task;
};

const removeTaskById = (id) => {
	let tasks = getFile();
	let updated = tasks.filter((task) => {
		if (task.id !== id) return task;
	});
	fs.writeFileSync(taskPath, JSON.stringify(updated));
	return updated;
};

app.get('/', (req, res) => {
	let tasks = getFile();
	res.status(200).json(tasks);
});

app.post('/', (req, res) => {
	let task = addTask(req.body);
	res.status(200).json(task);
});

app.delete('/', (req, res) => {
	removeTaskById(req.body.id);
	res.status(200).json({ msg: 'Task has been removed from the Task Database' });
});

app.listen(3000);
