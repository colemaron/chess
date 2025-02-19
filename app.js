// cell data

const getPiece = c => {
	return {
		r: "w-rook",
		n: "w-knight",
		b: "w-bishop",
		q: "w-queen",
		k: "w-king",
		p: "w-pawn",

		R: "b-rook",
		N: "b-knight",
		B: "b-bishop",
		Q: "b-queen",
		K: "b-king",
		P: "b-pawn"
	}[c];
}

const FEN = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR";

// create board

const board = document.getElementById("board");
const cells = document.getElementById("cells");

for (let x = 0; x < 8; x++) {
	for (let y = 0; y < 8; y++) {
		const cell = document.createElement("div");
		cell.classList = `cell ${(x + y) % 2 == 0 ? "white" : "black"}`

		cells.appendChild(cell);
	}
}

// create pieces

function parseFEN(FEN) {
	const rows = FEN.split("/");

	let n = 0;

	rows.forEach((row, d) => {
		row.split("").forEach((c, d) => {
			const skip = parseInt(c) - 1;

			if (skip) {
				n += skip;
			} else {
				const cell = cells.children[n];

				const piece = document.createElement("div");
				piece.classList.add("piece");
				piece.style.backgroundImage = `url('img/${getPiece(c)}.svg')`;

				cell.appendChild(piece);
			}

			n++;
		})
	});
}

parseFEN(FEN);