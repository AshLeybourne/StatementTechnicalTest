import CartPanel from ".";
import customElementTests from "../../testing/customElementTests";

describe("CartPanel", () => {
	afterEach(() => {
		document.body.innerHTML = "";
		jest.restoreAllMocks();
	});

	customElementTests(CartPanel, "cart-panel", "collapsible-panel");

	function testInsertedCloseButton(closeButtonStyleClass) {
		it("child element with named class triggers panel collapse when clicked", () => {
			const cartPanelElement = document.body.appendChild(
				document.createElement("cart-panel")
			);

			const cartPanelCollapseSpy = jest.spyOn(
				cartPanelElement,
				"collapsePanel"
			);

			// Manually add the required child element since it doesn't exist in the html mocks
			const matchingChild = document.createElement("div");
			matchingChild.classList.add(closeButtonStyleClass);
			cartPanelElement.appendChild(matchingChild);

			document.querySelector(`.${closeButtonStyleClass}`).click();

			expect(cartPanelCollapseSpy).toHaveBeenCalledTimes(1);
		});
	}

	for (const styleClass of [
		"cart-panel__close-button",
		"cart-panel__close-wrapper",
		"cart-panel__back-button",
	]) {
		testInsertedCloseButton(styleClass);
	}
});
