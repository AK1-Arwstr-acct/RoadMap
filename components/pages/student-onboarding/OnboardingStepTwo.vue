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
        Family travel and financial records
      </h1>
      <p class="text-text-neutral-subtle text-sm md:text-base">
        These information will help us create a better personalized plan for you
      </p>
    </div>
    <StepTwoVisaStatus />
    <StepTowFinancialBackground />
    <div class="flex justify-center pt-2">
      <button
        @click="handleNext"
        :disabled="isAnyFieldMissing"
        class="rounded-lg bg-background-brand py-1.5 px-5 leading-7 min-w-24 text-text-constant-white font-semibold disabled:opacity-70"
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

const isAnyFieldMissing = computed(() => {
  const data = counselorStudentStore.onBoardingData;
  const isEmpty = (val: any) =>
    val === null ||
    val === undefined ||
    (typeof val === "string" && val.trim() === "") ||
    (typeof val === "object" && Object.keys(val).length === 0);

  return (
    isEmpty(data.family_visited_before) ||
    (data.denied_visa_before === "yes"
      ? isEmpty(data.detail_for_visa_rejection)
      : false) ||
    isEmpty(data.father_occupation) ||
    isEmpty(data.mother_occupation) ||
    isEmpty(data.parents_total_income) ||
    isEmpty(data.saving_account_amount)
  );
});

watch(
  () => counselorStudentStore.moveToNextStep,
  () => {
    if (counselorStudentStore.moveToNextStep) {
      counselorStudentStore.moveToNextStep = false;
      if (isAnyFieldMissing.value) {
        return;
      } else {
        handleNext();
      }
    }
  }
);
</script>