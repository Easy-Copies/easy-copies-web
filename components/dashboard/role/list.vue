<template>
	<div class="p-5">
		<div class="flex items-center justify-between text-primary">
			<div class="text-xl">Role List</div>
			<button class="button-outline" @click="btnCreate">
				Create Role
			</button>
		</div>

		<div class="mt-10">
			<table class="w-full text-left">
				<thead class="text-xs">
					<tr class="uppercase bg-tiga border border-enam">
						<th class="px-5 py-2.5">name</th>
						<th class="px-5 py-2.5">created at</th>
						<th class="px-5 py-2.5">updated at</th>
						<th class="px-5 py-2.5">actions</th>
					</tr>
				</thead>
				<tbody>
					<tr
						v-for="(item, index) in listRole"
						:key="'users' + index"
						class="border border-enam text-sm"
					>
						<td class="px-5 py-2.5">{{ item.name }}</td>
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
								class="button-permission"
								@click="btnPermission"
							>
								Set Permission
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
					<div class="pagination-area">
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
					<div class="mb-5">
						<div class="mb-2">Nama</div>
						<InputText
							:key="keyMaster + 'nama'"
							v-model="form.name"
							:placeholder="'Masukkan Nama'"
							:name="prefixName + 'nama'"
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
					<div class="mb-5">
						<div class="mb-2">Nama</div>
						<InputText
							:key="keyMaster + 'nama'"
							v-model="form.name"
							:placeholder="'Masukkan Nama'"
							:name="prefixName + 'nama'"
						/>
					</div>
				</div>
				<div class="text-right">
					<button class="button-main" @click="btnSubmitEdit(idRole)">
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
					Are you sure want to delete role?
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
						@click="btnYesDelete(idRole)"
					>
						Yes
					</button>
				</div>
			</div>
		</ElementsModal>

		<!-- MODAL PERMISSION -->
		<ElementsModal
			:key="keyModalPermission + 'permission'"
			v-model="modalPermission"
			:width="modalWidthPermission"
			:show="true"
			:persistent="persistentPermission"
			:title="modalTitlePermission"
		>
			<div class="text-center">hello</div>
		</ElementsModal>
	</div>
</template>

<script>
export default {
	data() {
		return {
			prefixName: 'create',
			loader: false,
			listRole: null,
			idRole: '',
			keyMaster: 0,
			form: {
				name: ''
			},
			sorter: {
				limit: 10
			},

			// KEPERLUAN MODAL //
			modalCreate: false,
			modalTitleCreate: 'Create New Role',
			modalWidthCreate: 'w-1/2 xl:w-2/5',
			keyModalCreate: 0,
			persistentCreate: true,
			selectedCreate: null,
			//

			// KEPERLUAN MODAL //
			modalEdit: false,
			modalTitleEdit: 'Edit Role',
			modalWidthEdit: 'w-1/2 xl:w-2/5',
			keyModalEdit: 0,
			persistentEdit: true,
			selectedEdit: null,
			//

			// KEPERLUAN MODAL //
			modalDelete: false,
			modalTitleDelete: 'Delete Role',
			modalWidthDelete: 'w-1/2 xl:w-2/5',
			keyModalDelete: 0,
			persistentDelete: true,
			selectedDelete: null,
			//

			// KEPERLUAN MODAL //
			modalPermission: false,
			modalTitlePermission: 'Set permission of role admin',
			modalWidthPermission: 'w-1/2 xl:w-2/5',
			keyModalPermission: 0,
			persistentPermission: true,
			selectedPermission: null,
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
			this.getListRole()
		},

		onChangePage(page) {
			this.page = page
			this.initialize()
		},

		async getListRole() {
			await this.$apiBase
				.get(
					'v1/user-management/roles?limit=' +
						this.limit +
						'&page=' +
						this.page +
						'&sort=desc&column=createdAt'
				)
				.then(res => {
					// console.log(res.data.result)
					this.listRole = res.data.result.rows

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

		async getDetailRole(id) {
			await this.$apiBase
				.get('v1/user-management/roles/' + id)
				.then(res => {
					this.form.name = res.data.result.name
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
			if (this.form.nama === '') {
				this.errorField('Nama wajib diisi')
			} else {
				this.btnSubmit()
			}
		},

		async btnSubmit() {
			await this.$apiBase
				.post('v1/user-management/roles', this.form)
				.then(res => {
					this.$toast.show({
						type: 'success',
						title: res.data.message,
						message: 'Role berhasil dibuat'
					})

					this.$nextTick(() => {
						this.modalCreate = false
						this.keyModalCreate += 1
						this.initialize()
						this.form = {
							name: ''
						}
					})
				})
				.catch(err => {
					console.log(err)
				})
		},

		async btnSubmitEdit(id) {
			await this.$apiBase
				.put('v1/user-management/roles/' + id, this.form)
				.then(res => {
					this.$toast.show({
						type: 'success',
						title: 'Updated',
						message: 'Role berhasil diperbarui'
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
				.delete('v1/user-management/roles/' + id)
				.then(res => {
					this.$toast.show({
						type: 'success',
						title: 'Deleted',
						message: 'Role berhasil dihapus'
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

		btnCreate() {
			this.modalCreate = true
			this.keyModalCreate += 1
		},

		btnEdit(id) {
			this.getDetailRole(id)
			this.modalEdit = true
			this.keyModalEdit += 1
			this.idRole = id
		},

		btnDelete(id) {
			this.modalDelete = true
			this.keyModalDelete += 1
			this.idRole = id
		},

		btnPermission() {
			this.modalPermission = true
			this.keyModalPermission += 1
		}
	}
}
</script>
