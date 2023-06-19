<template>
	<div class="flex items-center">
		<input
			:id="'ck-' + name"
			type="checkbox"
			:checked="value"
			class="w-[18px] h-[18px] style-checkbox shrink-0"
			@change="handleChange"
		/>
		<label
			:for="'ck-' + name"
			class="ml-2 text-xsplus text-primary cursor-pointer"
			>{{ label }}</label
		>
	</div>
</template>
<script>
export default {
	props: ['value', 'name', 'label'],
	methods: {
		handleChange(event) {
			this.$emit('input', event.target.checked)
		}
	}
}
</script>
