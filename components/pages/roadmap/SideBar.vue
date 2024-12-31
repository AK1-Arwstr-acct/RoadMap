<template>
  <div class="bg-[#292929] size-full p-6 flex flex-col gap-6 max-w-fit">
    <div class="flex justify-between items-center">
      <h1 class="text-2xl 2xl:text-3xl font-semibold">Roadmap</h1>
      <div @click="emit('toggleSideBar')" class="cursor-pointer">
        <IconSideBar />
      </div>
    </div>
    <OverviewCard class="w-[328px]" />
  </div>
</template>
<script setup lang="ts">
const emit = defineEmits(["toggleSideBar"]);

defineProps({
  isSideBar: {
    type: Boolean,
    default: true,
  },
});
</script>
