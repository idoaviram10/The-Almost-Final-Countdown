import { useState, useRef } from "react";

export default function Player() {
	// Component for player name input

	const playerName = useRef(); // Reference for the input field
	const [enteredPlayerName, setEnteredPlayerName] = useState(null); // State for the entered player name

	function handleClick() {
		// Handles click event to set player name
		setEnteredPlayerName(playerName.current.value);
		playerName.current.value = ""; // Clear input field
	}

	return (
		<section id="player">
			<h2>Welcome {enteredPlayerName ?? "unknown entity"}</h2>
			<p>
				<input ref={playerName} type="text" />
				<button onClick={handleClick}>Set Name</button>
			</p>
		</section>
	);
}
