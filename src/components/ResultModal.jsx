import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";

const ResultModal = forwardRef(function ResultModal({ targetTime, remainingTime, onReset }, ref) {
	// Modal component to display results

	const dialog = useRef(); // Reference for the dialog element

	const userLost = remainingTime <= 0; // Determine if the user lost
	const formattedRemainingTime = (remainingTime / 1000).toFixed(2); // Format remaining time
	const score = Math.round((1 - remainingTime / (targetTime * 1000)) * 100); // Calculate score

	// useImperativeHandle customizes the instance value that is exposed to parent components when using ref.
	// In this case, it's used to expose a method 'open' which allows parent components to control the modal.
	useImperativeHandle(ref, () => {
		return {
			open() {
				dialog.current.showModal();
			},
		};
	});

	// createPortal is used here to render the modal component into a DOM node that exists outside the DOM hierarchy
	// of the parent component. This is useful for modals, tooltips, etc., where you want to break out of the parent container.
	return createPortal(
		<dialog ref={dialog} className="result-modal" onClose={onReset}>
			{userLost ? <h2>You Lost</h2> : <h2>Your Score: {score}</h2>}
			<p>
				The target time was <strong>{targetTime} seconds</strong>
			</p>
			<p>
				You stopped the timer when <strong>{formattedRemainingTime} seconds left</strong>
			</p>
			<form method="dialog">
				<button onClick={onReset}>Close</button>
			</form>
		</dialog>,
		document.getElementById("modal")
	);
});

export default ResultModal;
