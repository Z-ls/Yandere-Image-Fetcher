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
