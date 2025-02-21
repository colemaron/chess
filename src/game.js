let move = {piece: null, copy: null};
let clientX, clientY;

const isMoving = () => Object.values(move).every(value => value !== null);

function updateMoving() {
	move.copy.style.left = `${clientX}px`;
	move.copy.style.top = `${clientY}px`;
}

// start move

document.addEventListener("mousedown", ({ target, button }) => {
	if (button === 0 && target.classList.contains("piece")) {
		move.piece = target;
		
		// create copy
		
		move.copy = target.cloneNode(true);
		move.copy.style.width = move.piece.offsetWidth + "px";
		move.copy.style.height = move.piece.offsetHeight + "px";
		move.copy.classList.add("moving");
		
		board.appendChild(move.copy);
		updateMoving();

		target.style.opacity = 0.5;
	}
});

// drag piece

document.addEventListener("mousemove", ({ clientX: x, clientY: y }) => {
	clientX = x; clientY = y;

	if (isMoving()) updateMoving();
});

// place piece

document.addEventListener("mouseup", () => {
	if (isMoving()) {
		move.piece.style.opacity = 1;
		move.copy.remove();

		Object.keys(move).forEach(key => move[key] = null);
	}
});

// prevent

document.addEventListener("dragstart", event => event.preventDefault());