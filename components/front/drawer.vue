<template>
	<div class="h-screen fixed left-0 top-0 pt-24 w-[290px] shadow-lg">
		<div
			class="bg-white h-[calc(100vh-96px)] border-r border-gray-100 overflow-y-auto drawer-none-scrolling"
		>
			<div class="flex flex-col h-full">
				<div
					v-for="(item, index) in listDashboard"
					:key="'list' + index"
				>
					<nuxt-link :to="item.link">
						<div
							class="flex items-center gap-5 text-primary py-3 px-6 hover:bg-gray-50"
						>
							<i :class="item.icon" class="text-2xl"></i>
							<div class="font-bold">{{ item.label }}</div>
						</div>
					</nuxt-link>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			listDashboard: [
				{
					label: 'Dashboard',
					icon: 'ri-home-2-line',
					link: '/dashboard'
				},
				{
					label: 'User Management',
					icon: 'ri-file-user-line',
					link: '/dashboard/users'
				},
				{
					label: 'Role Management',
					icon: 'ri-shield-user-line',
					link: '/dashboard/roles'
				}
			]
		}
	}
}
</script>
