import CollapsiblePanel from "../CollapsiblePanel";
import CartItem from "./CartPanelItem";

import "./styles.scss";
import cartwrapper from "./wrapper.html";
/**
 * A component for the shopping cart, adds a static html wrapper to any contents. The wrapper
 * contains the layout and styling for the cart element including header and footer panels.
 * The DOM content is moving into a scrollable panel in the center of the shopping cart.
 * In full application there would be a method for adding items in and out of the cart in this
 * class instead of it taking them from static DOM.
 * @extends CollapsiblePanel
 * @hideconstructor
 *
 * @example
 * <cart-panel>
 *     <cart-panel__item />
 * </cart-panel>
 */
export default class CartPanel extends CollapsiblePanel {
	connectedCallback() {
		super.connectedCallback();

		// Wrap panel inner content within the scrollable items container
		const existingContent = this.innerHTML;
		this.innerHTML = cartwrapper;

		// Insert into cart content, safety check first so valid in testing context with mocks
		const cartContentElements = this.querySelectorAll(".cart-panel__content");
		if (cartContentElements.length > 0)
			if (cartContentElements.length > 0)
				cartContentElements[0].innerHTML = existingContent;

		// Setup delegate event listeners for the buttons in the wrapper which allow for closing the cart.
		this.addEventListener("click", (event) => {
			if (
				event.target.classList.contains("cart-panel__close-button") ||
				event.target.classList.contains("cart-panel__close-wrapper") ||
				event.target.classList.contains("cart-panel__back-button")
			) {
				this.collapsePanel();

				// Avoid repeat presses from keyboard input to the button
				event.preventDefault();
				event.target.blur();
			}
		});

		/*
		 * Allow other page elements to be able to trigger the cart to display
		 * without needing to know a reference to the cart element
		 */
		document.addEventListener("cartopen", () => this.expandPanel());
		document.addEventListener("cartupdatecomplete", () => this.expandPanel());
	}
}

customElements.define("cart-panel", CartPanel);
