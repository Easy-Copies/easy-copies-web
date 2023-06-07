<template>
	<div>
		<div class="relative">
			<select
				:id="name"
				v-model="valueSelect"
				:name="name"
				:placeholder="placeholder ? placeholder : 'Pilih'"
				:disabled="disabled && disabled === true ? true : false"
				class="cursor-pointer w-full focus:outline-none border border-enam rounded pl-3 pr-6 lg:py-2 py-3 text-sm focus:border-enam/50 disabled:bg-gray-200 disabled:cursor-not-allowed"
			>
				<option disabled value="" selected>
					{{ placeholder ? placeholder : 'Pilih' }}
				</option>
				<option
					v-for="(i, index) in opsi"
					:key="name + 'opsi' + index"
					:value="i[itemValue] ? i[itemValue] : i.id"
				>
					<span>{{ i[parseLabel] }}</span>
				</option>
			</select>
		</div>
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
	computed: {
		parseLabel() {
			return this.itemLabel ? this.itemLabel : 'label'
		},
		parseId() {
			return this.itemValue ? this.itemValue : 'id'
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
		},
		handleInput(event) {
			this.$emit('input', event.target.value)
		}
	}
}
</script>
