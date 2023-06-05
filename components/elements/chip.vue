<template>
	<div class="chip-sm">
		<div class="chip-label">{{ newChipLabel }}</div>
		<button class="chip-button">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				width="20"
				height="20"
			>
				<path fill="none" d="M0 0h24v24H0z" />
				<path
					d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z"
					fill="rgba(255,255,255)"
				/>
			</svg>
		</button>
	</div>
</template>

<script>
export default {
	props: ['item'],
	data() {
		return {}
	},
	computed: {
		newChipLabel: {
			get() {
				return _.truncate(this.item, { length: 15 })
			}
		}
	}
}
</script>
