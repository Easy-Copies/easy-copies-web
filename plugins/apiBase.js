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
			config.headers['Authorization'] = `JWT ${token}`
			// config.headers['X-Auth-Token'] = token
		}
		return config
	})
	apiBase.onError(error => {
		const dataError = { ...error.response }
		if (dataError) {
			if (dataError.status === 401) {
				if (
					['Invalid signature.', 'Signature has expired.'].includes(
						dataError.data.detail
					)
				) {
					redirect('/clear')
				}
			}
		}
	})

	const endPoint = 'https://0aff-103-108-158-158.ngrok-free.app/api/'
	apiBase.setBaseURL(endPoint)

	// Inject to context as $api
	inject('apiBase', apiBase)
}
