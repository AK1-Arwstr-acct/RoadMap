<template>
  <div class="flex flex-col gap-12">
    <!-- header -->
    <div class="flex flex-col items-center text-center">
      <img
        src="/public/images/application.png"
        alt="application"
        class="size-20 pb-4"
      />
      <h1 class="text-text-base text-2xl md:text-[32px] pb-1">
        Student information
      </h1>
      <p class="text-text-neutral-subtle text-sm md:text-base">
        These information will help us create a better personalized plan for you
      </p>
    </div>
    <StepOnePersonalInfo />
    <StepOneAcademicInfo />
    <StepOneGoals />
    <StepOneTestPreparation />
    <div class="flex justify-center pt-2">
      <button
        @click="handleNext"
        class="rounded-lg bg-background-brand py-1.5 px-5 leading-7 min-w-24 text-text-constant-white font-semibold"
      >
        Next
      </button>
    </div>
  </div>
</template>
<script setup lang="ts">
import useCounselorStudentStore from "~/stores/counselorStudentStore";

const counselorStudentStore = useCounselorStudentStore();

const handleNext = () => {
  console.log(counselorStudentStore.onBoardingData);
  
  counselorStudentStore.onboardingStep++;
};
</script>
