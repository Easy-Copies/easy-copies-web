module.exports = {
	root: true,
	env: {
		browser: true,
		node: true
	},
	extends: ['@nuxt/eslint-config', 'plugin:prettier/recommended'],
	// add your custom rules here
	rules: {
		'vue/component-name-in-template-casing': ['error', 'PascalCase'],
		'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		'prettier/prettier': [
			'error',
			{
				endOfLine: 'auto'
			}
		],
		'vue/multi-word-component-names': 'off'
	}
}
