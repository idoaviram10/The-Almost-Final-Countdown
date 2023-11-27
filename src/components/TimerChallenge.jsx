import { useState, useRef } from "react";
import ResultModal from "./ResultModal";

export default function TimerChallenge({ title, targetTime }) {
	// Component for each timer challenge
	const timer = useRef(); // Reference for the timer interval
	const dialog = useRef(); // Reference for the result modal

	const [timeRemaining, setTimeRemaining] = useState(targetTime * 1000); // State for time remaining in milliseconds

	const timerIsActive = timeRemaining > 0 && timeRemaining < targetTime * 1000; // Check if the timer is active

	if (timeRemaining <= 0) {
		// Handling time up scenario
		clearInterval(timer.current);
		dialog.current.open();
	}

	function handleReset() {
		// Resets the timer to the initial state
		setTimeRemaining(targetTime * 1000);
	}

	function handleStart() {
		// Starts the timer countdown
		timer.current = setInterval(() => {
			setTimeRemaining((prevTimeRemaining) => prevTimeRemaining - 10); // Decrease time every 10 ms
		}, 10);
	}

	function handleStop() {
		// Stops the timer and opens the result modal
		dialog.current.open();
		clearInterval(timer.current);
	}

	return (
		<>
			<ResultModal ref={dialog} targetTime={targetTime} remainingTime={timeRemaining} onReset={handleReset} />
			<section className="challenge">
				<h2>{title}</h2>
				<p className="challenge-time">
					{targetTime} second{targetTime > 1 ? "s" : ""}
				</p>
				<p>
					<button onClick={timerIsActive ? handleStop : handleStart}>{timerIsActive ? "Stop" : "Start"} Challenge!</button>
				</p>
				<p className={timerIsActive ? "active" : undefined}>{timerIsActive ? "Timer is running..." : "Timer inactive"}</p>
			</section>
		</>
	);
}
