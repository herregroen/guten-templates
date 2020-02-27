module.exports = {
	mode: "development",
	watch: false,
	entry: "./src/js/index.ts",
	output: {
		path: __dirname,
		filename: "guten-templates.min.js",
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: "ts-loader",
				exclude: /node_modules/,
			},
		],
	},
	resolve: {
		extensions: [ ".ts", ".js", ".json" ],
	},
	externals: {
		lodash: "window.lodash",
		moment: "window.moment",
		"@wordpress/element": "window.wp.element",
		"@wordpress/blocks": "window.wp.blocks",
		"@wordpress/block-editor": "window.wp.blockEditor",
		"@wordpress/components": "window.wp.components",
		"@wordpress/data": "window.wp.data",
		"@wordpress/i18n": "window.wp.i18n",
	},
};
