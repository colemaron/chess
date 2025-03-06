import { Board } from "../inc/board.js";

const boardElement = document.getElementById("board");

// cell functions

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
		} else {
			let [mx, my] = [x + dx, y + dy];

			if (!inBounds(mx, my)) continue;

			let mCell = getCell(mx, my);
			let mPiece = getPiece(mCell);

			// stop if same team piece

			if (mPiece && sameTeam(piece, mPiece)) continue;

			// pawn movement

			if (rl === "p") {
				[mx, my] = [mx, y + dy * color];

				mCell = getCell(mx, y + dy * color);
				mPiece = getPiece(mCell);

				// stop if new same piece

				if (mPiece && sameTeam(piece, mPiece)) continue;

				moves.push([mx, my]);

				// double first move
				
				if (y === 1 && color === 1 || y === 6 && color === -1) {
					moves.push([mx, my + color]);
				};

				// check for diagonal enemy

				for (const d of [-1, 1]) {
					[mx, my] = [x + d, my];

					mCell = getCell(mx, my);
					mPiece = getPiece(mCell);

					if (mPiece && !sameTeam(piece, mPiece)) {
						moves.push([mx, my]);
					}
				}
			} else {
				// push basic data move

				moves.push([mx, my]);
			}
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

// piece moving

document.addEventListener("mousedown", ({ target }) => {
	boardElement.querySelectorAll(".highlighted").forEach(element => element.classList.remove("highlighted"));
	boardElement.querySelectorAll(".selected").forEach(element => element.classList.remove("selected"));
	boardElement.querySelectorAll(".enemy").forEach(element => element.classList.remove("enemy"));

	if (target.classList.contains("piece")) {
		const piece = target;
		const moves = getMoves(piece);

		const parent = target.parentNode;
		parent.classList.add("selected");

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