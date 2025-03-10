<template>
  <section class="bg-white">
    <div v-if="currentStep === 'profile'" class="h-full">
      <Header @updateStep="updateStep" />
      <div class="max-w-[752px] mx-auto flex flex-col gap-[58px] pb-16 px-5">
        <PersonelInfo />
        <div>
          <div class="flex justify-between items-center font-semibold mb-5">
            <h3 class="text-2xl text-[#181D27]">Your achievement</h3>
            <span
              @click="currentStep = 'achievement'"
              class="text-[18px] text-[#175CD3] cursor-pointer"
              >View All</span
            >
          </div>
          <Achievements />
        </div>

        <!-- AI essay -->

        <!-- <div>
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
              v-for="(essay, idx) in essaysList.slice(0, 2)"
              :key="idx"
              :essay="essay"
            />
          </div>
        </div> -->
      </div>
    </div>
    <AllAchievements
      v-else-if="currentStep === 'achievement'"
      @updateStep="updateStep"
    />
    <EssaysList
      v-else-if="currentStep === 'essay'"
      @updateStep="updateStep"
      :essaysList="essaysList"
    />
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
import useAppTrackerStore from "~/stores/AppTrackerStore";

const appTrackerStore = useAppTrackerStore();
const emit = defineEmits(["updateTab"]);

type CurrentStep =
  | "profile"
  | "edit_profile"
  | "achievement"
  | "essay"
  | "essay_detail";

const currentStep = ref<CurrentStep>("profile");

const updateStep = (step: CurrentStep) => {
  currentStep.value = step;
};

const essaysList = [
  {
    title:
      "Beyond the Title: How Embracing Setbacks Transformed My Understanding of Leadership and Success",
    text: "Losing the debate team leadership position was a humbling experience, but it ultimately shaped me in ways I didn’t expect. At first, I saw it as a failure, ys I didn’t expect. At first, I saw it as a failure, questioning whether I wa...",
  },
  {
    title:
      "Beyond the Title: How Embracing Setbacks Transformed My Understanding of Leadership and Success",
    text: "Losing the debate team leadership position was a humbling experience, but it ultimately shaped me in ways I didn’t expect. At first, I saw it as a failure, ys I didn’t expect. At first, I saw it as a failure, questioning whether I wa...",
  },
  {
    title:
      "Beyond the Title: How Embracing Setbacks Transformed My Understanding of Leadership and Success",
    text: "Losing the debate team leadership position was a humbling experience, but it ultimately shaped me in ways I didn’t expect. At first, I saw it as a failure, ys I didn’t expect. At first, I saw it as a failure, questioning whether I wa...",
  },
  {
    title:
      "Beyond the Title: How Embracing Setbacks Transformed My Understanding of Leadership and Success",
    text: "Losing the debate team leadership position was a humbling experience, but it ultimately shaped me in ways I didn’t expect. At first, I saw it as a failure, ys I didn’t expect. At first, I saw it as a failure, questioning whether I wa...",
  },
  {
    title:
      "Beyond the Title: How Embracing Setbacks Transformed My Understanding of Leadership and Success",
    text: "Losing the debate team leadership position was a humbling experience, but it ultimately shaped me in ways I didn’t expect. At first, I saw it as a failure, ys I didn’t expect. At first, I saw it as a failure, questioning whether I wa...",
  },
  {
    title:
      "Beyond the Title: How Embracing Setbacks Transformed My Understanding of Leadership and Success",
    text: "Losing the debate team leadership position was a humbling experience, but it ultimately shaped me in ways I didn’t expect. At first, I saw it as a failure, ys I didn’t expect. At first, I saw it as a failure, questioning whether I wa...",
  },
  {
    title:
      "Beyond the Title: How Embracing Setbacks Transformed My Understanding of Leadership and Success",
    text: "Losing the debate team leadership position was a humbling experience, but it ultimately shaped me in ways I didn’t expect. At first, I saw it as a failure, ys I didn’t expect. At first, I saw it as a failure, questioning whether I wa...",
  },
];
</script>
