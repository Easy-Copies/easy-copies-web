<template>
	<div class="bg-white flex rounded-xl min-h-[450px]">
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
			<div class="text-4xl text-center mb-7">Lupa Password</div>
			<div class="text-sm mb-4">
				Masukkan alamat email untuk menerima OTP
			</div>
			<div class="w-full lg:w-[320px]">
				<form @submit.prevent="validasi">
					<div class="mb-5">
						<div class="mb-2">Email</div>
						<InputText
							v-model="form.email"
							:placeholder="'Masukkan Email'"
							:name="prefixName + 'email'"
						/>
					</div>
					<button class="button-default w-full" type="submit">
						Kirim
					</button>
				</form>
			</div>
		</div>

		<ElementsModal
			:key="keyModalSukses + 'forgot'"
			v-model="modalSukses"
			:width="modalWidthSukses"
			:show="false"
			:persistent="persistentSukses"
			:title="modalTitleSukses"
		>
			<div class="text-center">
				<div class="text-primary mb-9">
					Silahkan cek email anda untuk ganti password.
				</div>
			</div>
		</ElementsModal>
	</div>
</template>

<script>
export default {
	data() {
		return {
			prefixName: 'forgot',
			loader: false,
			form: {
				email: ''
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
			if (this.form.email === '') {
				this.errorField('Email wajib diisi')
			} else {
				this.btnKirim()
			}
		},

		async btnKirim() {
			await this.$apiBase
				.post('v1/auth/forgot-password', this.form)
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
