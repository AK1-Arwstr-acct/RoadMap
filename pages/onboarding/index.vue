<template>
  <div
    class="h-screen min-h-fit flex justify-center items-center px-5 pt-24 pb-16"
  >
    <AcademicInfo
      v-if="steps === 'academic'"
      @submitAcademic="submitAcademic"
    />
    <ProgramsInfo v-else-if="steps === 'programs'" @submitProgram="submitProgram" />
    <DestinationInfo v-else-if="steps === 'destination'" @submitDestination="submitDestination" />
    <BudgetInfo v-else-if="steps === 'budget'"  @submitBudget="submitBudget"/>
    <StartJourney v-else />
  </div>
</template>
<script setup lang="ts">
import useAppStore from '~/stores/AppStore';

const appStore = useAppStore();

definePageMeta({
  layout: "main-layout",
});

const steps = ref<"academic" | "programs" | "destination" | "budget" | "startJourney">(
  "academic"
);

const submitAcademic = () => {
  steps.value = "programs";
  appStore.setOnboardingProgress('50%');
};
const submitProgram = () => {
  steps.value = "destination";
  appStore.setOnboardingProgress('75%');
};
const submitDestination = () => {
  steps.value = "budget";
  appStore.setOnboardingProgress('100%');
};
const submitBudget = () => {
  steps.value = "startJourney";
  appStore.setOnboardingProgress(null);
};
onBeforeMount(async()=>{
  await appStore.getUserData();
  appStore.setOnboardingProgress('25%');
})
</script>
