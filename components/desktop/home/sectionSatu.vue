<template>
	<div class="bg-primary">
		<div class="container mx-auto py-20 lg:py-28 px-5 lg:px-0">
			<div class="grid grid-cols-12 items-center gap-y-6">
				<div
					class="col-span-12 lg:col-span-6 text-white flex flex-col gap-8 lg:gap-14 items-center lg:items-start"
				>
					<div
						class="text-center lg:text-left text-5xl lg:text-[70px] leading-none"
					>
						{{ title }}
					</div>
					<div class="text-center lg:text-left text-lg lg:text-2xl">
						{{ subtitle }}
					</div>
					<button class="w-fit bg-secondary rounded-lg px-9 py-4">
						Coba Sekarang
					</button>
				</div>
				<div class="col-span-12 lg:col-span-6">
					<img
						class="mx-auto h-80 lg:h-[500px]"
						src="/images/main-image.png"
						alt="img-main"
					/>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			title: 'Kemudahan Printing dengan Satu Ketukan',
			subtitle:
				'Temukan cara baru yang praktis untuk memenuhi kebutuhan printing kamu dengan Easy Copies!'
		}
	}
}
</script>
