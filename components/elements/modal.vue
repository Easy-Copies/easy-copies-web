<template>
	<div>
		<div
			v-if="statModal"
			aria-hidden="true"
			class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 bottom-0 z-40 w-full lg:inset-0 h-modal lg:h-full flex items-center justify-center bg-gray-800/[.7]"
		>
			<div
				v-click-outside="persistentAction"
				:class="width ? width : 'w-full lg:w-1/2'"
				class="fixed p-0 lg:p-4 z-20 lg:h-auto"
			>
				<!-- Modal content -->
				<div
					class="relative bg-white lg:rounded-lg shadow p-6 h-screen lg:h-fit"
				>
					<!-- h-[calc(100vh-100px)] -->
					<div class="flex items-center mb-6">
						<h3
							class="flex-auto text-xl md:text-2xlplus leading-8 dark:text-white"
						>
							{{ title }}
						</h3>
						<button
							v-if="show"
							class="flex-none"
							@click="tutupModal"
						>
							<i class="ri-close-line text-2xl"></i>
						</button>
					</div>
					<div class="max-h-[calc(100vh-220px)] overflow-y-auto">
						<slot />
					</div>
					<!-- Modal footer -->
					<slot name="footer" />
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: ['value', 'title', 'persistent', 'width', 'show'],
	data() {
		return {
			statModal: false
		}
	},
	mounted() {
		this.initialize()
		window.addEventListener('keydown', e => {
			if (e.code === 'Escape') {
				this.persistentAction()
			} else if (e.code === 'Enter') {
				this.$emit('keyup', e)
			}
		})
	},
	methods: {
		initialize() {
			this.statModal = this.value
		},

		tutupModal() {
			this.statModal = false
			this.$emit('input', false)
		},

		doNothing() {},

		persistentAction() {
			if (this.persistent && this.persistent === true) {
				this.doNothing()
			} else {
				this.tutupModal()
			}
		},

		handleKey(event) {
			console.log(event)
		}
	}
}
</script>
