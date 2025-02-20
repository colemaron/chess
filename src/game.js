let moving = null;

// start move

document.addEventListener("mousedown", ({ target, button }) => {
	if (button === 0 && target.classList.contains("piece")) {
		moving = target.cloneNode();
		moving.classList.add("moving");

		moving.style.width = `${target.offsetWidth}px`;
		moving.style.height = `${target.offsetHeight}px`;
	}
});

// move piece

document.addEventListener("mousemove", ({ clientX, clientY }) => {
	if (moving) {
		moving.style.left = `${clientX}px`;
		moving.style.top = `${clientY}px`;

		document.body.appendChild(moving);
	}
});

// stop move

document.addEventListener("mouseup", ({ clientX, clientY }) => {
	if (!moving) return;

	moving.remove();
	moving = null;
});