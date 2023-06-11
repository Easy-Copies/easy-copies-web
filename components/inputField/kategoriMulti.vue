<template>
	<div>
		<InputAutoCompleteMulti
			:key="'keymulti' + keyMaster"
			v-model="newVal"
			:name="name"
			:label="label"
			:opsi="opsi"
			:item-value="'id'"
			:item-label="'label'"
		/>
	</div>
</template>

<script>
export default {
	props: ['value', 'label', 'name', 'disabled', 'placeholder'],
	data() {
		return {
			opsi: [],
			keyMaster: 0
		}
	},
	computed: {
		newVal: {
			get() {
				return this.value
			},
			set(value) {
				this.$emit('input', value)
			}
		}
	},
	mounted() {
		this.initialize()
	},
	methods: {
		initialize() {
			this.getRole()
		},

		async getRole() {
			await this.$apiBase.get('v1/user-management/roles').then(res => {
				this.opsi = res.data.result.rows.map(e => {
					const data = {
						id: e.id,
						label: e.name
					}
					return data
				})
				this.$nextTick(() => {
					this.keyMaster += 1
				})
			})
		}
	}
}
</script>
