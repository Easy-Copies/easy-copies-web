<template>
	<div>
		<!-- <pre>{{currentUser}}</pre> -->
	</div>
</template>

<script>
export default {
	layout: 'login',
	data() {
		return {
			currentUser: null
		}
	},
	mounted() {
		this.initialize()
	},
	methods: {
		initialize() {
			this.$router.push('/')
			// this.getCurrentUser()
			// getTarget()
		},

		async getCurrentUser() {
			await this.$apiBase
				.get('v1/auth/me')
				.then(res => {
					console.log(res.data.result)

					this.$nextTick(() => {
						// window.location.href = '/'
						this.$router.push('/')
					})
				})
				.catch(err => {
					console.log(err)
					// this.$router.push('/clear')
					// window.location.href="/clear"
				})
		}
	}
}
</script>
