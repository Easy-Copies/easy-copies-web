<template>
	<div class="relative">
		<select
			:id="name"
			v-model="valueSelect"
			:name="name"
			:disabled="disabled && disabled === true ? true : false"
			class="cursor-pointer w-full focus:outline-none border border-enam rounded px-2 py-1.5 text-sm placeholder-[#9E9E9E] focus:border-enam/50"
		>
			<option v-if="placeholder" selected disabled value="">
				{{ placeholder }}
			</option>
			<option
				v-for="(i, index) in opsi"
				:key="name + 'opsi' + index"
				:value="i[itemValue] ? i[itemValue] : i.id"
			>
				{{ i[itemLabel] ? i[itemLabel] : i.label }}
			</option>
		</select>
	</div>
</template>

<script>
export default {
	props: [
		'value',
		'name',
		'placeholder',
		'opsi',
		'itemValue',
		'itemLabel',
		'disabled'
	],
	data() {
		return {
			valueSelect: ''
		}
	},
	watch: {
		valueSelect(val) {
			this.$emit('input', val)
		}
	},
	mounted() {
		this.initialize()
	},
	methods: {
		initialize() {
			// if (this.value !== '') {
			this.valueSelect = this.value
			// }
		}
		// handleInput(event) {
		//     this.$emit('input', event.target.value)
		// }
	}
}
</script>
