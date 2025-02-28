import { Board } from "../inc/board.js";
import { FEN } from "../inc/FEN.js";

import "./game.js";

const boardElement = document.getElementById("board");
// const fen = new FEN("1R1BB3/1rR1p2b/Ppp2PpP/pn1q2b1/2P1p1P1/P2P1N1K/1kp1rNpP/3Q3n");
const fen = new FEN();

const board = new Board(boardElement, fen);

board.init();