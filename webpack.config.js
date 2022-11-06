const HTMLWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
	entry: "./src/index.js",

	devServer: {
		historyApiFallback: true,
		static: {
			directory: path.resolve(__dirname, "./src/assets/"),
		},
		watchFiles: ["./src/*.html", "./src/*.scss"],
	},

	output: {
		path: path.join(__dirname, "./dist/"),
		filename: "bundle.js",
	},

	plugins: [
		new HTMLWebpackPlugin({
			template: "./src/index.html",
		}),
	],

	resolve: {
		//roots: [path.resolve("./src/")],
		extensions: [".js"],
	},

	module: {
		rules: [
			{
				test: /\.m?js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ["@babel/preset-env"],
					},
				},
			},
			{
				test: /\.html$/i,
				exclude: /node_modules/,
				loader: "html-loader",
			},
			{
				test: /\.(png|svg|jpg|jpeg|gif)$/i,
				exclude: /node_modules/,
				type: "asset/resource",
			},
			{
				test: /\.s[ac]ss$/i,
				exclude: /node_modules/,
				use: ["style-loader", "css-loader", "postcss-loader", "sass-loader"],
			},
		],
	},
};
