<template>
	<div class="relative">
		<input
			:id="name"
			:ref="name"
			:type="show ? 'password' : 'text'"
			:name="name"
			class="focus:outline-none w-full border border-gray-100 rounded-md px-3 py-3 text-primary placeholder-[#9E9E9E] focus:border-primary"
			:placeholder="placeholder"
			autocomplete="chrome-off"
			:disabled="disabled ? disabled : false"
			@input="handleInput"
			@change="handleInput"
		/>
		<div
			class="absolute cursor-pointer inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
			@click="show = !show"
		>
			<img
				v-if="!show"
				class="w-7 h-7"
				src="/icons/icon-show.png"
				alt="ic-show"
			/>
			<img
				v-if="show"
				class="w-7 h-7"
				src="/icons/icon-hide.png"
				alt="ic-hide"
			/>
		</div>
	</div>
</template>

<script>
export default {
	props: ['value', 'name', 'placeholder', 'label', 'disabled'],
	data() {
		return {
			show: true
		}
	},

	mounted() {},

	methods: {
		handleInput(event) {
			this.$emit('input', event.target.value)
		}
	}
}
</script>
