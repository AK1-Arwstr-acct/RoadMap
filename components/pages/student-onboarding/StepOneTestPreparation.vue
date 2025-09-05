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
      <div
        v-if="
          counselorStudentStore.onBoardingData.english_language_test.status
            ?.value !== 'Not decided'
        "
        class="flex flex-col gap-3"
      >
        <!-- Test type -->
        <BaseSelectRadio
          label="Test type"
          :options="englishTestTypes"
          :disabled="!englishTestTypes.length"
          v-model="
            counselorStudentStore.onBoardingData.english_language_test.test_type
          "
          :isShadowDark="true"
          :required="true"
          :loading="isTestScoresLoading"
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
                counselorStudentStore.onBoardingData.english_language_test
                  .test_date.day
              "
              @input="validateEnglishTestDate"
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
                @onChange="onMonthChange"
              />
            </div>
            <input
              name="year"
              type="text"
              v-model="
                counselorStudentStore.onBoardingData.english_language_test
                  .test_date.year
              "
              @input="validateEnglishTestYear"
              placeholder="Year"
              class="w-full bg-background-base-subtle rounded-lg border border-border-neutral-subtle py-2.5 px-3 outline-none appearance-none text-text-base"
              data-hj-allow
            />
          </div>
        </div>
        <!-- Test score -->
        <div
          v-if="
            counselorStudentStore.onBoardingData.english_language_test.status
              ?.value !== 'Planning to take'
          "
          class="remove-shadow-bg-white"
        >
          <label class="font-medium text-text-neutral-subtle text-sm"
            >Test score<span class="text-text-error font-medium">
              *</span
            ></label
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
      <div
        v-if="
          counselorStudentStore.onBoardingData.standardized_test.status
            ?.value !== 'Not decided'
        "
        class="flex flex-col gap-3"
      >
        <!-- Test type -->
        <BaseSelectRadio
          label="Test type"
          :options="standardizedTestType"
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
              @input="validateStandardizedTestDate"
              placeholder="Day"
              class="w-full bg-background-base-subtle rounded-lg border border-border-neutral-subtle py-2.5 px-3 outline-none appearance-none text-text-base"
              data-hj-allow
            />
            <div class="min-w-[144px]">
              <BaseSelectRadio
                :options="months"
                v-model="
                  counselorStudentStore.onBoardingData.standardized_test
                    .test_date.month
                "
                @onChange="onMonthChange2"
                :isShadowDark="true"
                placeholder="Month"
                direction="upward"
              />
            </div>
            <input
              name="year"
              type="text"
              v-model="
                counselorStudentStore.onBoardingData.standardized_test.test_date
                  .year
              "
              @input="validateStandardizedTestYear"
              placeholder="Year"
              class="w-full bg-background-base-subtle rounded-lg border border-border-neutral-subtle py-2.5 px-3 outline-none appearance-none text-text-base"
              data-hj-allow
            />
          </div>
        </div>
        <!-- Test score -->
        <div
          v-if="
            counselorStudentStore.onBoardingData.standardized_test.status
              ?.value !== 'Planning to take'
          "
          class="remove-shadow-bg-white"
        >
          <label class="font-medium text-text-neutral-subtle text-sm"
            >Test score<span class="text-text-error font-medium">
              *</span
            ></label
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
import axios from "axios";
import useCounselorStudentStore from "~/stores/counselorStudentStore";
import type { OptionAttributes } from "~/types/home";

const counselorStudentStore = useCounselorStudentStore();
const { showToast } = useToast();
const { api } = useApi();

const isTestScoresLoading = ref<boolean>(false);
const isStandardizedScoresLoading = ref<boolean>(false);
const status: OptionAttributes[] = [
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
const englishTestTypes = ref<OptionAttributes[]>([])
const standardizedTestType = ref<OptionAttributes[]>([])

const months = [
  { value: "01", label: "January" },
  { value: "02", label: "February" },
  { value: "03", label: "March" },
  { value: "04", label: "April" },
  { value: "05", label: "May" },
  { value: "06", label: "June" },
  { value: "07", label: "July" },
  { value: "08", label: "August" },
  { value: "09", label: "September" },
  { value: "10", label: "October" },
  { value: "11", label: "November" },
  { value: "12", label: "December" },
];
const fullMonths = [
  "01",
  "03",
  "05",
  "07",
  "08",
  "10",
  "12",
];

const validateEnglishLanguageScore = (event: Event) => {
  const input = (event as InputEvent).target as HTMLInputElement;
  let value = input.value.replace(/[^0-9.]/g, "");

  // Only allow numbers between 0 and 120, optionally with up to 2 decimals
  const num = parseFloat(value);
  if (!isNaN(num) && num >= 0 && num <= 120) {
    // Limit to 2 decimal places
    value = num.toFixed(value.includes(".") ? 2 : 0).replace(/\.00$/, "");
    input.value = value;
    counselorStudentStore.onBoardingData.english_language_test.test_scrore =
      value;
  } else if (value === "") {
    counselorStudentStore.onBoardingData.english_language_test.test_scrore = "";
  } else {
    // Remove last character if out of range
    value = value.slice(0, -1);
    input.value = value;
    counselorStudentStore.onBoardingData.english_language_test.test_scrore =
      value;
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

const validateEnglishTestDate = (event: Event) => {
  const input = (event as InputEvent).target as HTMLInputElement;
  let value = input.value.replace(/[^0-9.]/g, "");
  const num = parseFloat(value);
  let limit = 31;
  const month =
    counselorStudentStore.onBoardingData.english_language_test.test_date.month
      ?.value;
  const year =
    counselorStudentStore.onBoardingData.english_language_test.test_date.year;
  if (month && month === "02") {
    limit = 29;
    if (year && Number(year) % 4 !== 0) {
      limit = 28;
    }
  } else if (month && !fullMonths.includes(month)) {
    limit = 30;
  }
  if (!isNaN(num) && num >= 0 && num <= limit) {
    // Limit to 2 decimal places
    value = num.toFixed(value.includes(".") ? 2 : 0).replace(/\.00$/, "");
    input.value = value;
    counselorStudentStore.onBoardingData.english_language_test.test_date.day =
      value;
  } else if (value === "") {
    counselorStudentStore.onBoardingData.english_language_test.test_date.day =
      "";
  } else {
    // Remove last character if out of range
    value = value.slice(0, -1);
    input.value = value;
    counselorStudentStore.onBoardingData.english_language_test.test_date.day =
      value;
  }
};

const validateEnglishTestYear = (event: Event) => {
  const input = (event as InputEvent).target as HTMLInputElement;
  let value = input.value.replace(/[^0-9.]/g, "");

  const currentYear = new Date().getFullYear();
  const num = parseFloat(value);
  if (!isNaN(num) && num >= 0 && num <= currentYear) {
    // Limit to 2 decimal places
    value = num.toFixed(value.includes(".") ? 2 : 0).replace(/\.00$/, "");
    input.value = value;
    counselorStudentStore.onBoardingData.english_language_test.test_date.year =
      value;
  } else if (value === "") {
    counselorStudentStore.onBoardingData.english_language_test.test_date.year =
      "";
  } else {
    // Remove last character if out of range
    value = value.slice(0, -1);
    input.value = value;
    counselorStudentStore.onBoardingData.english_language_test.test_date.year =
      value;
  }
  const year =
    counselorStudentStore.onBoardingData.english_language_test.test_date.year;
  const day = Number(
    counselorStudentStore.onBoardingData.english_language_test.test_date.day
  );
  const month =
    counselorStudentStore.onBoardingData.english_language_test.test_date.month
      ?.value;
  if (
    year.length === 4 &&
    Number(year) % 4 !== 0 &&
    month === "02" &&
    day === 29
  ) {
    counselorStudentStore.onBoardingData.english_language_test.test_date.day =
      "";
  }
};

const onMonthChange = () => {
  const day = Number(
    counselorStudentStore.onBoardingData.english_language_test.test_date.day
  );
  const month =
    counselorStudentStore.onBoardingData.english_language_test.test_date.month
      ?.value;
  if (month === "02" && day > 29) {
    counselorStudentStore.onBoardingData.english_language_test.test_date.day =
      "";
    return;
  }
  if (month && !fullMonths.includes(month) && day > 30) {
    counselorStudentStore.onBoardingData.english_language_test.test_date.day =
      "";
  }
};

const validateStandardizedTestDate = (event: Event) => {
  const input = (event as InputEvent).target as HTMLInputElement;
  let value = input.value.replace(/[^0-9.]/g, "");
  const num = parseFloat(value);
  let limit = 31;
  const month =
    counselorStudentStore.onBoardingData.standardized_test.test_date.month
      ?.value;
  const year =
    counselorStudentStore.onBoardingData.standardized_test.test_date.year;
  if (month && month === "02") {
    limit = 29;
    if (year && Number(year) % 4 !== 0) {
      limit = 28;
    }
  } else if (month && !fullMonths.includes(month)) {
    limit = 30;
  }
  if (!isNaN(num) && num >= 0 && num <= limit) {
    // Limit to 2 decimal places
    value = num.toFixed(value.includes(".") ? 2 : 0).replace(/\.00$/, "");
    input.value = value;
    counselorStudentStore.onBoardingData.standardized_test.test_date.day =
      value;
  } else if (value === "") {
    counselorStudentStore.onBoardingData.standardized_test.test_date.day = "";
  } else {
    // Remove last character if out of range
    value = value.slice(0, -1);
    input.value = value;
    counselorStudentStore.onBoardingData.standardized_test.test_date.day =
      value;
  }
};

const validateStandardizedTestYear = (event: Event) => {
  const input = (event as InputEvent).target as HTMLInputElement;
  let value = input.value.replace(/[^0-9.]/g, "");

  const currentYear = new Date().getFullYear();
  const num = parseFloat(value);
  if (!isNaN(num) && num >= 0 && num <= currentYear) {
    // Limit to 2 decimal places
    value = num.toFixed(value.includes(".") ? 2 : 0).replace(/\.00$/, "");
    input.value = value;
    counselorStudentStore.onBoardingData.standardized_test.test_date.year =
      value;
  } else if (value === "") {
    counselorStudentStore.onBoardingData.standardized_test.test_date.year = "";
  } else {
    // Remove last character if out of range
    value = value.slice(0, -1);
    input.value = value;
    counselorStudentStore.onBoardingData.standardized_test.test_date.year =
      value;
  }
  const year =
    counselorStudentStore.onBoardingData.standardized_test.test_date.year;
  const day = Number(
    counselorStudentStore.onBoardingData.standardized_test.test_date.day
  );
  const month =
    counselorStudentStore.onBoardingData.standardized_test.test_date.month
      ?.value;
  if (
    year.length === 4 &&
    Number(year) % 4 !== 0 &&
    month === "02" &&
    day === 29
  ) {
    counselorStudentStore.onBoardingData.standardized_test.test_date.day = "";
  }
};

const onMonthChange2 = () => {
  const day = Number(
    counselorStudentStore.onBoardingData.standardized_test.test_date.day
  );
  const month =
    counselorStudentStore.onBoardingData.standardized_test.test_date.month
      ?.value;
  if (month === "02" && day > 29) {
    counselorStudentStore.onBoardingData.standardized_test.test_date.day = "";
    return;
  }
  if (month && !fullMonths.includes(month) && day > 30) {
    counselorStudentStore.onBoardingData.standardized_test.test_date.day = "";
  }
};

const setEnglishTestScores = async () => {
  try {
    isTestScoresLoading.value = true;
    const response = await api.get(`/api/v2/openapi/english-test-scores`);
    if (response?.data.data) {
      englishTestTypes.value = response.data.data.map(
        (item: { id: number; title: string }) => {
          return {
            value: item.id,
            label: item.title,
          };
        }
      );
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage = errorList(error);
      showToast(errorMessage, {
        type: "error",
      });
    }
  } finally {
    isTestScoresLoading.value = false;
  }
};

const setStandardizedTestScores = async () => {
  try {
    isStandardizedScoresLoading.value = true;
    const response = await api.get(`/api/v2/openapi/standard-test-scores`);
    if (response?.data.data) {
      standardizedTestType.value = response.data.data.map(
        (item: { id: number; title: string }) => {
          return {
            value: item.id,
            label: item.title,
          };
        }
      );
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage = errorList(error);
      showToast(errorMessage, {
        type: "error",
      });
    }
  } finally {
    isStandardizedScoresLoading.value = false;
  }
};

onMounted(() => {
  setEnglishTestScores();
  setStandardizedTestScores();
});
</script>