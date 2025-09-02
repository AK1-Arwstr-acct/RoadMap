<template>
  <div class="flex flex-col gap-8 remove-shadow-bg-white">
    <!-- heading -->
    <div class="flex gap-2 items-center">
      <div class="p-2 rounded-lg bg-background-brand-subtle-hovered">
        <IconUserBook class="!text-icon-brand" />
      </div>
      <p class="font-semibold text-xl text-text-base">
        Family & Financial background
      </p>
    </div>
    <!-- Father’s occupation -->
    <div class="">
      <label class="font-medium text-text-neutral-subtle text-sm"
        >Father’s occupation<span class="text-text-error font-medium">
          *</span
        ></label
      >
      <input
        name="account-number"
        type="text"
        v-model="counselorStudentStore.onBoardingData.father_occupation"
        placeholder="Father’s occupation"
        class="mt-1 bg-background-base-subtle rounded-lg border border-border-neutral-subtle py-2.5 px-[14px] w-full outline-none appearance-none text-text-base"
        data-hj-allow
      />
    </div>
    <!-- Mother’s occupation -->
    <div class="">
      <label class="font-medium text-text-neutral-subtle text-sm"
        >Mother’s occupation<span class="text-text-error font-medium">
          *</span
        ></label
      >
      <input
        name="account-number"
        type="text"
        v-model="counselorStudentStore.onBoardingData.mother_occupation"
        placeholder="Mother’s occupation"
        class="mt-1 bg-background-base-subtle rounded-lg border border-border-neutral-subtle py-2.5 px-[14px] w-full outline-none appearance-none text-text-base"
        data-hj-allow
      />
    </div>
    <!-- Parents’ total monthly income -->
    <div class="">
      <label class="font-medium text-text-neutral-subtle text-sm"
        >Parents’ total monthly income<span class="text-text-error font-medium">
          *</span
        ></label
      >
      <div class="relative">
        <input
          name="account-number"
          type="number"
          v-model="counselorStudentStore.onBoardingData.parents_total_income"
          placeholder="Monthly income"
          class="mt-1 bg-background-base-subtle rounded-lg border border-border-neutral-subtle py-2.5 px-[14px] w-full outline-none appearance-none text-text-base"
          inputmode="numeric"
          data-hj-allow
        />
        <span
          class="text-text-neutral-subtle absolute right-[14px] top-1/2 transform -translate-y-1/2"
        >
          VND
        </span>
      </div>
    </div>
    <!-- Saving account amount -->
    <div class="">
      <label class="font-medium text-text-neutral-subtle text-sm"
        >Saving account amount<span class="text-text-error font-medium">
          *</span
        ></label
      >
      <div class="relative">
        <input
          name="account-number"
          type="number"
          v-model="counselorStudentStore.onBoardingData.saving_account_amount"
          placeholder="Saving account amount"
          class="mt-1 bg-background-base-subtle rounded-lg border border-border-neutral-subtle py-2.5 px-[14px] w-full outline-none appearance-none text-text-base"
          inputmode="numeric"
          data-hj-allow
        />
        <span
          class="text-text-neutral-subtle absolute right-[14px] top-1/2 transform -translate-y-1/2"
        >
          VND
        </span>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import useCounselorStudentStore from "~/stores/counselorStudentStore";

const counselorStudentStore = useCounselorStudentStore();
</script>
