let x = `<svg xmlns='http://www.w3.org/2000/svg' height='100' viewBox='0 0 329.26933 329' width='100%'>
<path fill="white" d='m194.800781 164.769531 128.210938-128.214843c8.34375-8.339844 8.34375-21.824219 0-30.164063-8.339844-8.339844-21.824219-8.339844-30.164063 0l-128.214844 128.214844-128.210937-128.214844c-8.34375-8.339844-21.824219-8.339844-30.164063 0-8.34375 8.339844-8.34375 21.824219 0 30.164063l128.210938 128.214843-128.210938 128.214844c-8.34375 8.339844-8.34375 21.824219 0 30.164063 4.15625 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921875-2.089844 15.082031-6.25l128.210937-128.214844 128.214844 128.214844c4.160156 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921874-2.089844 15.082031-6.25 8.34375-8.339844 8.34375-21.824219 0-30.164063zm0 0' />
</svg>`;
let o = `
<svg viewBox='0 0 100 100' width='100' height='100'>
<circle cx='50' cy='50' r='42' stroke='beige' stroke-width='12' fill='none' />
</svg>`;
let combos = [
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 4, 8],
	[6, 4, 2],
];

let tiles = document.querySelectorAll('.board div'),
	container = document.querySelector('.container'),
	overlay = document.createElement('div'),
	xoDiv = document.createElement('div'),
	startNewGame = document.createElement('button'),
	turn = true,
	board = [],
	player1 = [],
	player2 = [],
	draw = () => player1.concat(player2).join('');

function announceWinner(player) {
	overlay.className = 'overlay-win';
	xoDiv.innerHTML = player;
	overlay.append(xoDiv);
	container.append(overlay);
	startNewGame.innerHTML = 'Start New Game';
	startNewGame.addEventListener('click', () => {
		newGame();
	});
	overlay.append(startNewGame);
}

function announceDraw() {
	overlay.className = 'overlay-draw';
	xoDiv.innerHTML = `${x} ${o}`;
	container.append(overlay);
	startNewGame.innerHTML = 'Start New Game';
	startNewGame.addEventListener('click', () => {
		newGame();
	});
	overlay.append(startNewGame);
}

function checkWin(player, name) {
	for (let i = 0; i < combos.length; i++) {
		let reg = new RegExp('[' + player.join('') + ']{3}', 'ig');
		let currentPlayer = combos[i].join('').match(reg);
		console.log(currentPlayer);
		if (currentPlayer) {
			announceWinner(name);
		}
		if (draw().length === 9) {
			announceDraw();
		}
	}
}

function handleClick(e) {
	let t = e.target;
	if (turn) {
		t.innerHTML = x;
		player1.push(t.id);
		checkWin(player1, x);
	} else {
		t.innerHTML = o;
		player2.push(t.id);
		checkWin(player2, o);
	}
	turn = !turn;
	board.push(t.id);
	t.removeEventListener('click', handleClick, true);
}

function activateTiles() {
	tiles.forEach((tile) => {
		tile.addEventListener('click', handleClick, true);
	});
}

function newGame() {
	overlay.remove();
	tiles.forEach((tile) => {
		tile.innerHTML = '';
	});
	turn = true;
	player1 = [];
	player2 = [];
	board = [];
	activateTiles();
}
activateTiles();
