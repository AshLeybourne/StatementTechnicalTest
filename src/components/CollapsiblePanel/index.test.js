import customElementTests from "../../testing/customElementTests";
import CollapsiblePanel from "../CollapsiblePanel";

describe("CollapsiblePanel", () => {
	afterEach(() => {
		document.body.innerHTML = "";
	});

	customElementTests(
		CollapsiblePanel,
		"collapsible-panel",
		"collapsible-panel"
	);

	it("adds a the screen-fade component to the document", () => {
		const collapsiblePanelElement = document.body.appendChild(
			document.createElement("collapsible-panel")
		);

		expect(document.querySelectorAll(".screen-fade").length).toBe(1);
	});

	jest.useFakeTimers();

	it("when expandPanel method called displays itself, then after timer sets class to full width", () => {
		const collapsiblePanelElement = document.body.appendChild(
			document.createElement("collapsible-panel")
		);

		// Intially style should not be overridden, default value from css inaccessible here
		expect(collapsiblePanelElement.style.display).toBe("");
		expect(collapsiblePanelElement.classList).not.toContain(
			"collapsible-panel--expanded"
		);

		collapsiblePanelElement.expandPanel();

		expect(collapsiblePanelElement.style.display).toBe("block");
		expect(collapsiblePanelElement.classList).not.toContain(
			"collapsible-panel--expanded"
		);

		jest.runAllTimers();

		expect(collapsiblePanelElement.style.display).toBe("block");
		expect(collapsiblePanelElement.classList).toContain(
			"collapsible-panel--expanded"
		);
	});

	it("when collapsePanel method called removes full width class, then after event transition ends sets display none", () => {
		const collapsiblePanelElement = document.body.appendChild(
			document.createElement("collapsible-panel")
		);

		// First expand the panel
		collapsiblePanelElement.expandPanel();
		jest.runAllTimers();

		expect(collapsiblePanelElement.style.display).toBe("block");
		expect(collapsiblePanelElement.classList).toContain(
			"collapsible-panel--expanded"
		);

		collapsiblePanelElement.collapsePanel();

		expect(collapsiblePanelElement.style.display).toBe("block");
		expect(collapsiblePanelElement.classList).not.toContain(
			"collapsible-panel--expanded"
		);

		collapsiblePanelElement.dispatchEvent(new Event("transitionend"));

		expect(collapsiblePanelElement.style.display).toBe("none");
		expect(collapsiblePanelElement.classList).not.toContain(
			"collapsible-panel--expanded"
		);
	});

	it("triggers collapse event when background cover is clicked", () => {
		const collapsiblePanelElement = document.body.appendChild(
			document.createElement("collapsible-panel")
		);

		const collapsePanelSpy = jest.spyOn(
			collapsiblePanelElement,
			"collapsePanel"
		);

		document.querySelector(".screen-fade").click();

		expect(collapsePanelSpy).toHaveBeenCalledTimes(1);
	});
});
