function randomPiece() {
	return ["p", "r", "n", "b", "q", "k"][Math.floor(Math.random() * 6)];
}

class FEN {
	static default = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

	// new FEN

	constructor(fen) {
		this.string = fen || FEN.default;
	}

	// generate array from string

	toArray() {
		const array = [];
		const data = this.string.split(" ");

		// PLACEHOLDER, CAN GET MORE DATA HERE FROM DATA LIKE TURN

		data[0].split("/").forEach(row => {
			row.split("").forEach(cell => {
				const skip = parseInt(cell);

				if (isNaN(skip)) {
					array.push(cell);
				} else {
					for (let i = 0; i < skip; i++) {
						array.push(null);
					}
				}
			})
		})

		return array;
	}

	// random FEN

	static random() {
		let string = Array(8).fill(null).map((_, i) => {
			let emptyCount = 0;
			return Array(8).fill(null).map((_, j) => {
				const r = Math.random();
				let piece = "";

				if (r < 0.1) {
					piece = randomPiece();
				} else if (r < 0.2) {
					piece = randomPiece().toUpperCase();
				} else {
					if (i === 3 && j === 3) {
						piece = "k";
					} else if (i === 3 && j === 4) {
						piece = "K";
					} else {
						emptyCount++;
					}
				}

				if (piece) {
					if (emptyCount > 0) {
						const emptyStr = emptyCount.toString();
						emptyCount = 0;
						return emptyStr + piece;
					} else {
						return piece;
					}
				} else {
					return "";
				}
			}).join("") + (emptyCount > 0 ? emptyCount.toString() : "");
		}).join("/");
		
		string += " w KQkq - 0 1";

		return new FEN(string);
	}
}

export { FEN };