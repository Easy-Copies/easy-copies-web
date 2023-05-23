<template>
    <div class="bg-primary w-full py-5 fixed z-10">
        <div class="container mx-auto">
            <div class="flex items-center justify-between">
                <div class=""><img class="h-14" src="/images/logo.svg" alt="img-logo"></div>
                <div class="flex gap-x-10 text-white">
                    <NuxtLink to="/" class="hover:text-blue-300">Home</NuxtLink>
                    <NuxtLink to="/" class="hover:text-blue-300">Service</NuxtLink>
                    <NuxtLink to="/" class="hover:text-blue-300">About</NuxtLink>
                    <NuxtLink to="/" class="hover:text-blue-300">Contact</NuxtLink>
                    <NuxtLink to="/" class="hover:text-blue-300">Login</NuxtLink>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
export default {
    data() {
        return {

        }
    }
}
</script>