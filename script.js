const button = document.getElementsByTagName('button');

function handleClick() {
	console.log('clicked');
}

button.addEvenListener('click', handleClick);
