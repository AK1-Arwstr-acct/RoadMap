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
    isEmpty(data.name) ||
    isEmpty(data.date_of_birth?.day) ||
    isEmpty(data.date_of_birth?.year) ||
    isEmpty(data.date_of_birth?.month) ||
    isEmpty(data.phone_number) ||
    isEmpty(data.email) ||
    isEmpty(data.legal_address) ||
    isEmpty(data.current_address) ||
    isEmpty(data.nationality) ||
    (data.permanent_residency === "yes"
      ? isEmpty(data.residency_country_name)
      : false) ||
    isEmpty(data.recent_school) ||
    isEmpty(data.level_of_study) ||
    isEmpty(data.gpa) ||
    isEmpty(data.intended_study_program) ||
    isEmpty(data.intended_major) ||
    !Array.isArray(data.country_destinations) ||
    data.country_destinations.length === 0 ||
    isEmpty(data.annual_budget) ||
    isEmpty(data.earliest_intake) ||
    isEmpty(data.english_language_test?.status) ||
    (() => {
      const status = data.english_language_test?.status?.value;
      if (status === "Not decided") return false;
      if (isEmpty(data.english_language_test?.test_type)) return true;
      if (isEmpty(data.english_language_test?.test_date?.day)) return true;
      if (isEmpty(data.english_language_test?.test_date?.year)) return true;
      if (isEmpty(data.english_language_test?.test_date?.month)) return true;
      if (
        status !== "Planning to take" &&
        isEmpty(data.english_language_test?.test_scrore)
      )
        return true;
      return false;
    })() ||
    (() => {
      const status = data.standardized_test?.status?.value;
      if (status === "Not decided") return false;
      if (isEmpty(data.standardized_test?.test_type)) return true;
      if (isEmpty(data.standardized_test?.test_date?.day)) return true;
      if (isEmpty(data.standardized_test?.test_date?.year)) return true;
      if (isEmpty(data.standardized_test?.test_date?.month)) return true;
      if (
        status !== "Planning to take" &&
        isEmpty(data.standardized_test?.test_scrore)
      )
        return true;
      return false;
    })()
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
