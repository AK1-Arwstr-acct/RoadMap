<template>
  <div class="max-w-[752px] px-4 mx-auto mt-8 mb-16">
    <div class="mb-6 text-[#717680] font-medium flex items-center gap-1.5">
      <p
        @click="emit('updateStep', 'profile')"
        class="cursor-pointer font-sans"
      >
        Profile
      </p>
      <IconChevronDown
        class="transform -rotate-90"
        stroke="#717680"
        width="20"
        height="18"
      />
    </div>
    <div class="mb-5">
      <h3 class="text-2xl font-semibold text-[#181D27]">All Your AI Essay</h3>
    </div>
    <div class="flex flex-col gap-6">
      <EssayCard
        v-for="(essay, idx) in essayStore.userEssayList"
        :key="idx"
        :essay="essay"
        @click="openDetail(essay.generated_essay)"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import useEssayStore from "~/stores/essayStore";

const essayStore = useEssayStore();

const emit = defineEmits(["updateStep", "openDetail"]);

defineProps({
  essaysList: {
    type: Array,
    default: () => [],
  },
});

const openDetail = (essayDetail: string) => {
  const details = filterEssay(essayDetail);
  essayStore.setFinalEssay(details);

  emit("updateStep", "essay_detail");
};
</script>
