class Board {
	constructor(element, fen) {
		this.element = element;

		this.fen = fen;
		this.cells = fen.array;
	}

	init() {
		this.cells.forEach((row, y) => {
			row.forEach((piece, x) => {
				// create cell

				const cellElement = document.createElement("div");
				cellElement.classList.add("cell", (x + y) % 2 ? "white" : "black");

				this.element.appendChild(cellElement);

				// create cell text

				const cellText = document.createElement("div");
				cellText.classList.add("cell-text");
				cellText.textContent = "abcdefgh"[x] + (8 - y);
				// cellText.textContent = `${x}-${y}`;

				cellElement.appendChild(cellText);

				// create piece

				if (piece) {
					const pieceElement = document.createElement("div");
					pieceElement.classList.add("piece", piece);
					pieceElement.dataset.index = y * 8 + x;
					pieceElement.dataset.color = piece === piece.toLowerCase() ? "w" : "b";

					cellElement.appendChild(pieceElement);
				}
			});
		})
	}

	// move(piece, index) {
		
	// }
}

export { Board };