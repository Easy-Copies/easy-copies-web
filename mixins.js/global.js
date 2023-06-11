export default {
	methods: {
		getPermissionActionByActiveRole(roles, permissionCode) {
			const activeRole = roles.find(role => role.isActive)
			const getPermission = activeRole.permissions.find(
				permission => permission.code === permissionCode
			)
			// console.log(getPermission)
			return getPermission
		}
	}
}
