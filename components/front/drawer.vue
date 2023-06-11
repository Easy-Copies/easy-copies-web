<template>
	<div class="h-screen fixed left-0 top-0 pt-24 w-[290px] shadow-lg">
		<div
			class="bg-white h-[calc(100vh-96px)] border-r border-gray-100 overflow-y-auto drawer-none-scrolling"
		>
			<div class="flex flex-col h-full">
				<div
					v-for="(item, index) in filteredListDashboard"
					:key="'list' + index"
				>
					<nuxt-link :to="item.link">
						<div
							v-if="item.child.length === 0"
							class="flex items-center gap-5 text-primary py-3 px-6 hover:bg-gray-50"
						>
							<i :class="item.icon" class="text-2xl"></i>
							<div class="font-bold">{{ item.label }}</div>
						</div>
					</nuxt-link>
					<div v-if="item.child.length > 0">
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
import global from '~/mixins.js/global.js'

export default {
	mixins: [global],
	data() {
		return {
			roles: [],
			listDashboard: [
				{
					label: 'Dashboard',
					icon: 'ri-home-2-line',
					link: '/dashboard',
					// isShow: true,
					child: []
				},
				{
					label: 'User Management',
					icon: 'ri-file-user-line',
					link: '',
					child: [
						{
							label: 'User',
							path: '/dashboard/users',
							permissions: {
								code: 'User Management',
								actions: 'read'
							}
						},
						{
							label: 'Role',
							path: '/dashboard/roles',
							permissions: {
								code: 'Role Management',
								actions: 'read'
							}
						}
					]
				}
				// {
				// 	label: 'Role Management',
				// 	icon: 'ri-shield-user-line',
				// 	link: '',
				// 	isShow: false,
				// 	child: [
				// 		{
				// 			label: 'Role',
				// 			path: '/dashboard/roles'
				// 		}
				// 	]
				// }
			]
		}
	},
	computed: {
		statusDrawer() {
			return this.$store.state.drawer
		},

		filteredListDashboard() {
			const activeRole = this.roles[0]
			return this.listDashboard.map(list => {
				return {
					...list,
					child: list.child.filter(child => {
						const findCorrectPermission =
							activeRole?.permissions?.find(
								permission =>
									permission.code === child.permissions.code
							)

						if (findCorrectPermission) {
							if (
								child.permissions.actions === 'read' &&
								findCorrectPermission.actions.read &&
								findCorrectPermission.code ===
									child.permissions.code
							)
								return child
						} else {
							return child
						}
					})
				}
			})
		}
	},
	mounted() {
		this.initialize()
	},
	methods: {
		initialize() {
			this.getCurrentUser()
		},

		async getCurrentUser() {
			await this.$apiBase
				.get('v1/auth/me')
				.then(res => {
					const roles = res.data.result.roles
					// console.log(roles)
					this.roles = roles.filter(role => role.isActive)

					this.getPermissionActionByActiveRole(
						roles,
						'User Management'
					)
				})
				.catch(err => {
					console.log(err)
				})
		}
	}
}
</script>
