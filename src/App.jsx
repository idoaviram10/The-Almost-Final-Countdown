import Player from "./components/Player.jsx";
import TimerChallenge from "./components/TimerChallenge.jsx";

function App() {
	// Main application component
	return (
		<>
			<Player />
			<div id="challenges">
				{/* Timer challenges with different target times */}
				<TimerChallenge title={"Easy"} targetTime={1} />
				<TimerChallenge title={"Not Easy"} targetTime={5} />
				<TimerChallenge title={"Getting Tough"} targetTime={10} />
				<TimerChallenge title={"Pros Only"} targetTime={15} />
			</div>
		</>
	);
}

export default App;
