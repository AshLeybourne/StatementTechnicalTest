import htmlcontent from "./content.html";
import "./styles.scss";

/**
 * Element to display static placeholder product for the shop, uses events to
 * signal cartupdatebegin to the document when the purchase button is clicked,
 * and cartupdatecomplete 1 second later.
 * @extends HTMLElement
 * @hideconstructor
 *
 * @example
 * <product-container />
 */
export default class ProductContainer extends HTMLElement {
	connectedCallback() {
		// Add base class for styling
		this.classList.add("product-container");

		// Add default content
		this.innerHTML = htmlcontent;

		/*
		 * Use delegates event handler to trigger this, it's safe against changes to the
		 * html and allows for simpler mocking for testing
		 */
		this.addEventListener("click", (event) => {
			if (
				event.target.classList.contains("product-container__purchase-button")
			) {
				this.purchaseProduct();

				// Avoid repeat presses from keyboard input to the button
				event.preventDefault();
				event.target.blur();
			}
		});
	}

	// Simulate purchase of a product, trigger events for cart update process
	purchaseProduct() {
		document.dispatchEvent(new Event("cartupdatebegin"));

		// Notify update as completed after 1s (I assume to allow time for server communication?)
		setTimeout(() => {
			document.dispatchEvent(new Event("cartupdatecomplete"));
		}, 1000);
	}
}

customElements.define("product-container", ProductContainer);
