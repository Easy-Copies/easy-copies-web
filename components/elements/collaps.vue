<template>
	<div>
		<div :class="classTambahan">
			<div class="collaps-header" @click="statusCollaps = !statusCollaps">
				<div
					class="flex items-center justify-between py-3 px-6 hover:bg-gray-50 cursor-pointer"
					:title="title"
				>
					<div
						v-if="isDrawer"
						class="flex items-center gap-5 text-primary"
					>
						<i :class="icon" class="text-2xl"></i>
						<div>{{ title }}</div>
					</div>
					<div v-if="isDrawer">
						<i
							v-if="statusCollaps"
							class="ri-arrow-up-s-line text-xl"
						></i>
						<i v-else class="ri-arrow-down-s-line text-xl"></i>
					</div>
				</div>
			</div>
		</div>
		<transition name="fade">
			<div v-if="statusCollaps && isDrawer" class="collaps-body">
				<slot></slot>
			</div>
		</transition>
	</div>
</template>

<script>
export default {
	props: ['icon', 'title', 'classTambahan', 'isDrawer'],
	data() {
		return {
			statusCollaps: false
		}
	}
}
</script>
