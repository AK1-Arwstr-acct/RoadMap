<template>
  <div class="flex flex-col gap-5">
    <!-- heading -->
    <div class="flex gap-2 items-center">
      <div class="p-2 rounded-lg bg-background-info-subtle">
        <IconBook class="!text-icon-info" />
      </div>
      <p class="font-semibold text-xl text-text-base">
        Test preparation interest
      </p>
    </div>
    <div class="flex flex-col gap-3">
      <p class="text-text-brand-bold text-xs font-semibold">
        ENGLISH LANGUAGE TEST
      </p>
      <!-- Status -->
      <BaseSelectRadio
        label="Status"
        :options="status"
        v-model="
          counselorStudentStore.onBoardingData.english_language_test.status
        "
        :isShadowDark="true"
        :required="true"
      />
      <div v-if="counselorStudentStore.onBoardingData.english_language_test.status?.value !== 'Not decided'" class="flex flex-col gap-3">
        <!-- Test type -->
        <BaseSelectRadio
          label="Test type"
          :options="test_type"
          v-model="
            counselorStudentStore.onBoardingData.english_language_test.test_type
          "
          :isShadowDark="true"
          :required="true"
        />
        <!-- Test date -->
        <div class="remove-shadow-bg-white">
          <label class="font-medium text-text-neutral-subtle text-sm"
            >Test date<span class="text-text-error font-medium"> *</span></label
          >
          <div class="flex items-center gap-2 pt-1.5">
            <!-- v-model="" -->
            <input
              name="day"
              type="text"
              v-model="
                counselorStudentStore.onBoardingData.english_language_test
                  .test_date.day
              "
              @input=""
              placeholder="Day"
              class="w-full bg-background-base-subtle rounded-lg border border-border-neutral-subtle py-2.5 px-3 outline-none appearance-none text-text-base"
              data-hj-allow
            />
            <div class="min-w-[144px]">
              <BaseSelectRadio
                :options="months"
                v-model="
                  counselorStudentStore.onBoardingData.english_language_test
                    .test_date.month
                "
                :isShadowDark="true"
                placeholder="Month"
              />
            </div>
            <input
              name="year"
              type="text"
              v-model="
                counselorStudentStore.onBoardingData.english_language_test
                  .test_date.year
              "
              @input=""
              placeholder="Year"
              class="w-full bg-background-base-subtle rounded-lg border border-border-neutral-subtle py-2.5 px-3 outline-none appearance-none text-text-base"
              data-hj-allow
            />
          </div>
        </div>
        <!-- Test score -->
        <div v-if="counselorStudentStore.onBoardingData.english_language_test.status?.value !== 'Planning to take'" class="remove-shadow-bg-white">
          <label class="font-medium text-text-neutral-subtle text-sm"
            >Test score<span class="text-text-error font-medium"> *</span></label
          >
          <div class="relative">
            <input
              name="Test"
              type="text"
              v-model="
                counselorStudentStore.onBoardingData.english_language_test
                  .test_scrore
              "
              @input="validateEnglishLanguageScore"
              placeholder="e.g. 100"
              class="mt-1 bg-background-base-subtle rounded-lg border border-border-neutral-subtle py-2.5 px-[14px] w-full outline-none appearance-none text-text-base"
              data-hj-allow
            />
            <span
              class="text-text-neutral-subtle absolute right-[14px] top-1/2 transform -translate-y-1/2"
            >
              /120
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="flex flex-col gap-3">
      <p class="text-text-brand-bold text-xs font-semibold">
        STANDARDIZED TEST
      </p>
      <!-- Status -->
      <BaseSelectRadio
        label="Status"
        :options="status"
        v-model="counselorStudentStore.onBoardingData.standardized_test.status"
        :isShadowDark="true"
        :required="true"
      />
      <div v-if="counselorStudentStore.onBoardingData.standardized_test.status?.value !== 'Not decided'" class="flex flex-col gap-3">
        <!-- Test type -->
        <BaseSelectRadio
          label="Test type"
          :options="test_type"
          v-model="
            counselorStudentStore.onBoardingData.standardized_test.test_type
          "
          :isShadowDark="true"
          :required="true"
        />
        <!-- Test date -->
        <div class="remove-shadow-bg-white">
          <label class="font-medium text-text-neutral-subtle text-sm"
            >Test date<span class="text-text-error font-medium"> *</span></label
          >
          <div class="flex items-center gap-2 pt-1.5">
            <input
              name="day"
              type="text"
              v-model="
                counselorStudentStore.onBoardingData.standardized_test.test_date
                  .day
              "
              @input=""
              placeholder="Day"
              class="w-full bg-background-base-subtle rounded-lg border border-border-neutral-subtle py-2.5 px-3 outline-none appearance-none text-text-base"
              data-hj-allow
            />
            <div class="min-w-[144px]">
              <BaseSelectRadio
                :options="months"
                v-model="
                  counselorStudentStore.onBoardingData.standardized_test.test_date
                    .month
                "
                :isShadowDark="true"
                placeholder="Month"
              />
            </div>
            <input
              name="year"
              type="text"
              v-model="
                counselorStudentStore.onBoardingData.standardized_test.test_date
                  .year
              "
              @input=""
              placeholder="Year"
              class="w-full bg-background-base-subtle rounded-lg border border-border-neutral-subtle py-2.5 px-3 outline-none appearance-none text-text-base"
              data-hj-allow
            />
          </div>
        </div>
        <!-- Test score -->
        <div v-if="counselorStudentStore.onBoardingData.standardized_test.status?.value !== 'Planning to take'" class="remove-shadow-bg-white">
          <label class="font-medium text-text-neutral-subtle text-sm"
            >Test score<span class="text-text-error font-medium"> *</span></label
          >
          <div class="relative">
            <input
              name="Test"
              type="text"
              v-model="
                counselorStudentStore.onBoardingData.standardized_test
                  .test_scrore
              "
              @input="validateStandardizedScore"
              placeholder="e.g. 100"
              class="mt-1 bg-background-base-subtle rounded-lg border border-border-neutral-subtle py-2.5 px-[14px] w-full outline-none appearance-none text-text-base"
              data-hj-allow
            />
            <span
              class="text-text-neutral-subtle absolute right-[14px] top-1/2 transform -translate-y-1/2"
            >
              /120
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import useCounselorStudentStore from "~/stores/counselorStudentStore";
import type { OptionAttributes } from "~/types/home";

const counselorStudentStore = useCounselorStudentStore();

const radioTemp = ref();
const radioTemp2 = ref();
const sameAddress = ref<boolean>(false);
// const testScore = ref<string>("");

const status : OptionAttributes[] = [
  {
    label: "Not decided",
    value: "Not decided",
  },
  {
    label: "Planning to take",
    value: "Planning to take",
  },
  {
    label: "Test taken",
    value: "Test taken",
  },
];
const test_type : OptionAttributes[] = [
  {
    label: "TOEFL",
    value: "TOEFL",
  },
  {
    label: "IELTS",
    value: "IELTS",
  },
  {
    label: "Duolingo",
    value: "Duolingo",
  },
];

const months = [
  { value: "January", label: "January" },
  { value: "February", label: "February" },
  { value: "March", label: "March" },
  { value: "April", label: "April" },
  { value: "May", label: "May" },
  { value: "June", label: "June" },
  { value: "July", label: "July" },
  { value: "August", label: "August" },
  { value: "September", label: "September" },
  { value: "October", label: "October" },
  { value: "November", label: "November" },
  { value: "December", label: "December" },
];

const oldDress = () => {
  if (sameAddress.value) {
    radioTemp2.value = radioTemp.value;
  } else {
    radioTemp2.value = "";
  }
};

const validateEnglishLanguageScore = (event: Event) => {
  const input = (event as InputEvent).target as HTMLInputElement;
  let value = input.value.replace(/[^0-9.]/g, "");

  // Only allow numbers between 0 and 120, optionally with up to 2 decimals
  const num = parseFloat(value);
  if (!isNaN(num) && num >= 0 && num <= 120) {
    // Limit to 2 decimal places
    value = num.toFixed(value.includes(".") ? 2 : 0).replace(/\.00$/, "");
    input.value = value;
    counselorStudentStore.onBoardingData.english_language_test.test_scrore = value;
  } else if (value === "") {
    counselorStudentStore.onBoardingData.english_language_test.test_scrore = "";
  } else {
    // Remove last character if out of range
    value = value.slice(0, -1);
    input.value = value;
    counselorStudentStore.onBoardingData.english_language_test.test_scrore = value;
  }
};
const validateStandardizedScore = (event: Event) => {
  const input = (event as InputEvent).target as HTMLInputElement;
  let value = input.value.replace(/[^0-9.]/g, "");

  // Only allow numbers between 0 and 120, optionally with up to 2 decimals
  const num = parseFloat(value);
  if (!isNaN(num) && num >= 0 && num <= 120) {
    // Limit to 2 decimal places
    value = num.toFixed(value.includes(".") ? 2 : 0).replace(/\.00$/, "");
    input.value = value;
    counselorStudentStore.onBoardingData.standardized_test.test_scrore = value;
  } else if (value === "") {
    counselorStudentStore.onBoardingData.standardized_test.test_scrore = "";
  } else {
    // Remove last character if out of range
    value = value.slice(0, -1);
    input.value = value;
    counselorStudentStore.onBoardingData.standardized_test.test_scrore = value;
  }
};
</script>
