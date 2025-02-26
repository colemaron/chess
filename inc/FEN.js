class FEN {
	static default = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR";

	// new FEN

	constructor(fen) {
		this.string = fen || FEN.default;
	}

	// get string without "/"

	get plain() { return this.string.replace(/\//g, ""); }

	// generate array from string

	get array() {
		const array = [];
	
		for (const c of this.plain) {
			if (c.charCodeAt(0) >= 48 && c.charCodeAt(0) <= 56) {
				array.push(...Array(parseInt(c)).fill(null))
			} else {
				array.push(c);
			}
		}
	
		return array;
	}

	// convert array to fen

	static fromArray(array) {
		
	}
}

export { FEN };