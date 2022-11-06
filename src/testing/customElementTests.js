export default function customElementTests(
	elementClass,
	elementTag,
	elementStyleClass
) {
	describe(`Default tests for custom element integration for ${elementTag}`, () => {
		afterEach(() => {
			document.body.innerHTML = "";
		});

		it("is resistered as a customElement", () => {
			expect(customElements.get(elementTag)).toBe(elementClass);
		});

		it("can be inserted into a DOM tree without error", () => {
			expect(() => {
				const testHtml = `<${elementTag}></${elementTag}>`;
				document.body.innerHTML = testHtml;
			}).not.toThrow();
		});

		// This tests that the custom element is not carrying out invalid DOM operations during construction
		it("can be the target of createElement without error", () => {
			expect(() => {
				const testElement = document.body.appendChild(
					document.createElement(elementTag)
				);
			}).not.toThrow();
		});

		it("has correct style class when created", () => {
			const testElement = document.body.appendChild(
				document.createElement(elementTag)
			);

			expect(document.querySelector(elementTag).classList).toContain(
				elementStyleClass
			);
		});
	});
}
