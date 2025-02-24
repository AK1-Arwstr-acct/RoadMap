<template>
    <div class="fixed bg-black/50 inset-0 backdrop-blur py-[60px] px-[68px]">
        <div class="bg-white size-full rounded-xl drop-shadow-lg relative">
            <div @click="emit('openSophieModal')" class="absolute right-4 top-4 cursor-pointer">
                <IconCross fill="#A4A7AE" width="28" height="28"/>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">

const emit = defineEmits(["openSophieModal"])
</script>