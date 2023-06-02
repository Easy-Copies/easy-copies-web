<template>
	<div class="bg-primary">
		<div class="container mx-auto">
			<div class="px-5 lg:px-0 py-20">
				<div class="grid grid-cols-12 gap-5 text-white">
					<div class="col-span-12 lg:col-span-6">
						<img class="mb-10" src="/images/logo.svg" alt="img-logo" />
						<div>
							Lorem Ipsum is simply dummy text of the printing and typesetting
							industry. Lorem Ipsum has been the industry's standard dummy text
							ever since the 1500s, when an unknown printer took a galley of
							type and scrambled it to make a type specimen book. It has
							survived not only five centuries, but also the leap into
							electronic typesetting, remaining essentially unchanged. It was
							popularised in the 1960s with the release of Letraset sheets
							containing Lorem Ipsum passages, and more recently with desktop
							publishing software like Aldus PageMaker including versions of
							Lorem Ipsum.
						</div>
					</div>
					<div class="col-span-12 lg:col-span-6">
						<div class="grid grid-cols-4 gap-x-3 gap-y-5 mb-10">
							<div class="col-span-4 lg:col-span-2">
								<div class="text-xl mb-5">Contact Us</div>
								<div class="flex flex-col gap-2">
									<div class="text-sm font-light">
										Bandung, Jawa Barat, Indonesia
									</div>
									<div class="text-sm font-light">contact@easycopies.com</div>
									<button
										class="w-fit py-3 px-8 text-[#9ACA3C] rounded-lg border border-[#9ACA3C]"
									>
										+62 812 3456 7890
									</button>
								</div>
							</div>
							<div class="col-span-4 lg:col-span-2">
								<div class="text-xl mb-5">Our Services</div>
								<div class="flex flex-col gap-2">
									<nuxt-link to="/" class="text-sm font-light">
										Foto Copy
									</nuxt-link>
									<nuxt-link to="/" class="text-sm font-light">
										Printing
									</nuxt-link>
									<nuxt-link to="/" class="text-sm font-light">
										Jilid Laporan
									</nuxt-link>
									<nuxt-link to="/" class="text-sm font-light">
										Laminting
									</nuxt-link>
								</div>
							</div>
						</div>
						<div class="text-white">
							<div class="text-xl mb-5">Sosial Media</div>
							<div class="flex items-center gap-5">
								<img src="/icons/icon-instagram.svg" alt="ic-ig" />
								<img src="/icons/icon-youtube.png" alt="ic-yt" />
							</div>
						</div>
					</div>
				</div>

				<hr class="bg-white mt-14 mb-5" />

				<div class="text-white text-sm">© Copyright 2023 | Easy Copies</div>
			</div>
		</div>
	</div>
</template>
