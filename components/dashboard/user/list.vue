<template>
	<div class="p-5">
		<div class="flex items-center justify-between text-primary">
			<div class="text-xl">User List</div>
			<button class="button-outline" @click="btnCreate">
				Create User
			</button>
		</div>

		<div class="mt-10">
			<table class="w-full text-left">
				<thead class="text-xs">
					<tr class="uppercase bg-tiga border border-enam">
						<th class="px-5 py-2.5">name</th>
						<th class="px-5 py-2.5">email</th>
						<th class="px-5 py-2.5">created at</th>
						<th class="px-5 py-2.5">updated at</th>
						<th class="px-5 py-2.5">actions</th>
					</tr>
				</thead>
				<tbody>
					<tr
						v-for="(item, index) in listUser"
						:key="'users' + index"
						class="border border-enam text-sm"
					>
						<td class="px-5 py-2.5">{{ item.name }}</td>
						<td class="px-5 py-2.5">{{ item.email }}</td>
						<td class="px-5 py-2.5">{{ item.createdAt }}</td>
						<td class="px-5 py-2.5">{{ item.updatedAt }}</td>
						<td class="px-5 py-2.5 flex items-center gap-2.5">
							<button
								class="button-edit"
								@click="btnEdit(item.id)"
							>
								Edit
							</button>
							<button
								class="button-delete"
								@click="btnDelete(item.id)"
							>
								Delete
							</button>
						</td>
					</tr>
				</tbody>
			</table>
			<div class="border border-enam text-sm w-full -mt-[1px]">
				<div class="flex items-center justify-between px-5 py-2.5">
					<div class="">
						<select
							id="filtertotalpage"
							v-model="sorter.limit"
							name="filtertotalpage"
							class="border border-enam rounded outline-none py-[6px] cursor-pointer px-2 text-xs bg-white"
						>
							<option value="10">10</option>
							<option value="20">20</option>
						</select>
					</div>
					<div class="pagination-area text-center mt-6">
						<ElementsPaginasi
							v-if="loader"
							:key="'pageset' + keyPage"
							v-model="currentPage"
							:total-page="totalPage"
							:total-visible="totalVisible"
							:loader-page="!loader"
							@input="onChangePage"
						/>
					</div>
				</div>
			</div>
		</div>

		<!-- MODAL CREATE -->
		<ElementsModal
			:key="keyModalCreate + 'create'"
			v-model="modalCreate"
			:width="modalWidthCreate"
			:show="true"
			:persistent="persistentCreate"
			:title="modalTitleCreate"
		>
			<div>
				<div>
					<div class="mb-2">
						<div class="mb-2">Nama</div>
						<InputText
							:key="keyMaster + 'nama'"
							v-model="form.name"
							:placeholder="'Masukkan Nama'"
							:name="prefixName + 'nama'"
						/>
					</div>
					<div class="mb-2">
						<div class="mb-2">Email</div>
						<InputText
							:key="keyMaster + 'email'"
							v-model="form.email"
							:placeholder="'Masukkan Email'"
							:name="prefixName + 'email'"
						/>
					</div>
					<div class="mb-2">
						<div class="mb-2">Password</div>
						<InputPassword
							:key="keyMaster + 'password'"
							v-model="form.password"
							:placeholder="'Masukkan Password'"
							:name="prefixName + 'password'"
						/>
					</div>
					<div class="mb-5">
						<div class="mb-2">Role</div>
						<InputAutoCompleteMulti
							:key="prefixName + 'addrole'"
							v-model="form.roles"
							:name="prefixName + 'role'"
							:placeholder="'Pilih Role'"
							:label="'Role'"
							:opsi="opsiRoles"
							:item-value="'id'"
							:item-label="'label'"
						/>
					</div>
				</div>
				<div class="text-right">
					<button class="button-main" @click="validasi">
						Submit
					</button>
				</div>
			</div>
		</ElementsModal>

		<!-- MODAL EDIT -->
		<ElementsModal
			:key="keyModalEdit + 'edit'"
			v-model="modalEdit"
			:width="modalWidthEdit"
			:show="true"
			:persistent="persistentEdit"
			:title="modalTitleEdit"
		>
			<div>
				<div>
					<div class="mb-2">
						<div class="mb-2">Nama</div>
						<InputText
							:key="keyMaster + 'nama'"
							v-model="form.name"
							:placeholder="'Masukkan Nama'"
							:name="prefixName + 'nama'"
						/>
					</div>
					<div class="mb-2">
						<div class="mb-2">Email</div>
						<InputText
							:key="keyMaster + 'email'"
							v-model="form.email"
							:placeholder="'Masukkan Email'"
							:name="prefixName + 'email'"
						/>
					</div>
					<div class="mb-5">
						<div class="mb-2">Role</div>
						<InputFieldKategoriMulti
							v-if="loaderDetail"
							:key="prefixName + 'role'"
							v-model="form.roles"
							:name="prefixName + 'role'"
						/>
					</div>
				</div>
				<div class="text-right">
					<button class="button-main" @click="btnSubmitEdit(idUser)">
						Submit
					</button>
				</div>
			</div>
		</ElementsModal>

		<!-- MODAL DELETE -->
		<ElementsModal
			:key="keyModalDelete + 'delete'"
			v-model="modalDelete"
			:width="modalWidthDelete"
			:show="true"
			:persistent="persistentDelete"
			:title="modalTitleDelete"
		>
			<div class="text-center">
				<div class="text-primary mb-9">
					Are you sure want to delete user?
				</div>
				<div class="flex justify-center gap-5">
					<button
						class="button-outline px-3 py-1.5"
						@click="btnNoDelete"
					>
						No
					</button>
					<button
						class="button-delete px-3 py-1.5 text-sm border border-lima"
						@click="btnYesDelete(idUser)"
					>
						Yes
					</button>
				</div>
			</div>
		</ElementsModal>
	</div>
</template>

<script>
export default {
	data() {
		return {
			prefixName: 'create',
			loader: false,
			loaderDetail: false,
			listUser: null,
			idUser: '',
			opsiRoles: null,
			keyMaster: 0,
			form: {
				name: '',
				email: '',
				password: '',
				roles: []
			},
			sorter: {
				limit: 10
			},

			// KEPERLUAN MODAL //
			modalCreate: false,
			modalTitleCreate: 'Create New User',
			modalWidthCreate: 'w-1/2 xl:w-2/5',
			keyModalCreate: 0,
			persistentCreate: true,
			selectedCreate: null,
			//

			// KEPERLUAN MODAL //
			modalEdit: false,
			modalTitleEdit: 'Edit User',
			modalWidthEdit: 'w-1/2 xl:w-2/5',
			keyModalEdit: 0,
			persistentEdit: true,
			selectedEdit: null,
			//

			// KEPERLUAN MODAL //
			modalDelete: false,
			modalTitleDelete: 'Delete User',
			modalWidthDelete: 'w-1/2 xl:w-2/5',
			keyModalDelete: 0,
			persistentDelete: true,
			selectedDelete: null,
			//

			// KEBUTUHAN PAGINASI
			totalVisible: 5,
			limit: 10,
			keyPage: 0,
			totalPage: 1,
			currentPage: 1,
			page: 1
			//
		}
	},
	mounted() {
		this.initialize()
	},
	methods: {
		initialize() {
			this.loader = false
			this.loaderDetail = false
			this.getOpsiRole()
			this.getListUser()
		},

		onChangePage(page) {
			this.page = page
			this.initialize()
		},

		async getListUser() {
			await this.$apiBase
				.get(
					'v1/user-management/users?limit=' +
						this.limit +
						'&page=' +
						this.page +
						'&sort=desc&column=createdAt'
				)
				.then(res => {
					// console.log(res.data.result)
					this.listUser = res.data.result.rows

					this.totalPage = res.data.result.totalPages
					this.keyPage += 1

					this.$nextTick(() => {
						this.loader = true
					})
				})
				.catch(err => {
					console.log(err)
				})
		},

		async getDetailUser(id) {
			await this.$apiBase
				.get('v1/user-management/users/' + id)
				.then(res => {
					const vA = res.data.result
					this.form.name = vA.name
					this.form.email = vA.email
					this.form.roles = [vA.roles[0].role.id]

					this.$nextTick(() => {
						this.loaderDetail = true
					})
				})
				.catch(err => {
					console.log(err)
				})
		},

		errorNotif(msg) {
			this.$toast.show({
				type: 'danger',
				title: 'Error',
				message: msg
			})
		},

		errorField(msg) {
			this.errorNotif(msg)
		},

		validasi() {
			if (this.form.name === '') {
				this.errorField('Nama wajib diisi')
			} else if (this.form.email === '') {
				this.errorField('Email wajib diisi')
			} else if (this.form.password === '') {
				this.errorField('Password wajib diisi')
			} else if (this.form.roles.length === 0) {
				this.errorField('Role wajib dipilih')
			} else {
				this.btnSubmit()
			}
		},

		async btnSubmit() {
			await this.$apiBase
				.post('v1/user-management/users', this.form)
				.then(res => {
					this.$toast.show({
						type: 'success',
						title: res.data.message,
						message: 'User berhasil dibuat'
					})

					this.$nextTick(() => {
						this.modalCreate = false
						this.keyModalCreate += 1
						this.initialize()
						this.form = {
							name: '',
							email: '',
							password: '',
							roles: []
						}
					})
				})
				.catch(err => {
					console.log(err)
				})
		},

		async btnSubmitEdit(id) {
			const dataPush = {
				name: this.form.name,
				email: this.form.email,
				roles: this.form.roles
			}

			await this.$apiBase
				.put('v1/user-management/users/' + id, dataPush)
				.then(res => {
					this.$toast.show({
						type: 'success',
						title: 'Updated',
						message: 'User berhasil diperbarui'
					})

					this.$nextTick(() => {
						this.modalEdit = false
						this.keyModalEdit += 1
						this.initialize()
					})
				})
				.catch(err => {
					console.log(err)
				})
		},

		async btnYesDelete(id) {
			await this.$apiBase
				.delete('v1/user-management/users/' + id)
				.then(res => {
					this.$toast.show({
						type: 'success',
						title: 'Deleted',
						message: 'User berhasil dihapus'
					})

					this.$nextTick(() => {
						this.modalDelete = false
						this.keyModalDelete += 1
						this.initialize()
					})
				})
				.catch(err => {
					console.log(err)
				})
		},

		btnNoDelete() {
			this.modalDelete = false
			this.keyModalDelete += 1
		},

		async getOpsiRole() {
			await this.$apiBase.get('v1/user-management/roles').then(res => {
				this.opsiRoles = res.data.result.rows.map(e => {
					const data = {
						id: e.id,
						label: e.name
					}
					return data
				})
			})
		},

		btnCreate() {
			this.modalCreate = true
			this.keyModalCreate += 1
		},

		btnEdit(id) {
			this.getDetailUser(id)
			this.modalEdit = true
			this.keyModalEdit += 1
			this.idUser = id
		},

		btnDelete(id) {
			this.modalDelete = true
			this.keyModalDelete += 1
			this.idUser = id
		}
	}
}
</script>
