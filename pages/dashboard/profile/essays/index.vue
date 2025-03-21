<template>
  <div class="size-full overflow-y-auto custom-scrollbar">
    <div class="max-w-[752px] px-4 mx-auto mt-8 mb-16">
      <div class="mb-5">
        <h3 class="text-2xl font-semibold text-[#181D27]">All Your AI Essay</h3>
      </div>
      <div class="flex flex-col gap-6">
        <EssayCard
          v-for="(essay, idx) in essayStore.userEssayList"
          :key="idx"
          :essay="essay"
          @click="openDetail(essay)"
        />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import useEssayStore from "~/stores/essayStore";
import type { EssayData } from "~/types/home";

const essayStore = useEssayStore();
const localePath = useLocalePath();

definePageMeta({
  layout: "dashboard-layout",
});

const openDetail = (essayDetail: EssayData) => {
  const details = filterEssay(essayDetail.generated_essay);
  essayStore.setFinalEssay(details);
  navigateTo(localePath(`/dashboard/profile/essays/${essayDetail.id}`));
};

onMounted(async () => {
  if (!essayStore.userEssayList.length) {
    essayStore.getEssayList();
  }
});
</script>
