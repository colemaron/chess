import { Board } from "../inc/board.js";
import { FEN } from "../inc/FEN.js";

const boardElement = document.getElementById("board");

const board = new Board(boardElement, new FEN());

board.init();
board.render();

console.log(FEN.fromArray(board.cells));