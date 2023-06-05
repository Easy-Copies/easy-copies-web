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
						v-for="(item, index) in dataUser"
						:key="'users' + index"
						class="border border-enam text-sm"
					>
						<td class="px-5 py-2.5">{{ item.nama }}</td>
						<td class="px-5 py-2.5">{{ item.email }}</td>
						<td class="px-5 py-2.5">{{ item.createdAt }}</td>
						<td class="px-5 py-2.5">{{ item.updatedAt }}</td>
						<td class="px-5 py-2.5 flex items-center gap-2.5">
							<button class="button-edit">Edit</button>
							<button class="button-delete">Delete</button>
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
							:key="'pageset' + keyPage"
							v-model="currentPage"
							:total-page="totalPage"
							:total-visible="totalVisible"
						/>
					</div>
				</div>
			</div>
		</div>

		<ElementsModal
			:key="keyModalCreate + 'create'"
			v-model="modalCreate"
			:width="modalWidthCreate"
			:show="true"
			:persistent="persistentCreate"
			:title="modalTitleCreate"
		>
			<div>
				<div class="mb-2">
					<div class="mb-2">Nama</div>
					<InputText
						v-model="form.nama"
						:placeholder="'Masukkan Nama'"
						:name="prefixName + 'nama'"
					/>
				</div>
				<div class="mb-2">
					<div class="mb-2">Email</div>
					<InputText
						v-model="form.email"
						:placeholder="'Masukkan Email'"
						:name="prefixName + 'email'"
					/>
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
			form: {
				nama: '',
				email: '',
				role: ''
			},
			dataUser: [
				{
					nama: 'Steven',
					email: 'steven@widyatama.ac.id',
					createdAt: '2023-05-23T20:29:40',
					updatedAt: '2023-05-27T19:21:14'
				},
				{
					nama: 'Huda',
					email: 'huda@widyatama.ac.id',
					createdAt: '2023-05-23T20:29:40',
					updatedAt: '2023-05-27T19:21:14'
				}
			],
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

			// KEBUTUHAN PAGINASI
			startIndex: 0,
			totalVisible: 5,
			limit: 10,
			keyPage: 0,
			offset: 0,
			totalPage: 1,
			currentPage: 1
			//
		}
	},
	mounted() {
		this.initialize()
	},
	methods: {
		initialize() {
			this.getListUser()
		},

		getListUser() {
			console.log('hello')
		},

		btnCreate() {
			this.modalCreate = true
			this.keyModalCreate += 1
		}
	}
}
</script>
