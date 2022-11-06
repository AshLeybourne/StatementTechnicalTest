import style from "./styles.scss";

/**
 * A component which can be used to cover the content of a parent container,
 * and has methods to control visibiliy and a simple loading animation.
 * @extends HTMLElement
 * @hideconstructor
 *
 * @example
 * <loading-cover />
 */
export default class LoadingCover extends HTMLElement {
	connectedCallback() {
		// Add base class for styling
		this.classList.add("loading-cover");

		// Construct a simple two div progress bar we can animate during the loading process
		const progressContainer = document.createElement("div");
		progressContainer.classList.add("loading-cover__progress-background");

		this.progressBar = document.createElement("div");
		this.progressBar.classList.add("loading-cover__progress-foreground");

		progressContainer.appendChild(this.progressBar);
		this.appendChild(progressContainer);
	}

	/**
	 * Displays the componet and adds a class which shows a loading bar
	 * animation.
	 */
	coverStart = () => {
		this.style.setProperty("display", "flex");

		/*
		 * Delay adding the transition class until the frame after the change
		 * has been made to the display property so the transition animation
		 * doesn't get cancelled.
		 */
		requestAnimationFrame(() =>
			requestAnimationFrame(() => {
				this.classList.add("loading-cover-active");
			})
		);
	};

	/**
	 * Changes class so the panel fades, then sets the element back to not
	 * being displayed.
	 */
	coverEnd = () => {
		this.classList.remove("loading-cover-active");
		setTimeout(() => {
			this.style.setProperty("display", "none");
		}, 1000);
	};
}

customElements.define("loading-cover", LoadingCover);
