<template>
  <div class="">
    <OnboardingStepOne v-if="counselorStudentStore.onboardingStep === 1" />
    <OnboardingStepTwo v-else-if="counselorStudentStore.onboardingStep === 2" />
    <OnboardingStepThree v-else-if="counselorStudentStore.onboardingStep === 3"/>
    <OnboardingFinalStep v-show="counselorStudentStore.onboardingStep === 4" />
  </div>
</template>
<script setup lang="ts">
import useCounselorStudentStore from "~/stores/counselorStudentStore";

const counselorStudentStore = useCounselorStudentStore();
</script>
