<template>
  <section class="bg-white">
    <div v-if="currentStep === 'profile'" class="h-full">
      <Header @updateStep="updateStep" />
      <div class="max-w-[752px] mx-auto flex flex-col gap-[58px] pb-16 px-5">
        <PersonelInfo />
        <div v-show="showAchievements">
          <div class="flex justify-between items-center font-semibold mb-5">
            <h3 class="text-2xl text-[#181D27]">Your achievement</h3>
            <span
              @click="currentStep = 'achievement'"
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
              @click="currentStep = 'essay'"
              class="text-[18px] text-[#175CD3] cursor-pointer"
              >View All</span
            >
          </div>
          <div class="flex flex-col gap-6">
            <EssayCard
              v-for="(essay, idx) in essayStore.userEssayList.slice(0, 2)"
              :key="idx"
              :essay="essay"
              @click="openDetail(essay.generated_essay)"
            />
          </div>
        </div>
      </div>
    </div>
    <AllAchievements
      v-else-if="currentStep === 'achievement'"
      @updateStep="updateStep"
    />
    <EssaysList v-else-if="currentStep === 'essay'" @updateStep="updateStep" />
    <AllYourAIEssays
      v-else-if="currentStep === 'essay_detail'"
      @updateStep="updateStep"
    />
    <EditProfile
      v-else-if="currentStep === 'edit_profile'"
      @updateStep="updateStep"
    />
  </section>
</template>
<script setup lang="ts">
import useEssayStore from "~/stores/essayStore";

const { api } = useApi();
const essayStore = useEssayStore();
const emit = defineEmits(["updateTab"]);

type CurrentStep =
  | "profile"
  | "edit_profile"
  | "achievement"
  | "essay"
  | "essay_detail";

const currentStep = ref<CurrentStep>("profile");
const showAchievements = ref<boolean>(false);

const updateStep = (step: CurrentStep) => {
  currentStep.value = step;
};

const openDetail = (essayDetail: string) => {
  const details = filterEssay(essayDetail);
  essayStore.setFinalEssay(details);
  currentStep.value = "essay_detail";
};

onMounted(async () => {
  essayStore.getEssayList();
});
</script>
