import { useState } from "react";

const initialItems = [
	{ id: 1, description: "Passports", quantity: 2, packed: false },
	{ id: 2, description: "Socks", quantity: 12, packed: false },
];

export default function App() {
	const [items, setItems] = useState([]);

	function handleAddItems(item) {
		setItems((items) => [...items, item]);
	}

	function handleDeleteItem(id) {
		setItems((items) => items.filter((item) => item.id !== id));
	}

	function handleToggleItem(id) {
		setItems((items) =>
			items.map((item) =>
				item.id === id ? { ...item, packed: !item.packed } : item
			)
		);
	}

	return (
		<div className="app">
			<Logo />
			<Form onAddItems={handleAddItems} />
			<PackingList
				items={items}
				onDeleteItem={handleDeleteItem}
				onToggleItem={handleToggleItem}
			/>
			<Stats items={items} />
		</div>
	);
}

function Logo() {
	return <h1>🏝️ Far Away 🧳</h1>;
}

function Form({ onAddItems }) {
	const [description, setDescription] = useState("");
	const [quantity, setQuantity] = useState(1);

	function handleSubmit(e) {
		e.preventDefault();
		if (!description) return;

		const newItem = {
			description,
			quantity,
			packed: false,
			id: Date.now(),
		};
		console.log(newItem);

		onAddItems(newItem);

		setDescription("");
		setQuantity(1);
	}

	return (
		<form className="add-form" onSubmit={handleSubmit}>
			<h3>What do you need for your 😍 trip?</h3>
			<select
				value={quantity}
				onChange={(e) => {
					console.log(e.target.value);
					setQuantity(Number(e.target.value));
				}}>
				{Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
					<option value={num} key={num}>
						{num}
					</option>
				))}
			</select>

			<input
				type="text"
				placeholder="Item..."
				value={description}
				onChange={(e) => {
					console.log(e.target.value);
					setDescription(e.target.value);
				}}></input>

			<button>Add</button>
		</form>
	);
}

function PackingList({ items, onDeleteItem, onToggleItem }) {
	const [sortBy, setSortBy] = useState("packed");

	let sortedItems;
	if (sortBy === "input") sortedItems = items;
	if (sortBy === "description")
		sortedItems = items
			.slice()
			.sort((a, b) => a.description.localeCompare(b.description));
	if (sortBy === "packed")
		sortedItems = items
			.slice()
			.sort((a, b) => Number(a.packed) - Number(b.packed));

	return (
		<div className="list">
			<ul>
				{sortedItems.map((item) => (
					<Item
						item={item}
						key={item.id}
						onDeleteItem={onDeleteItem}
						onToggleItem={onToggleItem}
					/>
				))}
			</ul>
			<div className="actions">
				<select
					value={sortBy}
					onChange={(e) => setSortBy(e.target.value)}>
					<option value="input">Sort by input order</option>
					<option value="description">Sort by description</option>
					<option value="packed">Sort by packed status</option>
				</select>
			</div>
		</div>
	);
}

function Item({ item, onDeleteItem, onToggleItem }) {
	return (
		<li className="">
			<input
				type="checkbox"
				value={item.packed}
				onChange={() => onToggleItem(item.id)}></input>
			<span style={item.packed ? { textDecoration: "line-through" } : {}}>
				{item.quantity} {item.description}
			</span>
			<button onClick={() => onDeleteItem(item.id)}>❌</button>
		</li>
	);
}

function Stats({ items }) {
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
