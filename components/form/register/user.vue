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
			<div class="text-4xl text-center mb-7">Register</div>
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
					<div class="mb-3">
						<div class="mb-2">Password</div>
						<InputPassword
							v-model="form.password"
							:placeholder="'Masukkan Password'"
							:name="prefixName + 'password'"
						/>
					</div>
					<div class="mb-5">
						<div class="mb-2">Confirm Password</div>
						<InputPassword
							v-model="form.confirmPassword"
							:placeholder="'Masukkan Konfirmasi Password'"
							:name="prefixName + 'confirmpassword'"
						/>
					</div>
					<button class="button-default w-full">Daftar</button>
				</form>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			prefixName: 'registeruser',
			loader: false,
			form: {
				email: '',
				password: '',
				confirmPassword: ''
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
