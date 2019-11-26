module.exports = {
	mode: 'development',
	watch: true,
	entry: './src/js/index.js',
	output: {
		path: __dirname,
		filename: 'guten-templates.min.js',
	},
	module: {
		rules: [
			{
				test: /.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
			},
		],
	},
	externals: {
		lodash: "window.lodash",
		"@wordpress/element": "window.wp.element",
		"@wordpress/blocks": "window.wp.blocks",
		"@wordpress/block-editor": "window.wp.blockEditor",
		"@wordpress/components": "window.wp.components",
	}
};
