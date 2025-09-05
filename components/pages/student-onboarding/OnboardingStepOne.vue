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
        :disabled="isAnyFieldMissing || isSubmitting"
        class="rounded-lg bg-background-brand py-1.5 px-5 leading-7 min-w-24 text-text-constant-white font-semibold disabled:opacity-70"
      >
        Next
      </button>
    </div>
  </div>
</template>
<script setup lang="ts">
import axios from "axios";
import useCounselorStudentStore from "~/stores/counselorStudentStore";

const counselorStudentStore = useCounselorStudentStore();
const { showToast } = useToast();
const { api } = useApi();

const isSubmitting = ref<boolean>(false);

const handleNext = async () => {
  try {
    isSubmitting.value = true;
    const userData = counselorStudentStore.onBoardingData;
    const payload = {
      full_legal_name: userData.name,
      date_of_birth: `${userData.date_of_birth.year}-${userData.date_of_birth.month?.value}-${userData.date_of_birth.day}`,
      phone_number: userData.phone_number,
      email: userData.email,
      legal_address: userData.legal_address,
      current_address: userData.current_address,
      national_country_id:
        counselorStudentStore.onBoardingData.nationality?.value,
      permanent_residency:
        userData.permanent_residency === "yes" ? true : false,
      pr_country_id:
        userData.permanent_residency === "yes"
          ? counselorStudentStore.onBoardingData.residency_country_name?.value
          : null,
      passport_number: userData.passport_number,
      most_recent_school: userData.recent_school,
      current_class_grade_id: userData.level_of_study?.value,
      curriculum: userData.curriculum,
      current_gpa: userData.gpa,
      intended_class_grade_id: userData.intended_study_program?.value,
      // super_meta_category_id: userData.intended_major,
      preferred_country_ids: userData.country_destinations,
      min_budget: 0,
      max_budget: counselorStudentStore.onBoardingData.annual_budget,
      // preferred_earliest_intake: userData.earliest_intake?.value,
      post_graduation_plan: userData.post_graduation_plan,
      test_score_status: userData.english_language_test.status?.value,
      test_score_type_id:
        userData.english_language_test.status?.value !== "Not decided"
          ? userData.english_language_test.test_type?.value
          : null,
      english_test_date:
        userData.english_language_test.status?.value !== "Not decided"
          ? `${userData.english_language_test.test_date.year}-${userData.english_language_test.test_date.month?.value}-${userData.english_language_test.test_date.day}`
          : null,
      test_score:
        userData.english_language_test.status?.value === "Test taken"
          ? userData.english_language_test.test_scrore
          : null,
      standardized_test_status: userData.standardized_test.status?.value,
      standardized_test_type_id:
        userData.standardized_test.status?.value !== "Not decided"
          ? userData.standardized_test.test_type?.value
          : null,
      standardized_test_date:
        userData.standardized_test.status?.value !== "Not decided"
          ? `${userData.standardized_test.test_date.year}-${userData.standardized_test.test_date.month?.value}-${userData.standardized_test.test_date.day}`
          : null,
      standardized_score:
        userData.standardized_test.status?.value === "Test taken"
          ? userData.standardized_test.test_scrore
          : null,
    };
    await api.post("/api/v1/counsellor-form/student", payload);
    counselorStudentStore.onboardingStep++;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage = errorList(error);
      showToast(errorMessage, {
        type: "error",
      });
    }
  } finally {
    isSubmitting.value = false;
  }
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

onMounted(() => {
  counselorStudentStore.getStudentInitailData();
});
</script>
