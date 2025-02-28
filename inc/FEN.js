class FEN {
	static default = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR";

	// new FEN

	constructor(fen) {
		this.string = fen || FEN.default;
	}

	// generate array from string

	get array() {
		const cells = [];
	
		this.string.split("/").forEach((string, y) => {
			const row = [];

			string.split("").forEach((c, x) => {
				if (c.charCodeAt(0) >= 48 && c.charCodeAt(0) <= 56) {
					row.push(...Array(parseInt(c)).fill(null));
				} else {
					row.push(c);
				}
			})

			cells.push(row);
		})

		return cells;
	}

	// convert array to fen

	static fromArray(array) {
		
	}
}

export { FEN };