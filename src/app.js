import { Board } from "../inc/Board.js";
import { FEN } from "../inc/FEN.js";

const boardElement = document.getElementById("board");

const board = new Board(boardElement, new FEN());

board.init();
board.render();

board.fen = FEN.random();

board.render();