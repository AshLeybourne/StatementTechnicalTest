/** @type {import('jest').Config} */
module.exports = {
	testEnvironment: "jsdom",
	roots: ["src/"],
	collectCoverageFrom: ["src/**/*.js"],

	moduleNameMapper: {
		"\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
			"<rootDir>/__mocks__/fileMock.js",
		"\\.(scss|css|less)$": "<rootDir>/__mocks__/styleMock.js",
		"\\.(html)$": "<rootDir>/__mocks__/htmlMock.js",
	},
};
