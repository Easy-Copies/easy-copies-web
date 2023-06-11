import webpack from 'webpack'
require('dotenv').config()
// const _ = require('lodash')

export default {
	// Global page headers: https://go.nuxtjs.dev/config-head
	target: 'server',
	head: {
		title: 'Easy Copies',
		htmlAttrs: {
			lang: 'en'
		},
		meta: [
			{ charset: 'utf-8' },
			{
				name: 'viewport',
				content: 'width=device-width, initial-scale=1'
			},
			{ hid: 'description', name: 'description', content: '' },
			{ name: 'format-detection', content: 'telephone=no' }
		],
		link: [
			{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
			{
				rel: 'stylesheet',
				href: 'https://cdn.jsdelivr.net/npm/remixicon@2.5.0/fonts/remixicon.css'
			}
		]
	},

	// Global CSS: https://go.nuxtjs.dev/config-css
	css: ['~/assets/css/main.css', '~/assets/scss/main.scss'],

	// Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
	plugins: [{ src: '~/plugins/click-outside' }],

	// Auto import components: https://go.nuxtjs.dev/config-components
	components: true,

	// Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
	buildModules: [
		// https://go.nuxtjs.dev/tailwindcss
		'@nuxtjs/tailwindcss',
		'@nuxtjs/google-fonts'
	],

	// Modules: https://go.nuxtjs.dev/config-modules
	modules: [
		'@nuxtjs/axios',
		'@nuxtjs/auth-next',
		'@nuxtjs/dotenv',
		['cookie-universal-nuxt', { alias: 'cookiz' }],
		'@nuxtjs/dotenv',
		[
			'nuxt-tailvue',
			{
				modal: true,
				toast: {
					defaultProps: {
						timeout: 3,
						classToast: 'bg-white z-50',
						// classTitle: 'text-white',
						classMessage: 'text-primary',
						// classClose: 'text-white',
						classTimeout: 'bg-primary'
					}
				}
			}
		]
	],

	googleFonts: {
		families: {
			Quicksand: true
			// wght: [100, 300, 400, 500, 600, 700, 800, 900]
		}
	},

	axios: {
		baseURL: 'https://24de-103-247-196-57.ngrok-free.app/api/',
		headers: {
			'Content-Type': 'application/json',
			accept: 'application/json',
			'ngrok-skip-browser-warning': true
		}
	},

	auth: {
		redirect: {
			// login: '/login',
			home: false,
			logout: '/login'
			// callback: '/callback'
		},
		strategies: {
			local: {
				scheme: 'refresh',
				token: {
					property: 'token',
					maxAge: 1800,
					type: 'JWT'
				},
				user: {
					property: false,
					autoFetch: true
				},
				endpoints: {
					login: {
						url: 'v1/auth/login',
						method: 'post',
						propertyName: 'token'
					},
					logout: false,
					user: { url: 'v1/auth/me', method: 'get' }
				},
				tokenRequired: true,
				tokenType: 'JWT',
				globalToken: true
				// globalToken: true,
				// autoFetchUser: true
			}

			//   google: {
			// 	clientId: '981430623670-alri43dk2knfrc7j9rlg269mi5td3n1o.apps.googleusercontent.com',
			// 	codeChallengeMethod: '',
			// 	responseType: 'code',
			// 	endpoints: {
			// 	  token: 'https://base.api.k-hub.org/a3/authGoogle/',
			// 	  userInfo: 'https://www.googleapis.com/oauth2/v3/userinfo',
			// 	}
			//   },
		},
		plugins: [
			{ src: '~/plugins/apiBase', mode: 'client' }
			//   { src: "~/plugins/apiLog", mode: "client" },
			//   { src: "~/plugins/apiReport", mode: "client" },
			//   { src: "~/plugins/apiReport3", mode: "client" },
			//   { src: "~/plugins/apiLocal", mode: "client" },
			// 	 { src: "~/plugins/apiPlatform", mode: "client" },
			//   { src: "~/plugins/axios", mode: "client" },
		],
		cookie: {
			options: {
				sameSite: 'lax'
			}
		}
	},

	// Build Configuration: https://go.nuxtjs.dev/config-build
	build: {
		plugins: [
			new webpack.ProvidePlugin({
				// global modules
				_: 'lodash'
			})
		],
		transpile: ['defu'],
		postcss: {
			plugins: {
				tailwindcss: {},
				autoprefixer: {}
			}
		}
	}
}
