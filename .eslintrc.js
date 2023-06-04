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
		'prettier/prettier': ['off'],
		'vue/multi-word-component-names': 'off',
		'vue/order-in-components': [
			'error',
			{
				order: [
					'el',
					'name',
					'key',
					'parent',
					'functional',
					['delimiters', 'comments'],
					['components', 'directives', 'filters'],
					'extends',
					'mixins',
					['provide', 'inject'],
					'ROUTER_GUARDS',
					'layout',
					'middleware',
					'validate',
					'scrollToTop',
					'transition',
					'loading',
					'inheritAttrs',
					'model',
					['props', 'propsData'],
					'emits',
					'setup',
					'asyncData',
					'data',
					'fetch',
					'head',
					'computed',
					'watch',
					'watchQuery',
					'LIFECYCLE_HOOKS',
					'methods',
					['template', 'render'],
					'renderError'
				]
			}
		]
	}
}
