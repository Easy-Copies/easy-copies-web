<template>
	<div class="bg-primary w-full py-5 fixed z-10">
		<div class="container mx-auto">
			<div class="flex items-center justify-between">
				<nuxt-link to="/" class="">
					<img class="h-14" src="/images/logo.svg" alt="img-logo" />
				</nuxt-link>
				<div v-if="dataUser === null" class="flex gap-x-10 text-white">
					<NuxtLink to="/" class="hover:text-blue-300">
						Home
					</NuxtLink>
					<NuxtLink to="/" class="hover:text-blue-300">
						Service
					</NuxtLink>
					<NuxtLink to="/" class="hover:text-blue-300">
						About
					</NuxtLink>
					<NuxtLink to="/" class="hover:text-blue-300">
						Contact
					</NuxtLink>
					<NuxtLink to="/login" class="hover:text-blue-300">
						Login
					</NuxtLink>
				</div>
				<div v-else class="">
					<div class="flex gap-x-10 text-white">
						<NuxtLink to="/" class="hover:text-blue-300">
							Home
						</NuxtLink>
						<NuxtLink to="/dashboard" class="hover:text-blue-300">
							Dashboard
						</NuxtLink>
						<button class="hover:text-blue-300" @click="btnLogout">
							Logout
						</button>
					</div>
					<!-- <div v-else class="bg-green-200 w-80 h-80">
						<div>Pilih role</div>
					</div> -->
				</div>
			</div>
		</div>

		<!-- MODAL PILIH ROLE -->
		<ElementsModal
			:key="keyModalRole + 'chooserole'"
			v-model="modalRole"
			:width="modalWidthRole"
			:show="false"
			:persistent="persistentRole"
			:title="modalTitleRole"
		>
			<div class="text-center">
				<div class="mb-5">
					<InputSelect
						v-model="chooseRole"
						:name="'role'"
						:item-value="'id'"
						:item-label="'name'"
						:opsi="listRole"
					/>
				</div>
				<!-- <pre>{{ chooseRole }}</pre> -->
				<div class="flex justify-center gap-5">
					<button
						class="button-outline px-3 py-1.5"
						@click="btnLogout"
					>
						Cancel
					</button>
					<button
						class="button-main px-3 py-1.5 text-sm border border-primary"
						@click="btnActive"
					>
						Active
					</button>
				</div>
			</div>
		</ElementsModal>

		<!-- MODAL NO ROLE -->
		<ElementsModal
			:key="keyModalNoRole + 'norole'"
			v-model="modalNoRole"
			:width="modalWidthNoRole"
			:show="false"
			:persistent="persistentNoRole"
			:title="modalTitleNoRole"
		>
			<div class="text-center">
				<div class="text-primary mb-9">
					Anda belum memiliki role aktif, silahkan tunggu admin
					menambahkan role ke akun anda.
				</div>
				<div class="flex justify-center gap-5">
					<button
						class="button-outline px-3 py-1.5"
						@click="btnLogout"
					>
						Tutup
					</button>
				</div>
			</div>
		</ElementsModal>
	</div>
</template>

<script>
export default {
	data() {
		return {
			dataUser: null,
			listRole: null,
			chooseRole: '',

			// KEPERLUAN MODAL //
			modalRole: false,
			modalTitleRole: 'Pilih Role Aktif',
			modalWidthRole: 'w-1/2 xl:w-2/5',
			keyModalRole: 0,
			persistentRole: true,
			selectedRole: null,
			//

			// KEPERLUAN MODAL //
			modalNoRole: false,
			modalTitleNoRole: 'Warning',
			modalWidthNoRole: 'w-1/2 xl:w-2/5',
			keyModalNoRole: 0,
			persistentNoRole: true,
			selectedNoRole: null
			//
		}
	},
	mounted() {
		this.initialize()
	},
	methods: {
		initialize() {
			this.getCurrentUser()
		},

		async getCurrentUser() {
			await this.$apiBase
				.get('v1/auth/me')
				.then(res => {
					// console.log('data:', res.data.result)
					this.dataUser = res.data.result

					this.$nextTick(() => {
						// KALO USER ADA ROLE DAN BELUM AKTIF
						if (
							this.dataUser.roles.length > 0 &&
							this.dataUser.roles[0].isActive === false
						) {
							this.modalRole = true
							this.keyModalRole += 1
							this.getListRole()
							// KALO USER ADA ROLE DAN SUDAH AKTIF
						} else if (
							this.dataUser.roles.length > 0 &&
							this.dataUser.roles[0].isActive === true
						) {
							this.modalRole = false
							this.keyModalRole += 1
							this.$router.push('/dashboard')
							// KALO USER BELUM ADA ROLE
						} else {
							this.modalNoRole = true
							this.keyModalNoRole += 1
						}
					})
				})
				.catch(err => {
					// console.log('MASUK ERROR')
					console.log(err)
					// this.$router.push('/login')
				})
		},

		async getListRole() {
			await this.$apiBase.get('v1/auth/roles').then(res => {
				this.listRole = res.data.result
			})
		},

		async btnActive() {
			const data = {
				roleId: this.chooseRole
			}
			await this.$apiBase
				.put('v1/auth/roles/change-active', data)
				.then(res => {
					this.$toast.show({
						type: 'success',
						title: 'Success',
						message: res.data.message
					})

					this.$nextTick(() => {
						this.$router.push('/dashboard')
					})
				})
		},

		btnLogout() {
			this.$cookiz.removeAll()
			localStorage.clear()
			this.$nextTick(() => {
				this.$router.push('/clear')
			})
		}
	}
}
</script>
