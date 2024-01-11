export function Stats({ items }) {
	const numItems = items.length;
	const numPacked = items.filter((item) => item.packed).length; // Items marked
	const percentage = Math.round((numPacked / numItems) * 100);

	return (
		<footer className="stats">
			<em>
				🧳 You have {numItems} items on your list, and you already
				packed {numPacked} ({numItems === 0 ? "" : percentage}%)
			</em>
		</footer>
	);
}
