<template>
  <div class="flex flex-col gap-5">
    <!-- heading -->
    <div class="flex gap-2 items-center">
      <div class="p-2 rounded-lg bg-background-warning-subtle">
        <IconScholarship width="24" height="24" class="text-icon-warning" />
      </div>
      <p class="font-semibold text-xl text-text-base">Academic Background</p>
    </div>
    <!-- name -->
    <div class="remove-shadow-bg-white">
      <label class="font-medium text-text-neutral-subtle text-sm"
        >Most recent school<span class="text-text-error font-medium">
          *</span
        ></label
      >
      <div class="">
        <input
          name="recent-school"
          type="text"
          v-model="counselorStudentStore.onBoardingData.recent_school"
          @input=""
          placeholder="Most recent school"
          class="mt-1.5 bg-background-base-subtle rounded-lg border border-border-neutral-subtle py-2.5 px-3 w-full outline-none appearance-none text-text-base"
          data-hj-allow
        />
      </div>
    </div>
    <!-- Level of study -->
    <BaseSelectRadio
      label="Level of study"
      :options="tempOptions"
      v-model="counselorStudentStore.onBoardingData.level_of_study"
      :isShadowDark="true"
      :required="true"
    />
    <!-- Curriculum -->
    <div class="">
      <label class="font-medium text-text-neutral-subtle text-sm"
        >Curriculum</label
      >
      <input
        name="Curriculum"
        type="text"
        v-model="counselorStudentStore.onBoardingData.curriculum"
        placeholder="Curriculum"
        class="mt-1 bg-background-base-subtle rounded-lg border border-border-neutral-subtle py-2.5 px-[14px] w-full outline-none appearance-none text-text-base"
        data-hj-allow
      />
      <p class="flex items-center gap-2 text-text-neutral-subtle text-xs mt-1">
        <IconInfoFilled class="text-icon-neutral-subtle" />
        If you studied a program other than Vietnam’s high school system (IB,
        A-level, etc.), please fill it in above
      </p>
    </div>
    <!-- gpa -->
    <div class="remove-shadow-bg-white">
      <label class="font-medium text-text-neutral-subtle text-sm"
        >Current GPA<span class="text-text-error font-medium"> *</span></label
      >
      <div class="relative">
        <input
          name="Test"
          type="text"
          v-model="counselorStudentStore.onBoardingData.gpa"
          @input="validateNumber"
          placeholder="e.g. 7.0"
          class="mt-1 bg-background-base-subtle rounded-lg border border-border-neutral-subtle py-2.5 px-[14px] w-full outline-none appearance-none text-text-base"
          data-hj-allow
        />
        <span
          class="text-text-neutral-subtle absolute right-[14px] top-1/2 transform -translate-y-1/2"
        >
          /10
        </span>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import useCounselorStudentStore from "~/stores/counselorStudentStore";

const counselorStudentStore = useCounselorStudentStore();

const tempOptions = [
  {
    label: "temp",
    value: "temp",
  },
  {
    label: "temp",
    value: "temp",
  },
  {
    label: "temp",
    value: "temp",
  },
];

const validateNumber = (event: Event) => {
  const input = (event as InputEvent).target as HTMLInputElement;
  const value = input.value;

  const regex = /^(?:[0-9](?:\.\d{0,2})?|10?)$/;
  const cleanedValue = value.replace(/[^0-9.]/g, "");

  if (regex.test(cleanedValue)) {
    input.value = cleanedValue;
    counselorStudentStore.onBoardingData.gpa = cleanedValue;
  } else {
    input.value = cleanedValue.slice(0, -1);
    counselorStudentStore.onBoardingData.gpa = input.value;
  }
};
</script>
