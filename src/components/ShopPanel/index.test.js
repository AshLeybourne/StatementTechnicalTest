import ShopPanel from ".";
import customElementTests from "../../testing/customElementTests";

describe("ShopPanel", () => {
	afterEach(() => {
		document.body.innerHTML = "";
	});

	customElementTests(ShopPanel, "shop-panel", "shop-panel");

	/*
	 * TODO: Test event triggers are caught and correct cover
	 * animation functions are triggered
	 */
});
