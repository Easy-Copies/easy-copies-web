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
				<form @submit.prevent="validasi">
					<div class="mb-3">
						<div class="mb-2">Nama</div>
						<InputText
							v-model="form.name"
							:placeholder="'Masukkan Nama'"
							:name="prefixName + 'nama'"
						/>
					</div>
					<div class="mb-3">
						<div class="mb-2">Email</div>
						<InputText
							v-model="form.email"
							:placeholder="'Masukkan Email'"
							:name="prefixName + 'email'"
						/>
					</div>
					<div class="mb-10">
						<div class="mb-2">Password</div>
						<InputPassword
							v-model="form.password"
							:placeholder="'Masukkan Password'"
							:name="prefixName + 'password'"
						/>
					</div>
					<button class="button-default w-full" type="submit">
						Daftar
					</button>
				</form>
			</div>
		</div>

		<ElementsModal
			:key="keyModalSukses + 'register'"
			v-model="modalSukses"
			:width="modalWidthSukses"
			:show="false"
			:persistent="persistentSukses"
			:title="modalTitleSukses"
		>
			<div class="text-center">
				<div class="text-primary mb-9">
					Silahkan cek email anda untuk verifikasi akun.
				</div>
				<!-- <div class="flex justify-center gap-5">
					<button class="button-outline px-3 py-1.5">Kembali Login</button>
				</div> -->
			</div>
		</ElementsModal>
	</div>
</template>

<script>
export default {
	data() {
		return {
			prefixName: 'registeruser',
			loader: false,
			form: {
				name: '',
				email: '',
				password: ''
			},

			// KEPERLUAN MODAL //
			modalSukses: false,
			modalTitleSukses: '',
			modalWidthSukses: 'w-1/2 xl:w-2/5',
			keyModalSukses: 0,
			persistentSukses: true,
			selectedSukses: null
			//
		}
	},
	methods: {
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
			if (this.form.name === '') {
				this.errorField('Nama wajib diisi')
			} else if (this.form.email === '') {
				this.errorField('Email wajib diisi')
			} else if (this.form.password === '') {
				this.errorField('Password wajib diisi')
			} else {
				this.btnDaftar()
			}
		},

		async btnDaftar() {
			await this.$apiBase
				.post('v1/auth/register', this.form)
				.then(res => {
					this.modalSukses = true
					this.keyModalSukses += 1

					this.$nextTick(() => {
						this.$toast.show({
							type: 'success',
							title: 'Success',
							message: res.data.message
						})
					})
				})
				.catch(err => {
					console.log(err)
				})
		},

		btnClose() {
			this.$router.push('/')
		}
	}
}
</script>
