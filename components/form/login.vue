<template>
	<div class="bg-white flex rounded-xl">
		<div class="flex flex-col justify-center">
			<img class="mx-auto mb-2" src="/images/logo.png" alt="img-logo" />
			<img class="mx-auto" src="/images/img-login.png" alt="img-login" />
		</div>
		<div class="bg-primary rounded-r-xl p-10 text-white">
			<img
				class="w-5 h-5 cursor-pointer ml-auto"
				src="/icons/icon-close-white.png"
				alt="ic-close"
				@click="btnClose"
			/>
			<div class="text-4xl text-center mb-7">Login</div>
			<div class="w-full lg:w-[320px]">
				<form @submit.prevent="userLogin">
					<div class="mb-3">
						<div class="mb-2">Email</div>
						<InputText
							v-model="form.email"
							:placeholder="'Masukkan Email'"
							:name="prefixName + 'email'"
						/>
					</div>
					<div class="mb-5">
						<div class="mb-2">Password</div>
						<InputPassword
							v-model="form.password"
							:placeholder="'Masukkan Password'"
							:name="prefixName + 'password'"
						/>
					</div>
					<nuxt-link
						to="/forgot-password"
						class="flex justify-end text-sm mb-2"
					>
						Lupa Password?
					</nuxt-link>
					<button class="button-default w-full">Login</button>
				</form>

				<hr class="mt-6 mb-4 bg-white" />

				<div class="text-center text-sm mb-4">Belum punya akun?</div>
				<div class="flex items-center gap-2.5">
					<nuxt-link
						to="/register-toko"
						class="button-default w-full"
					>
						Daftarkan Toko
					</nuxt-link>
					<nuxt-link
						to="/register-user"
						class="button-default w-full"
					>
						Daftar Individu
					</nuxt-link>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			prefixName: 'login',
			loader: false,
			form: {
				email: '',
				password: ''
			}
		}
	},
	methods: {
		async userLogin() {
			this.loader = true
			try {
				await this.$auth
					.loginWith('local', { data: this.form })
					.then(res => {
						// console.log(res.data.token)
						const tokenCookiz = res.data.result.token
						this.$cookiz.set('jtoken', tokenCookiz)
						// window.location.href = '/signed'
						this.$router.push('/signed')
					})
			} catch (err) {
				console.log(err)
				// const dataError = {...err.response}
				// // console.log(dataError)
				// const errorMasuk = dataError.data.reason ? dataError.data.reason : 'Cek email dan password!' ;
				// // this.$toast.show(this.$t(errorMasuk))
				this.$toast.show({
					type: 'danger',
					title: 'Error',
					message: 'Email atau Kata Sandi Anda salah!'
				})

				this.$nextTick(() => {
					this.loader = false
				})
			}
		},

		btnClose() {
			this.$router.push('/')
		}
	}
}
</script>
