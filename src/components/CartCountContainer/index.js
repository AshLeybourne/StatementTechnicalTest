import "./styles.scss";

/**
 * Element with cart icon as background, a number displayed in it's interior, signals carts to open on click
 * @extends HTMLElement
 * @hideconstructor
 *
 * @example
 * <cart-count-container />
 */
export default class CartCountContainer extends HTMLElement {
	connectedCallback() {
		// Add base class for styling
		this.classList.add("cart-count-container");

		// Add tab index for accessibility
		this.tabIndex = 0;

		// Manually create our counter value element and keep for easy updating
		this.countTextContainer = document.createElement("div");
		this.countTextContainer.classList.add("cart-count-container__counter-text");
		this.countTextContainer.innerHTML = 2;

		this.appendChild(this.countTextContainer);

		/*
		 * Bind handlers for mouse and keyboard inputs to open this.
		 * Keyboard presses allowed for accessibility. Perhaps would
		 * be improved by restructuring with a parent
		 * container, button and div.
		 */
		this.addEventListener("click", (event) => {
			this.buttonHasBeenTriggered(event);
		});
		this.addEventListener("keydown", (event) => {
			if (event.key === "Enter") {
				this.buttonHasBeenTriggered(event);
			}
		});
	}

	/** Triggers a custom event to signal that cart(s) on the page should open */
	buttonHasBeenTriggered = function (event) {
		document.dispatchEvent(new Event("cartopen"));

		event.preventDefault();
		event.target.blur();
	};

	/** Replaces the value held in the cart icon */
	updateCartCount = (newItemCount) => {
		this.countTextContainer.innerHTML = newItemCount.toString();
	};
}

customElements.define("cart-count-container", CartCountContainer);
