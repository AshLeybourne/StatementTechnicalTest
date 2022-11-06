import LoadingCover from "../LoadingCover";
import "./styles.scss";

/**
 * A panel element which is designed to contain one or more products, and
 * control an animated cover to help signal the purchase process to the
 * user and allow time for processing before the cart opens.
 * @extends HTMLElement
 * @hideconstructor
 *
 * @example
 * <shop-panel />
 */
export default class ShopPanel extends HTMLElement {
	connectedCallback() {
		// Add base class for styling
		this.classList.add("shop-panel");

		// Create and append the cover element
		this.loadingCover = document.createElement("loading-cover");
		this.appendChild(this.loadingCover);

		// Bind the site specific cart events to the general purpose methods of the cover
		document.addEventListener("cartupdatebegin", () =>
			this.loadingCover.coverStart()
		);
		document.addEventListener("cartupdatecomplete", () =>
			this.loadingCover.coverEnd()
		);
	}
}

customElements.define("shop-panel", ShopPanel);
