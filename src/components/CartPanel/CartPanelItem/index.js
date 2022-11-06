import html from "./sampleitem.html";
import "./styles.scss";
/**
 * Element to display static placeholder item for the cart.
 * @extends HTMLElement
 * @hideconstructor
 *
 * @example
 * <cart-panel__item />
 */
export default class CartPanelItem extends HTMLElement {
	connectedCallback() {
		// Add base class for styling
		this.classList.add("cart-panel__item");

		// Insert loaded sample html into the element
		this.innerHTML = html;
	}
}

customElements.define("cart-panel__item", CartPanelItem);
