<template>
    <div class="container mx-auto pt-20 pb-24 px-5 lg:px-0">
        <div class="text-center text-primary text-4xl lg:text-[64px] mb-10 font-medium">Our Services</div>
        <div class="grid grid-cols-12 gap-3 lg:gap-6 text-primary">
            <div v-for="(item, index) in sectionDua" :key="'secdua'+index" class="col-span-6 lg:col-span-3">
                <div class="bg-white rounded-lg shadow-lg border px-3 lg:px-10 py-5 lg:py-10 cursor-pointer">
                    <img class="h-32 lg:h-[180px] mx-auto mb-10 lg:mb-20" :src="item.image" :alt="item.alt">
                    <div class="text-xl lg:text-[32px] text-center">{{ item.label }}</div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
export default {
    data() {
        return {
            sectionDua: [
                {
                    label: 'Printing',
                    image: '/images/img-printing.png',
                    alt: 'img-printing',
                },
                {
                    label: 'Jilid Laporan',
                    image: '/images/img-jilid.png',
                    alt: 'img-jilid',
                },
                {
                    label: 'Foto Copy',
                    image: '/images/img-fotocopy.png',
                    alt: 'img-fotocopy',
                },
                {
                    label: 'Laminating',
                    image: '/images/img-laminating.png',
                    alt: 'img-laminating',
                }
            ]
        }
    },
}
</script>