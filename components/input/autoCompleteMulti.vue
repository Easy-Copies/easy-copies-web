<template>
	<div v-click-outside="closeDropdown">
		<div class="relative">
			<input
				:id="name"
				:ref="name"
				v-model="newVal"
				type="text"
				:name="name"
				class="focus:outline-none w-full border border-enam rounded-md px-3 py-3 text-primary placeholder-[#9E9E9E] focus:border-enam/50"
				:placeholder="placeholder ? placeholder : 'Pilih'"
				autocomplete="off"
				:disabled="disabled ? disabled : false"
				@focus="focusText"
				@input="handleInput"
				@keyup.enter="submitOpsi"
				@keyup.esc="clearOpsi"
				@keydown.tab="keyTab"
			/>
			<div
				class="absolute top-0 right-0 flex items-center mt-2 px-2.5 text-gray-500"
			>
				<i
					:class="statusDropdown ? 'rotate-180 ' : ''"
					class="ri-arrow-down-s-line text-xl transition-all"
				></i>
			</div>
		</div>
		<div v-if="statusDropdown" class="relative">
			<div
				class="bg-white absolute top-0 left-0 right-0 z-10 rounded-md shadow-md border border-enam overflow-x-hidden overflow-y-auto max-h-96"
			>
				<div
					v-if="addNew && addNew === true && newVal !== ''"
					class="text-sm text-gray-600 py-0.5 px-2"
				>
					Press enter to make new {{ label }}
				</div>
				<button
					v-for="(i, index) in listing"
					:key="name + 'list' + index"
					class="list-options block w-full text-left text-sm py-0.5 px-2 bg-white hover:bg-blue-500 hover:text-white disabled:hover:bg-white disabled:hover:text-gray-400 disabled:text-gray-400 cursor-pointer disabled:cursor-default"
					:class="
						i[parseId] === 'listbaru'
							? 'text-blue-500'
							: 'text-black'
					"
					:disabled="
						selectedValue.map(e => e[parseId]).includes(i[parseId])
					"
					@click="pilihItem(i)"
				>
					<span v-if="multilang && multilang === true">{{
						i[parseLabel]
					}}</span>
					<span v-else>{{ i[parseLabel] }}</span>
				</button>
			</div>
		</div>
		<div class="chip-container mt-2 flex items-center flex-wrap gap-2">
			<div
				v-for="(item, index) in selectedValue"
				:key="'listSel' + name + index"
				@click="removeChip(index)"
			>
				<ElementsChip :item="item[parseLabel]" />
			</div>
		</div>

		<!-- <pre>{{opsiHide}}</pre> -->
	</div>
</template>
<script>
export default {
	props: [
		'value',
		'label',
		'required',
		'name',
		'disabled',
		'placeholder',
		'opsi',
		'itemValue',
		'itemLabel',
		'multilang',
		'addNew',
		'opsiHide'
	],
	data() {
		return {
			statusDropdown: false,
			listing: [],
			newVal: '',
			selectedValue: []
		}
	},
	computed: {
		parseLabel() {
			return this.itemLabel ? this.itemLabel : 'label'
		},
		parseId() {
			return this.itemValue ? this.itemValue : 'id'
		}
	},
	watch: {
		newVal(val) {
			this.getApi(val)
		}
	},
	mounted() {
		this.initialize()
	},
	methods: {
		initialize() {
			this.listing = this.opsi
			// console.log(this.listing)
			// console.log(this.value)
			if (this.value && this.value.length > 0) {
				const unik = _.uniq(this.value)
				unik.every((e, index) => {
					// this.getItemApi(e)

					if (this.opsiHide) {
						if (_.flatMap(this.opsiHide, 'id').includes(e)) {
							this.listing = this.listing.concat(this.opsiHide)
						}
					}

					const cari = this.listing.filter(x => x[this.parseId] === e)
					if (cari && cari.length > 0)
						this.selectedValue.push(cari[0])
					if (this.value.length === index + 1) {
						return false
					} else {
						return true
					}
				})
			}
		},

		focusText() {
			this.getApi()
			this.statusDropdown = true
		},

		async getApi(val) {
			let listingFilter = []
			if (val === '' || val === undefined) {
				listingFilter = this.listing
			} else {
				listingFilter = this.opsi.filter(e => {
					return e[this.itemLabel]
						.toString()
						.toLowerCase()
						.includes(val.toLowerCase())
				})
			}
			// this.statusDropdown = listingFilter.length > 0 ? true : false
			this.statusDropdown = true
			// if (this.addNew && this.addNew == true) {
			//     const addNew = {
			//         [this.parseId] : 'listbaru',
			//         [this.parseLabel]: this.multilang && this.multilang === true ?  ['Baru', 'Baru'] : 'Baru'
			//     }
			//     listingFilter.unshift(addNew)
			// }

			this.listing = listingFilter
		},

		closeDropdown() {
			this.statusDropdown = false
		},

		submitOpsi() {
			// if (this.listing.length > 0) {
			//     const pertama = this.listing[0]
			//     const reduceListing = this.selectedValue.map(e=>e[this.parseId]).includes(pertama[this.parseId])
			//     if (!reduceListing) this.pilihItem(pertama)
			// }
			if (this.addNew && this.addNew === true) {
				const addNew = {
					[this.parseId]: this.newVal,
					[this.parseLabel]:
						this.multilang && this.multilang === true
							? [this.newVal, this.newVal]
							: this.newVal
				}
				this.selectedValue.push(addNew)
				this.$nextTick(() => {
					this.newVal = ''
					this.updateValue()
				})
			}
		},

		handleInput(event) {
			this.statusDropdown = true
		},

		clearOpsi() {
			this.newVal = ''
		},

		pilihItem(item) {
			if (item.id === 'new-item') {
				this.modalMaster = true
				this.keyMaster += 1
			} else {
				this.newVal = ''
				this.selectedValue.push(item)
				this.updateValue()
				// this.$emit('input',item.id)
			}
			this.closeDropdown()
		},

		updateValue() {
			const unikval = _.uniq(
				this.selectedValue.map(e => e[this.itemValue])
			)
			this.$emit('input', unikval)
		},

		removeChip(index) {
			// console.log(value)
			// const posisi = this.selectedValue.indexOf(value)
			// this.selectedValue.splice(posisi, 1)
			// this.$nextTick(() => {
			//     this.updateValue();
			// })
			this.selectedValue.splice(index, 1)
			this.selectedValue = _.uniq(this.selectedValue)
			this.$nextTick(() => {
				this.updateValue()
			})
		},

		keyTab(event) {
			// const newLabel = this.label && this.label !== '' ? this.label : 'isian '
			// if (this.listing.length === 0) {
			//     this.$toast.warning(newLabel + ' mohon diisi')
			//     event.preventDefault()
			// }
		}
	}
}
</script>
