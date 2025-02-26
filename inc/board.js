function getPiece(c) {
	return {
		"p": "w-pawn",
		"r": "w-rook",
		"n": "w-knight",
		"b": "w-bishop",
		"q": "w-queen",
		"k": "w-king",

		"P": "b-pawn",
		"R": "b-rook",
		"N": "b-knight",
		"B": "b-bishop",
		"Q": "b-queen",
		"K": "b-king"
	}[c];
}

class Board {
	constructor(element, fen) {
		this.element = element;

		this.fen = fen;
		this.cells = fen.toArray();
	}

	set fen(fen) {
		this.cells = fen.toArray();
	}

	init() {
		this.cells.forEach((data, index) => {
			const white = (index + Math.floor(index / 8)) % 2 === 0;

			// create cell

			const cellElement = document.createElement("div");
			cellElement.classList.add("cell", white ? "white" : "black");

			// create cell text

			const cellText = document.createElement("div");
			cellText.classList.add("cell-text");
			cellText.textContent = "abcdefgh"[index % 8] + (8 - Math.floor(index / 8));

			// create piece

			const pieceElement = document.createElement("div");
			pieceElement.classList.add("piece", getPiece(data));

			// add cell

			cellElement.appendChild(cellText);
			cellElement.appendChild(pieceElement);
			this.element.appendChild(cellElement);
		});
	}

	render() {
		this.cells.forEach((data, index) => {
			const pieceElement = this.element.children[index].children[1];

			pieceElement.classList = `piece ${getPiece(data)}`;
		});
	}
}

export { Board };