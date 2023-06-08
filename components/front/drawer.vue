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
					<nuxt-link v-if="item.isShow" :to="item.link">
						<div
							v-if="item.child.length === 0"
							class="flex items-center gap-5 text-primary py-3 px-6 hover:bg-gray-50"
						>
							<i :class="item.icon" class="text-2xl"></i>
							<div class="font-bold">{{ item.label }}</div>
						</div>
					</nuxt-link>
					<div v-if="item.child.length > 0 && item.isShow">
						<ElementsCollaps
							:icon="item.icon"
							:title="item.label"
							:is-drawer="statusDrawer"
						>
							<div
								v-for="(item2, index2) in item.child"
								:key="'child' + index2"
							>
								<nuxt-link :to="item2.path">
									<div
										class="py-3 px-[68px] hover:bg-gray-50"
									>
										{{ item2.label }}
									</div>
								</nuxt-link>
							</div>
						</ElementsCollaps>
					</div>
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
					link: '/dashboard',
					isShow: true,
					child: []
				},
				{
					label: 'User Management',
					icon: 'ri-file-user-line',
					link: '',
					isShow: false,
					child: [
						{
							label: 'User',
							path: '/dashboard/users'
						}
					]
				},
				{
					label: 'Role Management',
					icon: 'ri-shield-user-line',
					link: '',
					isShow: false,
					child: [
						{
							label: 'Role',
							path: '/dashboard/roles'
						}
					]
				}
			]
		}
	},
	computed: {
		statusDrawer() {
			return this.$store.state.drawer
		}
	},
	mounted() {
		this.initialize()
	},
	methods: {
		initialize() {
			this.getCurrentUser()
		},

		getPermissionActionByActiveRole(roles, permissionCode) {
			const activeRole = roles.find(role => role.isActive)
			const getPermission = activeRole.permissions.find(
				permission => permission.code === permissionCode
			)
			return getPermission
		},

		async getCurrentUser() {
			await this.$apiBase
				.get('v1/auth/me')
				.then(res => {
					const roles = res.data.result.roles
					const checkPermissionsUser =
						this.getPermissionActionByActiveRole(
							roles,
							'User Management'
						)

					const checkPermissionsRole =
						this.getPermissionActionByActiveRole(
							roles,
							'Role Management'
						)

					this.$nextTick(() => {
						this.listDashboard[1].isShow =
							checkPermissionsUser.actions.read
						this.listDashboard[2].isShow =
							checkPermissionsRole.actions.read
					})
				})
				.catch(err => {
					console.log(err)
				})
		}
	}
}
</script>
