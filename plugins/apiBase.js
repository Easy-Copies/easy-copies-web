// import CryptoJS from 'crypto-js';

export default function ({ $axios, redirect, app }, inject) {
	const apiBase = $axios.create({
		//   headers: {
		//     'X-Api-Key': 'JDCsOuUr.xomfRKR4t4fs3uedwhUvfyU3ZkUVJDWl'
		//   },
		// proxy: true
	})

	apiBase.interceptors.request.use(config => {
		// const token = app.$cookiz.get('t12')
		// const bytes = CryptoJS.AES.decrypt(app.$cookiz.get('t12'), process.env.SECRET_KEY_TOKEN);
		// var token = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
		var token = app.$cookiz.get('jtoken')

		if (token) {
			config.headers['Authorization'] = `Bearer ${token}`
			// config.headers['X-Auth-Token'] = token
		}
		return config
	})
	apiBase.interceptors.response.use(
		res => {
			return res
		},
		async err => {
			const originalConfig = err.config

			if (err.response) {
				// Access Token was expired
				if (
					err.response.status === 401 &&
					!originalConfig._retry &&
					!['/auth/verify'].includes(originalConfig?.url)
				) {
					originalConfig._retry = true

					try {
						// Make request for refreshing expired token
						const refreshTokenResponse = await apiBase.post(
							'/v1/auth/refresh-token',
							{ refreshToken: app.$cookiz.get('jRefreshToken') }
						)
						const { token, refreshToken } =
							refreshTokenResponse.data.result

						// Set Token to Cookies
						app.$cookiz.set('jtoken', token)
						app.$cookiz.set('jRefreshToken', refreshToken)

						// Update authorization header for incoming request
						apiBase.defaults.headers.common[
							'Authorization'
						] = `Bearer ${token}`

						return apiBase(originalConfig)
					} catch (_error) {
						// Reset cookies
						app.$cookiz.set('jtoken', '')
						app.$cookiz.set('jRefreshToken', '')

						// Redirect
						redirect('/clear')

						if (_error.response && _error.response.data) {
							return Promise.reject(_error.response.data)
						}

						return Promise.reject(_error)
					}
				}
			}

			return Promise.reject(err)
		}
	)

	const endPoint = 'https://00c7-103-247-196-20.ngrok-free.app/api/'
	apiBase.setBaseURL(endPoint)

	// Inject to context as $api
	inject('apiBase', apiBase)
}
