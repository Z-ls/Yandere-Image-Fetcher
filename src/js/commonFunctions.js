export const toggleSelected = (selected, setSelected, src) => {
	if (!selected.includes(src)) {
		if (selected.length === 2) {
			let newSelected = [...selected];
			newSelected.shift();
			newSelected.push(src);
			setSelected(() => newSelected);
		} else setSelected(() => [...selected, src]);
	} else {
		setSelected(() => selected.filter(s => s !== src));
	}
};

export const handleDrag = event => {
	event.preventDefault();
	const childrenRow = document.getElementById("row-children");
	childrenRow.style.cursor = "grabbing";
	childrenRow.style.userSelect = "none";

	document.addEventListener("mouseup", () => {
		childrenRow.style.cursor = "auto";
		document.removeEventListener("mousemove", handleMove);
	});

	const handleMove = event => {
		childrenRow.scrollLeft -= event.movementX;
	};

	document.addEventListener("mousemove", handleMove);
};
