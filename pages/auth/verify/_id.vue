<template>
	<!-- <div>
		<div v-if="type === 'ForgotPassword'">
			<div class="mb-10">
				<div class="mb-2">Password</div>
				<InputPassword
					v-model="newPassword"
					:placeholder="'Masukkan Password Baru'"
					:name="prefixName + 'password'"
				/>
			</div>
			<button class="button-main" @click="forgotPassword">
				Ganti Password
			</button>
		</div>
	</div> -->
	<div
		v-if="type === 'ForgotPassword'"
		class="lg:flex lg:min-h-screen items-center justify-center"
	>
		<div class="bg-white flex rounded-xl min-h-[450px]">
			<div class="flex flex-col justify-center">
				<img
					class="mx-auto mb-2"
					src="/images/logo.png"
					alt="img-logo"
				/>
				<img
					class="mx-auto"
					src="/images/img-login.png"
					alt="img-login"
				/>
			</div>
			<div class="bg-primary rounded-r-xl p-10 text-white">
				<div class="text-4xl text-center mb-7">Ganti Password</div>
				<div class="text-sm mb-4">Masukkan password baru anda</div>
				<div class="w-full lg:w-[320px]">
					<form @submit.prevent="validasi">
						<div class="mb-5">
							<div class="mb-2">Password</div>
							<InputPassword
								v-model="newPassword"
								:placeholder="'Masukkan Password Baru'"
								:name="prefixName + 'password'"
							/>
						</div>
						<button class="button-default w-full" type="submit">
							Kirim
						</button>
					</form>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	layout: 'login',
	data() {
		return {
			prefixName: 'forgotpassword',
			newPassword: ''
		}
	},
	computed: {
		id() {
			return this.$route.params.id
		},

		type() {
			return this.$route.query.signType
		}
	},
	mounted() {
		this.initialize()
	},
	methods: {
		async initialize() {
			if (this.type === 'VerifyUser') {
				this.verifikasiEmail()
				// } else {
				// 	this.forgotPassword()
			}
		},

		async verifikasiEmail() {
			const data = {
				signType: this.type
			}

			await this.$apiBase
				.post('v1/auth/verify/' + this.id, data)
				.then(res => {
					// console.log(res.data)
					this.$toast.show({
						type: 'success',
						title: 'Success',
						message: res.data.message
					})

					this.$nextTick(() => {
						this.$router.push('/login')
					})
				})
				.catch(err => {
					console.log(err)
				})
		},

		errorNotif(msg) {
			this.$toast.show({
				type: 'danger',
				title: 'Error',
				message: msg
			})
		},

		errorField(msg) {
			this.errorNotif(msg)
		},

		validasi() {
			if (this.newPassword === '') {
				this.errorField('Password baru wajib diisi')
			} else if (this.newPassword.length < 8) {
				this.errorField('Password minimal 8 character')
			} else {
				this.forgotPassword()
			}
		},

		async forgotPassword() {
			const data = {
				signType: this.type,
				password: this.newPassword
			}

			await this.$apiBase
				.post('v1/auth/verify/' + this.id, data)
				.then(res => {
					// console.log(res.data)
					this.$toast.show({
						type: 'success',
						title: 'Success',
						message: res.data.message
					})

					this.$nextTick(() => {
						this.$router.push('/login')
					})
				})
				.catch(err => {
					console.log(err)
				})
		}
	}
}
</script>
