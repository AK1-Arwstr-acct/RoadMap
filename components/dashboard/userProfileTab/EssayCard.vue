<template>
  <div
    class="border-[1.5px] border-gray-200 rounded-2xl bg-[#FFFFFF] px-6 py-5 text-justify cursor-pointer"
  >
    <h3 class="text-lg font-semibold text-[#181D27] mb-4">
      {{ essay.title }}
    </h3>
    <p class="text-[#414651] truncate-paragraph">
        {{ essay.text }}
    </p>
  </div>
</template>
<script setup lang="ts">
defineProps({
  essay: {
    type: Object as PropType<{ title: string; text: string }>,
    default: () => {},
  },
});
</script>
<style scoped>
.truncate-paragraph {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>