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
        Contract details
      </h1>
      <p class="text-text-neutral-subtle text-sm md:text-base">
        Help us draft your contract by filling in the required information
      </p>
    </div>
    <!-- mentorship block -->
    <div
      class="bg-background-brand-subtle rounded-xl px-4 flex items-center gap-4"
    >
      <div class="bg-background-brand rounded-lg p-2">
        <IconSchoolBuilding class="text-text-constant-white" />
      </div>
      <div class="py-4">
        <p class="text-text-brand font-semibold">Basic mentorship program</p>
        <p class="mt-0.5 text-text-neutral-subtle text-sm">
          With 5 million VND deposit
        </p>
      </div>
    </div>
    <StepThreeContractDetail />
    <StepThreeBankingInfo />
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
    isEmpty(data.name_on_contract) ||
    isEmpty(data.contract_legal_address) ||
    isEmpty(data.contract_email) ||
    isEmpty(data.contract_phoneNumber) ||
    isEmpty(data.contract_holder.id) ||
    isEmpty(data.contract_holder.issue_date) ||
    isEmpty(data.contract_holder.place_of_issue) ||
    isEmpty(data.students_national_id.id) ||
    isEmpty(data.students_national_id.issue_date) ||
    isEmpty(data.students_national_id.place_of_issue) ||
    isEmpty(data.name_on_bank_account) ||
    isEmpty(data.bank_account_number) ||
    isEmpty(data.bank_name)
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
