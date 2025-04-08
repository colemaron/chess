//import { Board } from "../inc/board.js";

const boardElement = document.getElementById("board");

// cell functions

function getCellFromChild(child) {
	return Array.from(boardElement.children).indexOf(child);
}

function getCell(x, y) {
	return boardElement.children[coordsToIndex(x, y)];
}

function indexToCoords(index) {
	return [index % 8, Math.floor(index / 8)];
}

function coordsToIndex(x, y) {
	return y * 8 + x;
}

// get moves

const moveData = {
	p: [[0, 1]],
	r: [[0, 1], [0, -1], [1, 0], [-1, 0]],
	n: [[1, 2], [-1, 2], [1, -2], [-1, -2], [2, 1], [2, -1], [-2, 1], [-2, -1]],
	b: [[1, 1], [1, -1], [-1, 1], [-1, -1]],
	q: [[0, 1], [0, -1], [1, 0], [-1, 0], [1, 1], [1, -1], [-1, 1], [-1, -1]],
	k: [[0, 1], [0, -1], [1, 0], [-1, 0], [1, 1], [1, -1], [-1, 1], [-1, -1]],
};

function inBounds(x, y) {
	return x >= 0 && x < 8 && y >= 0 && y < 8;
}

function getMoves(piece) {
	const [x, y] = indexToCoords(piece.dataset.index);

	const rank = piece.classList[1];
	const rl = rank.toLowerCase();
	const color = rank === rl ? 1 : -1;

	const moves = [];

	for (const [dx, dy] of moveData[rl]) {
		// full board pieces

		if (["r", "q", "b"].includes(rl)) {
			for (let i = 1; i < 8; i++) {
				const [mx, my] = [x + dx * i, y + dy * i];

				if (!inBounds(mx, my)) continue;

				const mCell = getCell(mx, my);
				const mPiece = getPiece(mCell);

				// stop iterating at piece but add if enemy

				if (mPiece) {
					if (!sameTeam(piece, mPiece)) moves.push([mx, my]);
					
					break;
				}

				moves.push([mx, my]);
			}
		} else if (rl === "p") {
			let [mx, my] = [x, y + dy * color];

			let mCell = getCell(mx, y + dy * color);
			let mPiece = getPiece(mCell);

			// add first if no piece

			if (!mPiece) moves.push([mx, my]);

			// double first move
			
			if (y === 1 && color === 1 || y === 6 && color === -1) {
				if (!mPiece) moves.push([mx, my + color]);
			};

			// check for diagonal enemy

			for (const d of [-1, 1]) {
				[mx, my] = [x + d, y + dy * color];

				mCell = getCell(mx, my);
				mPiece = getPiece(mCell);

				if (mPiece && !sameTeam(piece, mPiece)) {
					moves.push([mx, my]);
				}
			}
		} else {
			const [mx, my] = [x + dx, y + dy];

			if (!inBounds(mx, my)) continue;

			let mCell = getCell(mx, my);
			let mPiece = getPiece(mCell);

			// stop if same team piece

			if (mPiece && sameTeam(piece, mPiece)) continue;

			moves.push([mx, my]);
		}
	}

	return moves;
}

// check functions

function getPiece(cell) {
	return cell.querySelector(".piece");
}

function sameTeam(p1, p2) {
	return p1.dataset.color === p2.dataset.color;
}

// move start

let move = {turn: "w", piece: null, clone: null, start: [], moves: []};

function removeHighlights() {
	boardElement.querySelectorAll(".highlighted").forEach(element => element.classList.remove("highlighted"));
	boardElement.querySelectorAll(".selected").forEach(element => element.classList.remove("selected"));
	boardElement.querySelectorAll(".enemy").forEach(element => element.classList.remove("enemy"));
}

document.addEventListener("mousedown", ({ target, clientX, clientY }) => {
	// reset previous

	removeHighlights();

	// check if its a piece

	if (target.classList.contains("piece")) {
		const piece = target;
		const moves = getMoves(piece);

		// return if not correct move

		if (move.turn !== piece.dataset.color) {
			console.log(`its ${move.turn}'s turn`);

			return;
		};

		// style cell

		const parent = target.parentNode;
		parent.classList.add("selected");

		// create move clone

		const clone = piece.cloneNode(true);
		clone.classList.add("moving");
		boardElement.appendChild(clone);

		clone.style.left = clientX + "px";
		clone.style.top = clientY + "px";

		clone.style.width = piece.offsetWidth + "px";
		clone.style.height = piece.offsetHeight + "px";

		piece.style.opacity = 0.25;

		// set move data

		move.start = indexToCoords(piece.dataset.index);
		move.piece = piece;
		move.clone = clone;
		move.moves = moves;

		// highlight available cells

		for (const [x, y] of moves) {
			const mCell = getCell(x, y);
			const mPiece = getPiece(mCell);

			if (mPiece && !sameTeam(piece, mPiece)) {
				mCell.classList.add("enemy");
			} else {
				mCell.classList.add("highlighted");
			}
		}
	}
});

// move drag

document.addEventListener("mousemove", ({ clientX, clientY }) => {
	if (move.piece && move.clone) {
		move.clone.style.left = clientX + "px";
		move.clone.style.top = clientY + "px";
	}
});

// move place

const info = document.getElementById("info");
const turn = document.getElementById("turn");

const alpha = "abcdefgh".split("");
const ranks = {
	p: "Pawn",
	r: "Rook",
	n: "Knight",
	b: "Bishop",
	q: "Queen",
	k: "King"
}

let moveCount = 0;

document.addEventListener("mouseup", ({ target }) => {
	if (move.piece && move.clone) {
		const cell = target.closest(".cell");
		const piece = getPiece(cell);

		if (cell) {
			const index = getCellFromChild(cell);
			const [x, y] = indexToCoords(index);

			// reset visuals

			move.piece.style.opacity = 1;
			move.clone.remove();
			removeHighlights();

			// verify move

			if (move.moves.some(([mx, my]) => mx === x && my === y)) {
				if (piece) piece.remove();

				cell.appendChild(move.piece);
				move.piece.dataset.index = index;

				// update turns

				moveCount++;

				const name = move.turn === "w" ? "Black" : "White";
				turn.innerHTML = `${name}'s turn<p>Move: ${moveCount++}</p>`;

				const display = document.createElement("p");
				display.classList.add("move", name.toLowerCase());

				const rank = ranks[move.piece.classList[1].toLowerCase()];
				const start = `${alpha[move.start[0]]}${8 - move.start[1]}`
				const end = `${alpha[x]}${8 - y}`

				display.textContent = `${rank}: ${start} → ${end} ${piece ? "(capture)" : ""}`;

				moves.appendChild(display);
				moves.scrollTo(0, moves.scrollHeight);

				const color = document.createElement("div");
				color.style.backgroundColor = move.turn === "w" ? "white" : "black";
				display.appendChild(color);

				// swap turn and reset data

				move = {
					turn: move.turn === "w" ? "b" : "w",
					piece: null,
					clone: null,
					start: [],
					moves: []
				};
			} else {
				// console.log("invalid move");
			}
		}
	}
});

// new game

const newGame = document.getElementById("new-game");

newGame.addEventListener("click", () => {
	move = {
		turn: "w",
		piece: null,
		clone: null,
		start: [],
		moves: []
	};

	moves.innerHTML = "";

	moveCount = 0;

	const name = move.turn === "w" ? "White" : "Black";
	turn.innerHTML = `${name}'s turn<p>Move: ${moveCount++}</p>`;
});