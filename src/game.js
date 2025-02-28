import { Board } from "../inc/board.js";

const boardElement = document.getElementById("board");

// cell functions

function indexToCoords(index) {
	return [index % 8, Math.floor(index / 8)];
}

function coordsToIndex(x, y) {
	return y * 8 + x;
}

// highlight cell

function highlightCell(cell) {
	cell.classList.add("highlighted");
}

function unhighlightCell(cell) {
	cell.classList.remove("highlighted");
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

function getMovesForRank(piece) {
	const [x, y] = indexToCoords(piece.dataset.index);

	const rank = piece.classList[1];
	const rl = rank.toLowerCase();
	const color = rank === rl ? 1 : -1;

	const moves = [];

	for (const [dx, dy] of moveData[rl]) {
		if (rl === "p") {
			if (y === 1 || y === 6) {
				moves.push([x, y + dy * color * 2]);
			}

			moves.push([x, y + dy * color]);
		} else if (["b", "q", "r"].includes(rl)) {
			for (let i = 1; i < 8; i++) {
				moves.push([x + dx * i, y + dy * i]);
			}
		} else {
			moves.push([x + dx, y + dy]);
		}
	}

	return moves.filter(([x, y]) => x >= 0 && x < 8 && y >= 0 && y < 8);
}

// piece moving

document.addEventListener("mousedown", ({ target }) => {
	boardElement.querySelectorAll(".highlighted").forEach(unhighlightCell);

	if (target.classList.contains("piece")) {
		const moves = getMovesForRank(target);

		for (const [x, y] of moves) {
			highlightCell(boardElement.children[coordsToIndex(x, y)]);
		}

		console.log(moves);
	}

	if (target.classList.contains("cell")) {
		
	}
});