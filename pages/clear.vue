<template>
	<div></div>
</template>

<script>
export default {
	layout: 'login',
	data() {
		return {}
	},
	mounted() {
		this.initialize()
	},
	methods: {
		initialize() {
			this.$cookiz.removeAll()
			localStorage.clear()
			this.$nextTick(() => {
				// $nuxt.$emit('refreshPage')
				window.location.href = '/'
				// this.$router.push('/login')
			})
		}
	}
}
</script>
