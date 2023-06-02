<template>
	<div>
		<input
			:ref="name"
			type="text"
			:name="name"
			class="focus:outline-none w-full border border-gray-100 rounded-md px-3 py-3 text-primary placeholder-[#9E9E9E] focus:border-primary"
			:class="kelas"
			:placeholder="placeholder"
			:value="value"
			autocomplete="chrome-off"
			:disabled="disabled ? disabled : false"
			@input="handleInput"
			@change="handleInput"
			@keyup.enter="keyEnter"
			@keyup.esc="keyEsc"
			@keyup="keyup"
		/>
	</div>
</template>

<script>
export default {
	props: [
		'value',
		'name',
		'placeholder',
		'max',
		'disabled',
		'kelas',
		'required'
	],
	methods: {
		handleInput(event) {
			this.$emit('input', event.target.value)
		},

		keyEnter(event) {
			const data = {
				key: 'enter',
				value: event.target.value
			}
			this.$emit('keyup', data)
		},

		keyEsc(event) {
			const data = {
				key: 'esc',
				value: ''
			}
			this.$emit('keyup', data)
			this.$emit('input', '')
		},

		keyup(event) {
			if (event.key === 'ArrowDown') {
				const data = {
					key: event.key,
					value: ''
				}
				this.$emit('keyup', data)
			}
		}
	}
}
</script>
