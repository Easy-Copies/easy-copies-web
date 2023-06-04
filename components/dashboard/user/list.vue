<template>
	<div class="p-5">
		<div class="flex items-center justify-between text-primary">
			<div class="text-xl">User List</div>
			<button class="button-outline">Create User</button>
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
					<div class="">dropdown</div>
					<div>paginasi</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
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
			]
		}
	}
}
</script>
