import customElementTests from "../../../testing/customElementTests";
import CartPanelItem from "../CartPanelItem";

describe("CartPanelItem", () => {
	afterEach(() => {
		document.body.innerHTML = "";
	});

	customElementTests(CartPanelItem, "cart-panel__item", "cart-panel__item");

	it("inserts sample html content when created", () => {
		const cartPanelElement = document.body.appendChild(
			document.createElement("cart-panel__item")
		);

		// Check a mock html is inserted correctly
		expect(
			document.querySelector(".html-test-value-container").innerHTML
		).toContain("html-test-value");
	});
});
