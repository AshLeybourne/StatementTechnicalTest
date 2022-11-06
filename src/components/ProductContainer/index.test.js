import ProductContainer from "../ProductContainer";

import customElementTests from "../../testing/customElementTests";

describe("ProductContainer", () => {
	afterEach(() => {
		document.body.innerHTML = "";
	});
	customElementTests(
		ProductContainer,
		"product-container",
		"product-container"
	);

	it("inserts sample html content when created", () => {
		const productContainerElement = document.body.appendChild(
			document.createElement("product-container")
		);

		// Check a mock html is inserted correctly
		expect(
			productContainerElement.querySelector(".html-test-value-container")
				.innerHTML
		).toContain("html-test-value");
	});

	it("triggers the purchaseProduct method when child with class product-container__purchase-button is clicked", () => {
		const productContainerElement = document.body.appendChild(
			document.createElement("product-container")
		);

		const productContainerSpy = jest.spyOn(
			productContainerElement,
			"purchaseProduct"
		);

		// Manually add the required child element since it doesn't exist in the html mocks
		const matchingChild = document.createElement("div");
		matchingChild.classList.add("product-container__purchase-button");
		productContainerElement.appendChild(matchingChild);

		document.querySelector(".product-container__purchase-button").click();

		expect(productContainerSpy).toHaveBeenCalledTimes(1);
	});

	it("has a purchaseProduct method which dispatches a cartupdatebegin Event and then a cartupdatecomplete Event 1 second later", () => {
		const productContainerElement = document.body.appendChild(
			document.createElement("product-container")
		);
		const dispatchEventSpy = jest.spyOn(document, "dispatchEvent");

		jest.useFakeTimers();

		productContainerElement.purchaseProduct();

		expect(dispatchEventSpy).toHaveBeenCalledTimes(1);
		expect(dispatchEventSpy).toHaveBeenCalledWith(
			expect.objectContaining({ type: "cartupdatebegin" })
		);
		expect(dispatchEventSpy).not.toHaveBeenCalledWith(
			expect.objectContaining({ type: "cartupdatecomplete" })
		);

		jest.runAllTimers();

		expect(dispatchEventSpy).toHaveBeenCalledTimes(2);
		expect(dispatchEventSpy).toHaveBeenCalledWith(
			new Event("cartupdatecomplete")
		);
	});
});
