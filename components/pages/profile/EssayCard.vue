<template>
  <div
    class="border-[1.5px] border-gray-200 rounded-2xl bg-[#FFFFFF] px-6 py-5 text-justify cursor-pointer"
  >
    <p class="text-lg font-semibold text-[#181D27] mb-4">
      {{ parsedEssay.title }}
    </p>
    <p class="text-[#414651] truncate-paragraph">
      {{ parsedEssay.essayText }}
    </p>
  </div>
</template>
<script setup lang="ts">
const props = defineProps({
  essay: {
    type: Object,
    default: () => {},
  },
});

const parsedEssay = computed(() => {
  return filterEssay(props.essay.generated_essay);
});
</script>
<style scoped>
.truncate-paragraph {
  display: -webkit-box;
  -webkit-line-clamp: 5;
  @media (min-width: 768px) {
    -webkit-line-clamp: 2;
  }
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
