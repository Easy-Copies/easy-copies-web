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
				<div v-else class="flex gap-x-10 text-white">
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
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			dataUser: null
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
					console.log('data:', res.data.result)
					this.dataUser = res.data.result
				})
				.catch(err => {
					console.log('MASUK ERROR')
					console.log(err)
					// this.$router.push('/login')
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
