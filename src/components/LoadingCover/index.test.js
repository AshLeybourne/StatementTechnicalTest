import LoadingCover from ".";
import customElementTests from "../../testing/customElementTests";

describe("CartPanel", () => {
	afterEach(() => {
		document.body.innerHTML = "";
	});

	customElementTests(LoadingCover, "loading-cover", "loading-cover");

	/*
	 * TODO: Add tests to ensure animation sequencing triggers correctly
	 * in the same way as tested for CollapsiblePanel
	 */
});
