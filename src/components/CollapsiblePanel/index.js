import "./styles.scss";

/**
 * A panel which is hidden on the right hand edge of the screen with methods to
 * animate it when it expands into view and collapses back again.
 * @extends HTMLElement
 * @hideconstructor
 *
 * @example
 * <collapsible-panel />
 */
export default class CollapsiblePanel extends HTMLElement {
	connectedCallback() {
		// Add base class for styling
		this.classList.add("collapsible-panel");

		/*
		 * Append a div to the document which we can use to fade out the background
		 * while this panel is open. Bind clicks to this element to collapse the panel
		 * so users can click "off" the collapsible panel.
		 */
		this.backgroundCover = document.createElement("div");
		this.backgroundCover.classList.add("screen-fade");
		this.backgroundCover.addEventListener("click", () => this.collapsePanel());

		document.body.appendChild(this.backgroundCover);

		/*
		 * Update the height of this panel element on load and on resize, this helps
		 * ensure the panel remains the full height of the screen on mobiles where
		 * vertical height can be hard to determine when interacting with hiding/showing
		 * address bar elements and scrolling.
		 */
		this.updateScreenHeight();
		window.addEventListener("resize", () => this.updateScreenHeight());
	}

	/**
	 * Method to update this elements height based on the window height to retain full
	 * screen vertical height on mobile.
	 */
	updateScreenHeight = function () {
		this.style.setProperty("height", `${window.innerHeight}px`);
	};

	/**
	 * Trigger to cause the panel to display itself and expand out into view.
	 */
	expandPanel = function () {
		this.style.setProperty("display", "block");
		this.backgroundCover.style.setProperty("display", "block");

		/*
		 * Trigger animation class changes after on the following animation frame so we know
		 * that the display property change has taken effect and will not cancel the animation.
		 */
		requestAnimationFrame(() =>
			requestAnimationFrame(() => {
				this.classList.add("collapsible-panel--expanded");
				this.backgroundCover.classList.add("screen-fade--active");

				/*
				 * Disable the main page background scrolling while this is open. This makes
				 * it easier for the user to focus scroll efforts on the collapsible panel contents
				 * and also helps stop some mobile browsers behaviour of showing and hiding the
				 * address bar when scrolling to try to avoid this panel resizing while open.
				 */
				document.documentElement.style.overflowY = "hidden";
			})
		);
	};

	/**
	 * Trigger to cause the panel to collapse out of view and hide itself.
	 */
	collapsePanel = function () {
		this.classList.remove("collapsible-panel--expanded");
		this.backgroundCover.classList.remove("screen-fade--active");

		/*
		 * We can hide the panel after the transition ends so the component can
		 * have it's animation timing updated through pure css.
		 */
		this.addEventListener(
			"transitionend",
			() => {
				this.style.setProperty("display", "none");
				this.backgroundCover.style.setProperty("display", "none");

				// Restore scrolling functionality to the main page after collapse.
				document.documentElement.style.overflowY = "auto";
			},
			{ once: true }
		);
	};
}

customElements.define("collapsible-panel", CollapsiblePanel);
