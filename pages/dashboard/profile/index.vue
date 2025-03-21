<template>
  <div class="size-full overflow-y-auto custom-scrollbar">
    <section class="bg-white">
      <div v-if="currentStep === 'profile'" class="h-full">
        <Header />
        <div class="max-w-[752px] mx-auto flex flex-col gap-[58px] pb-16 px-5">
          <PersonelInfo />
          <div v-show="showAchievements">
            <div class="flex justify-between items-center font-semibold mb-5">
              <h3 class="text-2xl text-[#181D27]">Your achievement</h3>
              <span
                @click="
                  navigateTo(localePath('/dashboard/profile/achievements'))
                "
                class="text-[18px] text-[#175CD3] cursor-pointer"
                >View All</span
              >
            </div>
            <Achievements
              @remainingTask="(value) => (showAchievements = value)"
            />
          </div>

          <!-- AI essay -->

          <div v-if="essayStore.userEssayList.length">
            <div class="flex justify-between items-center font-semibold mb-5">
              <h3 class="text-2xl text-[#181D27]">Your AI Essay</h3>
              <span
                @click="navigateTo(localePath('/dashboard/profile/essays'))"
                class="text-[18px] text-[#175CD3] cursor-pointer"
                >View All</span
              >
            </div>
            <div class="flex flex-col gap-6">
              <EssayCard
                v-for="(essay, idx) in essayStore.userEssayList.slice(0, 2)"
                :key="idx"
                :essay="essay"
                @click="openDetail(essay)"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script setup lang="ts">
import useEssayStore from "~/stores/essayStore";
import type { EssayData } from "~/types/home";

definePageMeta({
  layout: "dashboard-layout",
});

const { api } = useApi();
const essayStore = useEssayStore();
const localePath = useLocalePath();

type CurrentStep =
  | "profile"
  | "edit_profile"
  | "achievement"
  | "essay"
  | "essay_detail";

const currentStep = ref<CurrentStep>("profile");
const showAchievements = ref<boolean>(false);

const openDetail = (essayDetail: EssayData) => {
  const details = filterEssay(essayDetail.generated_essay);
  essayStore.setFinalEssay(details);
  navigateTo(localePath(`/dashboard/profile/essays/${essayDetail.id}`));
};

onMounted(async () => {
  essayStore.getEssayList();
});
</script>
