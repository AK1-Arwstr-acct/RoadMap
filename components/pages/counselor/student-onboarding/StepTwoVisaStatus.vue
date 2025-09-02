<template>
  <div class="flex flex-col gap-8">
    <!-- heading -->
    <div class="flex gap-2 items-center">
      <div class="p-2 rounded-lg bg-background-success-subtle">
        <IconPlaneTicket class="!text-icon-success" />
      </div>
      <p class="font-semibold text-xl text-text-base">Visa status</p>
    </div>
    <!-- countries name -->
    <div class="remove-shadow-bg-white">
      <label class="font-medium text-text-neutral-subtle text-sm"
        >Which countries have you or your family visited before?<span
          class="text-text-error font-medium"
        >
          *</span
        ></label
      >
      <div class="">
        <textarea
          name="countries-name"
          v-model="counselorStudentStore.onBoardingData.family_visited_before"
          type="text"
          @input=""
          placeholder="Enter countries"
          class="mt-1.5 bg-background-base-subtle resize-none rounded-lg border border-border-neutral-subtle py-3 px-4 w-full outline-none appearance-none text-text-base custom-scrollbar"
          data-hj-allow
        />
      </div>
    </div>
    <!-- residency -->
    <div class="">
      <label class="font-medium text-text-neutral-subtle text-sm pb-2.5 block">
        Have you or your family members ever been denied a visa?<span
          class="text-text-error font-medium"
        >
          *</span
        >
      </label>
      <div class="flex gap-8 text-text-neutral-subtle font-medium">
        <label class="flex items-center gap-2 cursor-pointer group">
          <input
            type="radio"
            value="yes"
            v-model="counselorStudentStore.onBoardingData.denied_visa_before"
            class="appearance-none hidden"
          />
          <div
            class="size-6 border-2 rounded-full flex items-center justify-center transition-all ease-in-out duration-200 shadow-2xl group-hover:outline outline-8"
            :class="[
              counselorStudentStore.onBoardingData.denied_visa_before === 'yes'
                ? 'border-background-brand bg-background-brand group-hover:outline-background-brand-subtle-hovered'
                : 'border-border-neutral group-hover:outline-background-base-subtle-hovered',
            ]"
          >
            <span
              v-if="
                counselorStudentStore.onBoardingData.denied_visa_before ===
                'yes'
              "
              class="size-[9px] min-w-[9px] rounded-full bg-white"
            />
          </div>
          <span>Yes</span>
        </label>
        <label class="flex items-center gap-2 cursor-pointer group">
          <input
            type="radio"
            value="no"
            v-model="counselorStudentStore.onBoardingData.denied_visa_before"
            class="appearance-none hidden"
          />
          <div
            class="size-6 border-2 rounded-full flex items-center justify-center transition-all ease-in-out duration-200 shadow-2xl group-hover:outline outline-8"
            :class="[
              counselorStudentStore.onBoardingData.denied_visa_before === 'no'
                ? 'border-background-brand bg-background-brand group-hover:outline-background-brand-subtle-hovered'
                : 'border-border-neutral group-hover:outline-background-base-subtle-hovered',
            ]"
          >
            <span
              v-if="
                counselorStudentStore.onBoardingData.denied_visa_before === 'no'
              "
              class="size-[9px] min-w-[9px] rounded-full bg-white"
            />
          </div>
          <span>No</span>
        </label>
      </div>
    </div>

    <!-- current address -->
    <div
      v-if="counselorStudentStore.onBoardingData.denied_visa_before === 'yes'"
      class="remove-shadow-bg-white"
    >
      <label class="font-medium text-text-neutral-subtle text-sm"
        >If yes, please provide details of the rejected visa case(s)<span
          class="text-text-error font-medium"
        >
          *</span
        ></label
      >
      <div class="">
        <textarea
          name="rejection-details"
          v-model="
            counselorStudentStore.onBoardingData.detail_for_visa_rejection
          "
          type="email"
          @input=""
          placeholder="e.g. Mother – USA – tourist visa"
          class="mt-1.5 bg-background-base-subtle resize-none rounded-lg border border-border-neutral-subtle py-3 px-4 w-full outline-none appearance-none text-text-base custom-scrollbar"
          data-hj-allow
        />
        <p class="flex items-center gap-2 text-text-neutral-subtle text-xs">
          <IconInfoFilled class="text-icon-neutral-subtle" />
          Include the family member - country - visa type
        </p>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import useCounselorStudentStore from "~/stores/counselorStudentStore";

const counselorStudentStore = useCounselorStudentStore();
</script>
