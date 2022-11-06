import customElementTests from "../../testing/customElementTests";
import CartCountContainer from "../CartCountContainer";

describe("CartCountContainer", () => {
	afterEach(() => {
		document.body.innerHTML = "";
		jest.restoreAllMocks();
	});

	customElementTests(
		CartCountContainer,
		"cart-count-container",
		"cart-count-container"
	);

	it("inserts counter text element when created", () => {
		const cartCountContainerElement = document.body.appendChild(
			document.createElement("cart-count-container")
		);

		expect(
			document.querySelectorAll(".cart-count-container__counter-text").length
		).toBe(1);
	});

	it("sends a cartOpen event to document when clicked", () => {
		const dispatchEventSpy = jest.spyOn(document, "dispatchEvent");

		const cartCountContainerElement = document.body.appendChild(
			document.createElement("cart-count-container")
		);

		cartCountContainerElement.click();

		expect(dispatchEventSpy).toHaveBeenCalledTimes(1);
		expect(dispatchEventSpy).toHaveBeenCalledWith(new Event("cartopen"));
	});

	it("sends a cartOpen event to document when Enter key hit", () => {
		const dispatchEventSpy = jest.spyOn(document, "dispatchEvent");

		const cartCountContainerElement = document.body.appendChild(
			document.createElement("cart-count-container")
		);

		const firingEvent = new Event("keydown");
		firingEvent.key = "Enter";

		cartCountContainerElement.dispatchEvent(firingEvent);

		expect(dispatchEventSpy).toHaveBeenCalledTimes(1);
		expect(dispatchEventSpy).toHaveBeenCalledWith(new Event("cartopen"));
	});

	it("changes displayed number when update method is called", () => {
		const newCartCountValue = 5;

		const cartCountContainerElement = document.body.appendChild(
			document.createElement("cart-count-container")
		);

		cartCountContainerElement.updateCartCount(newCartCountValue);

		expect(
			document.querySelector(".cart-count-container__counter-text").innerHTML
		).toBe(newCartCountValue.toString());
	});
});
