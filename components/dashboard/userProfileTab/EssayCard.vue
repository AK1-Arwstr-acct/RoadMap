<template>
  <div
    class="border-[1.5px] border-gray-200 rounded-2xl bg-[#FFFFFF] px-6 py-5 text-justify cursor-pointer"
  >
    <h3 class="text-lg font-semibold text-[#181D27] mb-4">
      {{ parsedEssay.title }}
    </h3>
    <p class="text-[#414651] truncate-paragraph">
      {{ parsedEssay.essay }}
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
  const regex = /^Title:\s*(.+)\nEssay:\s*(.+)$/s;
  const match = props.essay.generated_essay.match(regex);
  return {
    title: match[1],
    essay: match[2],
  };
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
