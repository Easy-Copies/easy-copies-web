<template>
	<div class="bg-white flex rounded-xl">
		<div class="flex flex-col justify-center">
			<img class="mx-auto mb-2" src="/images/logo.png" alt="img-logo" />
			<img class="mx-auto" src="/images/img-login.png" alt="img-login" />
		</div>
		<div class="bg-primary rounded-r-xl p-10 text-white">
			<img
				@click="btnClose"
				class="w-5 h-5 cursor-pointer ml-auto"
				src="/icons/icon-close-white.png"
				alt="ic-close"
			/>
			<div class="text-4xl text-center mb-7">Login</div>
			<div class="w-full lg:w-[320px]">
				<form action="">
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
					<nuxt-link to="/forgot-password" class="flex justify-end text-sm mb-2"
						>Lupa Password?</nuxt-link
					>
					<button class="button-default w-full">Login</button>
				</form>

				<hr class="mt-6 mb-4 bg-white" />

				<div class="text-center text-sm mb-4">Belum punya akun?</div>
				<div class="flex items-center gap-2.5">
					<nuxt-link to="/register-toko" class="button-default w-full"
						>Daftarkan Toko</nuxt-link
					>
					<nuxt-link to="/register-user" class="button-default w-full"
						>Daftar Individu</nuxt-link
					>
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
		btnClose() {
			this.$router.push('/')
		}
	}
}
</script>
