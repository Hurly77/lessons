const form = document.querySelector('form');
const btn = document.querySelector('button');
const taskDeleteButtons = document.querySelectorAll('#delete');

const getTasks = async () => {
	return await fetch('http://localhost:3000/')
		.then((res) => res.json())
		.then((data) => {
			for (let i = 0; i < data.length; i++) {
				addItemToList(data[i]);
			}
		});
};

const getInputValues = () => {
	return {
		taskName: document.querySelector('#task-name'),
		date: document.querySelector('#date'),
		tag: document.querySelector('#tag'),
		description: document.querySelector('#description'),
	};
};

const createDomElmsForTasks = () => {
	let elmTags = ['h1', 'span', 'span', 'div', 'div', 'button'];
	return elmTags.map((elm) => {
		return document.createElement(elm);
	});
};

const clearInputs = () => {
	let inputs = getInputValues();
	for (key in inputs) {
		inputs[key].value = '';
	}
};

const addItemToList = (item) => {
	let list = document.querySelector('#list');
	let [taskName, date, tag, description, group, button] = createDomElmsForTasks();
	let all = [taskName, date, tag, description, button];

	group.className = 'relative px-5 py-3 bg-blue-100 rounded';
	group.id = item.id;
	button.id = 'delete';
	button.innerHTML = 'x';
	taskName.innerHTML = item.taskName;
	date.innerHTML = item.date;
	tag.innerHTML = item.tag;
	description.innerHTML = item.description;

	button.addEventListener('click', (e) => {
		let id = e.target.parentElement.id;
		e.preventDefault();
		fetch('http://localhost:3000/', {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ id: id }),
		})
			.then((res) => res.json())
			.then((data) => console.log(data.msg))
			.catch((err) => console.log(err));

		let task = document.getElementById(id);
		task.remove();
	});

	//all.length //=4  i=[0,1,2,3]
	for (let i = 0; i < all.length; i++) {
		group.appendChild(all[i]);
	}
	list.appendChild(group);
};

const postData = async (task) => {
	return await fetch('http://localhost:3000/', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(task),
	})
		.then((res) => res.json())
		.then((data) => {
			addItemToList(data);
		})
		.catch((err) => console.log(err));
};

form.addEventListener('submit', (e) => {
	e.preventDefault();
	const DomElmsForNewTask = getInputValues();
	const newTask = {};

	for (key in DomElmsForNewTask) {
		if (DomElmsForNewTask[key].value !== '') {
			newTask[key] = DomElmsForNewTask[key].value;
		} else {
			return;
		}
	}

	newTask.id = null;
	postData(newTask);
	clearInputs();
});
getTasks();
