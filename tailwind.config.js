/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./components/**/*.{js,vue,ts}',
		'./layouts/**/*.vue',
		'./pages/**/*.vue',
		'./plugins/**/*.{js,ts}',
		'./nuxt.config.{js,ts}',
		'node_modules/tv-*/dist/tv-*.umd.min.js'
	],
	theme: {
		extend: {
			colors: {
				primary: '#1D2539',
				secondary: '#7081AA',
				tiga: '#F3F3F3',
				empat: '#23A3F8',
				lima: '#FA3E57',
				enam: '#D6D6D6',
				tujuh: '#EEAD17'
			},
			zIndex: {
				1: '1',
				2: '2',
				3: '3',
				4: '4',
				5: '5'
			}
		}
	},
	plugins: []
}
