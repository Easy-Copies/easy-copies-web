<template>
	<div v-if="loader">
		<nav v-if="!loaderPage" aria-label="Page navigation" class="">
			<ul class="inline-flex items-center overflow-hidden">
				<li class="mr-3">
					<button
						:disabled="value === 1"
						class="h-8 w-9 flex items-center justify-center bg-white hover:bg-gray-100 disabled:text-gray-200 disabled:hover:bg-gray-50 border border-enam rounded"
						@click="prev"
					>
						<i class="ri-arrow-left-s-line"></i>
					</button>
				</li>
				<li
					v-for="(item, index) in range"
					:key="'paginasi' + index"
					class="mr-3"
				>
					<button
						v-if="item.val === value && item.type === 'number'"
						disabled
						class="h-8 px-3 text-sm flex items-center justify-center bg-green-200 text-white border border-enam rounded"
					>
						{{ item.val }}
					</button>
					<button
						v-else-if="item.val !== value && item.type === 'number'"
						class="h-8 px-3 text-sm flex items-center justify-center bg-white hover:bg-primary/30 border border-enam rounded"
						@click="clickPage(item.val)"
					>
						{{ item.val }}
					</button>
					<button
						v-else-if="item.val !== value && item.type === 'dots'"
						disabled
						class="h-8 px-3 text-sm flex items-center justify-center bg-white border border-enam rounded"
					>
						{{ item.val }}
					</button>
				</li>
				<li class="overflow-hidden">
					<button
						:disabled="value === totalPage"
						class="text-sm h-8 w-9 flex items-center justify-center bg-white hover:bg-gray-100 disabled:text-gray-200 disabled:hover:bg-gray-50 border border-enam rounded"
						@click="next"
					>
						<i class="ri-arrow-right-s-line"></i>
					</button>
				</li>
			</ul>
		</nav>
		<nav v-else aria-label="Page navigation" class="animate-pulse">
			<ul class="inline-flex items-center overflow-hidden">
				<li class="mr-3">
					<button
						disabled
						class="h-8 w-9 flex items-center justify-center bg-gray-200 disabled:text-gray-200 border border-transparent rounded"
					></button>
				</li>
				<li
					v-for="(item, index) in range"
					:key="'paginasi' + index"
					class="mr-3"
				>
					<button
						v-if="item.val === value && item.type === 'number'"
						disabled
						class="h-8 w-8 px-3 text-sm flex items-center justify-center bg-gray-200 text-white border border-transparent rounded"
					>
						<!-- {{item.val}} -->
					</button>
					<button
						v-else-if="item.val !== value && item.type === 'number'"
						class="h-8 w-8 px-3 text-sm flex items-center justify-center bg-gray-200 text-white border border-transparent rounded"
					>
						<!-- {{item.val}} -->
					</button>
					<button
						v-else-if="item.val !== value && item.type === 'dots'"
						disabled
						class="h-8 w-8 px-3 text-sm flex items-center justify-center bg-gray-200 text-white border border-transparent rounded"
					>
						<!-- {{item.val}} -->
					</button>
				</li>
				<li class="overflow-hidden">
					<button
						class="text-sm h-8 w-9 flex items-center justify-center bg-gray-200 disabled:text-gray-200 border border-transparent rounded"
					></button>
				</li>
			</ul>
		</nav>
	</div>
</template>

<script>
export default {
	props: ['value', 'totalPage', 'totalVisible', 'loaderPage'],
	data() {
		return {
			// totalVisible: 7,
			// totalPage: 15,
			// value: 2,
			loader: false,
			rangeAwal: [],
			rangeTengah: [],
			rangeAkhir: [],
			range: []
		}
	},
	watch: {
		value() {
			this.initialize()
		}
	},
	mounted() {
		this.initialize()
	},
	methods: {
		initialize() {
			this.loader = false
			if (parseInt(this.totalPage) > 1) {
				this.initPage()
			}
		},

		initPage() {
			const dots = {
				type: 'dots',
				val: '...'
			}
			const berapaRange = this.totalPage > this.totalVisible
			if (berapaRange) {
				const bagiDua = Math.floor(parseInt(this.totalVisible) / 2)
				let awal = 0
				let tengah = 0
				let akhir = 0
				if (this.value < bagiDua + 1) {
					awal = this.totalVisible - bagiDua
					tengah = 0
					akhir = bagiDua - 1
				} else if (this.value > this.totalPage - bagiDua - 1) {
					// 7 - 3 - 1
					awal = 1
					tengah = 0
					akhir = this.totalVisible - bagiDua + 1
				} else {
					awal = 1
					tengah = this.totalVisible - 2
					akhir = 1
				}
				this.$nextTick(() => {
					this.hitungHalaman(awal, tengah, akhir, bagiDua)
				})
			} else {
				const start = 1
				const end = this.totalPage
				this.range = [...Array(end - start + 1).keys()].map(x => {
					const data = {
						type: 'number',
						val: x + start
					}
					return data
				})
				this.$nextTick(() => {
					this.loader = true
				})
			}
		},

		hitungHalaman(awal, tengah, akhir, bagiDua) {
			const dots = {
				type: 'dots',
				val: '...'
			}

			const rangeAwalStart = 1
			const rangeAwalEnd = awal
			const rangeAwal = [
				...Array(rangeAwalEnd - rangeAwalStart + 1).keys()
			].map(x => {
				const data = {
					type: 'number',
					val: x + rangeAwalStart
				}
				return data
			})

			const rangeAkhirStart = this.totalPage - akhir
			const rangeAkhirEnd = this.totalPage
			const rangeAkhir = [
				...Array(rangeAkhirEnd - rangeAkhirStart + 1).keys()
			].map(x => {
				const data = {
					type: 'number',
					val: x + rangeAkhirStart
				}
				return data
			})
			let rangeTengah = [...[dots]]
			if (tengah === 0) {
				rangeTengah = [...[dots]]
			} else {
				const tengahCenter = Math.floor(tengah / 2)
				const tengahStart = this.value - tengahCenter + 1
				const tengahEnd = this.value + tengahCenter
				const genRangeTengah = [
					...Array(tengahEnd - tengahStart + 1).keys()
				].map(x => {
					const data = {
						type: 'number',
						val: x + tengahStart
					}
					return data
				})
				rangeTengah = [...[dots], ...genRangeTengah, ...[dots]]
			}

			this.range = [...rangeAwal, ...rangeTengah, ...rangeAkhir]
			this.$nextTick(() => {
				this.loader = true
			})
		},
		clickPage(index) {
			this.$emit('input', index)
		},
		prev() {
			const newVal = parseInt(this.value) - 1
			this.$emit('input', newVal)
		},
		next() {
			const newVal = parseInt(this.value) + 1
			this.$emit('input', newVal)
		}
	}
}
</script>
