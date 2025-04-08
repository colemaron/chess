import { Board } from "../inc/board.js";
import { FEN } from "../inc/FEN.js";

import "./game.js";

const boardElement = document.getElementById("board");
// const fen = new FEN("8/8/8/8/8/4rrr1/4rPr1/4rrr1");
const fen = new FEN();

const board = new Board(boardElement, fen);

board.init();

// new game

const newGame = document.getElementById("new-game");

newGame.addEventListener("click", () => {
	board.reset();
});