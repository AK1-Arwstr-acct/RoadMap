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
        Schedule first meeting
      </h1>
      <p class="text-text-neutral-subtle text-sm md:text-base">
        Each student will join an onboarding session to get key information for
        their journey and meet mentors as well as fellow Arrowsters. Please pick
        a time that works best for you!
      </p>
    </div>
    <div>
      <BaseSelectRadio
        label="Choose your onboarding date"
        :options="tempOptions"
        v-model="counselorStudentStore.onBoardingData.onboarding_date"
        :isShadowDark="true"
        :required="true"
      />
    </div>
    <div class="flex justify-center pt-2">
      <button
        @click="onSubmit"
        class="rounded-lg bg-background-brand py-1.5 px-5 leading-7 min-w-24 text-text-constant-white font-semibold"
      >
        Complete onboarding
      </button>
    </div>
  </div>
</template>
<script setup lang="ts">
import useCounselorStudentStore from "~/stores/counselorStudentStore";

const counselorStudentStore = useCounselorStudentStore();

const temp = ref();

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

const onSubmit = () => {

}
</script>
